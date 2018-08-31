const express = require("express"),
			router = express.Router(),
			multer  = require("multer"),
			cloudinary = require("cloudinary"),
			middleware = require("../middleware"),
			Image = require("../models/images"),
			Country = require("../models/countries"),
			User = require("../models/users");

// Config: Multer
let storage = multer.diskStorage({
  filename: function(req, file, callback) {
    callback(null, Date.now() + file.originalname);
  }
});

let imageFilter = (req, file, callback) => {
    // Accept image files only
    if(!file.originalname.match(/\.(jpg|jpeg|png)$/i)) {
        return callback(new Error('Only image files are allowed!'), false);
    }
    callback(null, true);
};

var upload = multer({storage: storage, fileFilter: imageFilter});

// Config: Cloudinary
cloudinary.config({
  cloud_name: 'traverzia',
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Route: Upload image
router.get("/", middleware.isLoggedIn, (req, res) => {
	res.render("upload");
});

router.post("/", middleware.isLoggedIn, upload.single("image"), (req, res) => {
	cloudinary.uploader.upload(req.file.path, (uploadResult) => {
  // add cloudinary url for the image to the campground object under image property
		const parsedLocation = req.body.image.location.split(/, /);
		const newImage = {
			source: uploadResult.secure_url,
			imageID: uploadResult.public_id,
			country: parsedLocation[1],
			location: parsedLocation[0],
			caption: req.body.image.caption,
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
});

module.exports = router;
