'use strict';
const mysql = require('mysql');
const PoolManager = require('mysql-connection-pool-manager');


const password = process.env.password
const user = process.env.user

const options = {
  idleCheckInterval: 1000,
  maxConnextionTimeout: 30000,
  idlePoolTimeout: 3000,
  errorLimit: 5,
  preInitDelay: 50,
  sessionTimeout: 60000,
  onConnectionAcquire: () => {
    console.log('Acquire');
  },
  onConnectionConnect: () => {
    console.log('Connect');
  },
  onConnectionEnqueue: () => {
    console.log('Enqueue');
  },
  onConnectionRelease: () => {
    console.log('Release');
  },
  mySQLSettings: {
    host: 'localhost',
    user: user, 
    password: password, 
    database: 'esay',
    port: '3306',
    socketPath: '/var/run/mysqld/mysqld.sock',
    charset: 'utf8',
    multipleStatements: true,
    connectTimeout: 15000,
    acquireTimeout: 10000,
    waitForConnections: true,
    connectionLimit: 1000,
    queueLimit: 5000,
    debug: false,
  },
};

// Initialising the instance
const mySQL = PoolManager(options);

const database = mySQL.raw.createConnection({
  host: 'localhost',
  user: user, 
  password: password, 
  database: 'esay',
});

database.connect((err) => {
  if (err) throw err;

  console.log('connected to mysql.....');
});

module.exports = database;
