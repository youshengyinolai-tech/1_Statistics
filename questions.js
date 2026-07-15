// 数理統計学基礎1及び演習 小テスト 穴埋め問題データ
// 各 round は「第○回小テスト」に対応（PDF: 1-8.pdf, 9.pdf, 10/11.pdf より作成）
// context 内の ___BLANK___ が空欄表示位置。
//
// answers     : 入力モードの自動判定に使う「プレーンテキストの正解表記ゆれ」一覧（表示には使わない）
// display     : 画面に表示する「数学表記（HTML）」の正解（正解例・DnDモードの正解チップに使用）
// distractors : DnDモードで表示する、正解に似た数学表記の間違い選択肢
// explanation : 解答後に表示する簡単な解説

function FRAC(num, den) {
  return `<span class="frac"><span class="num">${num}</span><span class="den">${den}</span></span>`;
}

// lim, max のように「文字の下」に条件を書く表記（symbolは通常サイズ）
function OP(symbol, sub) {
  return `<span class="opstack"><span class="op-symbol">${symbol}</span><span class="op-sub">${sub}</span></span>`;
}

// Σ, Π, ∪, ∩ のように「大きな記号の上下」に範囲を書く表記（symbolを拡大）
function BIGOP(symbol, sub, sup) {
  const supHtml = sup !== undefined ? `<span class="op-sup">${sup}</span>` : '';
  const subHtml = sub !== undefined ? `<span class="op-sub">${sub}</span>` : '';
  return `<span class="opstack big">${supHtml}<span class="op-symbol">${symbol}</span>${subHtml}</span>`;
}

