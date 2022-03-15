'use strict';

const mysql = require('mysql2');

const password = process.env.password
const user = process.env.user

// get the client

// Create the connection pool. The pool-specific settings are the defaults
const database = mysql.createPool({
  host: 'localhost',
  user: user,
  password: password,
  database: 'esay',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});


module.exports = database;