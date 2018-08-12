/*$("#edit-form").on('submit', function(e) {

    e.preventDefault();

    var endpoint = $(this).attr("action");
    console.log(endpoint);

    $.ajax({
        type: "PUT",
        url: endpoint,
        data: { 
            location: $("#edit-form input").val(),
            caption: $("#edit-form textarea").val() 
        },
        success: function(res) {
            console.log("PUT request success");
        },
        error: function(res) {
            console.log("PUT request failed");
        }
    });
});*/