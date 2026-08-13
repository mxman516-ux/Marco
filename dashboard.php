<?php
$guildName = $_GET['name'] ?? 'Unknown Guild';
$guildId   = $_GET['id'] ?? '—';
$region    = $_GET['region'] ?? 'IND';
?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>FFGlory — Dashboard</title>

<link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;600;800&display=swap" rel="stylesheet">
<link rel="stylesheet" href="assets/style.css">

<style>
body.neon {
  background: radial-gradient(circle at top, #001a22, #000);
}
body.dark {
  background: radial-gradient(circle at top, #0a0d12, #000);
}

.dashboard {
  max-width: 420px;
  margin: auto;
  padding: 20px;
}

/* HEADER */
.top {
  display:flex;
  justify-content:space-between;
  align-items:center;
  margin-bottom:12px;
}
.brand {
  font-size:20px;
  font-weight:800;
}
.brand span { color:#9ff; }
.by {
  font-size:10px;
  opacity:.6;
}

/* CARD */
.guild-card {
  background: linear-gradient(135deg,#0e1622,#05070b);
  border-radius:18px;
  padding:18px;
  box-shadow:0 0 40px rgba(0,255,255,.25);
  animation: glow 4s infinite alternate;
}

@keyframes glow{
  from{box-shadow:0 0 20px rgba(0,255,255,.15);}
  to{box-shadow:0 0 40px rgba(0,255,255,.35);}
}

.guild-title {
  font-size:20px;
  color:#9ff;
  text-shadow:0 0 10px rgba(0,255,255,.7);
}

.sub {
  font-size:11px;
  opacity:.75;
}

.status {
  margin-top:10px;
  font-size:12px;
  color:#00ff9c;
}

/* STATS */
.stats {
  display:grid;
  grid-template-columns:1fr 1fr;
  gap:12px;
  margin-top:15px;
}
.stats div {
  background:#0b121c;
  border-radius:10px;
  padding:10px;
  text-align:center;
}
.stats label {
  font-size:10px;
  opacity:.6;
}
.stats span {
  display:block;
  font-size:18px;
}

/* TIMELINE */
.timeline {
  margin-top:15px;
  font-size:11px;
  max-height:120px;
  overflow:auto;
}
.timeline div { margin-bottom:6px; }

/* FOOTER */
.footer {
  margin-top:18px;
  font-size:10px;
  text-align:center;
  opacity:.6;
}

/* TOGGLE */
.toggle {
  text-align:right;
  margin-top:10px;
}
.toggle button {
  background:#0b121c;
  border:none;
  color:#9ff;
  padding:6px 10px;
  border-radius:8px;
  cursor:pointer;
}
</style>
</head>

<body class="neon">

<div class="dashboard">

  <!-- HEADER -->
  <div class="top">
    <div class="brand">FF<span>Glory</span></div>
    <div class="by">by <b>Saurabh</b></div>
  </div>

  <!-- CARD -->
  <div class="guild-card">

    <div class="guild-title"><?= htmlspecialchars($guildName) ?></div>
    <div class="sub">
      <?= htmlspecialchars($guildId) ?> | <?= htmlspecialchars($region) ?> |
      <span id="botCount">0</span> BOTS
    </div>

    <div class="status" id="status">MATCH RUNNING</div>

    <div class="stats">
      <div><label>TOTAL GLORY</label><span id="glory">0</span></div>
      <div><label>MATCHES</label><span id="matches">0</span></div>
      <div><label>UPTIME</label><span id="uptime">0m</span></div>
      <div><label>STATE</label><span id="stateText">ACTIVE</span></div>
    </div>

    <canvas id="graph" width="300" height="120"></canvas>

    <div class="timeline" id="timeline"></div>

    <div class="toggle">
      <button onclick="toggleTheme()">PHANTOM HERE ❄️🥷🏻🔥</button>
    </div>

    <div class="footer">
      © 2025 <b>Saurabh</b><br>
      Instagram: @RealX.SilentZ | Telegram: @Phantom4ura
    </div>

  </div>
</div>

<script src="assets/dashboard.js"></script>
</body>
</html>