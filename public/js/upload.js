$("#upload-form").on("submit", (event) => {
	event.preventDefault();
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
});
