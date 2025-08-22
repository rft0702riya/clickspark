import db from './config/db.js';

async function fixDatabase() {
    try {
        console.log('🔧 Fixing database schema...');
        
        // Check current table structure
        const [columns] = await db.execute('DESCRIBE users');
        console.log('📋 Current users table structure:');
        columns.forEach(col => {
            console.log(`- ${col.Field}: ${col.Type} ${col.Null === 'YES' ? 'NULL' : 'NOT NULL'}`);
        });
        
        // Add missing columns if they don't exist
        const columnNames = columns.map(col => col.Field);
        
        if (!columnNames.includes('role')) {
            console.log('➕ Adding role column...');
            await db.execute('ALTER TABLE users ADD COLUMN role ENUM("admin", "manager", "developer", "client", "viewer") DEFAULT "developer"');
        }
        
        if (!columnNames.includes('status')) {
            console.log('➕ Adding status column...');
            await db.execute('ALTER TABLE users ADD COLUMN status ENUM("active", "inactive", "suspended") DEFAULT "active"');
        }
        
        if (!columnNames.includes('phone')) {
            console.log('➕ Adding phone column...');
            await db.execute('ALTER TABLE users ADD COLUMN phone VARCHAR(20) NULL');
        }
        
        if (!columnNames.includes('email_verified')) {
            console.log('➕ Adding email_verified column...');
            await db.execute('ALTER TABLE users ADD COLUMN email_verified BOOLEAN DEFAULT FALSE');
        }
        
        if (!columnNames.includes('last_login')) {
            console.log('➕ Adding last_login column...');
            await db.execute('ALTER TABLE users ADD COLUMN last_login TIMESTAMP NULL');
        }
        
        if (!columnNames.includes('updated_at')) {
            console.log('➕ Adding updated_at column...');
            await db.execute('ALTER TABLE users ADD COLUMN updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP');
        }
        
        // Update existing users to have proper role and status
        await db.execute('UPDATE users SET role = "developer", status = "active", email_verified = TRUE WHERE role IS NULL OR status IS NULL');
        
        console.log('✅ Database schema fixed successfully!');
        
        // Show updated structure
        const [updatedColumns] = await db.execute('DESCRIBE users');
        console.log('📋 Updated users table structure:');
        updatedColumns.forEach(col => {
            console.log(`- ${col.Field}: ${col.Type} ${col.Null === 'YES' ? 'NULL' : 'NOT NULL'}`);
        });
        
    } catch (error) {
        console.error('❌ Database fix failed:', error);
    } finally {
        process.exit(0);
    }
}

fixDatabase();
