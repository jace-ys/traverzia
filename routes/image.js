const express = require("express"),
			router = express.Router({mergeParams: true}),
			middleware = require("../middleware"),
			Comment = require("../models/comments"),
			Image = require("../models/images"),
			Country = require("../models/countries"),
			User = require("../models/users");

// Route: View post
router.get("/", (req, res) => {
	User.findOne({username: req.params.username}, (err, user) => {
		if(err) {
			console.log(err);
		} else if(!user) {
			req.flash("error", "User does not exist.");
			res.redirect("/");
		} else {
			Image.findById(req.params.imageID, (err, image) => {
				if(err) {
					console.log(err);
					req.flash("error", "Error occured, please try again later.");
					res.redirect("/");
				} else if(!image) {
					req.flash("error", "Requested content not found.");
					res.redirect(`/${user.username}`);
				} else {
					Comment.find({image: req.params.imageID}).sort({_id: -1}).limit(6).exec((err, comments) => {
						if(err) {
							console.log(err);
						} else {
							res.render("view_image", {user: user, country: req.params.country, image: image, comments: comments});
						}
					});
				}
			});
		}
	});
});

// Route: Add comment
router.post("/comment", middleware.allowComment, (req, res) => {
	const newComment = {
		text: req.body.text,
		author: req.user.username,
		image: req.params.imageID
	}
	if(newComment.text) {
		Image.findById(req.params.imageID, (err, image) => {
			if(err) {
				console.log(err);
			} else {
				Comment.create(newComment, (err, comment) => {
					if(err) {
						console.log(err);
					} else {
						image.comments.push(comment);
						image.save();
						res.send({redirect_url: `/${req.params.username}/${image.country}/${req.params.imageID}`});
					}
				});
			}
		});
	}
});

// Route: Edit post
router.get("/edit", middleware.checkImagePermissions, (req, res) => {
	User.findOne({username: req.params.username}, (err, user) => {
		if(err) {
			console.log(err);
		} else {
			Image.findById(req.params.imageID, (err, image) => {
				if(err) {
					console.log(err);
				} else {
					res.render("edit_post", {user: user, country: req.params.country, image: image});
				}
			});
		}
	});
});

router.put("/", middleware.checkImagePermissions, (req, res) => {
	Image.findByIdAndUpdate(req.params.imageID, req.body.image, (err, upload) => {
		if(err) {
			console.log(err);
		} else {
			req.flash("success", "Post updated!");
			res.redirect(`/${req.params.username}/${req.params.country}/${req.params.imageID}`);
		}
	});
});

// Route: Delete post
router.delete("/", middleware.checkImagePermissions, (req, res) => {
	// Find Image
	Image.findOne({ _id: req.params.imageID}, (err, image) => {
		if(err) {
			console.log(err);
		} else {
			// Remove Image from Country
			Country.findOneAndUpdate({name: image.country}, {"$pull": {images: req.params.imageID}}, (err, country) => {
				if(err) {
					console.log(err);
				} else {
					// Remove Comments associated to Image
					Comment.deleteMany({image: req.params.imageID}, (err) => {
						if(err) {
							console.log(err)
						} else {
							// Check if User has no other Images of that Country
							Image.find({author: req.user.username, country: req.params.country}, (err, images) => {
								if(err) {
									console.log(err);
								} else {
									Image.findByIdAndRemove(req.params.imageID, (err) => {
										if(err) {
											console.log(err);
										} else {
											if(images.length === 1) {
												// Remove Country from User
												User.update(req.user, {"$pull": {countries: country._id}}, (err, user) => {
													if(err) {
														console.log(err);
													} else {
														req.flash("success", "Post deleted!");
														res.redirect(`/${req.user.username}`);
													}
												});
											} else {
												req.flash("success", "Post deleted!");
												res.redirect(`/${req.user.username}`);
											}
										}
									});
								}
							});
						}
					});
				}
			});
		}
	});
});

module.exports = router;
