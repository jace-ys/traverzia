var passport = require("passport"),
	express = require("express"),
	router = express.Router();

// Route: Sign up
router.get("/signup", (req, res) => {
	res.render("signup");
});

router.post("/signup", (req, res) => {
	var newUser = new User({ username: req.body.username, name: req.body.name, email: req.body.email });
	User.register(newUser, req.body.password, (err, user) => {
		if(err) {
			console.log(err);
			return res.render("signup");
		}
		passport.authenticate("local", { session: false })(req, res, () => {
			res.redirect("/login");
		});
	});
});

// Route: Login
router.get("/login", (req, res) => {
	res.render("login");
});

router.post("/login", passport.authenticate("local", {
	successRedirect: "/",
	failureRedirect: "/login"
}));

//Route: Logout
router.get("/logout", (req, res) => {
	req.logout();
	res.redirect("/");
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