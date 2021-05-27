var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var db2=require('../login_database');
var session = require('express-session');
var cookieParser = require('cookie-parser');

router.use(express.urlencoded({extended: true}));
router.use(express.json());
router.use(cookieParser());
router.use(session({secret: 'ssshhhhh',saveUninitialized: true,resave: true}));



router.get("/",function(req,res){
	var id = req.cookies.id;
	console.log(id);
	res.render("loggedin.ejs");
});

router.get("/logout",function(req,res){
	res.clearCookie('id', { path: '/loggedin' });
    res.redirect('http://localhost:3000/login/form');
});

module.exports=router;