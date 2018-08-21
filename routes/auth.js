const passport = require("passport"),
			express = require("express"),
			router = express.Router(),
			User = require("../models/users");

// Route: Sign up
router.get("/signup", (req, res) => {
	res.render("signup");
});

router.post("/signup", (req, res) => {
	const newUser = new User({ username: req.body.username, name: req.body.name, email: req.body.email, bio: "Bio"});
	User.register(newUser, req.body.password, (err, user) => {
		if(err) {
			console.log(err);
			req.flash("error", "Error creating account! Please try again.");
			return res.render("signup");
		}
		passport.authenticate("local", { session: false })(req, res, () => {
			req.flash("success", "Account created successfully! You can now log in.");
			res.redirect("/login");
		});
	});
});

// Route: Login
router.get("/login", (req, res) => {
	res.render("login");
});

router.post("/login", passport.authenticate("local", {
	failureRedirect: "/login",
	failureFlash: "Invalid username or password."
}), (req, res) => {
	req.flash("success", "You have been logged in.");
	res.redirect(`/${req.user.username}`);
});

//Route: Logout
router.get("/logout", (req, res) => {
	req.logout();
	req.flash("success", "Logout successful.");
	res.redirect("/");
});

module.exports = router;
