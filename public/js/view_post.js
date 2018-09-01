let commentForm = $("#comment-form");

commentForm.on("submit", (event) => {
	event.preventDefault();
	const endpoint = $("#comment-form").attr("action");
	$.ajax({
    type: "POST",
    url: endpoint,
    data: {text: $("#comment-form textarea").val()},
    success: function(res) {
			console.log(res);
      window.location.href = res.redirect_url;
    },
    error: function(res) {
      console.log(res);
    }
  });
});
