var mysql = require('mysql');
var conn = mysql.createConnection({
  host: 'localhost', // Replace with your host name
  user: 'darshil123',      // Replace with your database username
  password: 'DRS@123#',      // Replace with your database password
  database: 'users' // // Replace with your database Name
}); 
conn.connect(function(err) {
  if (err){
  	throw err;
  }
  else{
  	console.log('Database is connected successfully!');
  }
 
});
module.exports = conn;