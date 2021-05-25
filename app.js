var express = require('express');
var app = express();

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

var usersRouter = require('C:/Users/darsh/Desktop/myapp/routes/users');
app.use('/users', usersRouter);

module.exports = app;