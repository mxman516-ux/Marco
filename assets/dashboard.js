/* ================================
   PERSISTENT STATE
================================ */
const state = JSON.parse(localStorage.getItem("guildState")) || {
  totalGlory: 0,
  matches: 0,
  bots: 0,
  history: [],
  running: true,
  paused: false,
  startTime: Date.now(),
  nextMatchAt: null
};

let {
  totalGlory,
  matches,
  bots,
  history,
  running,
  paused,
  startTime,
  nextMatchAt
} = state;

/* ================================
   ELEMENTS
================================ */
const gloryEl  = document.getElementById("glory");
const matchEl  = document.getElementById("matches");
const botEl    = document.getElementById("botCount");
const uptimeEl = document.getElementById("uptime");
const timeline = document.getElementById("timeline");
const statusEl = document.getElementById("status");
const pauseBtn = document.getElementById("pauseBtn");
const stopBtn  = document.getElementById("stopBtn");

/* ================================
   INIT UI
================================ */
gloryEl.innerText = totalGlory;
matchEl.innerText = matches;
botEl.innerText   = bots;
statusEl.innerText = paused ? "PAUSED" : "MATCH RUNNING";
statusEl.style.color = paused ? "#ffcc00" : "#00ff9c";
const stateTextEl = document.getElementById("stateText");

function updateStateText() {
  if (!running) {
    stateTextEl.innerText = "STOPPED";
    stateTextEl.style.color = "#888";
  } else if (bots === 0) {
    stateTextEl.innerText = "N/A";
    stateTextEl.style.color = "#999";
  } else {
    stateTextEl.innerText = "ACTIVE";
    stateTextEl.style.color = "#00ff9c";
  }
}
/* ================================
   SAVE STATE
================================ */
function saveState() {
  localStorage.setItem("guildState", JSON.stringify({
    totalGlory,
    matches,
    bots,
    history,
    running,
    paused,
    startTime,
    nextMatchAt
  }));
}

/* ================================
   UPTIME (only when running)
================================ */
setInterval(() => {
  if (!running) return;
  const mins = Math.floor((Date.now() - startTime) / 60000);
  uptimeEl.innerText = mins + "m";
}, 1000);

/* ================================
   MATCH SCHEDULER (15–18 min)
================================ */
function scheduleMatch() {
  if (!running || paused) return;

  if (!nextMatchAt) {
    const delay = (15 + Math.random() * 3) * 60 * 1000;
    nextMatchAt = Date.now() + delay;
    saveState();
  }

  const checker = setInterval(() => {
    if (paused || !running) return;
    if (Date.now() >= nextMatchAt) {
      clearInterval(checker);
      nextMatchAt = null;
      runMatch();
    }
  }, 1000);
}

/* ================================
   RUN MATCH
================================ */
function runMatch() {
  if (!running || paused) return;

  const success = Math.random() > 0.2;

  // ---------- FAILED ----------
  if (!success) {
    statusEl.innerText = "MATCH FAILED";
    statusEl.style.color = "#ff4d4d";

    updateStateText(); // ✅ ADD (failed state reflect)

    setTimeout(() => {
      statusEl.innerText = "MATCH RUNNING";
      statusEl.style.color = "#00ff9c";
      updateStateText(); // ✅ ADD (back to running)
      scheduleMatch();
    }, 8000);

    return;
  }

  // ---------- COMPLETED ----------
  statusEl.innerText = "MATCH COMPLETED";
  statusEl.style.color = "#9ff";

  const gain = Math.floor(Math.random() * 120) + 180;
  animateGlory(gain);

  matches++;
  bots++;

  matchEl.innerText = matches;
  botEl.innerText   = bots;

  updateStateText(); // ✅ ADD (bots > 0 → ACTIVE)

  const log = document.createElement("div");
  log.innerText = `+${gain} glory | Match #${matches}`;
  timeline.prepend(log);

  history.push(totalGlory + gain);
  if (history.length > 30) history.shift();

  saveState();

  setTimeout(() => {
    statusEl.innerText = "MATCH RUNNING";
    statusEl.style.color = "#00ff9c";
    updateStateText(); // ✅ ADD (running again)
    scheduleMatch();
  }, 8000);
}

/* ================================
   GLORY ANIMATION (slow & natural)
================================ */
function animateGlory(gain) {
  let added = 0;
  const step = Math.max(2, Math.floor(gain / 100));

  const anim = setInterval(() => {
    if (added >= gain) {
      clearInterval(anim);
      return;
    }
    totalGlory += step;
    added += step;
    gloryEl.innerText = totalGlory;
    drawGraph();
  }, 80);
}

/* ================================
   GRAPH
================================ */
const ctx = document.getElementById("graph").getContext("2d");

function drawGraph() {
  ctx.clearRect(0, 0, 300, 120);
  if (history.length < 2) return;

  ctx.strokeStyle = "#9ff";
  ctx.beginPath();

  history.forEach((v, i) => {
    const x = i * (300 / (history.length - 1));
    const y = 120 - (v / history[history.length - 1]) * 100;
    i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
  });

  ctx.stroke();
}

/* ================================
   PAUSE / STOP
================================ */
pauseBtn.onclick = () => {
  paused = !paused;
  statusEl.innerText = paused ? "PAUSED" : "MATCH RUNNING";
  statusEl.style.color = paused ? "#ffcc00" : "#00ff9c";
  saveState();
  if (!paused) scheduleMatch();
};

stopBtn.onclick = () => {
  running = false;
  paused = false;
  statusEl.innerText = "STOPPED";
  statusEl.style.color = "#888";
  saveState();
};

/* ================================
   START
================================ */
drawGraph();
scheduleMatch();

/* ================================
   SNOW EFFECT (light, non-fake)
================================ */
setInterval(() => {
  const s = document.createElement("div");
  s.className = "snow";
  s.style.left = Math.random() * 100 + "vw";
  s.style.animationDuration = (8 + Math.random() * 6) + "s";
  document.body.appendChild(s);
  setTimeout(() => s.remove(), 14000);
}, 600);