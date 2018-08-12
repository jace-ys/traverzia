// $("#edit-form").on('submit', function(e) {
//     e.preventDefault();
//     var formData = {
//         location: $("#edit-form input").val(),
//         caption: $("#edit-form textarea").val() 
//     }
//     console.log(formData);
//     var endpoint = $(this).attr("action");
//     console.log(endpoint);
//     $.ajax({
//         type: "PUT",
//         url: endpoint,
//         data: formData,
//         success: function(res) {
//             console.log("PUT request success");
//         },
//         error: function(res) {
//             console.log("PUT request failed");
//         }
//     });
// });

// $("#delete-button").on('click', function(e) {
//     e.preventDefault();
//     var imageID = $(this).attr("value");
//     console.log(imageID);
//     var endpoint = `/user/country/${imageID}`;
//     console.log(endpoint);
//     $.ajax({
//         type: "DELETE",
//         url: endpoint,
//         data: { 
//             _id: imageID
//         },
//         success: function(res) {
//             console.log("DELETE request success");
//         },
//         error: function(res) {
//             console.log("DELETE request failed");
//         }
//     });
// });

