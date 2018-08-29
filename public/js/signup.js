let signupForm = $("#signup-form"),
    usernameField = signupForm.find("#username-field input"),
    usernameFeedback = signupForm.find("#username-field div"),
    nameField = signupForm.find("#name-field input"),
    nameFeedback = signupForm.find("#name-field div"),
    emailField = signupForm.find("#email-field input"),
    emailFeedback = signupForm.find("#email-field div"),
    passwordField = signupForm.find("#password-field input"),
    passwordFeedback = signupForm.find("#password-field div");

signupForm.on('submit', function(event) {
  if (!signupForm[0].checkValidity()) {
    event.preventDefault();
    event.stopPropagation();
  }
  signupForm.addClass('was-validated');
});

usernameField.on('blur', () => {
  if(usernameField[0].validity.valueMissing) {
    setInvalid(usernameField, usernameFeedback);
    usernameFeedback.text("Please enter a username.");
  } else {
    validateField(usernameField.val(), "username").then((valid) => {
      if(!valid) {
        setInvalid(usernameField, usernameFeedback);
        usernameFeedback.text("That username is not available.");
        usernameField[0].setCustomValidity("That username is not available.");
      } else {
        setValid(usernameField, usernameFeedback);
        usernameFeedback.text("");
        usernameField[0].setCustomValidity("");
      }
    });
  }
});

nameField.on('blur', () => {
  if(nameField[0].validity.valueMissing) {
    setInvalid(nameField, nameFeedback);
    nameFeedback.text("Please enter your name.");
  } else {
    setValid(nameField, nameFeedback);
    nameFeedback.text("");
  }
});

emailField.on('blur', () => {
  if(emailField[0].validity.valueMissing) {
    setInvalid(emailField, emailFeedback);
    emailFeedback.text("Please enter your email.");
  } else if (emailField[0].validity.typeMismatch) {
    setInvalid(emailField, emailFeedback);
    emailFeedback.text("Please enter a valid email.");
  } else {
    validateField(emailField.val(), "email").then((valid) => {
      if(!valid) {
        setInvalid(emailField, emailFeedback);
        emailFeedback.text("An account belonging to that email already exists.");
        emailField[0].setCustomValidity("An account belonging to that email already exists.");
      } else {
        setValid(emailField, emailFeedback);
        emailFeedback.text("");
        emailField[0].setCustomValidity("");
      }
    });
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

function validateField(fieldInput, key) {
  return fetch(`/signup/validate/${key}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({"input": fieldInput})
  }).then((res) => {
    return res.json();
  }).then((json) => {
    return json.validated;
  }).catch((err) => {
    console.log(err);
  });
};
