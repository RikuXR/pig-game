var scores, roundScore, activePlayer, gamePlaying, DOMStrings;

init();

document.querySelector(".btn-roll").addEventListener("click", function () {
  if (gamePlaying) {
    // 1. Random number
    var dice = Math.floor(Math.random() * 6) + 1;

    // 2. Display the result
    DOMStrings.diceImage.style.display = "block";
    DOMStrings.diceImage.src = "img/dice-" + dice + ".png";

    // 3. Update the round score IF the rolled number was NOT a 1
    if (dice !== 1) {
      // Add score
      roundScore += dice;
      DOMStrings.currentScore[activePlayer].textContent = roundScore;
    } else {
      // Next player
      nextPlayer();
    }
  }
});

document.querySelector(".btn-hold").addEventListener("click", function () {
  if (gamePlaying) {
    // Add CURRENT score to GLOBAL score
    scores[activePlayer] += roundScore;

    // Update the UI
    DOMStrings.totalScore[activePlayer].textContent = scores[activePlayer];

    // Check if player won the game
    if (scores[activePlayer] >= 20) {
      DOMStrings.playerName[activePlayer].textContent = "Winner!";
      DOMStrings.diceImage.style.display = "none";

      DOMStrings.playerPanel[activePlayer].classList.add("winner");
      DOMStrings.playerPanel[activePlayer].classList.remove("active");

      gamePlaying = false;
    } else {
      // Next player
      nextPlayer();
    }
  }
});

document.querySelector(".btn-new").addEventListener("click", init);

function init() {
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  gamePlaying = true;

  DOMStrings = {
    diceImage: document.querySelector(".dice"),

    totalScore: [
      document.getElementById("score-0"),
      document.getElementById("score-1"),
    ],

    currentScore: [
      document.getElementById("current-0"),
      document.getElementById("current-1"),
    ],

    playerName: [
      document.getElementById("name-0"),
      document.getElementById("name-1"),
    ],

    playerPanel: [
      document.querySelector(".player-0-panel"),
      document.querySelector(".player-1-panel"),
    ],
  };

  DOMStrings.diceImage.style.display = "none";

  DOMStrings.totalScore[0].textContent = "0";
  DOMStrings.totalScore[1].textContent = "0";

  DOMStrings.currentScore[0].textContent = "0";
  DOMStrings.currentScore[1].textContent = "0";

  DOMStrings.playerName[0].textContent = "Player 1";
  DOMStrings.playerName[1].textContent = "Player 2";

  DOMStrings.playerPanel[0].classList.remove("winner");
  DOMStrings.playerPanel[1].classList.remove("winner");

  DOMStrings.playerPanel[0].classList.remove("active");
  DOMStrings.playerPanel[1].classList.remove("active");

  DOMStrings.playerPanel[0].classList.add("active");
}

function nextPlayer() {
  roundScore = 0;
  activePlayer = +!activePlayer;

  DOMStrings.currentScore[0].textContent = 0;
  DOMStrings.currentScore[1].textContent = 0;

  DOMStrings.playerPanel[0].classList.toggle("active");
  DOMStrings.playerPanel[1].classList.toggle("active");

  DOMStrings.diceImage.style.display = "none";
}
