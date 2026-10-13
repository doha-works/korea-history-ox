const ERAS = [
  { key: "prehistoric", name: "선사 시대" },
  { key: "gojoseon", name: "고조선과 여러 나라" },
  { key: "three-kingdoms", name: "삼국 시대" },
  { key: "north-south", name: "남북국 시대" },
  { key: "goryeo", name: "고려" },
  { key: "joseon-early", name: "조선 전기" },
  { key: "joseon-late", name: "조선 후기" },
  { key: "opening", name: "근대 (개항기)" },
  { key: "colonial", name: "일제 강점기" },
  { key: "contemporary", name: "현대" }
];

// 분야 = 헷갈림 유형
const CONFUSION_TYPES = [
  { key: "person", name: "인물" },
  { key: "achievement", name: "업적" },
  { key: "order", name: "순서" },
  { key: "institution", name: "제도·문화재" }
];

const LEVELS = [
  { key: "all", name: "전체" },
  { key: "basic", name: "기본" },
  { key: "advanced", name: "심화" }
];

// 0: 미획득, 1~3: 카드 등급
const GRADES = [
  { key: "locked", name: "미획득" },
  { key: "common", name: "일반" },
  { key: "rare", name: "레어" },
  { key: "legend", name: "전설" }
];

const QUIZ_SIZE = 10;
const GOAL_RATE = 0.8;
const WRONG_NOTE_CLEAR_STREAK = 2;
const STORAGE_KEY = "korean-history-ox";

const QUESTION_BY_ID = new Map(QUESTIONS.map((q) => [q.id, q]));

const app = document.getElementById("app");

// 진행 중이거나 방금 끝난 퀴즈. { title, pool, questions, index, answers, gradesBefore, earned }
let session = null;
// 결과 화면 등에서 문제 묶음을 넘겨 퀴즈를 시작할 때 사용
let pending = null;

// 화면별 필터 상태 (새로고침하면 초기화)
const custom = { level: "all", eras: new Set(), types: new Set() };
let wrongEraFilter = "all";
let cardEraFilter = "all";

// ---------- 저장소 ----------

const emptyStore = () => ({ attempts: [], wrongNotes: {}, level: "all" });

function loadStore() {
  try {
    return { ...emptyStore(), ...JSON.parse(localStorage.getItem(STORAGE_KEY)) };
  } catch {
    return emptyStore();
  }
}

let store = loadStore();

function saveStore() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  } catch {
    // 저장 공간이 없으면 이번 세션 동안만 메모리에 유지
  }
}

function recordAnswer(qid, correct) {
  store.attempts.push({ qid, correct, at: Date.now() });

  const note = store.wrongNotes[qid];
  if (!correct) {
    store.wrongNotes[qid] = { addedAt: note?.addedAt ?? Date.now(), streak: 0 };
  } else if (note) {
    note.streak++;
    if (note.streak >= WRONG_NOTE_CLEAR_STREAK) delete store.wrongNotes[qid];
  }
  saveStore();
}

// ---------- 집계 ----------

function accuracy(filter) {
  let total = 0;
  let correct = 0;
  const solved = new Set();
  for (const a of store.attempts) {
    const q = QUESTION_BY_ID.get(a.qid);
    if (!q || !filter(q)) continue;
    total++;
    if (a.correct) correct++;
    solved.add(q.id);
  }
  return { total, correct, solved: solved.size, rate: total ? correct / total : null };
}

function correctCounts() {
  const counts = new Map();
  for (const a of store.attempts) {
    if (a.correct) counts.set(a.qid, (counts.get(a.qid) || 0) + 1);
  }
  return counts;
}

// 연결된 문제를 각각 맞힌 횟수 중 최솟값이 곧 등급 (최대 3)
const cardGrade = (card, counts) =>
  Math.min(GRADES.length - 1, ...card.questionIds.map((id) => counts.get(id) || 0));

