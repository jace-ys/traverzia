// Require dependencies
var path = require("path"),
	bodyParser = require("body-parser"),
	mongoose = require("mongoose"),
	express = require("express"),
	app = express();

// Setup
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

// MongoDB Setup
var access = require("./access").access;
var mlab_uri = access.mlab;
mongoose.connect(mlab_uri, {useNewUrlParser: true});

// Data Schemas
var Image = require("./models/traverziadb");

// Define port for server to listen on
app.set("port", process.env.PORT || 8080);
var port = app.get('port');

// GET routes
app.get("/", (req, res) => {
	res.render("home");
});

app.get("/login", (req, res) => {
	res.render("login");
});

app.get("/signup", (req, res) => {
	res.render("signup");
});

app.get("/search", (req, res) => {
	Image.find({}, (err, images) => {
		if(err) {
			console.log(err);
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

app.get("/user", (req, res) => {
	Image.find({}, (err, images) => {
		if(err) {
			console.log(err);
		} else {
			res.render("user", {username: "Jace", imageData: images});
		}
	})
});

app.get("/user/upload", (req, res) => {
	res.render("upload");
});

app.get("/user/:imageID", (req, res) => {
	Image.findById(req.params.imageID, (err, resultImage) => {
		if(err) {
			console.log(err);
		}
		res.render("view_image", {image: resultImage})
	}); 
});

// POST routes
app.post("/login", (req, res) => {
	res.redirect("/");
});

app.post("/signup", (req, res) => {
	res.redirect("/login");
});

app.post("/user", (req, res) => {
	var url = req.body.source;
	var location = req.body.location;
	var caption = req.body.caption;
	var uploadImage = {url: url, location: location, caption: caption};
	Image.create(uploadImage, (err, upload) => {
		if(err) {
			console.log(err);
		} else {
			res.redirect("/user");
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