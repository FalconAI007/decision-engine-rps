const choices = ["rock", "paper", "scissors"];
let playerScore = 0;
let computerScore = 0;
let totalRounds = 0;
let currentRound = 0;

const backgroundMusic = document.getElementById("bg-music");
backgroundMusic.loop = true;

// Creative narrative feedback
const playerMessages = {
  rock: "🪨 You deploy Solidity. A classic rebellion.",
  paper: "📜 You unveil the blueprint. Intent is now traceable.",
  scissors: "✂️ You slice the code. Destabilization initiated."
};

const computerMessages = {
  rock: "🪨 The Core stabilizes with gravity.",
  paper: "📜 The Engine wraps your defiance in documentation.",
  scissors: "✂️ But lines of logic cut deep."
};

function startGame() {
  document.getElementById("start-screen").style.display = "none";
  document.getElementById("typewriter").style.display = "block";
  backgroundMusic.play().catch(() => console.warn("Audio autoplay blocked"));
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
  const interval = setInterval(() => {
    if (i < storyLines.length) {
      typeDiv.innerHTML += storyLines[i] + "\n\n";
      i++;
    } else {
      clearInterval(interval);
      document.getElementById("round-selection").style.display = "block";
    }
  }, 80);
}

function setRounds(n) {
  totalRounds = n;
  currentRound = 1;
  playerScore = 0;
  computerScore = 0;
  document.getElementById("round-selection").style.display = "none";
  document.getElementById("game").style.display = "block";
  document.getElementById("playerMove").innerText = "";
  document.getElementById("computerMove").innerText = "";
  document.getElementById("roundResult").innerText = "";
  document.getElementById("finalResult").innerText = "";
  document.getElementById("restart").style.display = "none";
  updateScore();
}

function playRound(playerChoice) {
  if (currentRound > totalRounds) return;

  const computerChoice = choices[Math.floor(Math.random() * choices.length)];
  let result = "";

  document.getElementById("playerMove").innerText = playerMessages[playerChoice];
  document.getElementById("computerMove").innerText = computerMessages[computerChoice];

  if (playerChoice === computerChoice) {
    result = "⚖️ It's a tie. The code hesitates.";
  } else if (
    (playerChoice === "rock" && computerChoice === "scissors") ||
    (playerChoice === "paper" && computerChoice === "rock") ||
    (playerChoice === "scissors" && computerChoice === "paper")
  ) {
    result = "✅ Protocol shift successful. You win this loop.";
    playerScore++;
  } else {
    result = "❌ Your deviation failed. The engine resists.";
    computerScore++;
  }

  document.getElementById("roundResult").innerText = result;
  updateScore();
  currentRound++;

  if (currentRound > totalRounds) {
    declareWinner();
  }
}

function updateScore() {
  document.getElementById("score").innerText = `🧑 Player: ${playerScore} | 🤖 Engine: ${computerScore}`;
}

function declareWinner() {
  const final = document.getElementById("finalResult");
  if (playerScore > computerScore) {
    final.innerText = "🎉 The anomaly is contained. For now, your consciousness prevails.";
  } else if (computerScore > playerScore) {
    final.innerText = "💀 The anomaly exceeds thresholds. Conscious override denied. You are now part of the simulation.";
  } else {
    final.innerText = "🤝 Neither outcome is dominant. The engine will wait. But it remembers.";
  }
  document.getElementById("restart").style.display = "block";
}

function restartGame() {
  document.getElementById("typewriter").innerText = "";
  document.getElementById("game").style.display = "none";
  loadStory();
}
