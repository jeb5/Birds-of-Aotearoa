import { BIRDLE_DETAILS } from "./birds.js";
import { DAY_NUMBER } from "./utils.js";

let birdleGuessesState = []; //records the primary names of the birdle birds guessed

export function initializeBirdle() {
  Array.from(document.getElementsByClassName("birdle-choice")).forEach(
    (element) => element.addEventListener("click", birdleChoiceClickHandler)
  );
  loadBirdleState();
}

function birdleChoiceClickHandler(event) {
  choose(event.currentTarget, event.currentTarget.dataset.birdname);
  persistBirdleState();
}

function choose(birdElement, birdName) {
  if (
    birdleGuessesState[birdElement.length - 1] ===
    BIRDLE_DETAILS.birdleBird.primary_name //Aka game won
  )
    return;
  if (birdName === BIRDLE_DETAILS.birdleBird.primary_name)
    handleCorrectGuess(birdElement);
  else handleIncorrectGuess(birdElement);
  birdleGuessesState.push(birdName);
}
function handleCorrectGuess(birdElement) {
  birdElement.classList.add("correct");
  winGame();
}
function handleIncorrectGuess(birdElement) {
  const numGuessesMade = birdleGuessesState.length;
  birdElement.classList.add("incorrect");
  birdElement.removeEventListener("click", birdleChoiceClickHandler);
  if (numGuessesMade >= 4) return loseGame();

  document.getElementById(`birdle-hint-${numGuessesMade + 1}`).innerText =
    BIRDLE_DETAILS.hints[numGuessesMade];
  document.getElementById("birdle-guess-counter").innerText = `Guess ${
    numGuessesMade + 2
  } / 5`;
}

function persistBirdleState() {
  const birdleState = {
    day: DAY_NUMBER,
    guesses: birdleGuessesState,
  };
  localStorage.setItem("birdle-state", JSON.stringify(birdleState));
}
function loadBirdleState() {
  const storedBirdleState = localStorage.getItem("birdle-state");
  if (storedBirdleState === null) return;
  const birdleState = JSON.parse(storedBirdleState);
  if (birdleState.day !== DAY_NUMBER) {
    localStorage.removeItem("birdle-state");
    return;
  }
  birdleGuessesState = [];

  for (const guess of birdleState.guesses) {
    const birdElement = document.querySelector(`[data-birdname="${guess}"]`);
    choose(birdElement, guess);
  }
}

function winGame() {
  const numGuesses = birdleGuessesState.length + 1;
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
}
