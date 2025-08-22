import db from './config/db.js';

async function updateUsers() {
    try {
        console.log('🔄 Updating existing users...');
        
        // Update all existing users to have proper values
        await db.execute('UPDATE users SET role = "developer", status = "active", email_verified = TRUE WHERE role IS NULL OR status IS NULL');
        
        // Show updated users
        const [users] = await db.execute(`
            SELECT 
                id,
                name,
                email,
                role,
                status,
                email_verified,
                created_at
            FROM users 
            ORDER BY created_at DESC
        `);
        
        console.log('👥 Updated users:');
        users.forEach(user => {
            console.log(`- ID: ${user.id}, Name: ${user.name}, Email: ${user.email}, Role: ${user.role}, Status: ${user.status}, Verified: ${user.email_verified}, Created: ${user.created_at}`);
        });
        
        console.log('✅ Users updated successfully!');
        
    } catch (error) {
        console.error('❌ Update failed:', error);
    } finally {
        process.exit(0);
    }
}

updateUsers();
