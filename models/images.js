const mongoose = require("mongoose"),
			Comment = require("./comments");

const imageSchema = new mongoose.Schema({
	source: String,
	imageID: String,
	country: String,
	location: String,
	caption: String,
	author: String,
	created: {type: Date, default: Date.now},
	comments: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: "Comment"
	}]
});

module.exports = mongoose.model("Image", imageSchema);
