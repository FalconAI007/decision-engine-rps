const choices = ["rock", "paper", "scissors"];
let playerScore = 0;
let computerScore = 0;
let totalRounds = 0;
let currentRound = 0;

const bgMusic = document.getElementById("bg-music");
bgMusic.loop = true;

const playerMessages = {
  rock: "🪨 You cut through the noise. Intent clear.",
  paper: "📜 You lay out the plan. Transparent and exposed.",
  scissors: "✂️ You disrupt structure. A clean incision."
};

const computerMessages = {
  rock: "🪨 The Engine chooses ROCK. Stability enforced.",
  paper: "📜 The Engine chooses PAPER. Layers veil the anomaly.",
  scissors: "✂️ The Engine chooses SCISSORS. Code sliced clean."
};

function startGame() {
  document.getElementById("start-screen").style.display = "none";
  document.getElementById("typewriter").style.display = "block";
  bgMusic.play().catch(() => {});
  loadStory();
}

function loadStory() {
  const lines = [
    "In a world rewritten by code, where past, present, and future converge...",
    "You are not just a player. You are the anomaly.",
    "ACM—The Archive of Conscious Minds—has activated the Decision Engine to test your deviation from deterministic logic.",
    "This is not a game. It's a protocol to predict chaos.",
    "The choices you make will echo through subroutines beyond your reality.",
    "Welcome, Initiator."
  ];

  let i = 0;
  const div = document.getElementById("typewriter");
  div.innerText = "";
  const interval = setInterval(() => {
    if (i < lines.length) {
      div.innerHTML += lines[i] + "\n\n";
      i++;
    } else {
      clearInterval(interval);
      document.getElementById("round-selection").style.display = "block";
    }
  }, 180);
}

function setRounds(n) {
  totalRounds = n;
  currentRound = 1;
  playerScore = 0;
  computerScore = 0;

  document.getElementById("round-selection").style.display = "none";
  document.getElementById("game").style.display = "block";
  document.getElementById("restart").style.display = "none";
  document.getElementById("restartMessage").style.display = "none";

  clearResults();
  updateScore();
  document.getElementById("choices").style.display = "flex";
  document.getElementById("playerMove").style.display = "block";
  document.getElementById("computerMove").style.display = "block";
  document.getElementById("roundResult").style.display = "block";
}

function playRound(playerChoice) {
  if (currentRound > totalRounds) return;

  const computerChoice = choices[Math.floor(Math.random() * choices.length)];

  document.getElementById("playerMove").innerText = playerMessages[playerChoice];
  document.getElementById("computerMove").innerText = computerMessages[computerChoice];

  let result = "";
  if (playerChoice === computerChoice) {
    result = "⚖️ Balance held. Neither logic dominates.";
  } else if (
    (playerChoice === "rock" && computerChoice === "scissors") ||
    (playerChoice === "paper" && computerChoice === "rock") ||
    (playerChoice === "scissors" && computerChoice === "paper")
  ) {
    result = "✅ Logic breach successful. You remain undetected.";
    playerScore++;
  } else {
    result = "❌ Your pattern was parsed. The simulation adapts.";
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
  document.getElementById("score").innerText = "🛑 Game Over!";
  document.getElementById("choices").style.display = "none";
  document.getElementById("playerMove").style.display = "none";
  document.getElementById("computerMove").style.display = "none";
  document.getElementById("roundResult").style.display = "none";

  const final = document.getElementById("finalResult");
  if (playerScore > computerScore) {
    final.innerText = "🎉 The anomaly is contained. For now, your consciousness prevails.";
  } else if (computerScore > playerScore) {
    final.innerText = "💀 Conscious override denied. You now run inside the simulation.";
  } else {
    final.innerText = "🤝 Balance achieved. The Engine observes in silence.";
  }

  const restart = document.getElementById("restart");
  restart.style.display = "inline-block";
}

function restartGame() {
  document.getElementById("restartMessage").innerText = "🔁 Recalibrating perception… Do you dare breach the loop again?";
  document.getElementById("restartMessage").style.display = "block";
  document.getElementById("round-selection").style.display = "block";
  document.getElementById("finalResult").innerText = "";
  document.getElementById("restart").style.display = "none";
}
