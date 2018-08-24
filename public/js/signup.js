let usernameField = $("input[name='username']"),
    usernameFeedback = $("#usernameField div"),
    nameField = $("input[name='name']"),
    nameFeedback = $("#nameField div"),
    emailField = $("input[name='email']"),
    emailFeedback = $("#emailField div"),
    passwordField = $("input[name='password']"),
    passwordFeedback = $("#passwordField div");

usernameField.on('blur', () => {
  if(usernameField.val() === "") {
    setInvalid(usernameField, usernameFeedback);
    usernameFeedback.text("Please enter a username.");
  } else if (!validateField(usernameField.val(), "username")) {
    setInvalid(usernameField, usernameFeedback);
    usernameFeedback.text("That username is not available.");
  } else {
    setValid(usernameField, usernameFeedback);
    usernameFeedback.text("");
  }
});

nameField.on('blur', () => {
  if(nameField.val() === "") {
    setInvalid(nameField, nameFeedback);
    nameFeedback.text("Please enter your name.");
  } else {
    setValid(nameField, nameFeedback);
    nameFeedback.text("");
  }
});

emailField.on('blur', () => {
  if(emailField.val() === "") {
    setInvalid(emailField, emailFeedback);
    emailFeedback.text("Please enter a valid email.");
  } else if (!validateField(emailField.val(), "email")) {
    setInvalid(emailField, emailFeedback);
    emailFeedback.text("An account belonging to that email already exists");
  } else {
    setValid(emailField, emailFeedback);
    emailFeedback.text("");
  }
});

passwordField.on('blur', () => {
  if(passwordField.val() === "") {
    setInvalid(passwordField, passwordFeedback);
    passwordFeedback.text("Please enter a password.");
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

function validateField(fieldInput, key) {
  return false;
}
