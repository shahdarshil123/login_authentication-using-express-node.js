var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var db=require('../database');
var db2=require('../login_database');

router.use(express.urlencoded({extended: true}));

router.use(express.json());


router.get('/form', function(req, res, next) { 
res.render('users.ejs'); 
});


router.post('/create', function(req, res, next) {
  
  // store all the user input data
  const name = req.body.name;
  const email = req.body.email;
  const phone= req.body.phone;
  const id = req.body.id;
  const password = req.body.password;

  var sql = 'INSERT INTO users (name,phone,email,id)'+' VALUES ('+'"'+name+'"'+','+phone+','+'"'+email+'"'+','+id+');';
  db.query(sql,function (err, data) { 
      if (err) throw err;
      	 else{
      	 	console.log(data);
      	 	console.log("User data is inserted successfully ");
      	 }
          
  });

  var sql2 = 'INSERT INTO login (id, password)'+' VALUES'+'('+id+','+'"'+password+'"'+');'
  db2.query(sql2,function(err,data){
    if(err){
      throw err;
    }
    else{
      console.log(data);
      console.log("User data enetered into login database");
    }
  });
  res.send("User created in database");
});
  
module.exports = router;