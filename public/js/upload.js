let uploadForm = $("#upload-form"),
    sourceField = uploadForm.find("#source-field input"),
    sourceFeedback = uploadForm.find("#source-field div"),
    locationField = uploadForm.find("#location-field input"),
    locationFeedback = uploadForm.find("#location-field div");

$("#upload-form").on("submit", (event) => {
	uploadForm.addClass("was-validated");
	event.preventDefault();
	if (!loginForm[0].checkValidity()) {
    event.stopPropagation();
  } else {
		const locationInput = $("#upload-form input[name='image[location]']").val();
		const parsedInput = locationInput.split(/, /);
		const location = parsedInput[0];
		const country = parsedInput[1];
		const endpoint = $("#upload-form").attr("action");
		const newImage = {
			source: $("#upload-form input[name='image[source]']").val(),
			country: country,
			location: location,
			caption: $("#upload-form textarea").val()
		}
		$.ajax({
			type: "POST",
	    url: endpoint,
	    data: newImage,
	    dataType: "json",
	    success: function(res) {
	    	if(res.redirect_url) {
	      	window.location.href = res.redirect_url;
	    	}
	    },
	    error: function(res) {
	      window.location.href = "/error";
	    }
		});
	}
});

sourceField.on('blur', () => {
  if(sourceField[0].validity.valueMissing) {
    setInvalid(sourceField, sourceFeedback);
    sourceFeedback.text("Please upload an image.");
  } else {
    setValid(sourceField, sourceFeedback);
    sourceFeedback.text("");
  }
});

locationField.on('blur', () => {
  if(locationField[0].validity.valueMissing || locationField[0].validity.patternMismatch) {
    setInvalid(locationField, locationFeedback);
    locationFeedback.text("Please enter a valid location.");
  } else {
    setValid(locationField, locationFeedback);
    locationFeedback.text("");
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
