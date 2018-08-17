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
	res.render("search");
});

// Route: Discover
router.get("/discover", (req, res) => {
	res.redirect("/jaceys");
	//res.render("discover");
});

module.exports = router;