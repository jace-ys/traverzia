const mongoose = require("mongoose"),
			Image = require("./images");

const countrySchema = new mongoose.Schema({
	name: String,
	images: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: "Image"
	}]
});

module.exports = mongoose.model("Country", countrySchema);
