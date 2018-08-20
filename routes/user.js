var express = require("express"),
	router = express.Router({mergeParams: true}),
	middleware = require("../middleware"),
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

// Route: Edit user bio
router.post("/update_bio", middleware.checkUser, (req, res) => {
	User.findByIdAndUpdate(req.user._id, {bio: req.body.bio}, (err, user) => {
		if(err) {
			req.flash("error", "Error updating user profile!");
		} else {
			req.flash("success", "User profile updated!");
			res.send({updated: true, user: user});
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
				} else if(!images.length) {
					req.flash("error", "Content not found");
					res.redirect("back");
				} else {
					res.render("user_country", {user: user, country: req.params.country, imageData: images});
				}
			});
		}
	});
});

module.exports = router;
