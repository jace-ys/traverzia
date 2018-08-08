// Require dependencies
var path = require("path"),
	bodyParser = require("body-parser"),
	express = require("express"),
	app = express();

// Setup
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

var data = require("./models/data").data;

// Define port for server to listen on
app.set("port", process.env.PORT || 3000);
var port = app.get('port');

// GET routes
app.get("/", (req, res) => {
	res.render("home");
})

app.get("/login", (req, res) => {
	res.render("login");
})

app.get("/signup", (req, res) => {
	res.render("signup");
})

app.get("/search", (req, res) => {
	var query = req.query.q;
	res.render("user", {username: data.user, imageData: data.images});
})

app.get("/user", (req, res) => {
	res.render("user", {username: data.user, imageData: data.images});
})

app.get("/user/upload", (req, res) => {
	res.render("upload");
})

// POST routes
app.post("/login", (req, res) => {
	res.redirect("/");
})

app.post("/signup", (req, res) => {
	res.redirect("/login");
})

app.post("/user", (req, res) => {
	var source = req.body.source;
	var location = req.body.location;
	var caption = req.body.caption;
	var uploadedImage = {img_id: 9, img_src: source, img_location: location, img_caption: "9"};
	data["images"].push(uploadedImage);
	res.redirect("/user");
})

// Handle invalid routes
app.get("/error", (req, res) => {
	res.send("404 page not found!");
})

app.get("*", (req, res) => {
	res.redirect("/error");
})

// Listen
app.listen(port, () => {
	console.log(`Server listening on port ${port}`);
})