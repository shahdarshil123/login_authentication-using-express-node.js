var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var db2=require('../login_database');

router.use(express.urlencoded({extended: true}));

router.use(express.json());

router.get('/form', function(req, res, next){ 
res.render('login.ejs'); 
});


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
				res.writeHead(200, {'Content-Type': 'text/html'});
				res.write("Login successful");
				res.write("<p>Welcome to our system!<p>");
				res.end();
				}
				else{
				console.log("password not match");
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

router.post('/verify',check);

module.exports = router;
