var express = require("express"),
	router = express.Router({mergeParams: true}),
	Image = require("../models/images"),
	Comment = require("../models/comments");

// Route: View post
router.get("/", (req, res) => {
	Image.findById(req.params.imageID).populate("comments").exec((err, image) => {
		if(err) {
			res.redirect("/user/country");
		} else {
			res.render("view_image", {image: image});
		}
	}); 
});

// Route: Add comment
router.post("/comment", canComment, (req, res) => {
	Image.findById(req.params.imageID, (err, image) => {
		if(err) {
			console.log(err);
		} else {
			Comment.create(req.body, (err, comment) => {
				image.comments.push(comment);
				image.save((err) => {
					if(err) {
						console.log(err);
					} else {
						res.send({redirect_url: `/user/:country/${req.params.imageID}`});
					}
				});
			});
		}
	});
});

// Route: Edit post
router.get("/edit", isLoggedIn, (req, res) => {
	Image.findById(req.params.imageID, (err, image) => {
		if(err) {
			console.log(err);
		} else {
			res.render("edit_post", {image: image});
		}
	});
});

router.put("/", isLoggedIn, (req, res) => {
	Image.findByIdAndUpdate(req.params.imageID, req.body.image, (err, upload) => {
		if(err) {
			console.log(err);
		} else {
			res.redirect(`/user/country/${req.params.imageID}`);
		}
	});
});

router.delete("/", isLoggedIn, (req, res) => {
	Image.findByIdAndRemove(req.params.imageID, (err) => {
		if(err) {
			console.log(err);
		} else {
			res.redirect("/user/country");
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

function canComment(req, res, next) {
	if(req.isAuthenticated()) {
		return next();
	}
	res.send({redirect_url: "/login"});
}

module.exports = router;