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
goBack = document.getElementById("back");

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
* Show the game instructions
*/
getInstructions.addEventListener("click", showInstructions);

function showInstructions() {
    instructionsScreen.style.display = "block";
    mainLoginScreen.style.display = "none";
    goBackArrow.style.display = "inline-block";
}

document.getElementById("close-instructions").addEventListener("click", runMainScreen);
goBack.addEventListener("click", runMainScreen);


// /**
//  * Display specific screen
//  */
// function showScreen(screenName) {
//     let screens = document.getElementsByClassName("screen");
//     for (let screen of screens) {
//         if (screen.id === screenName) {
//             screen.style.display = "block";
//             console.log('it works');
//         } else {
//             screen.style.display = "none";
//             console.log('error');
//         }
//     }
// };


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
        goBack.style.display = "inline-block";
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
