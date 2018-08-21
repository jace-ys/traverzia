let editBio = false;

$("#edit-button").on("click", () => {
	if(!editBio) {
		$("#bio h6").css("visibility", "hidden");
		$("#bio textarea").css("display", "inline-block");
		$("#edit-button").html("<i class='fa fa-check'>");
		editBio = true;
	} else {
		updateBio($("#bio textarea").val());
		$("#bio h6").css("visibility", "visible");
		$("#bio textarea").css("display", "none");
		$("#edit-button").html("<i class='fa fa-edit'>");
		editBio = false;
	}
});

function updateBio(text) {
	const bio = text;
	const endpoint = $("#bio textarea").attr("endpoint");
	$.ajax({
		type: "POST",
		url: endpoint,
        data: {bio: bio},
        dataType: "json",
        success: function(res) {
        	if(res.updated) {
            	window.location.href = `/${res.user.username}`;
        	} else {
        		console.log(err);
        	}
        },
        error: function(res) {
            console.log(err);
        }
	});
}
