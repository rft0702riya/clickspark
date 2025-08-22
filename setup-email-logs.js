import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const setupEmailLogsTable = async () => {
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

    // Create email_logs table
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS email_logs (
        id INT AUTO_INCREMENT PRIMARY KEY,
        to_email VARCHAR(255) NOT NULL,
        subject VARCHAR(500) NOT NULL,
        message TEXT NOT NULL,
        consultation_id INT NULL,
        contact_id INT NULL,
        sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        status ENUM('sent', 'failed', 'pending') DEFAULT 'sent',
        
        INDEX idx_to_email (to_email),
        INDEX idx_sent_at (sent_at),
        INDEX idx_consultation_id (consultation_id),
        INDEX idx_contact_id (contact_id)
      )
    `;

    await connection.execute(createTableQuery);
    console.log('✅ Email logs table created successfully');

    // Check if table exists
    const [rows] = await connection.execute('SHOW TABLES LIKE "email_logs"');
    if (rows.length > 0) {
      console.log('✅ Email logs table exists and is ready to use');
    } else {
      console.log('❌ Email logs table was not created');
    }

  } catch (error) {
    console.error('❌ Error setting up email logs table:', error);
  } finally {
    if (connection) {
      await connection.end();
      console.log('✅ Database connection closed');
    }
  }
};

// Run the setup
setupEmailLogsTable();
