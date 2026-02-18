const startBtn = document.getElementById("startBtn");
const restartBtn = document.getElementById("restartBtn");
const reactionBox = document.getElementById("reactionBox");
const message = document.getElementById("message");
const resultTime = document.getElementById("resultTime");
const attemptDisplay = document.getElementById("attempt");
const averageDisplay = document.getElementById("average");
const finalAverage = document.getElementById("finalAverage");

const screens = document.querySelectorAll(".screen");

let startTime, timeout;
let attempts = 0;
let maxAttempts = 5;
let times = [];
let waiting = false;
let ready = false;

function showScreen(index) {
  screens.forEach(s => s.classList.remove("active"));
  screens[index].classList.add("active");
}

function startGame() {
  attempts = 0;
  times = [];
  showScreen(1);
  nextRound();
}

function nextRound() {
  ready = false;
  waiting = true;
  reactionBox.className = "reaction-box waiting";
  message.textContent = "Wait for Green...";
  resultTime.textContent = "0";

  const delay = Math.random() * 3000 + 2000;

  timeout = setTimeout(() => {
    reactionBox.className = "reaction-box ready";
    message.textContent = "CLICK!";
    startTime = Date.now();
    ready = true;
    waiting = false;
  }, delay);
}

reactionBox.addEventListener("click", () => {
  if (waiting) {
    clearTimeout(timeout);
    reactionBox.className = "reaction-box too-early";
    message.textContent = "Too Early!";
    setTimeout(nextRound, 1500);
  }

  if (ready) {
    const reaction = Date.now() - startTime;
    times.push(reaction);
    attempts++;
    resultTime.textContent = reaction;
    reactionBox.className = "reaction-box success";

    const avg = Math.floor(times.reduce((a,b)=>a+b,0)/times.length);
    averageDisplay.textContent = avg;
    attemptDisplay.textContent = attempts + 1;

    ready = false;

    if (attempts >= maxAttempts) {
      setTimeout(() => {
        finalAverage.textContent = avg;
        showScreen(2);
      }, 1000);
    } else {
      setTimeout(nextRound, 1500);
    }
  }
});

startBtn.addEventListener("click", startGame);
restartBtn.addEventListener("click", startGame);
