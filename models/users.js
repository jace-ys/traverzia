var mongoose = require("mongoose");
var Comment = require("./comments");
var Image = require("./images");

var countrySchema = new mongoose.Schema({
	name: String,
	images: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: "Image"
	}]
});

var userSchema = new mongoose.Schema({
	username: String,
	email: String,
	password: String,
	bio: String,
	countries: [countrySchema]
});

exports.userSchema = mongoose.model("User", userSchema);