//import cors from 'cors';

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');




const bodyParser = require('body-parser');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var apiRouter = require('./routes/api');
var cors = require('cors');
const API_PORT = 3001;
var app = express();
/*app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header("Access-Control-Allow-Headers", "Authorization", "Cache-Control", "Origin","Accept", "X-Requested-With", "Content-Type", "Access-Control-Request-Method", "Access-Control-Request-Headers");
  next();
});*/

/*app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Max-Age', '3600');
  res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, OPTIONS, DELETE');
  next();
});*/



var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Authorization, Cache-Control, Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    next();
};

//app.use(allowCrossDomain);
//cors
app.use(cors());
app.options('*', cors()); // pre-flight
//


// Set up a whitelist and check against it:
var whitelist = ['https://c86e0d6a46c3464b84e816edd7272c89.vfs.cloud9.us-east-1.amazonaws.com:8081', 'https://c86e0d6a46c3464b84e816edd7272c89.vfs.cloud9.us-east-1.amazonaws.com', 'https://c86e0d6a46c3464b84e816edd7272c89.vfs.cloud9.us-east-1.amazonaws.com:8081']
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS 123'))
    }
  }
}

// Then pass them to cors:
//app.use(cors(corsOptions));

const router = express.Router();
//db
// this is our MongoDB database
const mongodbPW = 'Rl1GDjdsjlbhwmJi'
console.log(mongodbPW)
const dbRoute = 'mongodb+srv://sa2:' + mongodbPW + '@cluster0-5cp8y.mongodb.net/test?retryWrites=true&w=majority';

// connects our back end code with the database
mongoose.connect(dbRoute, { useNewUrlParser: true });

let db = mongoose.connection;

db.once('open', () => console.log('connected to the database'));

// checks if connection with the database is successful
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
//
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//app.use('/', indexRouter);
//app.use('/users', usersRouter);
// append /api for our http requests
app.use('/api', apiRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



// launch our backend into a port
console.log('waiting')
//app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));
module.exports = app;
