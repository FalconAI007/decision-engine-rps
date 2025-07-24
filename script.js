const choices = ["rock", "paper", "scissors"];
let playerScore = 0;
let computerScore = 0;
let totalRounds = 0;
let currentRound = 0;

const backgroundMusic = document.getElementById("bg-music");
backgroundMusic.loop = true;

const playerMessages = {
  rock: "🪨 You deploy Solidity. Quiet but firm.",
  paper: "📜 You unfold the blueprint. Calm precision.",
  scissors: "✂️ You cut through the noise. Intent clear."
};

const computerMessages = {
  rock: "🪨 The Engine grounds with mass. It watches.",
  paper: "📜 Layers of logic veil the anomaly.",
  scissors: "✂️ Systems slice with surgical precision."
};

function startGame() {
  document.getElementById("start-screen").style.display = "none";
  document.getElementById("typewriter").style.display = "block";
  backgroundMusic.play().catch(() => {});
  loadStory();
}

function loadStory() {
  const storyLines = [
    "In a world rewritten by code, where past, present, and future converge...",
    "You are not just a player. You are the anomaly.",
    "ACM—The Archive of Conscious Minds—has activated the Decision Engine to test your deviation from deterministic logic.",
    "This is not a game. It's a protocol to predict chaos.",
    "The choices you make will echo through subroutines beyond your reality.",
    "Welcome, Initiator."
  ];

  let i = 0;
  const typeDiv = document.getElementById("typewriter");
  typeDiv.innerText = "";
  const interval = setInterval(() => {
    if (i < storyLines.length) {
      typeDiv.innerHTML += storyLines[i] + "\n\n";
      i++;
    } else {
      clearInterval(interval);
      document.getElementById("round-selection").style.display = "block";
    }
  }, 180); // slower typewriter effect
}

function setRounds(n) {
  totalRounds = n;
  currentRound = 1;
  playerScore = 0;
  computerScore = 0;

  document.getElementById("round-selection").style.display = "none";
  document.getElementById("game").style.display = "block";
  document.getElementById("restart").style.display = "none";
  document.getElementById("restartMessage").innerText = "";

  clearResults();
  updateScore();
}

function playRound(playerChoice) {
  if (currentRound > totalRounds) return;

  const computerChoice = choices[Math.floor(Math.random() * choices.length)];

  document.getElementById("playerMove").innerText = playerMessages[playerChoice];
  document.getElementById("computerMove").innerText = `🤖 The Engine chooses ${computerChoice.toUpperCase()}. ${computerMessages[computerChoice]}`;

  let result = "";
  if (playerChoice === computerChoice) {
    result = "⚖️ A silent equilibrium. Nothing shifts.";
  } else if (
    (playerChoice === "rock" && computerChoice === "scissors") ||
    (playerChoice === "paper" && computerChoice === "rock") ||
    (playerChoice === "scissors" && computerChoice === "paper")
  ) {
    result = "✅ Logic breach successful. You remain undetected.";
    playerScore++;
  } else {
    result = "❌ Your path collapses. Simulation reinforced.";
    computerScore++;
  }

  document.getElementById("roundResult").innerText = result;
  updateScore();
  currentRound++;

  if (currentRound > totalRounds) declareWinner();
}

function updateScore() {
  document.getElementById("score").innerText = `🧑 Player: ${playerScore} | 🤖 Engine: ${computerScore}`;
}

function clearResults() {
  document.getElementById("playerMove").innerText = "";
  document.getElementById("computerMove").innerText = "";
  document.getElementById("roundResult").innerText = "";
  document.getElementById("finalResult").innerText = "";
}

function declareWinner() {
  const final = document.getElementById("finalResult");
  const game = document.getElementById("game");
  const restartBtn = document.getElementById("restart");

  // Hide choices after game ends
  document.getElementById("choices").style.display = "none";
  document.getElementById("playerMove").style.display = "none";
  document.getElementById("computerMove").style.display = "none";
  document.getElementById("roundResult").style.display = "none";
  document.getElementById("score").innerText = "🛑 Game Over!";

  if (playerScore > computerScore) {
    final.innerText = "🎉 The anomaly is contained. For now, your consciousness prevails.";
  } else if (computerScore > playerScore) {
    final.innerText = "💀 Conscious override denied. You now run inside the simulation.";
  } else {
    final.innerText = "🤝 Balance achieved. The Engine observes in silence.";
  }

  restartBtn.style.display = "block";
}

function restartGame() {
  document.getElementById("restartMessage").innerText = "🔁 Recalibrating perception… Do you dare breach the loop again?";
  document.getElementById("choices").style.display = "flex";
  document.getElementById("playerMove").style.display = "block";
  document.getElementById("computerMove").style.display = "block";
  document.getElementById("roundResult").style.display = "block";
  document.getElementById("finalResult").innerText = "";
  document.getElementById("restart").style.display = "none";

  document.getElementById("round-selection").style.display = "block";
}
