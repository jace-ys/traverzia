var express = require("express"),
	router = express.Router({mergeParams: true}),
	Image = require("../models/images"),
	Country = require("../models/countries"),
	User = require("../models/users");

// Route: View user
router.get("/", (req, res, next) => {
	User.findOne(req.params, (err, user) => {
		if(err) {
			console.log(err);
		} else {
			var images = [];
			for(country of user.countries) {
				Image.findOne({country: country, author: user.username}, (err, countryImage) => {
					images.push(countryImage);
				})
			}
			console.log(images);
			res.render("user", {imageData: images});
		}
	});
});

// Route: View country
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