// db.js
import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

// MySQL connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "riya0701",
  password: process.env.DB_PASSWORD || "riya1234",
  database: process.env.DB_NAME || "click",
});

export default pool;



