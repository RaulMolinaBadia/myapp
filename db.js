var mysql = require('mysql')
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'copisteriaexpress',
  port: 3306,
  password: ''
})

connection.connect((error) =>{
    if (error) {
        console.error(error);
        return
    }
    console.log('Connected to database');
})

module.exports = connection;
