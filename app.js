document.addEventListener('DOMContentLoaded', () => {
  const LS_PROGRESS = 'mathstat_quiz_progress_v1';
  const LS_HISTORY = 'mathstat_quiz_history_v1';
  const LS_THEME = 'mathstat_quiz_theme_v1';
  const MODE_LABELS = { type: '入力モード', dnd: 'ドラッグ＆ドロップモード' };
  const GROUP_LABELS = { all: 'すべて', g1: '第1〜8回', g2: '第9〜11回' };

  // 単一空欄（answers/display/distractors）の旧形式と，複数空欄（blanks配列）の新形式を
  // どちらも同じ形（blanks配列）に揃えておくことで，以降の描画ロジックを共通化する。
  function normalizeQuestion(q) {
    if (q.blanks) return q;
    return {
      ...q,
      context: q.context.split('___BLANK___').join('___BLANK0___'),
      blanks: [{ answers: q.answers, display: q.display, distractors: q.distractors }],
    };
  }
  const ALL_QUESTIONS = QUESTIONS.map(normalizeQuestion);
  const ALL_ROUNDS = [...new Set(ALL_QUESTIONS.map(q => q.round))].sort((a, b) => a - b);

  // 「回ごとに選択」用プルダウンを実際のデータから動的に生成
  const roundSelect = document.getElementById('round-select');
  ALL_ROUNDS.forEach(r => {
    const opt = document.createElement('option');
    opt.value = String(r);
    opt.textContent = `第${r}回`;
    roundSelect.appendChild(opt);
  });
  roundSelect.addEventListener('change', () => {
    document.querySelector('input[name="group"][value="single"]').checked = true;
  });

  // ----- ダーク／ライト表示切り替え -----
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  function applyTheme(theme) {
    if (theme === 'dark' || theme === 'light') {
      document.documentElement.setAttribute('data-theme', theme);
      themeToggleBtn.textContent = theme === 'dark' ? '☀️' : '🌙';
    }
  }
  const savedTheme = localStorage.getItem(LS_THEME);
  if (savedTheme) {
    applyTheme(savedTheme);
  } else {
    themeToggleBtn.textContent = window.matchMedia('(prefers-color-scheme: dark)').matches ? '☀️' : '🌙';
  }
  themeToggleBtn.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme')
      || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    const next = current === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    try { localStorage.setItem(LS_THEME, next); } catch (e) { /* ignore */ }
  });

  let queue = [];
  let idx = 0;
  let score = { correct: 0, total: 0 };
  let currentMode = 'type';
  let currentGroup = 'all';

  const setupScreen = document.getElementById('setup-screen');
  const quizScreen = document.getElementById('quiz-screen');
  const resultScreen = document.getElementById('result-screen');
  const setupInfo = document.getElementById('setup-info');

  const qMeta = document.getElementById('q-meta');
  const qContext = document.getElementById('q-context');
  const progressText = document.getElementById('progress-text');
  const scoreText = document.getElementById('score-text');

  const typeModeArea = document.getElementById('type-mode-area');
  const checkBtn = document.getElementById('check-btn');
  const revealArea = document.getElementById('reveal-area');
  const correctAnswerDiv = document.getElementById('correct-answer');

  const dndModeArea = document.getElementById('dnd-mode-area');
  const dndDropzone = document.getElementById('dnd-dropzone');
  const dndChoices = document.getElementById('dnd-choices');
  const dndFeedback = document.getElementById('dnd-feedback');
  const dndNextBtn = document.getElementById('dnd-next-btn');

  const resumeBanner = document.getElementById('resume-banner');
  const resumeInfo = document.getElementById('resume-info');
  const historyList = document.getElementById('history-list');

  let dndBlankIdx = 0;
  let dndAnswered = false;
  let dndAllCorrect = true;
  let dndAnsweredMap = {};
  let draggedValue = null;

  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function normalize(s) {
    return s
      .normalize('NFKC')
      .replace(/\s+/g, '')
      .replace(/[()（）\[\]{}]/g, '')
      .replace(/[,，]/g, '')
      .toLowerCase();
  }

  function escapeHtml(s) {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function groupFilter(group) {
    if (group === 'g1') return ALL_QUESTIONS.filter(q => q.round <= 8);
    if (group === 'g2') return ALL_QUESTIONS.filter(q => q.round > 8);
    if (group.startsWith('r')) {
      const r = Number(group.slice(1));
      return ALL_QUESTIONS.filter(q => q.round === r);
    }
    return ALL_QUESTIONS;
  }

  function groupLabel(group) {
    if (group && group.startsWith('r')) return `第${group.slice(1)}回`;
    return GROUP_LABELS[group] || group;
  }

  function questionId(q) {
    return `${q.round}__${q.label}`;
  }

  function findQuestionById(id) {
    return ALL_QUESTIONS.find(q => questionId(q) === id);
  }

  // ----- 保存機能：進行中の状態 -----
  function saveProgress() {
    try {
      localStorage.setItem(LS_PROGRESS, JSON.stringify({
        mode: currentMode,
        group: currentGroup,
        order: queue.map(questionId),
        idx,
        score,
        savedAt: Date.now(),
      }));
    } catch (e) { /* localStorage unavailable: ignore */ }
  }

  function clearProgress() {
    try { localStorage.removeItem(LS_PROGRESS); } catch (e) { /* ignore */ }
  }

  function loadProgress() {
    try {
      const raw = localStorage.getItem(LS_PROGRESS);
      return raw ? JSON.parse(raw) : null;
    } catch (e) { return null; }
  }

  // ----- 保存機能：成績履歴 -----
  function loadHistory() {
    try {
      const raw = localStorage.getItem(LS_HISTORY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) { return []; }
  }

  function saveHistoryEntry(entry) {
    try {
      const hist = loadHistory();
      hist.unshift(entry);
      localStorage.setItem(LS_HISTORY, JSON.stringify(hist.slice(0, 50)));
    } catch (e) { /* ignore */ }
  }

  function renderHistory() {
    const hist = loadHistory();
    if (hist.length === 0) {
      historyList.innerHTML = '<p class="history-empty">まだ記録がありません．</p>';
      return;
    }
    historyList.innerHTML = hist.slice(0, 10).map(h => {
      const d = new Date(h.timestamp);
      const dateStr = `${d.getMonth() + 1}/${d.getDate()} ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
      const pct = h.total ? Math.round((h.correct / h.total) * 100) : 0;
      return `<div class="history-row">
        <span class="history-date">${dateStr}</span>
        <span>${MODE_LABELS[h.mode] || h.mode}</span>
        <span>${groupLabel(h.group)}</span>
        <span class="history-score">${h.correct}/${h.total}（${pct}%）</span>
      </div>`;
    }).join('');
  }

  function renderResumeBanner() {
    const progress = loadProgress();
    if (!progress || !progress.order || progress.order.length === 0 || progress.idx >= progress.order.length) {
      resumeBanner.style.display = 'none';
      return;
    }
    resumeInfo.textContent =
      `問題 ${progress.idx + 1}/${progress.order.length}　${MODE_LABELS[progress.mode] || progress.mode}　${groupLabel(progress.group)}　正解 ${progress.score.correct}/${progress.score.total}`;
    resumeBanner.style.display = 'block';
  }

  function updateProgress() {
    progressText.textContent = `問題 ${idx + 1} / ${queue.length}`;
    scoreText.textContent = `正解 ${score.correct} / ${score.total}`;
  }

  // 空欄マーカー ___BLANK0___ / ___BLANK1___ ... を，未回答なら placeholder(span/input)，
  // 回答済みなら結果表示(span)に置き換えてq-contextへ描画する。
  function renderContext(q, placeholderFor) {
    let html = q.context;
    q.blanks.forEach((b, i) => {
      const marker = `___BLANK${i}___`;
      html = html.split(marker).join(placeholderFor(i, b));
    });
    qContext.innerHTML = html;
  }

  function showQuestion() {
    if (idx >= queue.length) {
      showResult();
      return;
    }
    saveProgress();
    const q = queue[idx];
    qMeta.textContent = `${q.title}　${q.label}`;
    updateProgress();

    if (currentMode === 'type') {
      typeModeArea.style.display = 'block';
      dndModeArea.style.display = 'none';
      resetTypeMode(q);
    } else {
      typeModeArea.style.display = 'none';
      dndModeArea.style.display = 'block';
      renderDndQuestion(q);
    }
  }

  // ----- 入力モード -----
  function resetTypeMode(q) {
    renderContext(q, (i) => `<input type="text" class="inline-input" data-blank-idx="${i}" autocomplete="off">`);
    revealArea.style.display = 'none';
    checkBtn.style.display = 'inline-block';
    const firstInput = qContext.querySelector('.inline-input');
    if (firstInput) firstInput.focus();
  }

  function checkTypeAnswers() {
    const q = queue[idx];
    const inputs = Array.from(qContext.querySelectorAll('.inline-input'));
    checkBtn.style.display = 'none';

    let allLikelyMatch = true;
    const lines = q.blanks.map((b, i) => {
      const inp = inputs[i];
      const userAns = inp ? inp.value.trim() : '';
      if (inp) inp.disabled = true;
      const isMatch = userAns.length > 0 && b.answers.some(a => normalize(a) === normalize(userAns));
      if (!isMatch) allLikelyMatch = false;
      if (inp) inp.classList.add(isMatch ? 'input-maybe-correct' : 'input-maybe-wrong');
      return `<div class="correct-label">正解：<code>${b.display}</code>
        <span class="user-answer-inline">（あなたの答え：${userAns ? escapeHtml(userAns) : '未入力'}）</span></div>`;
    });

    correctAnswerDiv.innerHTML = `
      ${lines.join('')}
      ${allLikelyMatch ? '<div class="auto-hint">自動チェック：入力と一致しているようです</div>' : ''}
      ${q.explanation ? `<div class="explanation"><span class="explanation-label">解説</span>${q.explanation}</div>` : ''}
    `;
    revealArea.style.display = 'block';
  }

  function gradeAnswer(isCorrect) {
    score.total++;
    if (isCorrect) score.correct++;
    idx++;
    showQuestion();
  }

  // ----- ドラッグ＆ドロップモード -----
  function renderDndQuestion(q) {
    dndBlankIdx = 0;
    dndAllCorrect = true;
    dndAnsweredMap = {};
    renderContext(q, (i) => `<span class="blank" data-blank-idx="${i}">＿＿＿＿＿＿</span>`);
    showDndBlank(q);
  }

  function showDndBlank(q) {
    dndAnswered = false;
    draggedValue = null;
    dndDropzone.innerHTML = 'ここに正しい答えをドラッグ＆ドロップ（またはクリックで選択）';
    dndDropzone.className = 'dnd-dropzone';
    dndFeedback.innerHTML = '';
    dndNextBtn.style.display = 'none';
    dndNextBtn.dataset.pending = 'false';
    dndNextBtn.textContent = '次へ';
    dndChoices.innerHTML = '';

    const b = q.blanks[dndBlankIdx];
    const correct = b.display;
    const choices = shuffle([correct, ...(b.distractors || [])]);

    choices.forEach(choiceHtml => {
      const chip = document.createElement('div');
      chip.className = 'dnd-chip';
      chip.draggable = true;
      chip.innerHTML = choiceHtml;
      chip.dataset.value = choiceHtml;

      chip.addEventListener('dragstart', e => {
        if (dndAnswered) { e.preventDefault(); return; }
        draggedValue = choiceHtml;
        e.dataTransfer.setData('text/plain', choiceHtml);
        e.dataTransfer.effectAllowed = 'move';
      });

      chip.addEventListener('click', () => {
        if (dndAnswered) return;
        handleDndAnswer(q, choiceHtml);
      });

      dndChoices.appendChild(chip);
    });
  }

  dndDropzone.addEventListener('dragover', e => {
    if (dndAnswered) return;
    e.preventDefault();
    dndDropzone.classList.add('dragover');
  });
  dndDropzone.addEventListener('dragleave', () => {
    dndDropzone.classList.remove('dragover');
  });
  dndDropzone.addEventListener('drop', e => {
    e.preventDefault();
    dndDropzone.classList.remove('dragover');
    if (dndAnswered) return;
    const value = e.dataTransfer.getData('text/plain') || draggedValue;
    if (value) handleDndAnswer(queue[idx], value);
  });

  function handleDndAnswer(q, value) {
    if (dndAnswered) return;
    dndAnswered = true;
    const b = q.blanks[dndBlankIdx];
    const correct = b.display;
    const isCorrect = value === correct;
    if (!isCorrect) dndAllCorrect = false;

    dndDropzone.innerHTML = value;
    dndDropzone.className = 'dnd-dropzone filled ' + (isCorrect ? 'correct' : 'wrong');

    Array.from(dndChoices.querySelectorAll('.dnd-chip')).forEach(chip => {
      chip.draggable = false;
      chip.classList.add('disabled');
      if (chip.dataset.value === correct) chip.classList.add('reveal-correct');
    });

    dndAnsweredMap[dndBlankIdx] = { value, correct: isCorrect };
    renderContext(q, (i, blank) => {
      if (dndAnsweredMap[i]) {
        const a = dndAnsweredMap[i];
        return `<span class="blank filled ${a.correct ? 'correct' : 'wrong'}">${a.value}</span>`;
      }
      return `<span class="blank" data-blank-idx="${i}">＿＿＿＿＿＿</span>`;
    });

    const isLast = dndBlankIdx === q.blanks.length - 1;
    dndFeedback.innerHTML = `
      <div class="${isCorrect ? 'ok' : 'ng'}">${isCorrect ? '○ 正解！' : `✕ 不正解。正解は「${correct}」`}</div>
      ${isLast && q.explanation ? `<div class="explanation"><span class="explanation-label">解説</span>${q.explanation}</div>` : ''}
    `;

    if (isLast) {
      score.total++;
      if (dndAllCorrect) score.correct++;
      updateProgress();
      saveProgress();
      dndNextBtn.dataset.pending = 'false';
      dndNextBtn.textContent = '次へ';
    } else {
      dndNextBtn.dataset.pending = 'true';
      dndNextBtn.textContent = '次の空欄へ';
    }
    dndNextBtn.style.display = 'inline-block';
  }

  function showResult() {
    quizScreen.style.display = 'none';
    resultScreen.style.display = 'block';
    const pct = score.total ? Math.round((score.correct / score.total) * 100) : 0;
    document.getElementById('result-text').textContent =
      `${score.total}問中 ${score.correct}問正解（正答率 ${pct}%）`;

    clearProgress();
    saveHistoryEntry({
      timestamp: Date.now(),
      mode: currentMode,
      group: currentGroup,
      correct: score.correct,
      total: score.total,
    });
    renderHistory();
  }

  document.getElementById('start-btn').addEventListener('click', () => {
    currentMode = document.querySelector('input[name="mode"]:checked').value;
    const groupChoice = document.querySelector('input[name="group"]:checked').value;
    currentGroup = groupChoice === 'single' ? `r${roundSelect.value}` : groupChoice;
    const pool = groupFilter(currentGroup);
    if (pool.length === 0) {
      setupInfo.textContent = '選択した範囲に問題がありません．';
      return;
    }
    setupInfo.textContent = '';
    queue = shuffle(pool);
    idx = 0;
    score = { correct: 0, total: 0 };
    resumeBanner.style.display = 'none';
    setupScreen.style.display = 'none';
    resultScreen.style.display = 'none';
    quizScreen.style.display = 'block';
    showQuestion();
  });

  checkBtn.addEventListener('click', checkTypeAnswers);
  qContext.addEventListener('keydown', e => {
    if (e.key === 'Enter' && e.target.classList.contains('inline-input') && checkBtn.style.display !== 'none') {
      checkTypeAnswers();
    }
  });

  document.getElementById('mark-correct').addEventListener('click', () => {
    gradeAnswer(true);
  });
  document.getElementById('mark-wrong').addEventListener('click', () => {
    gradeAnswer(false);
  });
  dndNextBtn.addEventListener('click', () => {
    const q = queue[idx];
    if (dndNextBtn.dataset.pending === 'true') {
      dndBlankIdx++;
      showDndBlank(q);
    } else {
      idx++;
      showQuestion();
    }
  });

  document.getElementById('retry-btn').addEventListener('click', () => {
    resultScreen.style.display = 'none';
    setupScreen.style.display = 'block';
    renderResumeBanner();
  });

  document.getElementById('resume-btn').addEventListener('click', () => {
    const progress = loadProgress();
    if (!progress) return;
    const restoredQueue = progress.order.map(findQuestionById).filter(Boolean);
    if (restoredQueue.length !== progress.order.length) {
      alert('保存されたデータの一部が見つかりませんでした．最初からやり直してください．');
      clearProgress();
      renderResumeBanner();
      return;
    }
    queue = restoredQueue;
    currentMode = progress.mode;
    currentGroup = progress.group || 'all';
    idx = progress.idx;
    score = progress.score;
    resumeBanner.style.display = 'none';
    setupScreen.style.display = 'none';
    resultScreen.style.display = 'none';
    quizScreen.style.display = 'block';
    showQuestion();
  });

  document.getElementById('discard-progress-btn').addEventListener('click', () => {
    clearProgress();
    renderResumeBanner();
  });

  document.getElementById('clear-history-btn').addEventListener('click', () => {
    if (confirm('保存されている成績履歴をすべて削除しますか？')) {
      try { localStorage.removeItem(LS_HISTORY); } catch (e) { /* ignore */ }
      renderHistory();
    }
  });

  // 初期表示
  renderResumeBanner();
  renderHistory();
});
