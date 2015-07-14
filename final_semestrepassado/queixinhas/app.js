var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var session = require('express-session');
var auth = require('./auth');
var app = express();
var pass = require('pwd');

var db = require('./dbaccess')

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({ secret: 'secret', 
				resave: false, 
				saveUninitialized: false 
}));
app.use(passport.initialize());
app.use(passport.session());

app.locals.title = "Queixinhas na Net";

app.use(function(req, res, next) {
  var reqUrl = req.url;
  res.locals.isActive = function(url) {
    return reqUrl == url;
  }
  next();
});

auth(app);
var route_idx = require('./routes/index');
var route_queixinhas = require('./routes/queixinhas');
app.use('/', route_idx);
app.use('/queixinhas', route_queixinhas);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    return next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
		console.log(err);
		console.log(err.message);
		console.log(err.status);
        return res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    return res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
