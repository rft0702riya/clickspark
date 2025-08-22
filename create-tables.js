import db from './config/db.js';

async function createTables() {
    try {
        console.log('🔧 Creating missing tables...');
        
        // Create consultation_requests table
        const consultationTableQuery = `
            CREATE TABLE IF NOT EXISTS consultation_requests (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL,
                phone VARCHAR(20) NOT NULL,
                company VARCHAR(255),
                message TEXT,
                preferred_date DATE NOT NULL,
                preferred_time TIME NOT NULL,
                status ENUM('pending', 'confirmed', 'completed', 'cancelled') DEFAULT 'pending',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            )
        `;
        
        // Create contacts table
        const contactsTableQuery = `
            CREATE TABLE IF NOT EXISTS contacts (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL,
                phone VARCHAR(20),
                company VARCHAR(255),
                message TEXT NOT NULL,
                status ENUM('new', 'read', 'replied', 'closed') DEFAULT 'new',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            )
        `;
        
        await db.execute(consultationTableQuery);
        console.log('✅ consultation_requests table created/verified');
        
        await db.execute(contactsTableQuery);
        console.log('✅ contacts table created/verified');
        
        // Insert some sample data for testing
        const sampleConsultations = [
            ['John Doe', 'john@example.com', '+1234567890', 'Tech Corp', 'Need help with digital marketing', '2025-01-25', '14:00:00'],
            ['Jane Smith', 'jane@example.com', '+1234567891', 'Startup Inc', 'Looking for consultation on SEO', '2025-01-26', '10:00:00'],
            ['Mike Johnson', 'mike@example.com', '+1234567892', null, 'Interested in social media marketing', '2025-01-27', '16:00:00']
        ];
        
        const sampleContacts = [
            ['Alice Brown', 'alice@example.com', '+1234567893', 'Design Studio', 'Interested in your services'],
            ['Bob Wilson', 'bob@example.com', '+1234567894', null, 'Please contact me about pricing'],
            ['Carol Davis', 'carol@example.com', '+1234567895', 'Marketing Agency', 'Looking for partnership opportunities']
        ];
        
        // Insert sample consultations
        for (const consultation of sampleConsultations) {
            await db.execute(`
                INSERT INTO consultation_requests (name, email, phone, company, message, preferred_date, preferred_time)
                VALUES (?, ?, ?, ?, ?, ?, ?)
            `, consultation);
        }
        console.log('✅ Sample consultation data inserted');
        
        // Insert sample contacts
        for (const contact of sampleContacts) {
            await db.execute(`
                INSERT INTO contacts (name, email, phone, company, message)
                VALUES (?, ?, ?, ?, ?)
            `, contact);
        }
        console.log('✅ Sample contact data inserted');
        
        // Show final counts
        const [consultationCount] = await db.execute('SELECT COUNT(*) as count FROM consultation_requests');
        const [contactCount] = await db.execute('SELECT COUNT(*) as count FROM contacts');
        
        console.log(`📊 Final counts - Consultations: ${consultationCount[0].count}, Contacts: ${contactCount[0].count}`);
        
    } catch (error) {
        console.error('❌ Table creation failed:', error);
    } finally {
        process.exit(0);
    }
}

createTables();
