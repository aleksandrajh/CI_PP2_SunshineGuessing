/**
* Show the main screen with user log-in and start game
*/
function runMainScreen() {
    document.getElementById("error-message").style.display = "none";
    document.getElementById("user-icon").style.display = "none";
    document.getElementById("back").style.display = "none";
    document.getElementById("username").innerText = "";
    document.getElementById("user").focus();
    showArea("login-area");
}

runMainScreen();