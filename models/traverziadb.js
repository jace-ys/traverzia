mongoose = require("mongoose");

var ImageSchema = new mongoose.Schema({
	source: String,
	location: String,
	caption: String,
	created: {type: Date, default: Date.now}
});

var UserSchema = new mongoose.Schema({
	profile: {
		username: String,
		email: String,
		password: String,
		bio: String
	},
	countries: [{
		country: String,
		images: [ImageSchema]
	}]
});

exports.imageSchema = mongoose.model("Image", ImageSchema);
exports.userSchema = mongoose.model("User", UserSchema);