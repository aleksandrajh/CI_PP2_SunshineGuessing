/**
 * Adds an event listener to the document and runs the main screen when the event fires
 */
document.addEventListener('DOMContentLoaded', function () {
    runMainScreen();
});

let mainLoginScreen = document.getElementById("login-screen");
let instructionsScreen = document.getElementById("instructions-screen")
let getInstructions = document.getElementById("instructions-icon");
let errorMessage = document.getElementById("error-message");


/**
* Show the main screen with user log-in and start game
*/
function runMainScreen() {
    errorMessage.style.display = "none";
    document.getElementById("user-icon").style.display = "none";
    document.getElementById("back").style.display = "none";
    document.getElementById("username").innerText = "";
    document.getElementById("user").focus();
    mainLoginScreen.style.display = "block";
    instructionsScreen.style.display = "none";
}

/**
 * Show and close modal with game instructions
 */
getInstructions.addEventListener("click", showInstructions);

function showInstructions() {
    let modal = document.getElementById('myModal');
    modal.classList.add('show-modal');
};

function closeModal() {
    let modal = document.getElementById('myModal');
    modal.classList.remove('show-modal');
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
