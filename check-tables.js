import db from './config/db.js';

async function checkTables() {
    try {
        console.log('🔍 Checking existing table structures...');
        
        // Check consultation_requests table
        try {
            const [consultationColumns] = await db.execute('DESCRIBE consultation_requests');
            console.log('📋 consultation_requests table structure:');
            consultationColumns.forEach(col => {
                console.log(`- ${col.Field}: ${col.Type} ${col.Null === 'YES' ? 'NULL' : 'NOT NULL'}`);
            });
        } catch (error) {
            console.log('❌ consultation_requests table does not exist');
        }
        
        // Check contacts table
        try {
            const [contactColumns] = await db.execute('DESCRIBE contacts');
            console.log('📋 contacts table structure:');
            contactColumns.forEach(col => {
                console.log(`- ${col.Field}: ${col.Type} ${col.Null === 'YES' ? 'NULL' : 'NOT NULL'}`);
            });
        } catch (error) {
            console.log('❌ contacts table does not exist');
        }
        
        // Check if tables have data
        try {
            const [consultationCount] = await db.execute('SELECT COUNT(*) as count FROM consultation_requests');
            console.log(`📊 consultation_requests count: ${consultationCount[0].count}`);
        } catch (error) {
            console.log('❌ Cannot count consultation_requests');
        }
        
        try {
            const [contactCount] = await db.execute('SELECT COUNT(*) as count FROM contacts');
            console.log(`📊 contacts count: ${contactCount[0].count}`);
        } catch (error) {
            console.log('❌ Cannot count contacts');
        }
        
    } catch (error) {
        console.error('❌ Table check failed:', error);
    } finally {
        process.exit(0);
    }
}

checkTables();
