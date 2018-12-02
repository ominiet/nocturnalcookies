var express = require('express');

var app = express();

app.use('/', express.static(__dirname + '/'));
app.use('/scripts', express.static(__dirname + '/node_modules/'));

app.get('/', function(req, res) {
    res.sendFile('./public/index.html', {"root": __dirname});
});

app.get('/confirmation', function(req, res) {
    res.sendFile('./public/confirmation.html', {"root": __dirname});
});

app.get('/adminpage', function(req, res) {
    res.sendFile('./public/adminpage.html', {"root": __dirname});
});

app.get('/signin', function(req, res) {
    res.sendFile('./public/signin.html', {"root": __dirname});
});

app.get('/signup', function(req, res) {
    res.sendFile('./public/signup.html', {"root": __dirname});
});


app.listen(8080);
console.log("App Listening on port 8080");
