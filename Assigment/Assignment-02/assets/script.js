const API_KEY = "-";

const HOME_SCREEN = document.getElementById("home-screen");
const GAME_CONTAINER = document.getElementById("main-container");
const BTN_PLAY = document.getElementById("btn-play");
const BTN_MENU = document.getElementById("btn-menu");
const BTN_CATEGORY_MENU = document.getElementById("btn-category-menu");

let WORD = "";
let RIGHT_LETTERS = [];
let WRONG_LETTERS = [];
const MAX_ATTEMPTS = 10;

const FAILSOUND = new Audio("assets/audio/fail.mp3");
const clickSound = new Audio("assets/sfx/click.mp3");

let SELECTED_CATEGORY = "fiction";

let YOUR_SCORE = 0;
const SCORE_DISPLAY = document.getElementById("score-display");
const WORD_DISPLAY = document.getElementById("word-display");
const WRONG_LETTERS_DISPLAY = document.getElementById("wrong-letters");
const MESSAGE_DISPLAY = document.getElementById("message");
const HANGMAN_DISPLAY = document.getElementById("hangman");

function fetchBookTitle(callback) {
    const url = `https://www.googleapis.com/books/v1/volumes?q=subject:${SELECTED_CATEGORY}&maxResults=40&printType=books&key=${API_KEY}`;
    fetch(url)
        .then(r => r.json())
        .then(data => {
            if (!data.items || data.items.length === 0) return callback("UNKNOWN");
            const randomBook = data.items[Math.floor(Math.random() * data.items.length)];
            let title = (randomBook.volumeInfo.title || "UNKNOWN")
                .toUpperCase()
                .replace(/[^A-Z0-9 ]/g, "")
                .trim();
            callback(title);
        })
        .catch(() => callback("ERROR"));
}

function initializeGame() {
    fetchBookTitle(title => {
        WORD = title;
        RIGHT_LETTERS = [];
        WRONG_LETTERS = [];
        for (let char of WORD) {
            RIGHT_LETTERS.push(char === " " ? " " : "_");
        }
        updateWordDisplay();
        WRONG_LETTERS_DISPLAY.textContent = "Wrong letters: ";
        MESSAGE_DISPLAY.textContent = "";
        HANGMAN_DISPLAY.querySelectorAll("div").forEach(p => p.classList.add("hidden"));
        document.addEventListener("keydown", handleKeyPress);
        BTN_CATEGORY_MENU.classList.remove("hidden");
    });
}

function updateWordDisplay() {
    WORD_DISPLAY.innerHTML = RIGHT_LETTERS
        .map(c => (c === " " ? "&nbsp;&nbsp;&nbsp;" : c))
        .join(" ");
}

function updateWrongLetterDisplay() {
    const attemptsLeft = MAX_ATTEMPTS - WRONG_LETTERS.length;
    WRONG_LETTERS_DISPLAY.textContent =
        `Wrong letters: ${WRONG_LETTERS.join(", ")} | Attempts left: ${attemptsLeft}`;
    FAILSOUND.play();
}

function checkGameStatus() {
    if (!RIGHT_LETTERS.includes("_")) {
        MESSAGE_DISPLAY.textContent = "YOU WIN!";
        document.removeEventListener("keydown", handleKeyPress);
        YOUR_SCORE++;
        SCORE_DISPLAY.innerHTML = YOUR_SCORE;
        showPopup("win");
        return true;
    }
    if (WRONG_LETTERS.length >= MAX_ATTEMPTS) {
        MESSAGE_DISPLAY.textContent = `GAME OVER! The title was: ${WORD}`;
        document.removeEventListener("keydown", handleKeyPress);
        showPopup("lose");
        return true;
    }
    return false;
}

function handleGuess(letter) {
    if (RIGHT_LETTERS.includes(letter) || WRONG_LETTERS.includes(letter)) {
        MESSAGE_DISPLAY.textContent = `You already tried '${letter}'.`;
        return;
    }
    if (WORD.includes(letter)) {
        for (let i = 0; i < WORD.length; i++) {
            if (WORD[i] === letter) RIGHT_LETTERS[i] = letter;
        }
        updateWordDisplay();
    } else {
        WRONG_LETTERS.push(letter);
        updateWrongLetterDisplay();
        drawHangmanPart(WRONG_LETTERS.length);
    }
    checkGameStatus();
}

function handleKeyPress(event) {
    const key = event.key.toUpperCase();
    if (key >= "A" && key <= "Z" && key.length === 1) handleGuess(key);
}

