var express = require("express"),
	router = express.Router();

// Handle invalid routes
router.get("/error", (req, res) => {
	res.send("404 page not found!");
});

router.get("/error")

module.exports = router;