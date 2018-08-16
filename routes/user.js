var express = require("express"),
	router = express.Router({mergeParams: true}),
	Image = require("../models/images"),
	User = require("../models/users");

// Route: View user
router.get("/", (req, res, next) => {
	// Find User
	User.findOne({username: req.params.username}, (err, user) => {
		if(err) {
			console.log(err);
		} else {
			// Aggregate latest Image from each country group
			Image.aggregate([
				{ "$match": { author: user.username } },
				{ "$group": { "_id": "$country", "latest": { "$last": "$$ROOT" } } }
			]).exec((err, images) => {
				if(err) {
					console.log(err);
				} else {
					res.render("user", {user: user, imageData: images});
				}
			});
		}
	});
});

// Route: View country under user
router.get("/:country", (req, res) => {
	// Find User
	User.findOne({username: req.params.username}, (err, user) => {
		if(err) {
			console.log(err);
		} else {
			// Get all Images from selected country
			Image.aggregate([
				{ "$match": { author: user.username, country: req.params.country } },
				{ "$sort": { created: -1 } }
			]).exec((err, images) => {
				if(err) {
					console.log(err);
				} else {
					res.render("country", {user: user, country: req.params.country, imageData: images});
				}
			});
		}
	});
});

module.exports = router;