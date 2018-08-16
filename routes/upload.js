var express = require("express"),
	router = express.Router(),
	Image = require("../models/images"),
	Country = require("../models/countries"),
	User = require("../models/users");

// Route: Upload image
router.get("/", isLoggedIn, (req, res) => {
	res.render("upload");
});

router.post("/", isLoggedIn, (req, res) => {
	var newImage = req.body;
	newImage.author = req.user.username;
	// Create Image
	Image.create(newImage, (err, image) => {
		if(err) {
			console.log(err);
		} else {
			// Find/create Country and push Image
			Country.findOneAndUpdate({name: newImage.country}, {"$push": {images: image}}, {upsert: true, new: true}, (err, country) => {
				if(err) {
					console.log(err);
				} else {
					// Add Country to user
					User.findOneAndUpdate({username: req.user.username}, {"$addToSet": {countries : country}}, (err, user) => {
						if(err) {
							console.log(err);
						} else {
							res.send({redirect_url: `/${req.user.username}`});
						}
					});
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