function cardGrades() {
  const counts = correctCounts();
  return new Map(CARDS.map((c) => [c.id, cardGrade(c, counts)]));
}

// ---------- 유틸 ----------

function esc(value) {
  return String(value).replace(/[&<>"']/g, (c) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  }[c]));
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const nameOf = (list, key) => list.find((item) => item.key === key)?.name ?? key;
const eraName = (key) => nameOf(ERAS, key);
const typeName = (key) => nameOf(CONFUSION_TYPES, key);
const levelName = (key) => nameOf(LEVELS, key);
const oxLabel = (answer) => (answer ? "O" : "X");
const pct = (rate) => (rate === null ? "–" : `${Math.round(rate * 100)}%`);
const cardNo = (card) => `No.${String(card.no).padStart(3, "0")}`;
const matchLevel = (level) => (q) => level === "all" || q.level === level;
const validLevel = (key) => (LEVELS.some((l) => l.key === key) ? key : "all");

function explanationHtml(q) {
  const compare = q.compare
    ? `<div class="compare">
        <p class="compare-title">${esc(q.compare.title)}</p>
        <table>${q.compare.rows.map(([k, v]) => `<tr><th>${esc(k)}</th><td>${esc(v)}</td></tr>`).join("")}</table>
      </div>`
    : "";
  return `<p class="explanation">${esc(q.explanation)}</p>${compare}`;
}

function segmentedHtml(id, options, selected) {
  return `<div class="segmented" id="${id}">${options.map((o) =>
    `<button type="button" data-key="${o.key}" class="${o.key === selected ? "active" : ""}">${esc(o.name)}</button>`
  ).join("")}</div>`;
}

function chipsHtml(id, options, isActive) {
  return `<div class="chip-row" id="${id}">${options.map((o) =>
    `<button type="button" class="chip ${isActive(o.key) ? "active" : ""}" data-key="${o.key}">${esc(o.name)}</button>`
  ).join("")}</div>`;
}

function onKeyClick(containerId, handler) {
  document.getElementById(containerId).querySelectorAll("[data-key]").forEach((el) => {
    el.onclick = () => handler(el.dataset.key);
  });
}

function cardFaceHtml(card, grade, badge = "") {
  if (!grade) {
    return `
      <div class="pcard locked">
        <span class="pcard-no">${cardNo(card)}</span>
        <span class="pcard-emoji">❔</span>
        <span class="pcard-name">???</span>
        <span class="pcard-meta">${esc(eraName(card.era))}</span>
      </div>`;
  }
  return `
    <div class="pcard grade-${GRADES[grade].key}">
      ${badge ? `<span class="pcard-badge">${esc(badge)}</span>` : ""}
      <span class="pcard-no">${cardNo(card)} · ${GRADES[grade].name}</span>
      <span class="pcard-emoji">${card.emoji}</span>
      <span class="pcard-name">${esc(card.name)}</span>
      <span class="pcard-meta">${esc(eraName(card.era))} · ${card.kind === "person" ? "인물" : "장소"}</span>
      <p class="pcard-desc">${esc(card.desc)}</p>
    </div>`;
}

// ---------- 라우팅 ----------

function route() {
  const [path, query = ""] = location.hash.replace(/^#\/?/, "").split("?");
  const [rawPage, ...args] = path.split("/");
  const page = rawPage || "home";
  const params = new URLSearchParams(query);

  document.body.dataset.page = page;
  document.querySelectorAll(".tabbar a").forEach((a) => {
    a.classList.toggle("active", a.dataset.tab === page);
  });
  window.scrollTo(0, 0);

  switch (page) {
    case "quiz": return startQuiz(args, params);
    case "result": return renderResult();
    case "custom": return renderCustom();
    case "wrong": return renderWrong();
    case "cards": return renderCards();
    case "stats": return renderStats();
    default: return renderHome();
  }
}

function launch(title, pool) {
  pending = { title, pool };
  location.hash = "#/quiz/custom";
}

// ---------- 홈 ----------

function renderHome() {
  const level = validLevel(store.level);
  const inLevel = matchLevel(level);
  const query = `?level=${level}`;

  const eraCards = ERAS.map((e) => {
    const count = QUESTIONS.filter((q) => q.era === e.key && inLevel(q)).length;
    if (!count) {
      return `<div class="card disabled">
          <span class="card-title">${esc(e.name)}</span>
          <span class="card-meta">문제 없음</span>
        </div>`;
    }
    const acc = accuracy((q) => q.era === e.key && inLevel(q));
    return `<a class="card" href="#/quiz/era/${e.key}${query}">
        <span class="card-title">${esc(e.name)}</span>
        <span class="card-meta">${acc.solved}/${count}문제 · 정답률 ${pct(acc.rate)}</span>
      </a>`;
  }).join("");

  const typeChips = CONFUSION_TYPES.map((t) =>
    `<a class="chip" href="#/quiz/type/${t.key}${query}">${esc(t.name)}</a>`
  ).join("");

  const grades = cardGrades();
  const collected = CARDS.filter((c) => grades.get(c.id) > 0).length;

  app.innerHTML = `
    <header class="page-header">
      <h1>한국사 OX퀴즈</h1>
      <p class="muted">한능검 대비 · 헷갈리는 개념 집중</p>
    </header>

    ${segmentedHtml("level", LEVELS, level)}

    <section>
      <h2>시대별</h2>
      <div class="card-grid">${eraCards}</div>
    </section>

    <section>
      <h2>분야별 <span class="muted">헷갈림 유형</span></h2>
      <div class="chip-row">${typeChips}</div>
    </section>

    <section>
      <a class="btn btn-primary" href="#/custom">맞춤 퀴즈</a>
      <a class="btn btn-secondary" href="#/quiz/random${query}">전체 랜덤 ${QUIZ_SIZE}문제</a>
      <a class="collection-link" href="#/cards">🃏 포켓카드 ${collected} / ${CARDS.length} 수집</a>
    </section>
  `;

  onKeyClick("level", (key) => {
    store.level = key;
    saveStore();
    renderHome();
  });
}

// ---------- 맞춤 퀴즈 ----------

function customPool() {
  return QUESTIONS.filter((q) =>
    matchLevel(custom.level)(q) &&
    (!custom.eras.size || custom.eras.has(q.era)) &&
    (!custom.types.size || custom.types.has(q.confusionType))
  );
}

function toggle(set, key) {
  if (set.has(key)) set.delete(key);
  else set.add(key);
}

function renderCustom() {
  const pool = customPool();

  app.innerHTML = `
    <header class="page-header">
      <a class="link-btn" href="#/home">← 홈</a>
      <h1>맞춤 퀴즈</h1>
    </header>

    <section>
      <h2>레벨</h2>
      ${segmentedHtml("custom-level", LEVELS, custom.level)}
    </section>

    <section>
      <h2>시대 <span class="muted">선택 안 하면 전체</span></h2>
      ${chipsHtml("custom-eras", ERAS, (key) => custom.eras.has(key))}
    </section>

    <section>
      <h2>분야 <span class="muted">선택 안 하면 전체</span></h2>
      ${chipsHtml("custom-types", CONFUSION_TYPES, (key) => custom.types.has(key))}
    </section>

    <section>
      <button class="btn btn-primary" id="custom-start" ${pool.length ? "" : "disabled"}>
        ${pool.length ? `${pool.length}문제 중 ${Math.min(QUIZ_SIZE, pool.length)}문제 시작` : "조건에 맞는 문제가 없어요"}
      </button>
    </section>
  `;

  onKeyClick("custom-level", (key) => { custom.level = key; renderCustom(); });
  onKeyClick("custom-eras", (key) => { toggle(custom.eras, key); renderCustom(); });
  onKeyClick("custom-types", (key) => { toggle(custom.types, key); renderCustom(); });
  document.getElementById("custom-start").onclick = () => launch("맞춤 퀴즈", pool);
}

// ---------- 퀴즈 ----------

function startQuiz([mode, key], params) {
  const level = validLevel(params.get("level"));
  const inLevel = matchLevel(level);
  const levelSuffix = level === "all" ? "" : ` · ${levelName(level)}`;

  let title, pool;
  if (mode === "era") {
    title = eraName(key) + levelSuffix;
    pool = QUESTIONS.filter((q) => q.era === key && inLevel(q));
  } else if (mode === "type") {
    title = `분야 · ${typeName(key)}${levelSuffix}`;
    pool = QUESTIONS.filter((q) => q.confusionType === key && inLevel(q));
  } else if (mode === "random") {
    title = "전체 랜덤" + levelSuffix;
    pool = QUESTIONS.filter(inLevel);
  } else if (mode === "custom" && pending) {
    ({ title, pool } = pending);
    pending = null;
  } else {
    return location.replace("#/home");
  }

  if (!pool.length) {
    app.innerHTML = `
      <div class="empty">
        <p>아직 준비된 문제가 없어요.</p>
        <a class="btn btn-secondary" href="#/home">홈으로</a>
      </div>`;
    return;
  }

  session = {
    title,
    pool,
    questions: shuffle(pool).slice(0, QUIZ_SIZE),
    index: 0,
    answers: [],
    gradesBefore: cardGrades(),
    earned: []
  };
  renderQuestion();
}

function renderQuestion() {
  const { questions, index, title } = session;
  const q = questions[index];
  const total = questions.length;

  app.innerHTML = `
    <header class="quiz-header">
      <button class="link-btn" id="exit">✕ 나가기</button>
      <span class="muted">${index + 1} / ${total}</span>
    </header>
    <div class="progress"><div class="progress-bar" style="width:${(index / total) * 100}%"></div></div>

    <p class="quiz-title muted">${esc(title)}</p>
    <p class="quiz-tags muted">${esc(eraName(q.era))} · ${esc(typeName(q.confusionType))} · ${esc(levelName(q.level))}</p>
    <p class="statement">${esc(q.statement)}</p>

    <div class="ox">
      <button class="ox-btn" data-answer="true">O</button>
      <button class="ox-btn" data-answer="false">X</button>
    </div>

    <div id="feedback"></div>
  `;

  document.getElementById("exit").onclick = () => {
    if (confirm("퀴즈를 그만두고 홈으로 갈까요? 지금까지 푼 기록은 저장돼요.")) location.hash = "#/home";
  };
  app.querySelectorAll(".ox-btn").forEach((btn) => {
    btn.onclick = () => answer(btn);
  });
}

function answer(btn) {
  const q = session.questions[session.index];
  const correct = (btn.dataset.answer === "true") === q.answer;
  session.answers.push(correct);
  recordAnswer(q.id, correct);

  app.querySelectorAll(".ox-btn").forEach((b) => {
    b.disabled = true;
    if ((b.dataset.answer === "true") === q.answer) b.classList.add("is-answer");
  });
  btn.classList.add(correct ? "picked-correct" : "picked-wrong");

  const isLast = session.index === session.questions.length - 1;
  const feedback = document.getElementById("feedback");
  feedback.innerHTML = `
    <div class="feedback ${correct ? "correct" : "wrong"}">
      <p class="verdict">${correct ? "정답!" : "오답"} <span class="muted">정답은 ${oxLabel(q.answer)}</span></p>
      ${explanationHtml(q)}
    </div>
    <button class="btn btn-primary" id="next">${isLast ? "결과 보기" : "다음 문제"}</button>
  `;

  const next = document.getElementById("next");
  next.onclick = () => {
    if (isLast) {
      finishQuiz();
    } else {
      session.index++;
      renderQuestion();
      window.scrollTo(0, 0);
    }
  };
  next.focus({ preventScroll: true });
  feedback.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

function finishQuiz() {
  const after = cardGrades();
  session.earned = CARDS
    .filter((c) => after.get(c.id) > session.gradesBefore.get(c.id))
    .map((c) => ({ card: c, before: session.gradesBefore.get(c.id), after: after.get(c.id) }));
  location.hash = "#/result";
}

// ---------- 결과 ----------

function renderResult() {
  if (!session || session.answers.length < session.questions.length) {
    return location.replace("#/home");
  }

  const { questions, answers, title, pool, earned } = session;
  const score = answers.filter(Boolean).length;
  const wrongs = questions.filter((_, i) => !answers[i]);

  const earnedHtml = earned.length
    ? `<section>
        <h2>🃏 이번에 얻은 카드 <span class="muted">눌러서 뒤집기</span></h2>
        <div class="flip-row">${earned.map(({ card, before, after }) => `
          <button type="button" class="flip" aria-label="카드 뒤집기">
            <div class="flip-inner">
              <div class="flip-front"><span class="flip-mark">?</span><span>${esc(eraName(card.era))}</span></div>
              <div class="flip-back">${cardFaceHtml(card, after, before ? `${GRADES[after].name}로 강화!` : "NEW!")}</div>
            </div>
          </button>`).join("")}
        </div>
      </section>`
    : "";

  const items = questions.map((q, i) => `
    <details class="result-item ${answers[i] ? "correct" : "wrong"}">
      <summary>
        <span class="mark">${answers[i] ? "✓" : "✗"}</span>
        <span>${esc(q.statement)}</span>
      </summary>
      <div class="result-body">
        <p class="muted">정답 ${oxLabel(q.answer)} · ${esc(eraName(q.era))}</p>
        ${explanationHtml(q)}
      </div>
    </details>
  `).join("");

  app.innerHTML = `
    <header class="page-header">
      <p class="muted">${esc(title)}</p>
      <h1 class="score">${score} <span class="muted">/ ${questions.length}</span></h1>
    </header>

    ${earnedHtml}

    <section class="result-list">${items}</section>

    <section class="actions">
      ${wrongs.length ? `<button class="btn btn-primary" id="retry-wrong">틀린 문제 다시 풀기 (${wrongs.length})</button>` : ""}
      <button class="btn btn-secondary" id="retry-same">같은 조건 다시 풀기</button>
      <a class="btn btn-secondary" href="#/home">홈으로</a>
    </section>
  `;

  app.querySelectorAll(".flip").forEach((el) => {
    el.onclick = () => el.classList.add("flipped");
  });
  document.getElementById("retry-wrong")?.addEventListener("click", () => launch(`${title} · 오답`, wrongs));
  document.getElementById("retry-same").onclick = () => launch(title, pool);
}

// ---------- 오답노트 ----------

function renderWrong() {
  const entries = Object.entries(store.wrongNotes)
    .map(([qid, note]) => ({ q: QUESTION_BY_ID.get(qid), note }))
    .filter((e) => e.q)
    .sort((a, b) => b.note.addedAt - a.note.addedAt);

  if (!entries.length) {
    app.innerHTML = `
      <header class="page-header"><h1>오답노트</h1></header>
      <div class="empty">
        <p>아직 틀린 문제가 없어요.</p>
        <p class="muted">틀린 문제는 여기에 모이고, 연속 ${WRONG_NOTE_CLEAR_STREAK}번 맞히면 자동으로 빠져요.</p>
        <a class="btn btn-secondary" href="#/home">퀴즈 풀러 가기</a>
      </div>`;
    return;
  }

  const erasWithNotes = ERAS.filter((e) => entries.some((x) => x.q.era === e.key));
  if (!erasWithNotes.some((e) => e.key === wrongEraFilter)) wrongEraFilter = "all";
  const filtered = entries.filter((x) => wrongEraFilter === "all" || x.q.era === wrongEraFilter);

  const filterOptions = [{ key: "all", name: `전체 ${entries.length}` }, ...erasWithNotes.map((e) => ({
    key: e.key, name: `${e.name} ${entries.filter((x) => x.q.era === e.key).length}`
  }))];

  const items = filtered.map(({ q, note }) => `
    <details class="result-item wrong">
      <summary>
        <span class="mark">✗</span>
        <span>${esc(q.statement)}</span>
      </summary>
      <div class="result-body">
        <p class="muted">정답 ${oxLabel(q.answer)} · ${esc(eraName(q.era))} · 연속 정답 ${note.streak}/${WRONG_NOTE_CLEAR_STREAK}</p>
        ${explanationHtml(q)}
      </div>
    </details>
  `).join("");

  app.innerHTML = `
    <header class="page-header">
      <h1>오답노트</h1>
      <p class="muted">연속 ${WRONG_NOTE_CLEAR_STREAK}번 맞히면 자동으로 빠져요.</p>
    </header>

    ${chipsHtml("wrong-era", filterOptions, (key) => key === wrongEraFilter)}

    <button class="btn btn-primary" id="wrong-start">오답 ${Math.min(QUIZ_SIZE, filtered.length)}문제 풀기</button>

    <section class="result-list">${items}</section>
  `;

  onKeyClick("wrong-era", (key) => { wrongEraFilter = key; renderWrong(); });
  document.getElementById("wrong-start").onclick = () => launch("오답노트", filtered.map((x) => x.q));
}

// ---------- 도감 ----------

function renderCards() {
  const counts = correctCounts();
  const grades = new Map(CARDS.map((c) => [c.id, cardGrade(c, counts)]));
  const collected = CARDS.filter((c) => grades.get(c.id) > 0).length;
  const gradeCount = (g) => CARDS.filter((c) => grades.get(c.id) === g).length;

  const erasWithCards = ERAS.filter((e) => CARDS.some((c) => c.era === e.key));
  const filterOptions = [{ key: "all", name: "전체" }, ...erasWithCards];
  const shown = CARDS.filter((c) => cardEraFilter === "all" || c.era === cardEraFilter);

  const grid = shown.map((card) => {
    const grade = grades.get(card.id);
    const total = card.questionIds.length;
    const progress = grade < GRADES.length - 1
      ? `${GRADES[grade + 1].name}까지 ${card.questionIds.filter((id) => (counts.get(id) || 0) > grade).length}/${total}문제`
      : "최고 등급 달성";
    return `
      <button type="button" class="pcard-btn" data-key="${card.id}">
        ${cardFaceHtml(card, grade)}
        <span class="pcard-progress">${progress}</span>
      </button>`;
  }).join("");

  app.innerHTML = `
    <header class="page-header">
      <h1>포켓카드 도감</h1>
      <p class="muted">카드에 연결된 문제를 모두 맞히면 획득, 더 맞힐수록 등급이 올라요.</p>
    </header>

    <section class="collection-summary">
      <div class="collection-count"><strong>${collected}</strong> / ${CARDS.length} 수집</div>
      <div class="bar-track"><div class="bar-fill" style="width:${(collected / CARDS.length) * 100}%"></div></div>
      <div class="grade-counts">
        <span class="grade-dot common">일반 ${gradeCount(1)}</span>
        <span class="grade-dot rare">레어 ${gradeCount(2)}</span>
        <span class="grade-dot legend">전설 ${gradeCount(3)}</span>
      </div>
    </section>

    ${chipsHtml("card-era", filterOptions, (key) => key === cardEraFilter)}

    <div class="pcard-grid" id="pcard-grid">${grid}</div>
    <p class="muted hint">카드를 누르면 연결된 문제를 풀 수 있어요.</p>
  `;

  onKeyClick("card-era", (key) => { cardEraFilter = key; renderCards(); });
  onKeyClick("pcard-grid", (key) => {
    const card = CARDS.find((c) => c.id === key);
    const label = grades.get(key) ? card.name : cardNo(card);
    launch(`포켓카드 · ${label}`, card.questionIds.map((id) => QUESTION_BY_ID.get(id)).filter(Boolean));
  });
}

// ---------- 통계 ----------

function barRow(label, rate, href) {
  const width = rate === null ? 0 : rate * 100;
  const tag = href ? `a href="${href}"` : "div";
  return `
    <${tag} class="bar-row">
      <span class="bar-label">${esc(label)}</span>
      <span class="bar-track">
        <span class="bar-fill ${rate !== null && rate >= GOAL_RATE ? "ok" : ""}" style="width:${width}%"></span>
        <span class="bar-goal" style="left:${GOAL_RATE * 100}%"></span>
      </span>
      <span class="bar-value">${pct(rate)}</span>
    </${href ? "a" : "div"}>`;
}

function renderStats() {
  const overall = accuracy(() => true);

  if (!overall.total) {
    app.innerHTML = `
      <header class="page-header"><h1>통계</h1></header>
      <div class="empty">
        <p>아직 푼 문제가 없어요.</p>
        <p class="muted">목표: 모든 시대 정답률 ${GOAL_RATE * 100}% 이상</p>
        <a class="btn btn-secondary" href="#/home">퀴즈 풀러 가기</a>
      </div>`;
    return;
  }

  const eraStats = ERAS.map((e) => ({ ...e, ...accuracy((q) => q.era === e.key) }));
  const typeStats = CONFUSION_TYPES.map((t) => ({ ...t, ...accuracy((q) => q.confusionType === t.key) }));
  const achieved = eraStats.filter((e) => e.rate !== null && e.rate >= GOAL_RATE).length;
  const weak = eraStats
    .filter((e) => e.rate !== null && e.rate < GOAL_RATE)
    .sort((a, b) => a.rate - b.rate)
    .slice(0, 3);
  const grades = cardGrades();
  const collected = CARDS.filter((c) => grades.get(c.id) > 0).length;

  app.innerHTML = `
    <header class="page-header"><h1>통계</h1></header>

    <section class="summary-grid">
      <div class="summary"><span class="summary-value">${overall.total}</span><span class="muted">푼 문제</span></div>
      <div class="summary"><span class="summary-value">${pct(overall.rate)}</span><span class="muted">전체 정답률</span></div>
      <div class="summary"><span class="summary-value">${achieved}/${ERAS.length}</span><span class="muted">목표 달성 시대</span></div>
      <div class="summary"><span class="summary-value">${collected}/${CARDS.length}</span><span class="muted">포켓카드</span></div>
    </section>

    <section>
      <h2>시대별 정답률 <span class="muted">세로선 = 목표 ${GOAL_RATE * 100}%</span></h2>
      ${eraStats.map((e) => barRow(e.name, e.rate)).join("")}
    </section>

    <section>
      <h2>분야별 정답률</h2>
      ${typeStats.map((t) => barRow(t.name, t.rate)).join("")}
    </section>

    ${weak.length ? `
      <section>
        <h2>취약 시대 Top ${weak.length} <span class="muted">눌러서 바로 풀기</span></h2>
        ${weak.map((e) => barRow(e.name, e.rate, `#/quiz/era/${e.key}`)).join("")}
      </section>` : ""}

    <section>
      <button class="btn btn-danger" id="reset">기록 초기화</button>
    </section>
  `;

  document.getElementById("reset").onclick = () => {
    if (!confirm("풀이 기록, 오답노트, 포켓카드가 모두 지워져요. 초기화할까요?")) return;
    store = { ...emptyStore(), level: store.level };
    saveStore();
    renderStats();
  };
}

window.addEventListener("hashchange", route);
route();
