/**
 * Add an eventListener to listen for the submit.
 * Sends an email to site owner through emailJS if the submit is fired.
 * Script taken from the official EmailJS tutorial https://www.emailjs.com/docs/tutorial/creating-contact-form/
 */

document.getElementById("contact-form").addEventListener("submit", function (event) {
    event.preventDefault();
    // these IDs from the previous steps
    emailjs.init("user_ky3jHn7C0IfrC1dfTWauP");
    emailjs.sendForm("sunshineguessing", "sgg-contact-form", this)
        .then(function () {
            console.log("SUCCESS!");
        }, function (error) {
            console.log("FAILED...", error);
        });
});
