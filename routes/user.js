var express = require("express"),
	router = express.Router(),
	Image = require("../models/images");

// Route: View user
router.get("/", (req, res) => {
	Image.find({}, (err, images) => {
		if(err) {
			res.redirect("/error");
		} else {
			res.render("user", {username: "Jace", imageData: images});
		}
	})
});

// Route: Upload image
router.get("/upload", isLoggedIn, (req, res) => {
	res.render("upload");
});

router.post("/user", isLoggedIn, (req, res) => {
	Image.create(req.body, (err, upload) => {
		if(err) {
			res.redirect("/user/upload");
		} else {
			res.send({redirect_url: "/user"});
		}
	});
});

// Route: View countries
router.get("/:country", (req, res) => {
	Image.find({}, (err, images) => {
		if(err) {
			res.redirect("/error");
		} else {
			res.render("country", {username: "Jace", imageData: images});
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