mongoose = require("mongoose");

var ImageSchema = new mongoose.Schema({
	source: String,
	location: String,
	caption: String,
	created: {type: Date, default: Date.now}
});

var CountrySchema = new mongoose.Schema({
	country: String,
	images: [ImageSchema]
});

var UserSchema = new mongoose.Schema({
	username: String,
	email: String,
	password: String,
	bio: String,
	countries: [CountrySchema]
});

exports.imageSchema = mongoose.model("Image", ImageSchema);
exports.userSchema = mongoose.model("User", UserSchema);