mongoose = require("mongoose");

var ImageSchema = new mongoose.Schema({
	source: String,
	location: String,
	caption: String,
	created: {type: Date, default: Date.now}
});

var UserSchema = new mongoose.Schema({
	userDetails: {
		username: String,
		email: String,
		password: String,
		bio: String
	},
	content: [ImageSchema]
});

exports.imageSchema = mongoose.model("Image", ImageSchema);
exports.userSchema = mongoose.model("User", UserSchema);