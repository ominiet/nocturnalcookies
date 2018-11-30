var express = require('express');

var app = express();

app.use('/', express.static(__dirname + '/'));
app.use('/scripts', express.static(__dirname + '/node_modules/'));

app.get('/', function(req, res) {
    res.sendFile('./public/index.html', {"root": __dirname});
});

//Set up mongoose. Will be moved to another location later
var mongoose = require('mongoose');
var dbUri = 'mongodb://cookieuser:securepass1@ds123434.mlab.com:23434/noc-cookies';

mongoose.connect(dbUri);
mongoose.Promise = global.Promise;

const db = mongoose.connection;

db.on('error', console.error.bind(console,'MongoDB connection error: '));
db.once('open', function(){
    console.log("connected");
});

var User = require("./backend/models/Users");
/*
let user = new User();
user.username = "user";
user.password = "password";
user.role = "admin";

user.save(function(err){
    if (err){
        console.log(err);
        return;
    } else {
        console.log(user);
    }
});*/
const port = process.env.Port || 8080;

app.listen(port);
console.log("App Listening on port: " + port);
