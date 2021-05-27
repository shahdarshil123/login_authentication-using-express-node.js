var express = require('express');
var app = express();

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

var usersRouter = require('C:/Users/darsh/Desktop/myapp/routes/users');
app.use('/users', usersRouter);

var loginRouter = require('C:/Users/darsh/Desktop/myapp/routes/login');
app.use('/login',loginRouter);

var loggedinRouter = require('C:/Users/darsh/Desktop/myapp/routes/loggedin');
app.use('/loggedin',loggedinRouter);

module.exports = app;