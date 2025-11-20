const WORD_LIST = ["APPLE", "HOUSE", "WATER", "MUSIC", "PEACE", "TRAIN", "EARTH", "OCEAN",
    "GHOST", "CHAIR", "TABLE", "CLOUD", "RIVER", "BEACH", "LIGHT", "SHADOW",
    "MAGIC", "MONEY", "STONE", "HEART", "HAPPY", "BRAVE", "SMART", "QUIET",
    "FUNNY", "TIGER", "ZEBRA", "LION", "SNAKE", "MOUSE", "BREAD", "CHEESE",
    "COFFEE", "SUGAR", "FLOUR", "GRAPE", "LEMON", "PIZZA", "SALAD", "SOUP",
    "PAPER", "PENCIL", "BOOK", "CLOCK", "PHONE", "RADIO", "STREET", "TOWER",
    "BRIDGE", "PARK", "FENCE", "GRASS", "FLOWER", "GARDEN", "SCHOOL", "STORE",
    "DOCTOR", "POLICE", "FARMER", "ARTIST", "WRITER", "SINGER", "DANCER", "PILOT",
    "TRUCK", "CARGO", "MOTOR", "CYCLE", "PLANE", "ROCKET", "SHOES", "SOCKS",
    "SHIRT", "PANTS", "DRESS", "SKIRT", "GLOVE", "SCARF", "WINTER", "SUMMER",
    "SPRING", "AUTUMN", "YESTERDAY", "TODAY", "TOMORROW", "FAMILY", "FRIEND",
    "CHILD", "ADULT", "NEIGHBOR", "PROBLEM", "SOLUTION", "SYSTEM", "ENERGY",
    "FUTURE", "GLOBAL", "HEALTH", "JOURNEY", "KINDNESS", "LIBRARY", "MINUTE",
    "OFFICE", "QUALITY", "REASON"];

let WORD = ''; //chosen word
let RIGHT_LETTERS = []; //guessed letters
let WRONG_LETTERS = []; //wrong letters
const MAX_ATTEMPTS = 10; //total amount of attempts
const FAILSOUND = new Audio('assets/audio/fail.mp3')

let YOUR_SCORE = 0;
const SCORE_DISPLAY = document.getElementById('score-display');

const OVERLAY = document.getElementById('pop-up');

const WORD_DISPLAY = document.getElementById('word-display');
const WRONG_LETTERS_DISPLAY = document.getElementById('wrong-letters');
const MESSAGE_DISPLAY = document.getElementById('message');
const HANGMAN_DISPLAY = document.getElementById('hangman');
const NEW_GAME = document.getElementById('new-game');


function randomNumber(max) {
    return Math.floor(Math.random()*max);
}

function initializeGame() {
    //changeAvatar();

    const RANDOM_INDEX = randomNumber(WORD_LIST.length);
    WORD = WORD_LIST[RANDOM_INDEX];
    RIGHT_LETTERS = Array(WORD.length).fill('_');
    WRONG_LETTERS = [];
    WORD_DISPLAY.textContent = RIGHT_LETTERS.join(' ');
    WRONG_LETTERS_DISPLAY.textContent = `Wrong letters: ${WRONG_LETTERS.join(', ')}`;
    MESSAGE_DISPLAY.textContent = '';

    const parts = HANGMAN_DISPLAY.querySelectorAll('div');
    parts.forEach(part => part.classList.add('hidden'));

    console.log(WORD);
}

function updateWordDisplay() {
    WORD_DISPLAY.textContent = RIGHT_LETTERS.join(' ');
}

function updateWrongLetterDisplay() {
    const ATTEMPTS_LEFT = MAX_ATTEMPTS - WRONG_LETTERS.length;
    WRONG_LETTERS_DISPLAY.textContent = 
        `Wrong letters: ${WRONG_LETTERS.join(', ')} | Attempts left: ${ATTEMPTS_LEFT}`;
        FAILSOUND.play();
}

function checkGameStatus() {
    if (!RIGHT_LETTERS.includes('_')) {
        MESSAGE_DISPLAY.textContent = 'YOU WIN!';
        document.removeEventListener('keydown', handleKeyPress);

        YOUR_SCORE ++;
        SCORE_DISPLAY.innerHTML = 'Your score: ' + YOUR_SCORE;

        showPopup("win");
        return true;
    }

    if (WRONG_LETTERS.length >= MAX_ATTEMPTS) {
        MESSAGE_DISPLAY.textContent = `GAME OVER! The word was: ${WORD}`;
        document.removeEventListener('keydown', handleKeyPress);

        showPopup("lose");
        return true;
    }

    return false;
}

