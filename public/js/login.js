let loginForm = $("#login-form"),
    usernameField = loginForm.find("#username-field input"),
    usernameFeedback = loginForm.find("#username-field div"),
    passwordField = loginForm.find("#password-field input"),
    passwordFeedback = loginForm.find("#password-field div");

loginForm.on('submit', function(event) {
  loginForm.addClass('was-validated');
  if (!loginForm[0].checkValidity()) {
    event.preventDefault();
    event.stopPropagation();
  }
});

usernameField.on('blur', () => {
  if(usernameField[0].validity.valueMissing) {
    setInvalid(usernameField, usernameFeedback);
    usernameFeedback.text("Please enter your username.");
  } else {
    setValid(usernameField, usernameFeedback);
    usernameFeedback.text("");
  }
});

passwordField.on('blur', () => {
  if(passwordField[0].validity.valueMissing) {
    setInvalid(passwordField, passwordFeedback);
    passwordFeedback.text("Please enter a password.");
  } else if(passwordField[0].validity.patternMismatch) {
    setInvalid(passwordField, passwordFeedback);
    passwordFeedback.text("Please enter a valid password.");
  } else {
    setValid(passwordField, passwordFeedback);
    passwordFeedback.text("");
  }
});

function setInvalid(field, feedback) {
  field.removeClass("is-valid");
  field.addClass("is-invalid");
  feedback.removeClass("valid-feedback");
  feedback.addClass("invalid-feedback");
}

function setValid(field, feedback) {
  field.removeClass("is-invalid");
  field.addClass("is-valid");
  feedback.removeClass("invalid-feedback");
  feedback.addClass("valid-feedback");
}
