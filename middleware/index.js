var Image = require("../models/images"),
	User = require("../models/users");

// Middleware
var middleware = {};

middleware.isLoggedIn = function(req, res, next) {
	if(req.isAuthenticated()) {
		return next();
	}
	res.redirect("/login");
}

middleware.checkUser = function(req, res, next) {
	if(req.isAuthenticated()) {
		User.findOne({username: req.params.username}, (err, user) => {
			if(err) {
				console.log(err);
			} else {
				if(user.username === req.user.username) {
					next();
				} else {
					res.send({updated: false});
				}
			}
		});
	} else {
		res.send({updated: false});
	}
}

middleware.allowComment = function(req, res, next) {
	if(req.isAuthenticated()) {
		return next();
	}
	res.send({redirect_url: "/login"});
}

middleware.checkImagePermissions = function(req, res, next) {
	if(req.isAuthenticated()) {
		Image.findById(req.params.imageID, (err, image) => {
			if(err) {
				console.log(err);
			} else {
				if(image.author === req.user.username) {
					next();
				} else {
					res.redirect("back");
				}
			}
		});
	} else {
		res.redirect("back");
	}
}

module.exports = middleware;