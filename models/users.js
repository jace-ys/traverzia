const mongoose = require("mongoose"),
			passportLocalMongoose = require("passport-local-mongoose"),
			Country = require("./countries");

const userSchema = new mongoose.Schema({
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

// Add Passport Local Mongoose to User Schema
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);