function drawHangmanPart(errorCount) {
    const parts = HANGMAN_DISPLAY.querySelectorAll("div");
    if (parts[errorCount - 1]) parts[errorCount - 1].classList.remove("hidden");
}

/* ======================
   POPUP VITTORIA/SCONFITTA
   ====================== */
const POPUP_OVERLAY = document.getElementById("popup-overlay");
const POPUP_WIN = document.getElementById("popup-win");
const POPUP_LOSE = document.getElementById("popup-lose");
const WIN_SCORE = document.getElementById("win-score");
const LOSE_WORD = document.getElementById("lose-word");
document.getElementById("btn-win").onclick = () => {
    hidePopups();
    initializeGame();
};
document.getElementById("btn-lose").onclick = () => {
    hidePopups();
    initializeGame();
};

function showPopup(type) {
    POPUP_OVERLAY.classList.remove("hidden");
    if (type === "win") {
        WIN_SCORE.textContent = YOUR_SCORE;
        POPUP_WIN.classList.remove("hidden");
    } else {
        LOSE_WORD.textContent = WORD;
        POPUP_LOSE.classList.remove("hidden");
    }
}

function hidePopups() {
    POPUP_OVERLAY.classList.add("hidden");
    POPUP_WIN.classList.add("hidden");
    POPUP_LOSE.classList.add("hidden");
}

/* ======================
   SCELTA AVATAR
   ====================== */
document.querySelectorAll("#avatar-list li").forEach(item => {
    item.onclick = () => {
        document.getElementById("head").dataset.avatar = item.dataset.avatar;
        document.getElementById("avatar-choice-container").classList.add("hidden");
        GAME_CONTAINER.classList.remove("hidden");
        initializeGame();
    };
});

/* ======================
   CATEGORIE
   ====================== */
const categoryItems = document.querySelectorAll("#category-list li");
categoryItems.forEach(item => {
    item.onclick = () => {
        categoryItems.forEach(c => c.classList.remove("selected"));
        item.classList.add("selected");
        SELECTED_CATEGORY = item.dataset.category;

        // Nascondi pannello categorie
        document.getElementById("avatar-choice-container").classList.add("hidden");

        // Mostra gioco
        GAME_CONTAINER.classList.remove("hidden");

        // Riattiva tastiera
        document.addEventListener("keydown", handleKeyPress);

        // Avvia nuova partita
        initializeGame();
    };
});

BTN_CATEGORY_MENU.addEventListener("click", () => {
    clickSound.currentTime = 0;
    clickSound.play();
    document.removeEventListener("keydown", handleKeyPress);
    GAME_CONTAINER.classList.add("fade-out");
    setTimeout(() => {
        GAME_CONTAINER.classList.add("hidden");
        GAME_CONTAINER.classList.remove("fade-out");
        BTN_CATEGORY_MENU.classList.add("hidden");
        document.getElementById("avatar-choice-container").classList.remove("hidden");
    }, 400);
});

document.addEventListener("DOMContentLoaded", () => {
    // Evidenzia categoria di default
    const defaultCategory = document.querySelector(`#category-list li[data-category="${SELECTED_CATEGORY}"]`);
    if (defaultCategory) defaultCategory.classList.add("selected");

    // Mostra pannello avatar/categorie
    const avatarContainer = document.getElementById("avatar-choice-container");
    if (avatarContainer) avatarContainer.classList.remove("hidden");

    // Nascondi gioco e pulsante categories
    GAME_CONTAINER.classList.add("hidden");
    BTN_CATEGORY_MENU.classList.add("hidden");
});

/* ======================
   HOME SCREEN BUTTONS
   ====================== */
BTN_PLAY.addEventListener("click", () => {
    clickSound.currentTime = 0;
    clickSound.play();
    HOME_SCREEN.classList.add("fade-out");
    setTimeout(() => {
        HOME_SCREEN.classList.add("hidden");
        GAME_CONTAINER.classList.remove("hidden");
        BTN_MENU.classList.remove("hidden");
    }, 400);
});

BTN_MENU.addEventListener("click", () => {
    clickSound.currentTime = 0;
    clickSound.play();
    GAME_CONTAINER.classList.add("fade-out");
    setTimeout(() => {
        GAME_CONTAINER.classList.add("hidden");
        BTN_MENU.classList.add("hidden");
        HOME_SCREEN.classList.remove("hidden");
        HOME_SCREEN.classList.add("fade-in");
    }, 400);
});
