var express = require('express');

var app = express();

app.use(express.static(__dirname + '/public'));

app.get('*', function(req, res) {
    res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
});

app.listen(8080);
console.log("App Listening on port 8080");