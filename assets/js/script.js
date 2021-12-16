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
* Show the game instructions
*/
getInstructions.addEventListener("click", showInstructions);

function showInstructions() {
    instructionsScreen.style.display = "block";
    mainLoginScreen.style.display = "none";
}

document.getElementById("close-instructions").addEventListener("click", runMainScreen);


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

document.getElementById("user-log").addEventListener("click", checkUsername);

function checkUsername() {
    let username = document.getElementById("user").value.trim()

    if (username.length >= 1 && username.length <= 12) {
        document.getElementById("choose-level-screen").style.display = "block";
        mainLoginScreen.style.display = "none";
        document.getElementById("user-icon").style.display = "block";
        document.getElementById("username").innerText = username;
        console.log('correct username');
        console.log(username);
    } else {
        errorMessage.style.display = "block";
        document.getElementById("user").focus();
        document.getElementById("user").value = "";
    }
}
checkUsername();


