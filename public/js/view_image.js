let commentForm = $("#comment-form");

commentForm.on("submit", (event) => {
	event.preventDefault();
	if(commentForm[0].checkValidity()) {
		const endpoint = $("#comment-form").attr("action");
		$.ajax({
	    type: "POST",
	    url: endpoint,
	    data: {text: $("#comment-form textarea").val()},
	    success: function(res) {
	        window.location.href = res.redirect_url;
	    },
	    error: function(res) {
	        console.log(res);
	    }
	  });
	}
});
