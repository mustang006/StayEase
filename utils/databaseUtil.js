const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Myd@teofb1rth2003',
  database: 'airbnb'
});

module.exports = pool.promise();