/**
 * Add an event listener to the document and runs the main screen with user log-in
 */
document.addEventListener('DOMContentLoaded', function () {
    runMainScreen();
});

/**
 * Set up of game variables to vary display/hide
 */
let mainLoginScreen = document.getElementById("login-screen");
let getInstructions = document.getElementById("instructions-icon");
let displayGuessNumber = document.getElementById("guesses");
let errorMessage = document.getElementById("error-message");
let chooseLevelScreen = document.getElementById("choose-level-screen");
let gameScreen = document.getElementById("game-screen");
let correctScreen = document.getElementById("correct-screen");
let wrongScreen = document.getElementById("wrong-screen");

/**
* Show the main screen with user log-in and instruction icon
*/
function runMainScreen() {
    errorMessage.style.display = "none";
    mainLoginScreen.style.display = "block";
    chooseLevelScreen.style.display = "none";
    gameScreen.style.display = "none";
    correctScreen.style.display = "none";
    wrongScreen.style.display = "none";
    document.getElementById("user-icon").style.display = "none";
    document.getElementById("cloud-icon").style.display = "none";
    document.getElementById("username").innerText = "";
    document.getElementById("user").focus();
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
 * Verification of the user name input on the log-in screen
 */
document.getElementById("user-log").addEventListener("click", checkUsername);

function checkUsername() {
    let username = document.getElementById("user").value.trim()

    if (username.length >= 1 && username.length <= 12) {
        chooseLevelScreen.style.display = "block";
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
 * Input of username using by pressing enter key
 */
document.getElementById("user").addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        checkUsername();
    }
});

/**
 * Data displayed on the game screen
 */
let images;
let phrase = "";
let highScore = 0;
let score = 0;
let guessesLeft = 0;
// Create a keyboard on game screen and verify whether the phrase contains one of the below letters
let alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

/**
 * Display a screen with game levels and based on user's selection display relevant game settings
 */
function selectGameLevel() {
    score = 0;
    document.getElementById('level-buttons').addEventListener('click', function (event) {
        let button = event.target;
        let gameLevel = button.getAttribute('data-type');
        setGame(gameLevel);
    });
}
selectGameLevel()

/**
 * Set the game screen based on level selected.
 * Display selected game level, number of guesses left, high score and score.
 * Set up category and a phrase to be guessed.
 * Populate underscores for hidden phrase and keyboard buttons.
 * @param {string} gameLevel 
 */
function setGame(gameLevel) {
    document.getElementById("difficulty-level").innerHTML = `${gameLevel}`;
    document.getElementById("cloud-icon").style.display = "inline-block";
    document.getElementById("high-score").innerHTML = highScore;
    document.getElementById("score").innerHTML = score;

    let guessingParameters = gameSetup.getGuessingParameters();
    phrase = guessingParameters.phrase;
    document.getElementById("category").innerHTML = `<p>Category:</p> ${guessingParameters.category}`;
    chooseLevelScreen.style.display = "none";
    gameScreen.style.display = "block";

    displaySunImages(gameLevel);
    setGuessingPhrase(phrase);
    showKeyboard();
}

/**
 * Display the game image from game-data file based on selected game level.
 * First displayed image is the last within the image array
 * Guesses in each round are based on the length of image array, varied for different game level.
 * 
 * @param {string} gameLevel 
 */
function displaySunImages(gameLevel) {
    images = gameSetup.showImages(gameLevel);
    document.getElementById("sun-image").src = images[images.length - 1];
    guessesLeft = images.length - 1;
    displayGuessNumber.innerHTML = guessesLeft;
}

/**
 * Display underscores for hidden phrase
 * @param {string} phrase 
 */
function setGuessingPhrase(phrase) {
    let guessingPhrase = showHiddenPhrase(phrase);
    document.getElementById("phrase").innerHTML = guessingPhrase;
}
/**
 * Set up underscores for every letter within the hidden phrase leaving blank spaces between words.
 * @param {string} phrase 
 * @returns {string} undescores
 */
function showHiddenPhrase(phrase) {
    let underscores = "";
    for (let letter of phrase) {
        if (letter !== " ") {
            underscores += "_";
        } else {
            underscores += " ";
        }
    }
    return underscores;
}

/**
 * Populate keyboard buttons in the game screen
 */
function showKeyboard() {
    let keyboard = "";
    for (let letter of alphabet) {
        keyboard += `<button type="button" class="btn btn-primary py-1 px-2 m-1" id="key-${letter}">${letter}</button>`;
    }
    document.getElementById("keyboard").innerHTML = keyboard;
    keyboardEventListeners();
}

/**
 * Add event listeners to populated keyboard button to enable letter guessing with use of mouse and keyboard
 * Call checkLetter function to verify if the phrase contains guessed letter
 */

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
        if (guessesLeft) {
            displayGuessNumber.innerHTML = guessesLeft;
            let nextImageIndex = guessesLeft;
            displayNextSunImage(nextImageIndex);

        } else {
            displayNextSunImage(0);
            displayGuessNumber.innerHTML = 0;
            setTimeout(noGuessesLeft, 700);
        }
    }
}

function displayNextSunImage(nextImageIndex) {
    document.getElementById("sun-image").src = images[nextImageIndex];
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
    correctScreen.style.display = "block";
    gameScreen.style.display = "none";
    document.getElementById("current-round-score").innerHTML = guessesLeft;

    document.getElementById("correct-high-score").innerHTML = highScore;
    document.getElementById("correct-score").innerHTML = score;

    if (guessesLeft === 1) {
        document.getElementById("plural").style.display = "none";
    } else {
        document.getElementById("plural").style.display = "inline";
    }

    document.getElementById("next-phrase").addEventListener("click", function () {
        correctScreen.style.display = "none";
        let sameLevel = document.getElementById("difficulty-level").innerHTML;
        setGame(sameLevel);
    });
}

function noGuessesLeft() {
    gameScreen.style.display = "none";
    wrongScreen.style.display = "block";

    document.getElementById("wrong-score").innerHTML = score;
    document.getElementById("wrong-high-score").innerHTML = highScore;
    document.getElementById('correct-answer').innerHTML = phrase;

    document.getElementById("try-again").addEventListener("click", function () {
        score = 0;
        wrongScreen.style.display = "none";
        let sameLevel = document.getElementById("difficulty-level").innerHTML;
        setGame(sameLevel);
    });

    document.getElementById("restart-game").addEventListener("click", function () {
        score = 0;
        wrongScreen.style.display = "none";
        chooseLevelScreen.style.display = "block";
    });


}