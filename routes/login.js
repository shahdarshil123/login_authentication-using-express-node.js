var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var session = require('express-session');
var db2=require('../login_database');
var cookieParser = require('cookie-parser');

router.use(express.urlencoded({extended: true}));
router.use(cookieParser());
router.use(express.json());
router.use(session({secret: 'ssshhhhh',saveUninitialized: true,resave: true}));

var check = function(req,res){
	

	const id = req.body.id;
	const password = req.body.password;

	var sql2="SELECT * FROM login WHERE id="+id+';'
	db2.query(sql2,function(err, data, fields){
		if(err){
			console.log(err);
		}
		else{
			console.log(data[0]);
			if(typeof(data[0]) != "undefined"){
				if(password === data[0].password){
				console.log("password matched");
				var sql = 'UPDATE login SET status="IN" WHERE id='+data[0].id;
				db2.query(sql,function(err,data){
					if(err) throw err;
				});
				res.cookie("id",data[0].id,{path :"/loggedin"});
				return res.redirect('http://localhost:3000/loggedin/?id=${id}');
				}
				else{
				console.log("password not match");
				res.writeHead(200, {'Content-Type': 'text/html'});
				res.write('Password wrong'); 
				res.write('<button><a href="http://localhost:3000/login/form">Back to Login</a></button>');
				res.end();
				}
			}
			else
			{
				res.writeHead(200, {'Content-Type': 'text/html'});
				res.write("<p>Invalid roll no </p>");
				res.write('<button><a href="http://localhost:3000/login/form">Back to Login</a></button>');
				res.end();
			}		
		}
	});
}

router.get('/form', function(req, res, next){ 
	res.render('login.ejs'); 
});

router.post('/verify',check);

module.exports = router;
