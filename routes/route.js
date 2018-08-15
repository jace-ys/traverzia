var express = require("express"),
	router = express.Router(),
	Image = require("../models/images"),
	User = require("../models/users");

// Route: Home
router.get("/", (req, res) => {
	res.render("home");
});

// Route: Search
router.get("/search", (req, res) => {
	User.findOne({username: "jaceys"}, (err, user) => {
		if(err) {
			res.redirect("/error");
		} else {
			Image.find({}, (err, images) => {
				if(err) {
					res.redirect("/error");
				} else {
					res.render("user", {user: user, imageData: images});
				}
			});
		}
	});
	//res.render("search");
});

// Route: Discover
router.get("/discover", (req, res) => {
	User.findOne({username: "jaceys"}, (err, user) => {
		if(err) {
			res.redirect("/error");
		} else {
			Image.find({}, (err, images) => {
				if(err) {
					res.redirect("/error");
				} else {
					res.render("user", {user: user, imageData: images});
				}
			});
		}
	});
	//res.render("discover");
});

module.exports = router;