const QUESTIONS = [
  // ===== 第1回小テスト：標本空間と事象 =====
  {
    round: 1, title: "第1回：標本空間と事象", label: "(あ)",
    context: "Ωをある集合とし，その要素がある実験，または試行を行なった場合の起こり得る結果に対応しているとき，その集合Ωを ___BLANK___ という．",
    answers: ["標本空間"], display: "標本空間",
    distractors: ["事象", "標本点", "全事象"],
    explanation: "実験や試行で起こりうるすべての結果を集めた「土台」となる集合のこと．",
  },
  {
    round: 1, title: "第1回：標本空間と事象", label: "(い)",
    context: "標本空間の要素を ___BLANK___ と呼ぶ．",
    answers: ["標本点", "根元事象"], display: "標本点",
    distractors: ["標本空間", "事象", "全事象"],
    explanation: "標本空間Ωを構成する1つ1つの結果．これ以上分解できない最も基本的な要素．",
  },
  {
    round: 1, title: "第1回：標本空間と事象", label: "(う)",
    context: "標本空間の部分集合を ___BLANK___ という．",
    answers: ["事象"], display: "事象",
    distractors: ["標本点", "標本空間", "完全加法族"],
    explanation: "いくつかの標本点の集まりとして定義される「出来事」のこと．",
  },
  {
    round: 1, title: "第1回：標本空間と事象", label: "(え)",
    context: "起こり得ない事象を ___BLANK___ という（空集合のこと）．",
    answers: ["空事象"], display: "空事象",
    distractors: ["全事象", "余事象", "排反事象"],
    explanation: "要素を1つも含まない事象（∅）．確率は必ず0になる．",
  },
  {
    round: 1, title: "第1回：標本空間と事象", label: "(お)",
    context: "必ず起こる事象を ___BLANK___ という（標本空間そのもののこと）．",
    answers: ["全事象"], display: "全事象",
    distractors: ["空事象", "和事象", "積事象"],
    explanation: "標本空間Ω自身のこと．どんな結果になっても必ず含まれるので確率は1．",
  },
  {
    round: 1, title: "第1回：標本空間と事象", label: "(か)",
    context: "A, B が事象であるとき，A∪B を ___BLANK___ という．",
    answers: ["和事象"], display: "和事象",
    distractors: ["積事象", "差事象", "共通事象"],
    explanation: "「AまたはBが起こる」という事象．集合でいうA∪Bにあたる．",
  },
  {
    round: 1, title: "第1回：標本空間と事象", label: "(き)",
    context: "A∩B を ___BLANK___ という．",
    answers: ["積事象"], display: "積事象",
    distractors: ["和事象", "差事象", "余事象"],
    explanation: "「AとBが同時に起こる」という事象．集合でいうA∩Bにあたる．",
  },
  {
    round: 1, title: "第1回：標本空間と事象", label: "(く)",
    context: "A∩B は積事象，または ___BLANK___ という．",
    answers: ["共通事象"], display: "共通事象",
    distractors: ["和事象", "差事象", "余事象"],
    explanation: "積事象（A∩B）のもう一つの呼び方．AとBに共通する部分という意味．",
  },
  {
    round: 1, title: "第1回：標本空間と事象", label: "(け)",
    context: "A が起こらない事象を A の ___BLANK___ といい A<sup>c</sup> で表わす．",
    answers: ["余事象"], display: "余事象",
    distractors: ["差事象", "空事象", "全事象"],
    explanation: "「Aが起こらない」という事象．Ωの中からAを除いた部分（A<sup>c</sup>）．",
  },
  {
    round: 1, title: "第1回：標本空間と事象", label: "(こ)",
    context: "A－B＝A∩B<sup>c</sup> を事象 A と事象 B の ___BLANK___ という．",
    answers: ["差事象"], display: "差事象",
    distractors: ["余事象", "積事象", "共通事象"],
    explanation: "「Aは起こるがBは起こらない」という事象．A∩B<sup>c</sup>と表せる．",
  },
  {
    round: 1, title: "第1回：標本空間と事象", label: "(さ)",
    context: "事象 A と B の積事象が空事象のとき（A∩B＝φ），A と B とは ___BLANK___ という．",
    answers: ["排反", "排反事象", "互いに排反"], display: "排反（事象）",
    distractors: ["独立", "全事象", "空事象"],
    explanation: "AとBが同時には絶対に起こらない関係．A∩B=φのときにこう呼ぶ．",
  },

  // ===== 第2回小テスト：完全加法族・確率公理 =====
  {
    round: 2, title: "第2回：完全加法族（σ-集合体）の定義", label: "(あ)",
    context: "完全加法族の条件(1)： ___BLANK___",
    answers: ["Ω∈F"], display: "Ω∈F",
    distractors: ["φ∈F", "F∈Ω", "A∈F"],
    explanation: "完全加法族は必ず全体集合Ωを要素として含む，というルール．",
  },
  {
    round: 2, title: "第2回：完全加法族（σ-集合体）の定義", label: "(い)",
    context: "A∈F ならば， ___BLANK___",
    answers: ["A^c∈F"], display: "A<sup>c</sup>∈F",
    distractors: ["A∈F<sup>c</sup>", "A∩F∈F", "A∈F"],
    explanation: "Fに含まれる事象の余事象も，必ずFに含まれる（補集合について閉じている）．",
  },
  {
    round: 2, title: "第2回：完全加法族（σ-集合体）の定義", label: "(う)",
    context: "A<sub>1</sub>, A<sub>2</sub>, ⋯ ∈F ならば， ___BLANK___",
    answers: ["∪Ai∈F"], display: `${BIGOP('∪', 'i=1', '∞')} A<sub>i</sub> ∈F`,
    distractors: [`${BIGOP('∩', 'i=1', '∞')} A<sub>i</sub> ∈F`, `${BIGOP('Σ', 'i=1', '∞')} A<sub>i</sub> ∈F`, "各 A<sub>i</sub> のみ ∈F"],
    explanation: "Fの元を可算個集めて作った和集合も，またFに含まれる（可算和で閉じている）．",
  },
  {
    round: 2, title: "第2回：確率公理", label: "(え)",
    context: "すべての A∈F に対して， ___BLANK___",
    answers: ["P(A)≥0"], display: "P(A)≥0",
    distractors: ["P(A)＞0", "P(A)≤1", "P(A)≥1"],
    explanation: "確率は負の値を取らない，という公理（非負性）．",
  },
  {
    round: 2, title: "第2回：確率公理", label: "(お)",
    context: "確率公理(2)： ___BLANK___",
    answers: ["P(Ω)=1"], display: "P(Ω)＝1",
    distractors: ["P(Ω)＝0", "P(φ)＝1", "P(Ω)≥1"],
    explanation: "全事象（必ず起こる事象）の確率は1，という公理．",
  },
  {
    round: 2, title: "第2回：確率公理", label: "(か)",
    context: "A<sub>1</sub>, A<sub>2</sub>, ⋯ が互いに排反する事象のとき， ___BLANK___",
    answers: ["P(∪Ai)=ΣP(Ai)"],
    display: `P(${BIGOP('∪', 'i=1', '∞')}A<sub>i</sub>) ＝ ${BIGOP('Σ', 'i=1', '∞')}P(A<sub>i</sub>)`,
    distractors: [
      `P(${BIGOP('∩', 'i=1', '∞')}A<sub>i</sub>) ＝ ${BIGOP('Σ', 'i=1', '∞')}P(A<sub>i</sub>)`,
      `P(${BIGOP('∪', 'i=1', '∞')}A<sub>i</sub>) ＝ ${BIGOP('Π', 'i=1', '∞')}P(A<sub>i</sub>)`,
      `P(${BIGOP('∪', 'i=1', '∞')}A<sub>i</sub>) ≤ ${BIGOP('Σ', 'i=1', '∞')}P(A<sub>i</sub>)`,
    ],
    explanation: "互いに排反な事象の和集合の確率は，各事象の確率の単純な和に等しい（可算加法性）．",
  },

  // ===== 第3回小テスト：条件付き確率・全確率・ベイズ =====
  {
    round: 3, title: "第3回：条件付き確率", label: "(あ)",
    context: `P(A|B) ＝ ${FRAC('___BLANK___', 'P(B)')} （条件付き確率の分子部分）`,
    answers: ["P(A∩B)"], display: "P(A∩B)",
    distractors: ["P(A∪B)", "P(A)P(B)", "P(B|A)"],
    explanation: "P(A|B)はBが起きた前提でAが起きる確率．分子はAとBが同時に起こる確率．",
  },
  {
    round: 3, title: "第3回：条件付き確率", label: "(い)",
    context: `P(A|B) ＝ ${FRAC('P(A∩B)', '___BLANK___')} （条件付き確率の分母部分，ただし P(B)＞0）`,
    answers: ["P(B)"], display: "P(B)",
    distractors: ["P(A)", "P(A∩B)", "P(A∪B)"],
    explanation: "条件となる事象Bが起こる確率で割ることで，「Bが起きた世界」の中での割合に変換する．",
  },
  {
    round: 3, title: "第3回：独立性", label: "(う)",
    context: "事象 A, B が ___BLANK___ を満たすとき，A と B は独立であるという．",
    answers: ["P(A∩B)=P(A)P(B)"], display: "P(A∩B) ＝ P(A)P(B)",
    distractors: ["P(A∩B) ＝ P(A)＋P(B)", "P(A|B) ＝ P(A)P(B)", "P(A∩B) ＝ 0"],
    explanation: "一方が起きても他方の起こりやすさが変わらないとき，独立という．",
  },
  {
    round: 3, title: "第3回：全確率の定理", label: "(え)",
    context: "A<sub>1</sub>, A<sub>2</sub>, ⋯ を標本空間Ωの分割とする．P(A<sub>i</sub>)＞0 ならば，事象Bに対して P(B) ＝ ___BLANK___",
    answers: ["ΣP(B|Ai)P(Ai)"],
    display: `${BIGOP('Σ', 'i=1', '∞')}P(B|A<sub>i</sub>)P(A<sub>i</sub>)`,
    distractors: [
      `${BIGOP('Σ', 'i=1', '∞')}P(A<sub>i</sub>|B)P(B)`,
      `${BIGOP('Σ', 'i=1', '∞')}P(B)P(A<sub>i</sub>)`,
      `${BIGOP('Π', 'i=1', '∞')}P(B|A<sub>i</sub>)P(A<sub>i</sub>)`,
    ],
    explanation: "Bが起こる確率を，互いに排反な原因A_iで場合分けして足し合わせたもの．",
  },
  {
    round: 3, title: "第3回：ベイズの定理", label: "(お)(か)",
    context: `P(A<sub>i</sub>|B) ＝ ${FRAC('___BLANK0___', '___BLANK1___')} （ベイズの定理）`,
    blanks: [
      {
        answers: ["P(B|Ai)P(Ai)"], display: "P(B|A<sub>i</sub>)P(A<sub>i</sub>)",
        distractors: ["P(A<sub>i</sub>|B)P(B)", "P(B)P(A<sub>i</sub>)", FRAC("P(A<sub>i</sub>)", "P(B)")],
      },
      {
        answers: ["ΣjP(B|Aj)P(Aj)"],
        display: `${BIGOP('Σ', 'j=1', '∞')}P(B|A<sub>j</sub>)P(A<sub>j</sub>)`,
        distractors: [
          "P(B)",
          `${BIGOP('Π', 'j=1', '∞')}P(B|A<sub>j</sub>)P(A<sub>j</sub>)`,
          `${BIGOP('Σ', 'j=1', '∞')}P(A<sub>j</sub>|B)P(B)`,
        ],
      },
    ],
    explanation: "分子は「原因A_iのもとでBが起こる確率」×「A_iの事前確率」．分母は全確率の定理そのもので，すべての原因についてP(B|A_j)P(A_j)を足し合わせる．",
  },

  // ===== 第4回小テスト：確率変数・分布関数 =====
  {
    round: 4, title: "第4回：確率変数", label: "(あ)",
    context: "標本空間Ωと確率Pが与えられているとき，その標本空間の点ωに実数を対応させる関数 X(ω) を ___BLANK___ という．",
    answers: ["確率変数"], display: "確率変数",
    distractors: ["確率密度関数", "分布関数", "標本点"],
    explanation: "標本空間の各結果ωに実数を対応させる関数．結果が確率的に決まるので「確率」変数と呼ぶ．",
  },
  {
    round: 4, title: "第4回：分布関数", label: "(い)",
    context: "F<sub>X</sub>(x) ＝ P(X≤x) ＝ P({ω； ___BLANK___ })",
    answers: ["X(ω)≤x"], display: "X(ω)≤x",
    distractors: ["X(ω)＝x", "X(ω)＜x", "X(ω)≥x"],
    explanation: "F_X(x)は「Xがx以下になる」という事象の確率．その事象を満たすωの条件がX(ω)≤x．",
  },
  {
    round: 4, title: "第4回：分布関数の性質", label: "(う)(え)",
    context: "すべての x∈R に対して， ___BLANK0___ ≤ F<sub>X</sub>(x) ≤ ___BLANK1___",
    blanks: [
      { answers: ["0"], display: "0", distractors: ["－1", "－∞", "1"] },
      { answers: ["1"], display: "1", distractors: ["0", "∞", "－1"] },
    ],
    explanation: "F_X(x)は確率なので，必ず0以上1以下の範囲に収まる．",
  },
  {
    round: 4, title: "第4回：分布関数の性質", label: "(お)",
    context: "分布関数 F<sub>X</sub> は ___BLANK___ である．",
    answers: ["単調非減少", "単調増加"], display: "単調非減少",
    distractors: ["単調減少", "連続", "単調非増加"],
    explanation: "xが大きくなるほどF_X(x)は減ることがない（増えるか同じ値を保つ）性質．",
  },
  {
    round: 4, title: "第4回：分布関数の性質", label: "(か)",
    context: "x<sub>1</sub>＜x<sub>2</sub> ⇒ ___BLANK___",
    answers: ["F_X(x1)≤F_X(x2)"],
    display: "F<sub>X</sub>(x<sub>1</sub>) ≤ F<sub>X</sub>(x<sub>2</sub>)",
    distractors: [
      "F<sub>X</sub>(x<sub>1</sub>) ≥ F<sub>X</sub>(x<sub>2</sub>)",
      "F<sub>X</sub>(x<sub>1</sub>) ＝ F<sub>X</sub>(x<sub>2</sub>)",
      "F<sub>X</sub>(x<sub>1</sub>) ＜ F<sub>X</sub>(x<sub>2</sub>)",
    ],
    explanation: "単調非減少の定義そのもの．xが増えればF_Xの値は減らない．",
  },
  {
    round: 4, title: "第4回：分布関数の性質", label: "(き)",
    context: "F<sub>X</sub>(－∞) ＝ ___BLANK___",
    answers: ["0"], display: "0",
    distractors: ["1", "－1", "∞"],
    explanation: "xがどこまでも小さければ，Xがx以下になることはあり得ないので確率は0に近づく．",
  },
  {
    round: 4, title: "第4回：分布関数の性質", label: "(く)",
    context: "F<sub>X</sub>(∞) ＝ ___BLANK___",
    answers: ["1"], display: "1",
    distractors: ["0", "∞", "－1"],
    explanation: "xがどこまでも大きければ，Xがx以下になるのは当然（必ず起こる）ので確率は1．",
  },
  {
    round: 4, title: "第4回：分布関数の性質", label: "(け)",
    context: "分布関数は ___BLANK___ 連続である．",
    answers: ["右", "右側"], display: "右",
    distractors: ["左", "両側", "一様"],
    explanation: "xを右側（大きい方）から近づけたときの極限が，そのままF_X(x)の値に一致する性質．",
  },
  {
    round: 4, title: "第4回：分布関数の性質", label: "(こ)",
    context: "右連続であるとは：F<sub>X</sub>(x) ＝ ___BLANK___",
    answers: ["F_X(x+0)", "lim[h→0+]F_X(x+h)"],
    display: `${OP('lim', 'h→0⁺')} F<sub>X</sub>(x＋h)`,
    distractors: [
      "F<sub>X</sub>(x－0)",
      "F<sub>X</sub>(x)",
      `${OP('lim', 'h→0⁻')} F<sub>X</sub>(x＋h)`,
    ],
    explanation: "hを正の側から0に近づけた極限がF_X(x)自身に一致する，という右連続の定義．",
  },

  // ===== 第5回小テスト：離散型・連続型確率変数 =====
  {
    round: 5, title: "第5回：離散型確率変数", label: "(あ)",
    context: "離散型確率変数の分布は，その確率関数 f<sub>X</sub>(x) ＝ ___BLANK___ ，x∈R によって与えられる．",
    answers: ["P(X=x)"], display: "P(X＝x)",
    distractors: ["P(X≤x)", "P(X＜x)", "F<sub>X</sub>(x)"],
    explanation: "離散型では，Xがちょうど値xをとる確率そのものが確率関数f_X(x)．",
  },
  {
    round: 5, title: "第5回：離散型確率変数の性質", label: "(い)",
    context: "すべての x∈R について，f<sub>X</sub>(x) ≥ ___BLANK___",
    answers: ["0"], display: "0",
    distractors: ["－1", "1", "－∞"],
    explanation: "確率関数の値は確率なので，必ず0以上である．",
  },
  {
    round: 5, title: "第5回：離散型確率変数の性質", label: "(う)",
    context: "___BLANK___ ＝ 1 （すべての取りうる x についての和）",
    answers: ["Σf_X(x)"], display: `${BIGOP('Σ', 'x')} f<sub>X</sub>(x)`,
    distractors: ["∫f<sub>X</sub>(x)dx", `${BIGOP('Π', 'x')} f<sub>X</sub>(x)`, `${OP('max', 'x')} f<sub>X</sub>(x)`],
    explanation: "取りうるすべての値についての確率を足し合わせると，全体の確率である1になる．",
  },
  {
    round: 5, title: "第5回：連続型確率変数", label: "(え)",
    context: "P(X≤x) ＝ F<sub>X</sub>(x) ＝ ___BLANK___ なる非負関数 f<sub>X</sub>(x) が存在するとき，X を連続型確率変数という．",
    answers: ["∫[-∞,x]f_X(t)dt"],
    display: "∫<sub>-∞</sub><sup>x</sup> f<sub>X</sub>(t) dt",
    distractors: [
      "∫<sub>x</sub><sup>∞</sup> f<sub>X</sub>(t) dt",
      "f<sub>X</sub>(x)",
      `${BIGOP('Σ', 't≤x')} f<sub>X</sub>(t)`,
    ],
    explanation: "連続型では，密度関数f_Xを-∞からxまで積分することで分布関数F_X(x)が得られる．",
  },
  {
    round: 5, title: "第5回：連続型確率変数の性質", label: "(お)",
    context: "すべての x∈R について，f<sub>X</sub>(x) ≥ ___BLANK___",
    answers: ["0"], display: "0",
    distractors: ["－1", "1", "－∞"],
    explanation: "確率密度は必ず0以上（負の密度は存在しない）．",
  },
  {
    round: 5, title: "第5回：連続型確率変数の性質", label: "(か)",
    context: "___BLANK___ ＝ 1 （全区間での積分）",
    answers: ["∫[-∞,∞]f_X(x)dx"],
    display: "∫<sub>-∞</sub><sup>∞</sup> f<sub>X</sub>(x) dx",
    distractors: [
      `${BIGOP('Σ', 'x')} f<sub>X</sub>(x)`,
      `${OP('max', 'x')} f<sub>X</sub>(x)`,
      "∫<sub>0</sub><sup>1</sup> f<sub>X</sub>(x) dx",
    ],
    explanation: "密度関数を全区間で積分すると，全確率である1になる．",
  },
  {
    round: 5, title: "第5回：連続型確率変数の性質", label: "(き)",
    context: "確率密度関数が連続な点xで，分布関数が微分可能であるとき ___BLANK___ ＝ f<sub>X</sub>(x)",
    answers: ["F_X'(x)"], display: "F<sub>X</sub>′(x)",
    distractors: ["F<sub>X</sub>(x)", "∫f<sub>X</sub>(x)dx", "F<sub>X</sub>″(x)"],
    explanation: "密度関数は分布関数を微分したもの（逆に，分布関数は密度関数の積分）．",
  },

  // ===== 第6回小テスト：多次元確率分布 =====
  {
    round: 6, title: "第6回：結合分布関数", label: "(あ)",
    context: "確率変数X, Yの結合分布関数：F<sub>X,Y</sub>(x,y) ＝ ___BLANK___",
    answers: ["P(X≤x,Y≤y)"], display: "P(X≤x, Y≤y)",
    distractors: ["P(X≤x)P(Y≤y)", "P(X≤x または Y≤y)", "P(X＝x, Y＝y)"],
    explanation: "XがxかつYがy以下になる確率を，x,yの関数として表したもの．",
  },
  {
    round: 6, title: "第6回：結合分布関数の性質", label: "(い)(う)",
    context: "すべての (x,y)∈R² に対して，___BLANK0___ ≤ F<sub>X,Y</sub>(x,y) ≤ ___BLANK1___",
    blanks: [
      { answers: ["0"], display: "0", distractors: ["－1", "1", "－∞"] },
      { answers: ["1"], display: "1", distractors: ["0", "∞", "2"] },
    ],
    explanation: "結合分布関数も確率なので，0以上1以下の値をとる．",
  },
  {
    round: 6, title: "第6回：結合分布関数の性質", label: "(え)",
    context: "両変数に対して F<sub>X,Y</sub>(x,y) は ___BLANK___ 関数である．",
    answers: ["単調非減少", "単調増加"], display: "単調非減少",
    distractors: ["単調減少", "連続", "対称"],
    explanation: "xやyを大きくしても，結合分布関数の値は減らない．",
  },
  {
    round: 6, title: "第6回：結合分布関数の性質", label: "(お)",
    context: "F<sub>X,Y</sub>(－∞, y) ＝ ___BLANK___",
    answers: ["0"], display: "0",
    distractors: ["1", "F<sub>Y</sub>(y)", "－1"],
    explanation: "Xが-∞以下になることはあり得ないので，この事象の確率は0．",
  },
  {
    round: 6, title: "第6回：結合分布関数の性質", label: "(か)",
    context: "F<sub>X,Y</sub>(x, －∞) ＝ ___BLANK___",
    answers: ["0"], display: "0",
    distractors: ["1", "F<sub>X</sub>(x)", "－1"],
    explanation: "Yが-∞以下になることはあり得ないので，この事象の確率は0．",
  },
  {
    round: 6, title: "第6回：結合分布関数の性質", label: "(き)",
    context: "F<sub>X,Y</sub>(∞, ∞) ＝ ___BLANK___",
    answers: ["1"], display: "1",
    distractors: ["0", "∞", "F<sub>X</sub>(∞)＋F<sub>Y</sub>(∞)"],
    explanation: "両方とも∞まで許せば，必ず起こる事象になるので確率は1．",
  },
  {
    round: 6, title: "第6回：結合分布関数の性質", label: "(く)",
    context: "それぞれの変数で F<sub>X,Y</sub>(x,y) は ___BLANK___ 連続．",
    answers: ["右", "右側"], display: "右",
    distractors: ["左", "両側", "一様"],
    explanation: "1変数のときと同様，それぞれの変数について右から近づけた極限が値と一致する．",
  },
  {
    round: 6, title: "第6回：離散型・結合確率関数", label: "(け)",
    context: "すべての(x,y)について，f<sub>X,Y</sub>(x,y) ＝ ___BLANK___",
    answers: ["P(X=x,Y=y)"], display: "P(X＝x, Y＝y)",
    distractors: ["P(X＝x)P(Y＝y)", "P(X≤x, Y≤y)", "P(X＝x)＋P(Y＝y)"],
    explanation: "離散型で，XとYが同時にちょうどx,yという値をとる確率．",
  },
  {
    round: 6, title: "第6回：連続型・結合確率密度関数", label: "(こ)",
    context: "すべてのx,yで，F<sub>X,Y</sub>(x,y) ＝ ___BLANK___ となる非負関数 f<sub>X,Y</sub>(x,y) が存在するとき，これを結合確率密度関数という．",
    answers: ["∫∫f_{X,Y}(s,t)dsdt", "二重積分"],
    display: "∫<sub>-∞</sub><sup>y</sup>∫<sub>-∞</sub><sup>x</sup> f<sub>X,Y</sub>(s,t) ds dt",
    distractors: [
      FRAC("∂²F<sub>X,Y</sub>(x,y)", "∂x∂y"),
      "f<sub>X</sub>(x)f<sub>Y</sub>(y)",
      `${BIGOP('Σ', 'x,y')} f<sub>X,Y</sub>(x,y)`,
    ],
    explanation: "結合密度関数は，結合分布関数をs,tについて2重に積分することで得られる非負関数．",
  },
  {
    round: 6, title: "第6回：Xの周辺分布関数", label: "(さ)",
    context: "Xの周辺分布関数は，F<sub>X</sub>(x) ＝ P(X≤x) ＝ ___BLANK___",
    answers: ["F_{X,Y}(x,∞)", "lim[y→∞]F_XY(x,y)"],
    display: "F<sub>X,Y</sub>(x, ∞)",
    distractors: ["F<sub>X,Y</sub>(∞, x)", "F<sub>X,Y</sub>(x, －∞)", "F<sub>X</sub>(x)F<sub>Y</sub>(∞)"],
    explanation: "Yの範囲を制限せず∞まで許すことで，Yを無視したXだけの分布関数が得られる．",
  },
  {
    round: 6, title: "第6回：Xの周辺確率関数（離散型）", label: "(し)(す)",
    context: "離散型：Xの周辺確率関数は，f<sub>X</sub>(x) ＝ P( ___BLANK0___ ) ＝ ___BLANK1___",
    blanks: [
      {
        answers: ["X=x"], display: "X＝x",
        distractors: ["X≤x", "X＝x, Y＝y", "X＝x または Y＝y"],
      },
      {
        answers: ["Σf_{X,Y}(x,y)"], display: `${BIGOP('Σ', 'y')} f<sub>X,Y</sub>(x,y)`,
        distractors: ["∫f<sub>X,Y</sub>(x,y)dy", "f<sub>X,Y</sub>(x,y)", `${BIGOP('Σ', 'x,y')} f<sub>X,Y</sub>(x,y)`],
      },
    ],
    explanation: "Yの値によらずXがxとなる事象を考え，Yについてすべての場合の結合確率を足し合わせる．",
  },
  {
    round: 6, title: "第6回：Xの周辺確率密度関数（連続型）", label: "(せ)",
    context: "連続型：Xの周辺確率密度関数は，f<sub>X</sub>(x) ＝ ___BLANK___",
    answers: ["∫f_{X,Y}(x,y)dy"], display: "∫<sub>-∞</sub><sup>∞</sup> f<sub>X,Y</sub>(x,y) dy",
    distractors: [
      `${BIGOP('Σ', 'y')} f<sub>X,Y</sub>(x,y)`,
      "∫<sub>-∞</sub><sup>∞</sup> f<sub>X,Y</sub>(x,y) dx",
      "f<sub>X,Y</sub>(x,y)",
    ],
    explanation: "結合密度関数をyについて全区間で積分すると，Xだけの周辺密度関数になる．",
  },

  // ===== 第7回小テスト：条件付き確率分布 =====
  {
    round: 7, title: "第7回：条件付き確率分布（離散型）", label: "(あ)",
    context: "離散型：Y＝y のもとでのXの条件付き確率関数は f<sub>X|Y</sub>(x|y) ＝ ___BLANK___ （ただし f<sub>Y</sub>(y)＞0）",
    answers: ["f_{X,Y}(x,y)/f_Y(y)"], display: FRAC("f<sub>X,Y</sub>(x,y)", "f<sub>Y</sub>(y)"),
    distractors: [
      FRAC("f<sub>X,Y</sub>(x,y)", "f<sub>X</sub>(x)"),
      FRAC("f<sub>X</sub>(x)", "f<sub>Y</sub>(y)"),
      "f<sub>X,Y</sub>(x,y)",
    ],
    explanation: "条件付き確率P(A|B)=P(A∩B)/P(B)と同じ考え方を，確率関数に当てはめたもの．",
  },
  {
    round: 7, title: "第7回：条件付き確率分布（連続型）", label: "(い)",
    context: "連続型：Y＝y のもとでのXの条件付き確率密度関数は f<sub>X|Y</sub>(x|y) ＝ ___BLANK___ （ただし f<sub>Y</sub>(y)＞0）",
    answers: ["f_{X,Y}(x,y)/f_Y(y)"], display: FRAC("f<sub>X,Y</sub>(x,y)", "f<sub>Y</sub>(y)"),
    distractors: [
      FRAC("f<sub>X,Y</sub>(x,y)", "f<sub>X</sub>(x)"),
      FRAC("f<sub>Y</sub>(y)", "f<sub>X,Y</sub>(x,y)"),
      "f<sub>X,Y</sub>(x,y)",
    ],
    explanation: "離散型と同じ形の定義を，密度関数に置き換えて連続型でも使う．",
  },
  {
    round: 7, title: "第7回：独立性", label: "(う)",
    context: "すべての x,y で，F<sub>X,Y</sub>(x,y) ＝ ___BLANK___ ならば，XとYは独立である．",
    answers: ["F_X(x)F_Y(y)"], display: "F<sub>X</sub>(x)F<sub>Y</sub>(y)",
    distractors: ["F<sub>X</sub>(x)＋F<sub>Y</sub>(y)", "F<sub>X,Y</sub>(x,y)", "F<sub>X</sub>(x)F<sub>Y</sub>(x)"],
    explanation: "結合分布関数が周辺分布関数の積に分解できれば，XとYは独立である．",
  },
  {
    round: 7, title: "第7回：独立性", label: "(え)",
    context: "または，すべての x,y で，f<sub>X,Y</sub>(x,y) ＝ ___BLANK___ ならば，XとYは独立である．",
    answers: ["f_X(x)f_Y(y)"], display: "f<sub>X</sub>(x)f<sub>Y</sub>(y)",
    distractors: ["f<sub>X</sub>(x)＋f<sub>Y</sub>(y)", "f<sub>X,Y</sub>(x,y)", "f<sub>X</sub>(y)f<sub>Y</sub>(x)"],
    explanation: "密度関数（確率関数）でも同様に，積に分解できれば独立という判定ができる．",
  },

  // ===== 第8回小テスト：確率変数変換・たたみこみ =====
  {
    round: 8, title: "第8回：確率変数変換", label: "(あ)(い)",
    context: "関数hが区間(a,b)において ___BLANK0___ で ___BLANK1___ ならば，Y＝h(X)の確率密度関数が定義できる．",
    blanks: [
      { answers: ["単調"], display: "単調", distractors: ["連続", "有界", "対称"] },
      { answers: ["微分可能"], display: "微分可能", distractors: ["連続", "単調", "有界"] },
    ],
    explanation: "hが単調（増加か減少のどちらか一方）で微分可能であれば，逆関数h⁻¹を使ってY=h(X)の密度関数を計算できる．",
  },
  {
    round: 8, title: "第8回：確率変数変換", label: "(う)",
    context: "α＜y＜β のとき，f<sub>Y</sub>(y) ＝ ___BLANK___",
    answers: ["f_X(h⁻¹(y))|d/dy h⁻¹(y)|"],
    display: `f<sub>X</sub>(h<sup>-1</sup>(y))・|${FRAC('d h<sup>-1</sup>(y)', 'dy')}|`,
    distractors: [
      "f<sub>X</sub>(h<sup>-1</sup>(y))",
      `f<sub>X</sub>(h(y))・|${FRAC('d h(y)', 'dy')}|`,
      "f<sub>X</sub>(h<sup>-1</sup>(y))・h′(y)",
    ],
    explanation: "Xの密度関数に，逆関数の微分（ヤコビアン）の絶対値を掛けるとYの密度になる．",
  },
  {
    round: 8, title: "第8回：たたみこみ", label: "(え)(お)",
    context: "X, Yが独立な連続型確率変数のとき，S＝X＋Yの密度関数は f<sub>S</sub>(s) ＝ ∫<sub>-∞</sub><sup>∞</sup> ___BLANK0___ dx．こうして得られた関数f<sub>S</sub>をf<sub>X</sub>とf<sub>Y</sub>の ___BLANK1___ という．",
    blanks: [
      {
        answers: ["f_X(x)f_Y(s-x)"], display: "f<sub>X</sub>(x)f<sub>Y</sub>(s－x)",
        distractors: ["f<sub>X</sub>(s－x)f<sub>Y</sub>(x)", "f<sub>X</sub>(x)＋f<sub>Y</sub>(s－x)", "f<sub>X</sub>(x)f<sub>Y</sub>(x＋s)"],
      },
      {
        answers: ["たたみこみ", "畳み込み"], display: "たたみこみ",
        distractors: ["積率母関数", "周辺分布", "合成関数"],
      },
    ],
    explanation: "独立な2変数の和の密度は，f_Xとf_Yを「たたみこんだ」積分（f_X＊f_Y）で求まる．この演算自体をたたみこみと呼ぶ．",
  },

  // ===== 第10回小テスト：積率・積率母関数 =====
  {
    round: 10, title: "第10回：積率", label: "(あ)",
    context: "kがある正の整数のとき， ___BLANK___ を確率変数Xのk次積率という．",
    answers: ["E(X^k)"], display: "E(X<sup>k</sup>)",
    distractors: ["E(X)<sup>k</sup>", "Var(X<sup>k</sup>)", "E(kX)"],
    explanation: "Xのk乗の期待値．k=1なら平均，k=2なら2乗平均に対応する．",
  },
  {
    round: 10, title: "第10回：中心積率", label: "(い)",
    context: "___BLANK___ をk次の中心積率という．",
    answers: ["E[(X-E(X))^k]"], display: "E[(X－E(X))<sup>k</sup>]",
    distractors: ["E(X<sup>k</sup>)－E(X)<sup>k</sup>", "E(X－E(X))<sup>k</sup>", "(E(X)－X)<sup>k</sup>"],
    explanation: "Xから平均を引いてからk乗した期待値．平均のまわりのばらつき方を表す．",
  },
  {
    round: 10, title: "第10回：積率母関数（離散型）", label: "(う)",
    context: "積率母関数：m<sub>X</sub>(t) ＝ E(e<sup>tX</sup>) ＝ ___BLANK___ （離散型の場合）",
    answers: ["Σe^(tx)f_X(x)"], display: `${BIGOP('Σ', 'x')} e<sup>tx</sup>f<sub>X</sub>(x)`,
    distractors: [
      `${BIGOP('Σ', 'x')} x f<sub>X</sub>(x)`,
      `${BIGOP('Σ', 'x')} t<sup>x</sup>f<sub>X</sub>(x)`,
      `${BIGOP('Σ', 'x')} e<sup>x</sup>f<sub>X</sub>(x)`,
    ],
    explanation: "e^{tX}の期待値を，離散型なので確率関数の重み付き和として計算する．",
  },
  {
    round: 10, title: "第10回：積率母関数（連続型）", label: "(え)",
    context: "積率母関数：m<sub>X</sub>(t) ＝ E(e<sup>tX</sup>) ＝ ___BLANK___ （連続型の場合）",
    answers: ["∫e^(tx)f_X(x)dx"], display: "∫<sub>-∞</sub><sup>∞</sup> e<sup>tx</sup>f<sub>X</sub>(x) dx",
    distractors: [
      "∫<sub>-∞</sub><sup>∞</sup> e<sup>x</sup>f<sub>X</sub>(x) dx",
      "∫<sub>-∞</sub><sup>∞</sup> t f<sub>X</sub>(x) dx",
      "∫<sub>-∞</sub><sup>∞</sup> f<sub>X</sub>(x) dx",
    ],
    explanation: "e^{tX}の期待値を，連続型なので密度関数で重みづけた積分として計算する．",
  },
  {
    round: 10, title: "第10回：積率母関数の性質", label: "(お)",
    context: "どんな確率変数Xでも t＝0 のときは積率母関数は存在し，m<sub>X</sub>(0) ＝ ___BLANK___",
    answers: ["1"], display: "1",
    distractors: ["0", "E(X)", "∞"],
    explanation: "t=0を代入するとe^{0X}=1になるので，E(1)=1が常に成り立つ．",
  },
  {
    round: 10, title: "第10回：積率母関数の性質", label: "(か)(き)",
    context: "積率母関数m<sub>X</sub>(t)がt＝0のまわりで存在する場合，E(X<sup>k</sup>) ＝ ___BLANK0___ ．特に，E(X) ＝ ___BLANK1___",
    blanks: [
      {
        answers: ["m_X^(k)(0)"], display: "m<sub>X</sub><sup>(k)</sup>(0)",
        distractors: ["m<sub>X</sub>(k)", "m<sub>X</sub>′(0)<sup>k</sup>", "m<sub>X</sub>(0)<sup>k</sup>"],
      },
      {
        answers: ["m_X'(0)"], display: "m<sub>X</sub>′(0)",
        distractors: ["m<sub>X</sub>(0)", "m<sub>X</sub>″(0)", "m<sub>X</sub>(1)"],
      },
    ],
    explanation: "積率母関数をk回微分してt=0を代入するとk次積率E(X^k)が得られる．特にk=1とすれば，1回微分してt=0を代入した値が平均E(X)になる．",
  },
  {
    round: 10, title: "第10回：積率母関数の性質", label: "(く)",
    context: "Var(X) ＝ ___BLANK___",
    answers: ["m_X''(0)-(m_X'(0))^2"], display: "m<sub>X</sub>″(0)－(m<sub>X</sub>′(0))<sup>2</sup>",
    distractors: [
      "m<sub>X</sub>″(0)",
      "m<sub>X</sub>′(0)<sup>2</sup>－m<sub>X</sub>″(0)",
      "m<sub>X</sub>″(0)＋(m<sub>X</sub>′(0))<sup>2</sup>",
    ],
    explanation: "Var(X)=E(X²)－{E(X)}²と同じ考え方．2次微分から1次微分の2乗を引く．",
  },

  // ===== 第11回小テスト：マルコフの不等式・共分散・相関係数 =====
  {
    round: 11, title: "第11回：マルコフの不等式", label: "(あ)",
    context: "確率変数Xが P(X≥0)＝1 ならば，実数a＞0に対して P(X≥a) ≤ ___BLANK___",
    answers: ["E(X)/a"], display: FRAC("E(X)", "a"),
    distractors: [FRAC("E(X)", "a<sup>2</sup>"), FRAC("Var(X)", "a"), "aE(X)"],
    explanation: "非負の確率変数がaを超える確率は，平均をaで割った値以下に抑えられる，という不等式．",
  },
  {
    round: 11, title: "第11回：共分散", label: "(い)",
    context: "確率変数XとYの共分散：Cov(X,Y) ＝ ___BLANK___",
    answers: ["E[(X-E(X))(Y-E(Y))]"], display: "E[(X－E(X))(Y－E(Y))]",
    distractors: ["E(XY)－E(X)E(Y)", "E(X)E(Y)", "E(XY)"],
    explanation: "XとYがそれぞれ平均からどれだけずれるか，その積の期待値．同じ方向に動けば正になる．",
  },
  {
    round: 11, title: "第11回：相関係数", label: "(う)",
    context: "確率変数XとYの相関係数：ρ(X,Y) ＝ ___BLANK___",
    answers: ["Cov(X,Y)/(σXσY)"], display: FRAC("Cov(X,Y)", "σ<sub>X</sub>σ<sub>Y</sub>"),
    distractors: [
      FRAC("Cov(X,Y)", "(σ<sub>X</sub>σ<sub>Y</sub>)<sup>2</sup>"),
      "Cov(X,Y)・σ<sub>X</sub>σ<sub>Y</sub>",
      FRAC("Cov(X,Y)", "σ<sub>X</sub><sup>2</sup>σ<sub>Y</sub><sup>2</sup>"),
    ],
    explanation: "共分散を標準偏差の積で正規化したもの．単位に依存せず，必ず-1〜1に収まる．",
  },
];
