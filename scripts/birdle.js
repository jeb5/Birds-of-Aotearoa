import { BIRDLE_DETAILS } from "./birds.js";

let numGuesses = 1;
let gameOver = false;

export function addBirdleListeners() {
  Array.from(document.getElementsByClassName("birdle-choice")).forEach(
    (element) => element.addEventListener("click", birdleChoiceClickHandler)
  );
}

function birdleChoiceClickHandler(event) {
  choose(event.currentTarget, event.currentTarget.dataset.birdname);
}

function choose(birdElement, birdName) {
  if (gameOver) return;
  if (BIRDLE_DETAILS.birdleBird.primary_name === birdName) {
    birdElement.classList.add("correct");
    return winGame();
  } else {
    birdElement.classList.add("incorrect");
    birdElement.removeEventListener("click", birdleChoiceClickHandler);

    if (numGuesses <= 4)
      document.getElementById(`birdle-hint-${numGuesses}`).innerText =
        BIRDLE_DETAILS.hints[numGuesses - 1];

    numGuesses++;
    if (numGuesses > 5) return loseGame();

    document.getElementById(
      "birdle-guess-counter"
    ).innerText = `Guess ${numGuesses} / 5`;
  }
}
function winGame() {
  document.getElementById("birdle-container").classList.add("game-won");
  document.getElementById(
    "birdle-guess-counter"
  ).innerText = `Guessed the bird in ${numGuesses} guess${
    numGuesses > 1 ? "es" : ""
  }!`;

  endGame();
}
function loseGame() {
  document.getElementById("birdle-container").classList.add("game-lost");
  document.getElementById("birdle-guess-counter").innerText =
    "Better luck next time!";
  endGame();
}
function endGame() {
  document.getElementById("birdle-container").classList.add("game-finished");
  Array.from(document.getElementsByClassName("birdle-choice")).forEach(
    (element) => {
      element.removeEventListener("click", birdleChoiceClickHandler);
    }
  );
  document.getElementById("birdle-hint-1").innerText = BIRDLE_DETAILS.hints[0];
  document.getElementById("birdle-hint-2").innerText = BIRDLE_DETAILS.hints[1];
  document.getElementById("birdle-hint-3").innerText = BIRDLE_DETAILS.hints[2];
  document.getElementById("birdle-hint-4").innerText = BIRDLE_DETAILS.hints[3];
  document
    .querySelector(
      `[data-birdname="${BIRDLE_DETAILS.birdleBird.primary_name}"]`
    )
    .classList.add("the-correct-bird");
  gameOver = true;
}
