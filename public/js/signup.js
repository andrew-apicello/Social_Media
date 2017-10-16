$(document).ready(function() {
  // Getting references to our form and input
  var signUpForm = $("form.signup");
  var nameInput = $("input#name-input");
  var emailInput = $("input#email-input");
  var occupationInput = $("input#occupation-input");
  var locationInput = $("#location-input");
  var interest1Input =$("#interest1-input");
  var interest2Input =$("#interest2-input");
  var interest3Input =$("#interest3-input");
  var interest4Input =$("#interest4-input");
  var passwordInput = $("input#password-input");

  // When the signup button is clicked, we validate the email and password are not blank
  signUpForm.on("submit", function(event) {
    event.preventDefault();
    var userData = {
      name: nameInput.val().trim(),
      email: emailInput.val().trim(),
      occupation: occupationInput.val().trim(),
      location: locationInput.val().trim(),
      interest1: interest1Input.val().trim(),
      interest2: interest2Input.val().trim(),
      interest3: interest3Input.val().trim(),
      interest4: interest4Input.val().trim(),
      password: passwordInput.val().trim()
    };

    if (!userData.name || !userData.email || !userData.occupation || !userData.location || !userData.interest1 || !userData.interest2 || !userData.interest3 || !userData.interest4 || !userData.password) {
      return;
    }
    // If we have an email and password, run the signUpUser function
    signUpUser(userData.name, userData.email, userData.occupation, userData.location, userData.interest1, userData.interest2, userData.interest3, userData.interest4, userData.password);
    nameInput.val("");
    emailInput.val("");
    passwordInput.val("");
    occupationInput.val("");
    locationInput.val("");
    interest1Input.val("");
    interest2Input.val("");
    interest3Input.val("");
    interest4Input.val("");
  });

  // Does a post to the signup route. If succesful, we are redirected to the members page
  // Otherwise we log any errors
  function signUpUser(name, email, occupation, location, interest1, interest2, interest3, interest4, password) {
    $.post("/api/signup", {
      name: name,
      email: email,
      occupation: occupation,
      location: location,
      interest1: interest1,
      interest2: interest2,
      interest3: interest3,
      interest4: interest4,
      password: password
    }).then(function(data) {
      window.location.replace(data);
      // If there's an error, handle it by throwing up a boostrap alert
    }).catch(handleLoginErr);
  }

  function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }
});
