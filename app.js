// Require dependencies
var path = require("path"),
	bodyParser = require("body-parser"),
	methodOverride = require("method-override"),
	mongoose = require("mongoose"),
	express = require("express"),
	app = express();

// Setup
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.set("view engine", "ejs");

// Define port for server to listen on
app.set("port", process.env.PORT || 8080);
var port = app.get('port');

// MongoDB Setup
var mlab_uri = require("./access").access.mlab;
mongoose.connect(mlab_uri, {useNewUrlParser: true});

// Data Schemas
var Models = require("./models/traverziadb");
var Image = Models.imageSchema;
var User = Models.userSchema;

// Routes
app.get("/", (req, res) => {
	res.render("home");
});

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

app.get("/discover", (req, res) => {
	res.redirect("/user");
	//res.render("discover");
});

// Route: Sign up
app.get("/signup", (req, res) => {
	res.render("signup");
});

app.post("/signup", (req, res) => {
	res.redirect("/login");
});

// Route: Login
app.get("/login", (req, res) => {
	res.render("login");
});

app.post("/login", (req, res) => {
	res.redirect("/");
});

// Route: Upload image
app.get("/user", (req, res) => {
	Image.find({}, (err, images) => {
		if(err) {
			res.redirect("/error");
		} else {
			res.render("user", {username: "Jace", imageData: images});
		}
	})
});

app.get("/user/upload", (req, res) => {
	res.render("upload");
});

app.post("/user", (req, res) => {
	Image.create(req.body.image, (err, upload) => {
		if(err) {
			res.redirect("/user/upload");
		} else {
			res.redirect("/user");
		}
	});
});

// Route: Edit post
app.get("/user/:imageID", (req, res) => {
	Image.findById(req.params.imageID, (err, resultImage) => {
		if(err) {
			res.redirect("/user");
		} else {
			res.render("view_image", {image: resultImage});
		}
	}); 
});

app.get("/user/:imageID/edit", (req, res) => {
	Image.findById(req.params.imageID, (err, resultImage) => {
		if(err){
			res.redirect(`/user/${req.params.imageID}`);
		} else {
			res.render("edit_post", {image: resultImage});
		}
	});
});

app.put("/user/:imageID", (req, res) => {
	Image.findByIdAndUpdate(req.params.imageID, req.body.image, (err, upload) => {
		if(err){
			res.redirect(`/user/${req.params.imageID}/edit`);
		} else {
			res.redirect(`/user/${req.params.imageID}`);
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

// Listen
app.listen(port, () => {
	console.log(`Server listening on port ${port}`);
});