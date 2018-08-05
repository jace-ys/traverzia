// Require dependencies
var express = require('express'),
	app = express();

// Define port for server to listen on
app.set('port', process.env.PORT || 3000);
var port = app.get('port');

// Routes
app.get('/', (req, res) => {
	res.send("Welcome to Traverzia");
})

// Listen
app.listen(port, () => {
	console.log(`Server listening on port ${port}`);
})