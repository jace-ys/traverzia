// Require dependencies
const path = require("path"),
			bodyParser = require("body-parser"),
			methodOverride = require("method-override"),
			flash = require("connect-flash"),
			passport = require("passport"),
			LocalStrategy = require("passport-local"),
			passportLocalMongoose = require("passport-local-mongoose"),
			mongoose = require("mongoose"),
			express = require("express"),
			app = express();

// Require routes
const mainRoutes = require("./routes/main"),
			userRoutes = require("./routes/user"),
			uploadRoutes = require("./routes/upload"),
			imageRoutes = require("./routes/image"),
			authRoutes = require("./routes/auth"),
			errorRoutes = require("./routes/error");

// Define port
app.set("port", process.env.PORT || 8080);
const port = app.get("port");

// General setup
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(methodOverride("_method"));
app.use(require("express-session")({
	secret: "Discover Traverzia's secret",
	resave: false,
	saveUninitialized: false
}));
app.use(flash());

// MongoDB setup
const mlab_uri = require("./access").access.mlab;
mongoose.connect(mlab_uri, {useNewUrlParser: true});

// Schemas
const User = require("./models/users");

// Setup Passport.js
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Response locals
app.use((req, res, next) => {
	res.locals.loggedIn = req.user;
	res.locals.success = req.flash("success");
	res.locals.error = req.flash("error");
	next();
});

// Routes
app.use(errorRoutes);
app.use(authRoutes);
app.use(mainRoutes);
app.use("/upload", uploadRoutes);
app.use("/:username", userRoutes);
app.use("/:username/:country/:imageID", imageRoutes);

app.get("*", (req, res) => {
	res.redirect("/error");
});

// Error handler
app.use((err, req, res, next) => {

});

// Listen
app.listen(port, () => {
	console.log(`Server listening on port ${port}`);
});
