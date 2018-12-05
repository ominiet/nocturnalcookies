var express = require('express'),
    bodyParser = require('body-parser'),
    passport = require('passport'),
    session = require('express-session'),
    config = require('config');

var app = express();

//Set up body-parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Passport Config
require('./config/passport')(passport);
app.use(session({secret : 'app secreet', resave: true, saveUninitialized: false}));
app.use(passport.initialize());
app.use(passport.session());

//apply user object to res if there is a user object
app.get('*', function(req, res, next){
    res.locals.user = req.user || null;
    next();
});
//reply with whether or not the user is logged in
app.get('/loggedin', function(req, res){
    res.status(req.isAuthenticated() ? 200 : 401);
    res.send(req.isAuthenticated() ? req.user : '0');
});

//set up routes for application
app.use('/', express.static(__dirname + '/public/'));
app.use('/scripts', express.static(__dirname + '/node_modules/'));


//web page route
app.get('/', function(req, res) {
    res.sendFile('./public/index.html', {"root": __dirname});
});

//Set up mongoose. Will be moved to another location later
var mongoose = require('mongoose');
var dbUri = config.db;

mongoose.connect(dbUri, { useNewUrlParser: true});
mongoose.Promise = global.Promise;

const db = mongoose.connection;

db.on('error', console.error.bind(console,'MongoDB connection error: '));
db.once('open', function(){
    console.log("Connected to mongodb at: " + dbUri);
});



//API routes
let users = require('./backend/api/usersRoutes');
let orders = require('./backend/api/ordersRoutes');

app.use('/api/users', users);
app.use('/api/orders', orders);


//start app listening
const port = process.env.PORT || 8080;

app.listen(port);
console.log("App Listening on port: " + port);

module.exports = app;
