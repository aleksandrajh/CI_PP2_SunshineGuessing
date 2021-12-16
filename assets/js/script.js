/**
 * Adds an event listener to the document and runs the main screen when the event fires
 */
document.addEventListener('DOMContentLoaded', function () {
    runMainScreen();
});

/**
* Show the main screen with user log-in and start game
*/
function runMainScreen() {
    document.getElementById("error-message").style.display = "none";
    document.getElementById("user-icon").style.display = "none";
    document.getElementById("back").style.display = "none";
    document.getElementById("username").innerText = "";
    document.getElementById("user").focus();
    // showArea("login-area");
}

let instructionsScreen = document.getElementById("instructions");

instructionsScreen.addEventListener("click", showInstructions);

function showInstructions() {
    // instructionsScreen.style.display = "visible";
    alert('it works');
}