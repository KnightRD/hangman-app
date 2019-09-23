"use strict";

// Hangman class & constructor function
class Hangman {
    constructor(word, remainingGuesses) {
        this.word = word.toLowerCase().split("");
        this.remainingGuesses = remainingGuesses;
        this.guessedLetters = [];
        this.status = "playing"
    }
    // custom getter - renders letter if guessed or "*" for unguessed
    get puzzle() {
        let puzzle = "";
        this.word.forEach((letter) => {
            if (this.guessedLetters.includes(letter) || letter === " ") {
                puzzle += letter;
            } else {
                puzzle += "*";
            }
        });
        return puzzle;
    }
    // method to make guess and keep track of letters guessed and number of remaining guesses
    makeGuess(guess) {
        guess = guess.toLowerCase();
        const isUnique = !this.guessedLetters.includes(guess);
        const isBadGuess = !this.word.includes(guess);
        if (!this.status === "playing") {
            return
        }
        if (isUnique) {
            this.guessedLetters.push(guess);
        }
        if (isUnique && isBadGuess) {
            this.remainingGuesses--;
        }
    }
    // method to update playing status depending on scenario
    updateStatus() {
        const finished = this.word.every((letter) => this.guessedLetters.includes(letter) || letter === " ");
        if (finished) {
            this.status = "finished";
        } else if (this.remainingGuesses > 0) {
            this.status = "playing";
        }
        else if (this.remainingGuesses === 0) {
            this.status = "failed";
        }
    }
    // method to return relevant status message
    get statusMessage() {
        if (this.status === "playing") {
            return `Guesses left: ${this.remainingGuesses}`;
        } else if (this.status === "finished") {
            return `Great work! You guessed the word!`;
        } else if (this.status === "failed") {
            return `Nice try! The word was ${this.word.join("")}`;
        }
    }
}

// exports
export { Hangman as default };