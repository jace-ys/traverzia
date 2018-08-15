var express = require("express"),
	router = express.Router({mergeParams: true}),
	Comment = require("../models/comments"),
	Image = require("../models/images"),
	User = require("../models/users");

// Route: View post
router.get("/", (req, res) => {
	User.findOne({username: "jaceys"}, (err, user) => {
		if(err) {
			res.redirect("/error");
		} else {
			Image.findById(req.params.imageID).populate("comments").exec((err, image) => {
				if(err) {
					console.log(err);
				} else {
					res.render("view_image", {user: user, image: image});
				}
			});
		}
	});
});

// Route: Add comment
router.post("/comment", canComment, (req, res) => {
	User.findOne({username: "jaceys"}, (err, user) => {
		if(err) {
			res.redirect("/error");
		} else {
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
								res.send({redirect_url: `/${user.username}/:country/${req.params.imageID}`});
							}
						});
					});
				}
			});
		}
	});
});

// Route: Edit post
router.get("/edit", isLoggedIn, (req, res) => {
	User.findOne({username: "jaceys"}, (err, user) => {
		if(err) {
			console.log(err);
		} else {
			Image.findById(req.params.imageID, (err, image) => {
				if(err) {
					console.log(err);
				} else {
					res.render("edit_post", {user: user, image: image});
				}
			});
		}
	});
});

router.put("/", isLoggedIn, (req, res) => {
	User.findOne({username: "jaceys"}, (err, user) => {
		if(err) {
			console.log(err);
		} else {
			Image.findByIdAndUpdate(req.params.imageID, req.body.image, (err, upload) => {
				if(err) {
					console.log(err);
				} else {
					res.redirect(`/${user.username}/country/${req.params.imageID}`);
				}
			});
		}
	});
});

router.delete("/", isLoggedIn, (req, res) => {
	User.findOne({username: "jaceys"}, (err, user) => {
		if(err) {
			console.log(err);
		} else {
			Image.findByIdAndRemove(req.params.imageID, (err) => {
				if(err) {
					console.log(err);
				} else {
					res.redirect(`/${user.username}/country`);
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

function canComment(req, res, next) {
	if(req.isAuthenticated()) {
		return next();
	}
	res.send({redirect_url: "/login"});
}

module.exports = router;