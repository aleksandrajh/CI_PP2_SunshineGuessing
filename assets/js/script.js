/**
 * Adds an event listener to the document and runs the main screen when the event fires
 */
document.addEventListener('DOMContentLoaded', function () {
    runMainScreen();
});

let mainLoginScreen = document.getElementById("login-screen");
let instructionsScreen = document.getElementById("instructions-screen")
let getInstructions = document.getElementById("instructions-icon");

/**
* Show the main screen with user log-in and start game
*/
function runMainScreen() {
    document.getElementById("error-message").style.display = "none";
    document.getElementById("user-icon").style.display = "none";
    document.getElementById("back").style.display = "none";
    document.getElementById("username").innerText = "";
    document.getElementById("user").focus();
    mainLoginScreen.style.display = "block";
}

/**
* Show the game instructions
*/
getInstructions.addEventListener("click", showInstructions);

function showInstructions() {
    instructionsScreen.style.display = "block";
    mainLoginScreen.style.display = "none";
}
