// Require dependencies
var path = require("path"),
	bodyParser = require("body-parser"),
	methodOverride = require("method-override"),
	passport = require("passport"),
	LocalStrategy = require("passport-local"),
	passportLocalMongoose = require("passport-local-mongoose"),
	mongoose = require("mongoose"),
	express = require("express"),
	app = express();

// General Setup
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use(require("express-session")({
	secret: "Discover Traverzia's secret",
	resave: false,
	saveUninitialized: false
}));

// Define Port
app.set("port", process.env.PORT || 8080);
var port = app.get('port');

// MongoDB Setup
var mlab_uri = require("./access").access.mlab;
mongoose.connect(mlab_uri, {useNewUrlParser: true});

// Data Schemas
var Models = require("./models/users");
var Image = require("./models/images");
var Comment = require("./models/comments");
var User = Models.userSchema;

// Setup Passport.js
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Middleware
app.use((req, res, next) => {
	res.locals.user = req.user;
	next();
});

// Route: Home
app.get("/", (req, res) => {
	res.render("home");
});

// Route: Sign up
app.get("/signup", (req, res) => {
	res.render("signup");
});

app.post("/signup", (req, res) => {
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
app.get("/login", (req, res) => {
	res.render("login");
});

app.post("/login", passport.authenticate("local", {
	successRedirect: "/",
	failureRedirect: "/login"
}));

//Route: Logout
app.get("/logout", (req, res) => {
	req.logout();
	res.redirect("/");
});

// Route: Search
app.get("/search", (req, res) => {
	Image.find({}, (err, images) => {
		if(err) {
			res.redirect("/error");
		} else {
			res.render("user", {username: "Jace", imageData: images});
		}
	});
	//res.render("search");
});

// Route: Discover
app.get("/discover", (req, res) => {
	res.redirect("/user");
	//res.render("discover");
});

// Route: View user
app.get("/user", (req, res) => {
	Image.find({}, (err, images) => {
		if(err) {
			res.redirect("/error");
		} else {
			res.render("user", {username: "Jace", imageData: images});
		}
	})
});

// Route: Upload image
app.get("/user/upload", isLoggedIn, (req, res) => {
	res.render("upload");
});

app.post("/user", (req, res) => {
	Image.create(req.body, (err, upload) => {
		if(err) {
			res.redirect("/user/upload");
		} else {
			res.send({redirect_url: "/user"});
		}
	});
});

// Route: View countries
app.get("/user/:country", (req, res) => {
	Image.find({}, (err, images) => {
		if(err) {
			res.redirect("/error");
		} else {
			res.render("country", {username: "Jace", imageData: images});
		}
	});
});

// Route: View post
app.get("/user/:country/:imageID", (req, res) => {
	Image.findById(req.params.imageID).populate("comments").exec((err, image) => {
		if(err) {
			res.redirect("/user/country");
		} else {
			res.render("view_image", {image: image});
		}
	}); 
});

// Route: Add comment
app.post("/user/:country/:imageID/comment", (req, res) => {
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
						Image.findById(req.params.imageID).populate("comments").exec((err, image) => {
							res.render("comments", {image: image});
						});
					}
				});
			});
		}
	});
});

// Route: Edit post
app.get("/user/:country/:imageID/edit", (req, res) => {
	Image.findById(req.params.imageID, (err, image) => {
		if(err) {
			console.log(err);
		} else {
			res.render("edit_post", {image: image});
		}
	});
});

app.put("/user/:country/:imageID", (req, res) => {
	Image.findByIdAndUpdate(req.params.imageID, req.body.image, (err, upload) => {
		if(err) {
			console.log(err);
		} else {
			res.redirect(`/user/country/${req.params.imageID}`);
		}
	});
});

app.delete("/user/:country/:imageID", (req, res) => {
	Image.findByIdAndRemove(req.params.imageID, (err) => {
		if(err) {
			console.log(err);
		} else {
			res.redirect("/user/country");
		}
	});
});

// Handle invalid routes
app.get("/error", (req, res) => {
	res.send("404 page not found!");
});

app.get("*", (req, res) => {
	res.redirect("/error");
});

// Functions
function isLoggedIn(req, res, next) {
	if(req.isAuthenticated()) {
		return next();
	}
	res.redirect("/login");
}

// Listen
app.listen(port, () => {
	console.log(`Server listening on port ${port}`);
});