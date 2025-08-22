import db from './config/db.js';

async function testAPI() {
    try {
        console.log('🧪 Testing API endpoints...');
        
        // Test 1: Check if we can connect to database
        const [result] = await db.execute('SELECT 1 as test');
        console.log('✅ Database connection: OK');
        
        // Test 2: Check users table
        const [users] = await db.execute('SELECT COUNT(*) as count FROM users');
        console.log(`✅ Users table: ${users[0].count} users found`);
        
        // Test 3: Check consultation_requests table
        const [consultations] = await db.execute('SELECT COUNT(*) as count FROM consultation_requests');
        console.log(`✅ Consultations table: ${consultations[0].count} consultations found`);
        
        // Test 4: Check contacts table
        const [contacts] = await db.execute('SELECT COUNT(*) as count FROM contacts');
        console.log(`✅ Contacts table: ${contacts[0].count} contacts found`);
        
        // Test 5: Simulate the exact query from HR controller
        const userStatsQuery = `
            SELECT 
                COUNT(*) as total_users,
                COUNT(CASE WHEN status = 'active' THEN 1 END) as active_users,
                COUNT(CASE WHEN email_verified = 1 THEN 1 END) as verified_users,
                COUNT(CASE WHEN DATE(created_at) = CURDATE() THEN 1 END) as new_users_today,
                COUNT(CASE WHEN DATE(created_at) = DATE_SUB(CURDATE(), INTERVAL 7 DAY) THEN 1 END) as new_users_this_week
            FROM users
        `;
        
        const [userStats] = await db.execute(userStatsQuery);
        console.log('✅ User Stats Query Result:', userStats[0]);
        
        // Test 6: Check consultation stats
        const consultationQuery = `
            SELECT 
                COUNT(*) as total_consultations,
                COUNT(CASE WHEN DATE(created_at) = CURDATE() THEN 1 END) as new_consultations_today,
                COUNT(CASE WHEN DATE(created_at) = DATE_SUB(CURDATE(), INTERVAL 7 DAY) THEN 1 END) as new_consultations_week
            FROM consultation_requests
        `;
        
        const [consultationStats] = await db.execute(consultationQuery);
        console.log('✅ Consultation Stats Query Result:', consultationStats[0]);
        
        // Test 7: Check contact stats
        const contactQuery = `
            SELECT 
                COUNT(*) as total_contacts,
                COUNT(CASE WHEN DATE(created_at) = CURDATE() THEN 1 END) as new_contacts_today,
                COUNT(CASE WHEN DATE(created_at) = DATE_SUB(CURDATE(), INTERVAL 7 DAY) THEN 1 END) as new_contacts_week
            FROM contacts
        `;
        
        const [contactStats] = await db.execute(contactQuery);
        console.log('✅ Contact Stats Query Result:', contactStats[0]);
        
        console.log('\n🎯 Summary:');
        console.log(`- Total Users: ${userStats[0].total_users}`);
        console.log(`- Active Users: ${userStats[0].active_users}`);
        console.log(`- New Users This Week: ${userStats[0].new_users_this_week}`);
        console.log(`- Total Consultations: ${consultationStats[0].total_consultations}`);
        console.log(`- New Consultations This Week: ${consultationStats[0].new_consultations_week}`);
        console.log(`- Total Contacts: ${contactStats[0].total_contacts}`);
        console.log(`- New Contacts This Week: ${contactStats[0].new_contacts_week}`);
        
    } catch (error) {
        console.error('❌ API test failed:', error);
    } finally {
        process.exit(0);
    }
}

testAPI();
