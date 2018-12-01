var express = require('express'),
    bodyParser = require('body-parser');

var app = express();

//Set up body-parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//set up routes for application
app.use('/', express.static(__dirname + '/'));
app.use('/scripts', express.static(__dirname + '/node_modules/'));


//web page route
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
let users = require('./backend/api/usersRoutes');
app.use('/api/users', users);

let orders = require('./backend/api/ordersRoutes');
app.use('/api/orders', orders);

let anns = require('./backend/api/annRoutes');
app.use('/api/announcements', anns);


//start app listening
const port = process.env.Port || 8080;

app.listen(port);
console.log("App Listening on port: " + port);
