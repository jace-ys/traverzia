mongoose = require("mongoose");

var imageSchema = new mongoose.Schema({
	url: String,
	location: String,
	caption: String
});

module.exports = mongoose.model("Image", imageSchema);