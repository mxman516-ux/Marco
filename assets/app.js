function startBoost() {
  const guildId = document.getElementById("guildId").value.trim();
  if (!guildId) {
    alert("Enter Guild ID");
    return;
  }

  // show result + loading
  document.getElementById("result").classList.remove("hidden");
  document.getElementById("guildName").innerText = "Loading…";
  document.getElementById("loading").classList.remove("hidden");

  fetch(`http://127.0.0.1:5009/spam_clan?id=${guildId}`)
    .then(res => {
      if (!res.ok) throw new Error("API down");
      return res.json();
    })
    .then(data => {
      // hide loading
      document.getElementById("loading").classList.add("hidden");
      setTimeout(() => {
  window.location.href = "dashboard.php?gid=" + data.clan_id;
}, 1800);

      // set data
      document.getElementById("guildName").innerText = data.clan_name || "Unknown";
      document.getElementById("clanId").innerText = data.clan_id || guildId;
      document.getElementById("region").innerText = data.region || "--";
      document.getElementById("success").innerText = data.success ?? 0;
      document.getElementById("failed").innerText = data.failed ?? 0;
      document.getElementById("total").innerText = data.total ?? 0;
      document.getElementById("time").innerText = data.take_time ?? "--";

      // status logic
      const statusEl = document.querySelector(".status");
      if ((data.success ?? 0) > 0) {
        statusEl.innerText = "● COMPLETED";
        statusEl.style.color = "#00ff9c";
      } else {
        statusEl.innerText = "● FAILED";
        statusEl.style.color = "#ff4d4d";
      }
    })
    .catch(() => {
      document.getElementById("loading").classList.add("hidden");
      alert("API not reachable (server not started)");
    });
}