$("#upload-form").on("submit", (event) => {
	event.preventDefault();
	var locationInput = $("#upload-form input[name='image[location]']").val();
	var parsedInput = locationInput.split(/, /);
	var location = parsedInput[0];
	var country = parsedInput[1];
	var endpoint = $("#upload-form").attr("action");
	var newImage = {
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