var mongoose = require("mongoose");
var Comment = require("./comments");

var imageSchema = new mongoose.Schema({
	source: String,
	country: String,
	location: String,
	caption: String,
	created: {type: Date, default: Date.now},
	comments: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: "Comment"
	}]
});

module.exports = mongoose.model("Image", imageSchema);