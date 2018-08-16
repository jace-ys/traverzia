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
			// Find Country
			Country.findOne({name: newImage.country}, (err, country) => {
				if(err) {
					console.log(err);
				} else if(!country) { // Create Country if it doesn't exist and push Image
					Country.create({name: newImage.country}, (err, createdCountry) => {
						createdCountry.images.push(image);
						createdCountry.save();
						// Add Country to user
						User.findOneAndUpdate({username: newImage.author}, {"$addToSet": {countries : createdCountry}}, (err, user) => {
							res.send({redirect_url: "/"});
						});
					});
				} else { // Push Image to existing Country
					country.images.push(image);
					country.save();
					// Add Country to user
					User.findOneAndUpdate({username: newImage.author}, {"$addToSet": {countries : country}}, (err, user) => {
						res.send({redirect_url: "/"});
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