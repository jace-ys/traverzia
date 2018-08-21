const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
	text: String,
	author: String,
	image: String,
});

module.exports = mongoose.model("Comment", commentSchema);
