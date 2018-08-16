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

// Require routes
var routes = require("./routes/route"),
	userRoutes = require("./routes/user"),
	uploadRoutes = require("./routes/upload"),
	imageRoutes = require("./routes/image"),
	authRoutes = require("./routes/auth"),
	errorRoutes = require("./routes/error");

// General setup
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use(require("express-session")({
	secret: "Discover Traverzia's secret",
	resave: false,
	saveUninitialized: false
}));

// Define port
app.set("port", process.env.PORT || 8080);
var port = app.get("port");

// MongoDB setup
var mlab_uri = require("./access").access.mlab;
mongoose.connect(mlab_uri, {useNewUrlParser: true});

// Data schemas
var Comment = require("./models/comments");
var Image = require("./models/images");
var User = require("./models/users");

// Setup Passport.js
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Middleware
app.use((req, res, next) => {
	res.locals.loggedIn = req.user;
	next();
});
app.use(errorRoutes);
app.use(authRoutes);
app.use(routes);
app.use("/upload", uploadRoutes);
app.use("/:username", userRoutes);
app.use("/:username/:country/:imageID", imageRoutes);

app.get("*", (req, res) => {
	res.redirect("/error");
});

//Error handler
app.use((err, req, res, next) => {
	
});

// Listen
app.listen(port, () => {
	console.log(`Server listening on port ${port}`);
});