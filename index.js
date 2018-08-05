var express = require('express'),
	app = express();

app.set('port', process.env.PORT || 8080);

app.get('/', (req, res) => {
	res.send("Welcome to Traverzia!");
})

var port = app.get('port');
app.listen(port, () => {
	console.log(`Server listening on port ${port}`);
})