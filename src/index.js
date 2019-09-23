"use strict";

// imports
import Hangman from "./hangman";
import getPuzzle from "./requests";

// game setup
let gameOne

// render puzzle and remainingGuesses to html / window
const puzzleEl = document.querySelector("#puzzle");
const remainingEl = document.querySelector("#remaining-guesses");

// listen for keypresses and convert charCode to letter, used as guess in makeGuess function
window.addEventListener("keypress", (e) => {
    const guess = String.fromCharCode(e.charCode);
    gameOne.makeGuess(guess);
    gameOne.updateStatus();
    console.log(gameOne.status);
    render();
});

// render game
const render = () => {
    // using custom getters for puzzle and statusMessage
    puzzleEl.innerHTML = "";
    remainingEl.textContent = gameOne.statusMessage;
    // render each letter in word as a separate span
    gameOne.puzzle.split("").forEach((letter) => {
        const letterEl = document.createElement("span");
        letterEl.textContent = letter;
        puzzleEl.appendChild(letterEl);
    });
}

// function to start game - use async function
const startGame = async () => {
    // await return of data from getPuzzle before use
    const puzzle = await getPuzzle("2");
    // new instance of Hangman class created using puzzle data return from API request
    gameOne = new Hangman(puzzle, 5);
    render();
}

// listener for reset button - calls startGame function
document.querySelector("#reset").addEventListener("click", startGame);

// intial call to start call
startGame();