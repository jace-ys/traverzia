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

app.get("/search", (req, res) => {
	var search = req.query.search;
	res.render("user", {username: data.user, imageData: data.images});
})

app.get("/user", (req, res) => {
	res.render("user", {username: data.user, imageData: data.images});
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