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
var routes = require("./routes/routes"),
	userRoutes = require("./routes/user"),
	imageRoutes = require("./routes/image"),
	authRoutes = require("./routes/auth"),
	errorRoutes = require("./routes/error");

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
app.use(routes);
app.use("/user", userRoutes);
app.use("/user/:country/:imageID", imageRoutes);
app.use(authRoutes);
app.use(errorRoutes);

// Listen
app.listen(port, () => {
	console.log(`Server listening on port ${port}`);
});