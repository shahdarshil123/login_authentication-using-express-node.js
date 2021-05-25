var express = require('express');
var bodyParser = require('body-parser')
var router = express.Router();
var db=require('../database');

router.use(
  express.urlencoded({
    extended: true
  })
)

router.use(express.json())


router.get('/form', function(req, res, next) { 
res.render('users.ejs'); 
});


router.post('/create', function(req, res, next) {
  
  // store all the user input data
  const name = req.body.name;
  const email = req.body.email;
  const phone= req.body.phone;
  const id = req.body.id;

  var sql = 'INSERT INTO users (name,phone,email,id)'+' VALUES ('+'"'+name+'"'+','+phone+','+'"'+email+'"'+','+id+');';
  db.query(sql,function (err, data) { 
      if (err) throw err;
         console.log("User data is inserted successfully "); 
  });
 res.redirect('/users/form');  // redirect to user form page after inserting the data
});
  
module.exports = router;