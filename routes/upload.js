const express = require("express"),
			router = express.Router(),
			multer  = require("multer"),
			upload = multer({ dest: 'uploads/' }),
			middleware = require("../middleware"),
			Image = require("../models/images"),
			Country = require("../models/countries"),
			User = require("../models/users");

// Route: Upload image
router.get("/", middleware.isLoggedIn, (req, res) => {
	res.render("upload");
});

router.post("/", middleware.isLoggedIn, upload.single("image"), (req, res) => {
	const locationInput = req.body.location;
	const parsedInput = locationInput.split(/, /);
	const location = parsedInput[0];
	const country = parsedInput[1];
	const newImage = {
		source: `/uploads/${req.file.filename}`,
		country: country,
		location: location,
		caption: req.body.caption,
		author: req.user.username
	};
	//Create Image
	Image.create(newImage, (err, image) => {
		if(err) {
			console.log(err);
			req.flash("error", "Failed to upload image, please try again.");
			res.redirect(`/${req.user.username}`);
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
							req.flash("success", "Upload successful!");
							res.redirect(`/${req.user.username}`);
						}
					});
				}
			});
		}
	});
});

module.exports = router;
