var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var db=require('../database');
var db2=require('../login_database');


router.use(express.urlencoded({extended: true}));

router.use(express.json());

var check = function(req, res, next){
  var id = req.body.id;
  var sql = 'SELECT id FROM users WHERE id='+id;
  db.query(sql,function(err, data){
    if(err){
      console.log(err);
    }
    else{
    if(typeof(data[0])==='undefined')
    {
      console.log("new user"); 
      return next();
    }
    else
    {
        res.writeHead(200,{'Content-type':'text/HTML'});
        res.write("<p>User already in database </p>");
        res.write('<button><a href="http://localhost:3000/login/form"> Login page </a></button>');
        res.end();
    }
  }
  });
}


var  create = function(req, res, next) { 

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
  next();
}

var close = function(req, res,next){
  db.end();
  console.log("user database closed");
  db2.end();
  console.log("login database closed");
  console.log("User created in databases");
  next();
}

router.get('/form', function(req, res, next) { 
res.render('users.ejs'); 
});

router.post('/create',check,create,function(req,res){
  res.writeHead(200,{'Content-type':'text/HTML'});
  res.write("<p>User created in database</p>");
  res.write('<button><a href="http://localhost:3000/login/form"> Login page </a></button>');
  res.end();
});

module.exports = router;