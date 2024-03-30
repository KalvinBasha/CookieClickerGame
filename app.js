document.getElementById("cupcakeBtn").addEventListener("click", clickCupcake);
document.getElementById("upgradeBtn").addEventListener("click", buyUpgrade);
document
  .getElementById("bigUpgradeBtn")
  .addEventListener("click", buyBigUpgrade);
document
  .getElementById("resetBtn")
  .addEventListener("click", resetGameProgress);

const stats = {
  totalCupcakes: 0,
  cupcakesPerSecond: 0,
  clickValue: 1,
  autoClickers: 0,
};

// FUNCTIONS

function updateStats() {
  document.getElementById("totalCupcakes").innerText = stats.totalCupcakes;

  document.getElementById("cupcakesPerSecond").innerText =
    stats.cupcakesPerSecond;
}

function clickCupcake() {
  stats.totalCupcakes += stats.clickValue;
  updateStats();
}

function buyUpgrade() {
  if (stats.totalCupcakes >= 10) {
    stats.totalCupcakes -= 10;
    stats.autoClickers++;
    stats.cupcakesPerSecond++;
    updateStats();
    localStorage.setItem("stats", JSON.stringify(stats));
  } else {
    alert("You need more cupcakes for this upgrade!");
  }
}

function buyBigUpgrade() {
  if (stats.totalCupcakes >= 100) {
    stats.totalCupcakes -= 100;
    stats.cupcakesPerSecond += 10;
    updateStats();
    localStorage.setItem("stats", JSON.stringify(stats));
  } else {
    alert("You need more cupcakes for this upgrade!");
  }
}

function resetGameProgress() {
  stats.totalCupcakes = 0;
  stats.cupcakesPerSecond = 0;
  stats.clickValue = 1;
  stats.autoClickers = 0;
  updateStats();
  localStorage.removeItem("stats");
}

function autoIncrement() {
  stats.totalCupcakes += stats.cupcakesPerSecond;
  updateStats();
}

window.addEventListener("load", () => {
  const storedStats = localStorage.getItem("stats");
  if (storedStats) {
    Object.assign(stats, JSON.parse(storedStats));
    updateStats();
  }
  setInterval(autoIncrement, 1000);
});
