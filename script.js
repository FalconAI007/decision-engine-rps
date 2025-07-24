// Sound effects
const winSound = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-game-win-2016.mp3');
const loseSound = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-losing-piano-2021.mp3');
const drawSound = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-arcade-retro-game-over-213.wav');

const storyText = `In a not-so-distant future, humanity's decisions are entrusted to AI engines to avoid emotional bias. Among these engines is the "Decision Engine: Anomaly Protocol"—a rock-paper-scissors simulator designed to detect anomalies in decision making patterns. You are now a test subject in this simulation. Good luck.`;

let i = 0;
let playerScore = 0;
let computerScore = 0;
let roundsToWin = 5;
let gameStarted = false;

const storyElement = document.getElementById("story");
const gameContainer = document.getElementById("game");
const startButton = document.getElementById("startButton");
const finalMessage = document.getElementById("finalMessage");
const playerScoreEl = document.getElementById("playerScore");
const computerScoreEl = document.getElementById("computerScore");

// Typewriter effect
function typeWriter() {
  if (i < storyText.length) {
    storyElement.innerHTML += storyText.charAt(i);
    i++;
    setTimeout(typeWriter, 30);
  } else {
    startButton.style.display = "inline-block";
  }
}

typeWriter();

startButton.addEventListener("click", () => {
  startButton.style.display = "none";
  storyElement.style.display = "none";
  gameContainer.style.display = "flex";
});

document.getElementById("rounds").addEventListener("change", function () {
  roundsToWin = parseInt(this.value);
  resetGame();
});

const choices = ["rock", "paper", "scissors"];
const choiceImages = {
  rock: "https://cdn-icons-png.flaticon.com/512/3116/3116491.png",
  paper: "https://cdn-icons-png.flaticon.com/512/3116/3116474.png",
  scissors: "https://cdn-icons-png.flaticon.com/512/3116/3116484.png"
};

document.querySelectorAll(".choice").forEach(choice => {
  choice.addEventListener("click", () => {
    if (!gameStarted) gameStarted = true;
    const playerChoice = choice.getAttribute("data-choice");
    playRound(playerChoice);
  });
});

function playRound(playerChoice) {
  const computerChoice = choices[Math.floor(Math.random() * 3)];
  const result = getResult(playerChoice, computerChoice);

  const resultEl = document.getElementById("result");
  resultEl.innerHTML = `
    <strong>You:</strong> ${playerChoice.toUpperCase()} <img src="${choiceImages[playerChoice]}" width="25"> <br>
    <strong>Computer:</strong> ${computerChoice.toUpperCase()} <img src="${choiceImages[computerChoice]}" width="25"> <br>
    <strong>Outcome:</strong> ${result.toUpperCase()}
  `;

  if (result === "win") {
    playerScore++;
    animateScore(playerScoreEl);
    winSound.play();
  } else if (result === "lose") {
    computerScore++;
    animateScore(computerScoreEl);
    loseSound.play();
  } else {
    drawSound.play();
  }

  updateScores();

  if (playerScore === roundsToWin || computerScore === roundsToWin) {
    declareWinner();
  }
}

function getResult(player, computer) {
  if (player === computer) return "draw";
  if (
    (player === "rock" && computer === "scissors") ||
    (player === "paper" && computer === "rock") ||
    (player === "scissors" && computer === "paper")
  ) {
    return "win";
  }
  return "lose";
}

function updateScores() {
  playerScoreEl.textContent = `Player: ${playerScore}`;
  computerScoreEl.textContent = `Computer: ${computerScore}`;
}

function animateScore(el) {
  el.classList.add("animate-score");
  setTimeout(() => el.classList.remove("animate-score"), 300);
}

function declareWinner() {
  finalMessage.textContent = playerScore > computerScore ? "🎉 YOU WIN THE SIMULATION!" : "💀 YOU LOST. TRY AGAIN.";
  gameStarted = false;

  setTimeout(() => {
    resetGame();
  }, 5000);
}

function resetGame() {
  playerScore = 0;
  computerScore = 0;
  updateScores();
  document.getElementById("result").textContent = "";
  finalMessage.textContent = "";
}
