var express = require("express"),
	router = express.Router({mergeParams: true}),
	Image = require("../models/images"),
	User = require("../models/users");

// Route: View user
router.get("/", (req, res) => {
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
});

// Route: View countries
router.get("/:country", (req, res) => {
	User.findOne({username: "jaceys"}, (err, user) => {
		if(err) {
			res.redirect("/error");
		} else {
			Image.find({}, (err, images) => {
				if(err) {
					res.redirect("/error");
				} else {
					res.render("country", {user: user, imageData: images});
				}
			});
		}
	});
});

// Functions
function isLoggedIn(req, res, next) {
	if(req.isAuthenticated()) {
		return next();
	}
	res.redirect("/login");
}

module.exports = router;