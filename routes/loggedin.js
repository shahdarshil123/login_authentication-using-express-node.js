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

var id,name,phone,email;

var checkout = function(req, res, next){
	var sql = 'UPDATE login SET status="OUT" WHERE id='+id;
	db2.query(sql,function(err,data){
		if(err) throw err;
	});
	console.log(name+" logged out of the system");
	next();
}


router.get("/",function(req,res){
	id = req.cookies.user.id;
	name = req.cookies.user.name;
 	phone = req.cookies.user.phone;
	email = req.cookies.user.email;
	console.log(name+" logged into system");
	res.render("loggedin.ejs",{'name':name});
});

router.post("/logout",checkout,function(req,res){
	res.clearCookie('user', { path: '/loggedin' });
    res.redirect('http://localhost:3000/login/form');
});

module.exports=router;