const Image = require("../models/images"),
			User = require("../models/users");

// Middleware
let middleware = {};

middleware.isLoggedIn = function(req, res, next) {
	if(req.isAuthenticated()) {
		return next();
	}
	req.flash("error", "You need to be logged in to do that.");
	res.redirect("/login");
}

middleware.checkUser = function(req, res, next) {
	if(req.isAuthenticated()) {
		User.findOne({username: req.params.username}, (err, user) => {
			if(err) {
				console.log(err);
				req.flash("error", "Error occured, please try again later.");
				res.send({updated: false});
			} else if(!user) {
				req.flash("error", "User does not exist.");
				res.send({updated: false});
			} else if(user.username === req.user.username) {
					next();
			} else {
				req.flash("error", "Access Denied.");
				res.send({updated: false});
			}
		});
	} else {
		req.flash("error", "You need to be logged in to do that.");
		res.send({updated: false});
	}
}

middleware.allowComment = function(req, res, next) {
	if(req.isAuthenticated()) {
		return next();
	}
	req.flash("error", "You need to be logged in to do that.");
	res.send({redirect_url: "/login"});
}

middleware.checkImagePermissions = function(req, res, next) {
	if(req.isAuthenticated()) {
		Image.findById(req.params.imageID, (err, image) => {
			if(err) {
				console.log(err);
				req.flash("error", "Error occured, please try again later.");
				res.redirect("back");
			} else if(!image) {
				req.flash("error", "Requested content not found.");
				res.redirect("back");
			} else if(image.author === req.user.username) {
				next();
			} else {
				req.flash("error", "Access denied.");
				res.redirect("back");
			}
		});
	} else {
		req.flash("error", "You need to be logged in to do that.");
		res.redirect("/login");
	}
}

module.exports = middleware;
