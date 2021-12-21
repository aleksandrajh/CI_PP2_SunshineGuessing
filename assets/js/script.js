/**
 * Adds an event listener to the document and runs the main screen when the event fires
 */
document.addEventListener('DOMContentLoaded', function () {
    runMainScreen();
});

let mainLoginScreen = document.getElementById("login-screen");
let getInstructions = document.getElementById("instructions-icon");
let errorMessage = document.getElementById("error-message");


/**
* Show the main screen with user log-in and start game
*/
function runMainScreen() {
    errorMessage.style.display = "none";
    document.getElementById("user-icon").style.display = "none";
    document.getElementById("username").innerText = "";
    document.getElementById("user").focus();
    mainLoginScreen.style.display = "block";
}

/**
 * Show and close modal with game instructions
 */
getInstructions.addEventListener("click", showInstructions);

function showInstructions() {
    let modal = document.getElementById("myModal");
    modal.classList.add("show-modal");
    document.body.classList.add('greyout-background');
};

function closeInstructions() {
    let modal = document.getElementById("myModal");
    modal.classList.remove("show-modal");
    document.body.classList.remove('greyout-background');
}

/**
 * Verification of the user name input on the login screen
 */
document.getElementById("user-log").addEventListener("click", checkUsername);

function checkUsername() {
    let username = document.getElementById("user").value.trim()

    if (username.length >= 1 && username.length <= 12) {
        document.getElementById("choose-level-screen").style.display = "block";
        mainLoginScreen.style.display = "none";
        document.getElementById("user-icon").style.display = "block";
        document.getElementById("username").innerText = username;
    } else {
        errorMessage.style.display = "block";
        document.getElementById("user").focus();
        document.getElementById("user").value = "";
    }
}
checkUsername();

/**
 * Input of username using the enter key
 */
document.getElementById("user").addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        checkUsername();
    }
});

// Game's data
let images;
let phrase = "";
let highScore = 0;
let score = 0;
let guessesLeft = 0;
let alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";


function selectGameLevel() {
    score = 0;
    document.getElementById('level-buttons').addEventListener('click', function (event) {
        let button = event.target;
        let gameLevel = button.getAttribute('data-type');
        setGame(gameLevel);
    });
}
selectGameLevel()

function setGame(gameLevel) {
    document.getElementById("difficulty-level").innerHTML = `Level: ${gameLevel}`;
    document.getElementById("high-score").innerHTML = highScore;
    document.getElementById("score").innerHTML = score;

    let guessingParameters = gameSetup.getGuessingParameters();
    phrase = guessingParameters.phrase;
    document.getElementById("category").innerHTML = `<p>Category:</p> ${guessingParameters.category}`;
    document.getElementById("game-screen").style.display = "block";
    document.getElementById("choose-level-screen").style.display = "none";

    setGuessingPhrase(phrase);
    showKeyboard();
}

function setGuessingPhrase(phrase) {
    let guessingPhrase = showHiddenPhrase(phrase);
    document.getElementById("phrase").innerHTML = guessingPhrase;
}

function showHiddenPhrase(phrase) {
    let underscores = "";
    for (let letter of phrase) {
        if (letter === " ") {
            underscores += " ";
        } else {
            underscores += "_";
        }
    }
    return underscores;
}

function showKeyboard() {
    let keyboard = "";
    for (let letter of alphabet) {
        keyboard += `<button type="button" class="btn btn-primary py-1 px-2 m-1" id="key-${letter}">${letter}</button>`;
    }
    document.getElementById("keyboard").innerHTML = keyboard;
    keyboardEventListeners();
}

function keyboardEventListeners() {
    document.getElementById("keyboard").addEventListener('click', function (event) {
        if (!event.target.className.includes("btn")) return;
        let button = event.target;
        let letter = button.innerHTML;

        if (!button.className.includes("clicked")) {
            button.classList.remove("btn-primary");
            button.classList.add("btn-outline-primary", "clicked");
            button.disabled = true;
            checkLetter(letter);
        }

    })

    document.addEventListener("keydown", function logKey(event) {
        let letterPressed = event.key.toUpperCase();
        let button = document.getElementById(`key-${letterPressed}`);

        if (alphabet.includes(letterPressed) && !button.className.includes("pressed")) {
            button.classList.remove("btn-primary");
            button.classList.add("btn-outline-primary", "pressed");
            checkLetter(letterPressed);
        }
    });
}


function checkLetter(letter) {
    if (phrase.includes(letter.toLowerCase()) || phrase.includes(letter)) {
        addLetters(letter);
    } else {
        guessesLeft -= 1;
        console.log("You lost 1 guess");
        if (guessesLeft) {
            // display relevant picture for number of guesses left
        } else {
            noGuessesLeft();
        }
    }
}

function addLetters(guess) {
    let phraseToGuess = document.getElementById("phrase").innerHTML;
    let newPhrase = phraseToGuess.split("")
        .map((x, index) => guess.toLowerCase() === phrase[index].toLowerCase() ? phrase[index] : x)
        .join("");
    ifPhraseIsGuessed(newPhrase);
    document.getElementById("phrase").innerHTML = newPhrase;
}

function ifPhraseIsGuessed(currentPhrase) {
    if (currentPhrase === phrase) {
        phraseGuessed();
    } else {
        return;
    }
}

function phraseGuessed() {
    score += guessesLeft;
    if (score >= highScore) {
        highScore = score;
    }
    showCorrectScreen();
}

function showCorrectScreen() {
    document.getElementById("correct-screen").style.display = "block";
    document.getElementById("game-screen").style.display = "none";

    document.getElementById("high-score").innerHTML = highScore;
    document.getElementById("score").innerHTML = score;

    document.getElementById("next-phrase").addEventListener("click", function () {
        let gameLevel = document.getElementById("difficulty-level").innerHTML;
        setGame(gameLevel);
        document.getElementById("correct-screen").style.display = "none";
    });

    document.getElementById("restart-game").addEventListener("click", function () {
        selectGameLevel();
    });
}



function noGuessesLeft() {
    document.getElementById("wrong-screen").style.display = "block";
    document.getElementById("game-screen").style.display = "none";
}