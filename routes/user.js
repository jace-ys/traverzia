var express = require("express"),
	router = express.Router({mergeParams: true}),
	Image = require("../models/images"),
	User = require("../models/users");

// Route: View user
router.get("/", (req, res, next) => {
	User.findOne(req.params, (err, user) => {
		if(err) {
			console.log(err);
		} else if(!user) {
			const error = new Error("User not found");
    		error.httpStatusCode = 404;
    		return next(error);
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
	User.findOne({username: req.params.username}, (err, user) => {
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

module.exports = router;