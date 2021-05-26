var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();


router.use(express.urlencoded({extended: true}));

router.use(express.json());

router.get('/form', function(req, res, next) { 
res.render('login.ejs'); 
});


router.post('/verify',(req,res)=>{
	var db2=require('../login_database');
	
	const id = req.body.id;
	const password = req.body.password;

	var sql2="SELECT password FROM login WHERE id="+id+';'
	db2.query(sql2,function(err, data, fields){
		if(err){
			console.log(err);
		}
		else{
			console.log(data[0]);
			if(typeof(data[0]) != "undefined"){
				if(password === data[0].password){
				console.log("password matched");
				res.send("Login successful");
				}
				else{
				console.log("password not match");
				res.send('Password wrong');
				}
			}
			else
			{
				res.send("Invalid roll no");
			}		
		}
	});

});

module.exports = router;
