const choices = ["rock", "paper", "scissors"];
let playerScore = 0;
let computerScore = 0;
let totalRounds = 0;
let currentRound = 0;

window.onload = function () {
  const storyText = "Welcome to the Decision Engine: Anomaly Protocol.\n\nYou have been selected by the ACM Core to interact with an ancient AI built to judge anomalies in decision-making.\n\nOnly through games of strategy and luck can the protocol be satisfied.\n\nWill you prevail, or be classified as a threat to the machine logic?";
  typeWriter(storyText, () => {
    document.getElementById("round-selection").style.display = "block";
  });
};

function typeWriter(text, callback, i = 0) {
  const typewriterDiv = document.getElementById("typewriter");
  if (!typewriterDiv) return;
  if (i < text.length) {
    typewriterDiv.innerHTML += text.charAt(i);
    setTimeout(() => typeWriter(text, callback, i + 1), 40);
  } else if (callback) {
    callback();
  }
}

function setRounds(n) {
  totalRounds = n;
  currentRound = 1;
  playerScore = 0;
  computerScore = 0;
  document.getElementById("round-selection").style.display = "none";
  document.getElementById("game").style.display = "block";
  updateScore();
}

function playRound(playerChoice) {
  if (currentRound > totalRounds) return;

  const computerChoice = choices[Math.floor(Math.random() * choices.length)];
  let result = "";

  if (playerChoice === computerChoice) {
    result = "It's a tie!";
  } else if (
    (playerChoice === "rock" && computerChoice === "scissors") ||
    (playerChoice === "paper" && computerChoice === "rock") ||
    (playerChoice === "scissors" && computerChoice === "paper")
  ) {
    result = "You win this round!";
    playerScore++;
  } else {
    result = "Computer wins this round.";
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
  const scoreDisplay = document.getElementById("score");
  scoreDisplay.innerText = `🧑 Player: ${playerScore} | 🤖 Computer: ${computerScore}`;
}

function declareWinner() {
  const final = document.getElementById("finalResult");
  if (playerScore > computerScore) {
    final.innerText = "🎉 You win the game! The anomaly is... stable.";
  } else if (computerScore > playerScore) {
    final.innerText = "💀 Computer wins. The anomaly must be terminated.";
  } else {
    final.innerText = "🤝 It's a draw! The machine remains undecided.";
  }
}

