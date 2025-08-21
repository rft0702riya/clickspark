import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const setupContactsTable = async () => {
  let connection;

  try {
    // Create connection
    connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'riya0701',
      password: process.env.DB_PASSWORD || 'riya1234',
      database: process.env.DB_NAME || 'click',
    });

    console.log('✅ Connected to MySQL database');

    // Create contacts table
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS contacts (
        id INT AUTO_INCREMENT PRIMARY KEY,
        firstName VARCHAR(100) NOT NULL,
        lastName  VARCHAR(100) NOT NULL,
        email     VARCHAR(150) NOT NULL,
        phone     VARCHAR(30)  NOT NULL,
        country   VARCHAR(50)  NOT NULL,
        company   VARCHAR(150) NOT NULL,
        website   VARCHAR(200) NOT NULL,
        revenue   VARCHAR(100) NOT NULL,
        message   TEXT NOT NULL,
        agree     TINYINT(1) NOT NULL DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    await connection.execute(createTableQuery);
    console.log('✅ Contacts table created successfully');

    // Check if table exists
    const [rows] = await connection.execute('SHOW TABLES LIKE "contacts"');
    if (rows.length > 0) {
      console.log('✅ Contacts table exists and is ready to use');
    } else {
      console.log('❌ Contacts table was not created');
    }

  } catch (error) {
    console.error('❌ Error setting up contacts table:', error);
  } finally {
    if (connection) {
      await connection.end();
      console.log('✅ Database connection closed');
    }
  }
};

// Run the setup
setupContactsTable();
