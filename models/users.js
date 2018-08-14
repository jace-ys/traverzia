var mongoose = require("mongoose"),
	passportLocalMongoose = require("passport-local-mongoose"),
	Country = require("./countries");

var userSchema = new mongoose.Schema({
	username: String,
	name: String,
	email: String,
	password: String,
	bio: String,
	countries: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: "Country"
	}]
});

userSchema.plugin(passportLocalMongoose);

exports.userSchema = mongoose.model("User", userSchema);