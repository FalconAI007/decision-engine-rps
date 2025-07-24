const choices = ["rock", "paper", "scissors"];
let playerScore = 0;
let computerScore = 0;
let totalRounds = 0;
let currentRound = 0;

const backgroundMusic = document.getElementById("bg-music");
backgroundMusic.loop = true;

const playerMessages = {
  rock: "🪨 You deploy Solidity. A subtle resistance.",
  paper: "📜 You unfold the blueprint. Patterns reveal.",
  scissors: "✂️ You cut deep into code. Divergence begins."
};

const computerMessages = {
  rock: "🪨 Engine invokes mass. Solidity restored.",
  paper: "📜 System wraps logic in layers of control.",
  scissors: "✂️ Code severed clean. Chaos reframed."
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
  const interval = setInterval(() => {
    if (i < storyLines.length) {
      typeDiv.innerHTML += storyLines[i] + "\n\n";
      i++;
    } else {
      clearInterval(interval);
      document.getElementById("round-selection").style.display = "block";
    }
  }, 120); // slower speed
}

function setRounds(n) {
  totalRounds = n;
  currentRound = 1;
  playerScore = 0;
  computerScore = 0;
  document.getElementById("round-selection").style.display = "none";
  document.getElementById("game").style.display = "block";
  document.getElementById("restart").style.display = "none";
  updateScore();
  clearResults();
}

function playRound(playerChoice) {
  if (currentRound > totalRounds) return;

  const computerChoice = choices[Math.floor(Math.random() * choices.length)];

  document.getElementById("playerMove").innerText = playerMessages[playerChoice];
  document.getElementById("computerMove").innerText = `🤖 The Engine chose ${computerChoice.toUpperCase()}. ${computerMessages[computerChoice]}`;

  let result = "";
  if (playerChoice === computerChoice) {
    result = "⚖️ A perfect standoff. Entropy withheld.";
  } else if (
    (playerChoice === "rock" && computerChoice === "scissors") ||
    (playerChoice === "paper" && computerChoice === "rock") ||
    (playerChoice === "scissors" && computerChoice === "paper")
  ) {
    result = "✅ Logic bend successful. You shift the timeline.";
    playerScore++;
  } else {
    result = "❌ Your pattern collapses. The Engine adapts.";
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
  if (playerScore > computerScore) {
    final.innerText = "🎉 The anomaly is contained. For now, your consciousness prevails.";
  } else if (computerScore > playerScore) {
    final.innerText = "💀 Conscious override denied. You now run inside the simulation.";
  } else {
    final.innerText = "🤝 Balance achieved. The Engine observes in silence.";
  }

  document.getElementById("restart").style.display = "block";
}

function restartGame() {
  document.getElementById("typewriter").innerText = "";
  document.getElementById("game").style.display = "none";
  document.getElementById("restart").style.display = "none";
  loadStory();
}

