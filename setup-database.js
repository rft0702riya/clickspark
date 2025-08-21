import pool from "./config/db.js";
import fs from 'fs';
import path from 'path';

async function setupDatabase() {
  try {
    console.log("🚀 Setting up ClickSpark database...");
    
    // Read the database schema file
    const schemaPath = path.join(process.cwd(), 'database_schema.sql');
    
    if (!fs.existsSync(schemaPath)) {
      console.error("❌ Database schema file not found. Please ensure 'database_schema.sql' exists in the Backend directory.");
      return;
    }
    
    const schemaContent = fs.readFileSync(schemaPath, 'utf8');
    
    // Split the schema into individual statements
    const statements = schemaContent
      .split(';')
      .map(stmt => stmt.trim())
      .filter(stmt => stmt.length > 0 && !stmt.startsWith('--') && !stmt.startsWith('/*'));
    
    console.log(`📋 Found ${statements.length} SQL statements to execute`);
    
    // Execute each statement
    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i];
      if (statement.trim()) {
        try {
          await pool.query(statement);
          console.log(`✅ Executed statement ${i + 1}/${statements.length}`);
        } catch (error) {
          // Skip errors for duplicate indexes or existing objects
          if (error.code === 'ER_DUP_KEYNAME' || 
              error.code === 'ER_DUP_TABLE' || 
              error.code === 'ER_DUP_FIELDNAME' ||
              error.message.includes('already exists')) {
            console.log(`⚠️ Skipped statement ${i + 1} (already exists): ${error.message}`);
          } else {
            console.error(`❌ Error in statement ${i + 1}:`, error.message);
            throw error;
          }
        }
      }
    }
    
    console.log("✅ Database schema setup completed successfully");
    
    // Verify the setup by checking key tables
    await verifyDatabaseSetup();
    
  } catch (error) {
    console.error("❌ Database setup error:", error);
    process.exit(1);
  } finally {
    await pool.end();
    console.log("🔌 Database connection closed");
  }
}

async function verifyDatabaseSetup() {
  try {
    console.log("\n🔍 Verifying database setup...");
    
    // Check if all tables exist
    const tables = [
      'users', 'projects', 'project_members', 'tasks', 'comments',
      'time_logs', 'attachments', 'notifications', 'project_invitations',
      'audit_logs', 'settings'
    ];
    
    for (const table of tables) {
      try {
        const [result] = await pool.query(`DESCRIBE ${table}`);
        console.log(`✅ Table '${table}' exists with ${result.length} columns`);
      } catch (error) {
        console.error(`❌ Table '${table}' verification failed:`, error.message);
      }
    }
    
    // Check if views exist
    const views = ['project_overview', 'task_details'];
    for (const view of views) {
      try {
        const [result] = await pool.query(`SELECT COUNT(*) as count FROM ${view}`);
        console.log(`✅ View '${view}' exists and is accessible`);
      } catch (error) {
        console.error(`❌ View '${view}' verification failed:`, error.message);
      }
    }
    
    // Check if stored procedures exist
    try {
      const [result] = await pool.query("SHOW PROCEDURE STATUS WHERE Db = 'click'");
      console.log(`✅ Found ${result.length} stored procedures`);
    } catch (error) {
      console.error("❌ Stored procedures verification failed:", error.message);
    }
    
    // Check if triggers exist
    try {
      const [result] = await pool.query("SHOW TRIGGERS");
      console.log(`✅ Found ${result.length} triggers`);
    } catch (error) {
      console.error("❌ Triggers verification failed:", error.message);
    }
    
    // Check initial data
    const [users] = await pool.query("SELECT COUNT(*) as count FROM users");
    const [settings] = await pool.query("SELECT COUNT(*) as count FROM settings");
    
    console.log(`👥 Users table has ${users[0].count} records`);
    console.log(`⚙️ Settings table has ${settings[0].count} records`);
    
    // Show admin user info
    const [adminUser] = await pool.query("SELECT id, name, email, role FROM users WHERE role = 'admin' LIMIT 1");
    if (adminUser.length > 0) {
      console.log(`👑 Admin user: ${adminUser[0].name} (${adminUser[0].email})`);
    }
    
    console.log("\n🎉 Database verification completed successfully!");
    console.log("\n📝 Next steps:");
    console.log("1. Update your .env file with correct database credentials");
    console.log("2. Start your backend server: npm start");
    console.log("3. Test the API endpoints");
    console.log("4. Check the DATABASE_WORKFLOW.md for detailed next steps");
    
  } catch (error) {
    console.error("❌ Database verification error:", error);
  }
}

// Run the setup
setupDatabase();
