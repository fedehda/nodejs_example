var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const jwt = require("jsonwebtoken")
const enviroment = require("./config/enviroments")


const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const productsRouter = require('./routes/products');
const categoryRouter = require("./routes/category");

var app = express();

app.set("secretKey", enviroment.secretKey)

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter);
app.use('/category', categoryRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

function verifyToken(req,res,next){
  jwt.verify(req.headers["x-access-token"], req.app.get("secretKey"), function(err,payload){
    if(err){
      res.json(message.error.message)
    }else{
      console.log("Payload", payload)
      req.body.userId = payload.userId
      next()
    }
  })
}

app.verifyToken = verifyToken;

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  // res.render('error');
  res.json(err.message)
});

module.exports = app;
