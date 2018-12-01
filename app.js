var express = require('express'),
    bodyParser = require('body-parser');

var app = express();

//Set up body-parser middleware

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.use('/', express.static(__dirname + '/'));
app.use('/scripts', express.static(__dirname + '/node_modules/'));

app.get('/', function(req, res) {
    res.sendFile('./public/index.html', {"root": __dirname});
});

//Set up mongoose. Will be moved to another location later
var mongoose = require('mongoose');
var dbUri = 'mongodb://cookieuser:securepass1@ds123434.mlab.com:23434/noc-cookies';

mongoose.connect(dbUri, { useNewUrlParser: true});
mongoose.Promise = global.Promise;

const db = mongoose.connection;

db.on('error', console.error.bind(console,'MongoDB connection error: '));
db.once('open', function(){
    console.log("connected");
});

//API routes
let users = require('./backend/api/usersRoutes.js');


app.use('/api/users', users);

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
