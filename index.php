<?php
$pidFile = __DIR__ . "/.spam_pid";

if (!file_exists($pidFile)) {
    $cmd = "python3 GUILD-BOOST/spam.py > /dev/null 2>&1 & echo $!";
    $pid = shell_exec($cmd);
    file_put_contents($pidFile, $pid);
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>FF Glory — Guild Boost</title>

  <!-- Google Font (Unique + Premium Feel) -->
  <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;600;800&display=swap" rel="stylesheet">

  <link rel="stylesheet" href="assets/style.css">
</head>
<body>

<div class="app">

  <!-- HEADER -->
  <header>
    <div class="logo">FF<span>Glory</span></div>
    <div class="watermark">by <b>Saurabh</b></div>
  </header>

  <!-- INPUT PANEL -->
  <section class="input-panel">
    <h1>Guild Boost Panel</h1>
    <p>Enter Guild ID to initiate boost request</p>

    <input id="guildId" type="text" placeholder="Enter Guild ID">
    <button onclick="startBoost()">Start Boost</button>
  </section>

  <!-- RESULT -->
  <section id="result" class="hidden">
    <div class="card">
      <h2 id="guildName">—</h2>
      <p class="sub">
        ID: <span id="clanId"></span> |
        Region: <span id="region"></span>
      </p>

      <div class="stats">
        <div><label>SUCCESS</label><span id="success">0</span></div>
        <div><label>FAILED</label><span id="failed">0</span></div>
        <div><label>TOTAL</label><span id="total">0</span></div>
        <div><label>TIME</label><span id="time">0s</span></div>
      </div>

      <div class="status running">● RUNNING</div>
    </div>
  </section>

  <!-- FOOTER -->
  <footer>
    © 2025 <b>Saurabh</b> — All Rights Reserved <br>
    Instagram: @RealX.SilentZ | Telegram: @Phantom4ura
  </footer>
  
  
<div id="loading" class="loading hidden">
  Processing<span class="dots"></span>
</div>

<script src="assets/app.js"></script>
</body>
</html>