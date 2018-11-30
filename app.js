var express = require('express');

var app = express();

app.use('/', express.static(__dirname + '/'));
app.use('/scripts', express.static(__dirname + '/node_modules/'));

app.get('/', function(req, res) {
    res.sendFile('./public/index.html', {"root": __dirname});
});


app.listen(8080);
console.log("App Listening on port 8080");
