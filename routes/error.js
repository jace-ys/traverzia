var express = require("express"),
	router = express.Router();

// Handle invalid routes
router.get("/error", (req, res) => {
	res.send("404 page not found!");
});

router.get("*", (req, res) => {
	res.redirect("/error");
});

module.exports = router;