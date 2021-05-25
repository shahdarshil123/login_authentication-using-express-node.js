var mysql2 = require('mysql');
var conn2 = mysql2.createConnection({
  host: 'localhost', // Replace with your host name
  user: 'darshil123',      // Replace with your database username
  password: 'DRS@123#',      // Replace with your database password
  database: 'users' // // Replace with your database Name
}); 
conn2.connect(function(err) {
  if (err){
  	throw err;
  }
  else{
  	console.log('Login database is connected successfully!');
  }
 
});
module.exports = conn2;