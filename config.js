var mysql = require("mysql2");
require("dotenv").config();

const config = {
  host: process.env.host,
  user: process.env.user,
  password: process.env.password,
  database: process.env.database,
  waitForConnections: true,
  connectionLimit: 36,
  queueLimit: 0,
};

// console.log(process.env);

const db = new mysql.createPool(config);

module.exports = db;
