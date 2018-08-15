var express = require("express"),
	router = express.Router(),
	Image = require("../models/images");

// Route: Home
router.get("/", (req, res) => {
	res.render("home");
});

// Route: Search
router.get("/search", (req, res) => {
	Image.find({}, (err, images) => {
		if(err) {
			res.redirect("/error");
		} else {
			res.render("user", {username: "Jace", imageData: images});
		}
	});
	//res.render("search");
});

// Route: Discover
router.get("/discover", (req, res) => {
	Image.find({}, (err, images) => {
		if(err) {
			res.redirect("/error");
		} else {
			res.render("user", {username: "Jace", imageData: images});
		}
	})
	//res.render("discover");
});

module.exports = router;