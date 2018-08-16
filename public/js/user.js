var editBio = false;

$("#edit-button").on("click", () => {
	if(!editBio) {
		$("#bio h6").css("visibility", "hidden");
		$("#bio textarea").css("display", "inline-block");
		$("#edit-button").html("<i class='fa fa-check'>");
		editBio = true;
	} else {
		$("#bio h6").css("visibility", "visible");
		$("#bio textarea").css("display", "none");
		$("#edit-button").html("<i class='fa fa-edit'>");
		editBio = false;
	}
});