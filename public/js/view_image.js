$("#comment-form").on("submit", (event) => {
	event.preventDefault();
	var endpoint = $("#comment-form").attr("action");
	var newComment = {
		text: $("#comment-form textarea").val(),
		author: "Jace"
	}
	$.ajax({
        type: "POST",
        url: endpoint,
        data: newComment,
        success: function(res) {
        	$("#comment-form textarea").val("");
            $("#comments").html(res);
        },
        error: function(res) {
            console.log("Failed to submit comment");
        }
    });
})