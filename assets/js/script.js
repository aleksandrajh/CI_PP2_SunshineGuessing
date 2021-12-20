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
let wrongAnswersLeft = 0;
let alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";


let levels = document.getElementsByClassName("button-level");
for (let level of levels) {
    level.addEventListener("click", setGame);
}

function setGame(gameType) {
    document.getElementById("difficulty-level").innerHTML = `Level: ${gameType}`;
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
}

function keyboardEventListeners() {
    document.getElementById("keyboard").addEventListener('click', function (event) {
        if (!event.target.className.includes("btn")) return;
        let button = event.target;
        let letter = button.innerHTML;

        if (!button.clicked) {
            button.classList.remove("btn-primary");
            button.classList.add("btn-outline-primary");
            button.disabled = true;
        }
        console.log(letter);
    })

    document.addEventListener("keydown", function logKey(event) {
        let letterPressed = event.key.toUpperCase();
        let button = document.getElementById(`key-${letterPressed}`);

        if (alphabet.includes(letterPressed) && !button.clicked) {
            button.classList.remove("btn-primary");
            button.classList.add("btn-outline-primary");
            button.disabled = true;
        }
        console.log(letterPressed);
    });
}

keyboardEventListeners();
