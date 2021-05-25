var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var db2=require('../login_database');

router.use(express.urlencoded({extended: true}));

router.use(express.json());

router.get('/form', function(req, res, next) { 
res.render('login.ejs'); 
});

router.post('/verify',(req,res)=>{
	const id = req.body.id;
	const password = req.body.password;

	var sql2="SELECT password FROM login WHERE id="+id+';'
	db2.query(sql2,function(err, data, fields){
		if(err){
			console.log(err);
		}
		else{
			console.log(data[0].password);
			if(password === data[0].password){
				console.log("password matched");
				res.send("Login successful");
			}
			else{
				console.log("password not match");
				res.send("Incorrect details! Check again");
			}
			
		}
	});

});

module.exports = router;
