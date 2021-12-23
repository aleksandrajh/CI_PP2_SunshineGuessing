/**
 * Add an event listener to the document and run the main screen with user log-in
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
    document.getElementById("user").focus(); //focus on input element with cursor ready for username input
}

/**
 * Show and close modal with game instructions
 */
getInstructions.addEventListener("click", showInstructions);

function showInstructions() {
    let modal = document.getElementById("myModal");
    modal.classList.add("show-modal");
    document.body.classList.add('greyout-background'); //grey out the background picture when modal pops-up.
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
 * Call checkLetter function to verify if the hidden phrase contains guessed letter
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

/**
 * Verify if the hidden phrase contains guessed letter.
 * The addLetter funtion is called if the letter is found wihin the phrase. The number of remaining guesses and image is not changed.
 * If the letter is not found, the number of guesses is reduced by 1.
 * If there are guesses left within the round, the number is displayed in the top line icon and the displayNextSunImage function is called.
 * If all guesses were used then the last image in the array (index 0) is displayed and noGuessesLeft function called with a delay.
 * 
 * @param {string} letter 
 */
function checkLetter(letter) {
    if (phrase.includes(letter.toLowerCase()) || phrase.includes(letter)) {
        addLetter(letter);
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

/**
 * Display the sun image from the image array with the index of remaining guesses
 * @param {number} nextImageIndex 
 */
function displayNextSunImage(nextImageIndex) {
    document.getElementById("sun-image").src = images[nextImageIndex];
}

/**
 * Replace the underscores with the guessed letter.
 * Call ifPhraseIsGuessed function.
 * @param {string} guessedLetter
 */

function addLetter(guessedLetter) {
    let phraseToGuess = document.getElementById("phrase").innerHTML;
    let newPhrase = phraseToGuess.split("") //logs array of '_' for every hidden letter and ' ' for blank space
        .map((val, index) => guessedLetter.toLowerCase() === phrase[index].toLowerCase() ? phrase[index] : val) //return the guessed letter in the correct phrase index, if within the phrase. Val is a string param. Index is a number param.
        .join(""); //without the join method, the letters displayed would be separated by commas
    ifPhraseIsGuessed(newPhrase);
    document.getElementById("phrase").innerHTML = newPhrase;
}

/**
 * If all letters have been guessed from the phrase, the phraseGuessed function is called. Else, return.
 * @param {string} currentPhrase 
 */
function ifPhraseIsGuessed(currentPhrase) {
    if (currentPhrase === phrase) {
        phraseGuessed();
    } else {
        return;
    }
}

/**
 * If the phrase has been guessed, the score is updated with the number of remaining guesses in the round.
 * High score is updated if the score is higher than high score.
 * The showCorrectScreen function is called.
 */
function phraseGuessed() {
    score += guessesLeft;
    if (score >= highScore) {
        highScore = score;
    }
    showCorrectScreen();
}

/**
 * Display screen when the phrase has been guessed.
 * Show score for the current round, highscore and total user score for the game.
 * Display button to continue the game when clicked.
 */
function showCorrectScreen() {
    correctScreen.style.display = "block";
    gameScreen.style.display = "none";
    document.getElementById("current-round-score").innerHTML = guessesLeft;
    document.getElementById("correct-high-score").innerHTML = highScore;
    document.getElementById("correct-score").innerHTML = score;

    //If number of remaining guesses is more than 1 display the current round score with 'S' at the end of the word 'point'.
    if (guessesLeft > 1) {
        document.getElementById("plural").style.display = "inline";
    } else {
        document.getElementById("plural").style.display = "none";
    }

    document.getElementById("next-phrase").addEventListener("click", function () {
        correctScreen.style.display = "none";
        let sameLevel = document.getElementById("difficulty-level").innerHTML;
        setGame(sameLevel);
    });
}

/**
 * Display screen when the game is over and the are no more guesses remaining.
 * Show the phrase which has not been guessed, score and highscore.
 * Display two buttons with EventListener for user to try again with same game level or restart the game and select other game level.
 */
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