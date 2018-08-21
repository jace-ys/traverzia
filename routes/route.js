var express = require("express"),
	router = express.Router(),
	Image = require("../models/images"),
	Country = require("../models/countries"),
	User = require("../models/users");

// Route: Home
router.get("/", (req, res) => {
	res.render("home");
});

// Route: Search
router.get("/search", (req, res) => {
	var search = new RegExp(req.query.query, "i");
	User.findOne({username: search}, (err, user) => {
		if(err) {
			console.log(err);
		} else if(!user) {
			Image.find({
				"$or": [{location: search}, {country: search}]
			}).sort({created: -1}).exec((err, images) => {
				if(err) {
					console.log(err);
				} else {
					res.render("search", {search: req.query.query, results: images});
				}
			});
		} else {
			res.redirect(`/${user.username}`);
		}
	});
});

// Route: Discover
router.get("/discover", (req, res) => {
	Image.find().limit(15).sort({created: -1}).exec((err, images) => {
		if(err) {
			console.log(err);
		} else if(!images) {
			req.flash("error", "No content found");
			res.redirect("/");
		} else {
			res.render("discover", {imageData: images});
		}
	});
});

module.exports = router;