function handleGuess(letter) {
    if (RIGHT_LETTERS.includes(letter) || WRONG_LETTERS.includes(letter)) {
        MESSAGE_DISPLAY.textContent = `You already tried the letter '${letter}'.`;
        return;
    }
    if (WORD.includes(letter)) {
        MESSAGE_DISPLAY.textContent = 'Correct letter!';
        for (let i = 0; i < WORD.length; i++) {
            if (WORD[i] === letter) {
                RIGHT_LETTERS[i] = letter;
            }
        }
        updateWordDisplay();

    } else {
        MESSAGE_DISPLAY.textContent = 'Wrong letter!';
        WRONG_LETTERS.push(letter);
        updateWrongLetterDisplay();

        drawHangmanPart(WRONG_LETTERS.length);
    }
    
    checkGameStatus();
}


function handleKeyPress(event) {
    const key = event.key.toUpperCase();

    if (key.length === 1 && key >= 'A' && key <= 'Z') {
        if (!checkGameStatus()) {
            handleGuess(key);
        }
    }
}


document.addEventListener('DOMContentLoaded', () => {

    initializeGame();
    
    document.addEventListener('keydown', handleKeyPress);

    /*NEW_GAME.addEventListener('click', () => {
    initializeGame();
    document.addEventListener('keydown', handleKeyPress);
    });*/
});

//Hangman
function drawHangmanPart(errorCount) {
    const parts = HANGMAN_DISPLAY.querySelectorAll('div');

    if (errorCount >= 1 && errorCount <= 10) {

        for (let i = 0; i < errorCount; i++) {
            if (parts[i]) {
                parts[i].classList.remove('hidden');
            }
        }
    }
}

const choiceAvatar1 = document.getElementById("choice-avatar-1");
const choiceAvatar2 = document.getElementById("choice-avatar-2");
const choiceAvatar3 = document.getElementById("choice-avatar-3");

const avatarPopup = document.getElementById("avatar-choice-container");


choiceAvatar1.addEventListener("click", () => {
    console.log(choiceAvatar1);
    changeAvatar(choiceAvatar1.dataset.avatar);
    avatarPopup.classList.add("hidden");
});

choiceAvatar2.addEventListener("click", () => {
    changeAvatar(choiceAvatar2.dataset.avatar);
    avatarPopup.classList.add("hidden");
});

choiceAvatar3.addEventListener("click", () => {
    changeAvatar(choiceAvatar3.dataset.avatar);
    avatarPopup.classList.add("hidden");
});

function changeAvatar(avatarNumber) {
    console.log("Changed avatar to: " + avatarNumber);
    document.getElementById("head").dataset.avatar = avatarNumber;
}

const POPUP_OVERLAY = document.getElementById("popup-overlay");
const POPUP_WIN = document.getElementById("popup-win");
const POPUP_LOSE = document.getElementById("popup-lose");

const WIN_SCORE = document.getElementById("win-score");
const LOSE_WORD = document.getElementById("lose-word");

const BTN_WIN = document.getElementById("btn-win");
const BTN_LOSE = document.getElementById("btn-lose");

function showPopup(type) {
    POPUP_OVERLAY.classList.remove("hidden");

    if (type === "win") {
        WIN_SCORE.textContent = YOUR_SCORE;
        POPUP_WIN.classList.remove("hidden");
    }

    if (type === "lose") {
        LOSE_WORD.textContent = WORD;
        POPUP_LOSE.classList.remove("hidden");
    }
}

function hidePopups() {
    POPUP_OVERLAY.classList.add("hidden");
    POPUP_WIN.classList.add("hidden");
    POPUP_LOSE.classList.add("hidden");
}

BTN_WIN.addEventListener("click", () => {
    hidePopups();
    initializeGame();
    document.addEventListener("keydown", handleKeyPress);
});

BTN_LOSE.addEventListener("click", () => {
    hidePopups();
    initializeGame();
    document.addEventListener("keydown", handleKeyPress);
});