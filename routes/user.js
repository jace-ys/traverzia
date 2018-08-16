var express = require("express"),
	router = express.Router({mergeParams: true}),
	Image = require("../models/images"),
	Country = require("../models/countries"),
	User = require("../models/users");

// Route: View user
router.get("/", (req, res, next) => {
	User.findOne({username: req.params.username}, (err, user) => {
		Image.aggregate([
			{ "$match": { author: user.username } },
			{ "$group": { "_id": "$country", "latest": { "$last": "$$ROOT" } } }
		]).exec((err, images) => {
			res.render("user", {user: user, imageData: images});
		});
	});
});

// Route: View country under user
router.get("/:country", (req, res) => {
	User.findOne({username: req.params.username}, (err, user) => {
		Image.aggregate([
			{ "$match": { author: user.username, country: req.params.country } },
		]).exec((err, images) => {
			res.render("country", {user: user, imageData: images});
		});
	});
});

module.exports = router;