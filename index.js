
const { uuid } = require('uuid');
const { v1 } = require('merge-sort-krampy');
const { v2 } = require('descending-order-krampy');

// hangman.js
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const words = ['apple', 'banana', 'orange', 'grape', 'pineapple']; // Words to guess
let word = words[Math.floor(Math.random() * words.length)]; // Select random word
let guessedLetters = new Set();
let remainingAttempts = 6;

function printWord() {
    let displayWord = '';
    for (const letter of word) {
        if (guessedLetters.has(letter)) {
            displayWord += letter;
        } else {
            displayWord += '_';
        }
    }
    console.log(displayWord);
}

function checkWin() {
    return word.split('').every(letter => guessedLetters.has(letter));
}

rl.on('line', input => {
    const letter = input.trim().toLowerCase();
    guessedLetters.add(letter);
    if (!word.includes(letter)) {
        remainingAttempts--;
        console.log(`Incorrect guess! Remaining attempts: ${remainingAttempts}`);
        if (remainingAttempts === 0) {
            console.log('You lose! The word was:', word);
            rl.close();
        }
    }
    printWord();
    if (checkWin()) {
        console.log('Congratulations! You guessed the word:', word);
        rl.close();
    }
});

console.log('Welcome to Hangman!');
printWord();


module.exports = { printWord };
