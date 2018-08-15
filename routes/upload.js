var express = require("express"),
	router = express.Router(),
	Image = require("../models/images"),
	User = require("../models/users");

// Route: Upload image
router.get("/", isLoggedIn, (req, res) => {
	res.render("upload");
});

router.post("/", isLoggedIn, (req, res) => {
	Image.create(req.body, (err, upload) => {
		if(err) {
			res.redirect("/upload");
		} else {
			res.send({redirect_url: "/"});
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