import db from '../config/db.js';
import bcrypt from 'bcryptjs';

// Get all users for HR dashboard
const getAllUsers = async (req, res) => {
    try {
        const query = `
            SELECT 
                id,
                name,
                email,
                phone,
                role,
                status,
                email_verified,
                last_login,
                created_at,
                updated_at
            FROM users 
            ORDER BY created_at DESC
        `;
        
        const [users] = await db.execute(query);
        
        res.json({
            success: true,
            data: users,
            total: users.length
        });
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch users',
            error: error.message
        });
    }
};

// Get dashboard statistics for HR dashboard
const getDashboardStats = async (req, res) => {
    try {
        // Get user registration stats
        const userStatsQuery = `
            SELECT 
                COUNT(*) as total_users,
                COUNT(CASE WHEN status = 'active' THEN 1 END) as active_users,
                COUNT(CASE WHEN email_verified = 1 THEN 1 END) as verified_users,
                COUNT(CASE WHEN DATE(created_at) = CURDATE() THEN 1 END) as new_users_today,
                COUNT(CASE WHEN DATE(created_at) = DATE_SUB(CURDATE(), INTERVAL 7 DAY) THEN 1 END) as new_users_this_week
            FROM users
        `;
        
        // Get consultation stats (if consultation_requests table exists)
        let consultationStats = { total_consultations: 0, new_consultations_today: 0, new_consultations_week: 0 };
        try {
            const consultationQuery = `
                SELECT 
                    COUNT(*) as total_consultations,
                    COUNT(CASE WHEN DATE(created_at) = CURDATE() THEN 1 END) as new_consultations_today,
                    COUNT(CASE WHEN DATE(created_at) = DATE_SUB(CURDATE(), INTERVAL 7 DAY) THEN 1 END) as new_consultations_week
                FROM consultation_requests
            `;
            const [consultationResult] = await db.execute(consultationQuery);
            consultationStats = consultationResult[0];
        } catch (error) {
            console.log('Consultation table not found, using default values');
        }
        
        // Get contact stats (if contacts table exists)
        let contactStats = { total_contacts: 0, new_contacts_today: 0, new_contacts_week: 0 };
        try {
            const contactQuery = `
                SELECT 
                    COUNT(*) as total_contacts,
                    COUNT(CASE WHEN DATE(created_at) = CURDATE() THEN 1 END) as new_contacts_today,
                    COUNT(CASE WHEN DATE(created_at) = DATE_SUB(CURDATE(), INTERVAL 7 DAY) THEN 1 END) as new_contacts_week
                FROM contacts
            `;
            const [contactResult] = await db.execute(contactQuery);
            contactStats = contactResult[0];
        } catch (error) {
            console.log('Contacts table not found, using default values');
        }
        
        const [userStats] = await db.execute(userStatsQuery);
        
        const dashboardStats = {
            // User Registration Stats
            total_users: userStats[0].total_users || 0,
            active_users: userStats[0].active_users || 0,
            verified_users: userStats[0].verified_users || 0,
            new_users_today: userStats[0].new_users_today || 0,
            new_users_this_week: userStats[0].new_users_this_week || 0,
            
            // Consultation Stats
            total_consultations: consultationStats.total_consultations || 0,
            new_consultations_today: consultationStats.new_consultations_today || 0,
            new_consultations_week: consultationStats.new_consultations_week || 0,
            
            // Contact Stats
            total_contacts: contactStats.total_contacts || 0,
            new_contacts_today: contactStats.new_contacts_today || 0,
            new_contacts_week: contactStats.new_contacts_week || 0
        };
        
        res.json({
            success: true,
            data: dashboardStats
        });
    } catch (error) {
        console.error('Error fetching dashboard stats:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch dashboard statistics',
            error: error.message
        });
    }
};

// Update user status (activate/deactivate)
const updateUserStatus = async (req, res) => {
    try {
        const { userId } = req.params;
        const { status } = req.body;
        
        if (!['active', 'inactive', 'suspended'].includes(status)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid status. Must be active, inactive, or suspended'
            });
        }
        
        const query = 'UPDATE users SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?';
        const [result] = await db.execute(query, [status, userId]);
        
        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }
        
        res.json({
            success: true,
            message: `User status updated to ${status}`
        });
    } catch (error) {
        console.error('Error updating user status:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to update user status',
            error: error.message
        });
    }
};

// Update user role
const updateUserRole = async (req, res) => {
    try {
        const { userId } = req.params;
        const { role } = req.body;
        
        if (!['admin', 'manager', 'developer', 'client', 'viewer'].includes(role)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid role. Must be admin, manager, developer, client, or viewer'
            });
        }
        
        const query = 'UPDATE users SET role = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?';
        const [result] = await db.execute(query, [role, userId]);
        
        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }
        
        res.json({
            success: true,
            message: `User role updated to ${role}`
        });
    } catch (error) {
        console.error('Error updating user role:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to update user role',
            error: error.message
        });
    }
};

// Delete user
const deleteUser = async (req, res) => {
    try {
        const { userId } = req.params;
        
        // Check if user exists
        const [user] = await db.execute('SELECT id, role FROM users WHERE id = ?', [userId]);
        
        if (user.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }
        
        // Prevent deletion of admin users
        if (user[0].role === 'admin') {
            return res.status(403).json({
                success: false,
                message: 'Cannot delete admin users'
            });
        }
        
        const query = 'DELETE FROM users WHERE id = ?';
        const [result] = await db.execute(query, [userId]);
        
        res.json({
            success: true,
            message: 'User deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to delete user',
            error: error.message
        });
    }
};

// Get user activity logs
const getUserActivity = async (req, res) => {
    try {
        const { userId } = req.params;
        const { limit = 50 } = req.query;
        
        const query = `
            SELECT 
                action,
                table_name,
                old_values,
                new_values,
                ip_address,
                created_at
            FROM audit_logs 
            WHERE user_id = ? 
            ORDER BY created_at DESC 
            LIMIT ?
        `;
        
        const [logs] = await db.execute(query, [userId, parseInt(limit)]);
        
        res.json({
            success: true,
            data: logs
        });
    } catch (error) {
        console.error('Error fetching user activity:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch user activity',
            error: error.message
        });
    }
};

// Search users
const searchUsers = async (req, res) => {
    try {
        const { q, role, status, limit = 20 } = req.query;
        
        let query = `
            SELECT 
                id,
                name,
                email,
                phone,
                role,
                status,
                email_verified,
                last_login,
                created_at
            FROM users 
            WHERE 1=1
        `;
        
        const params = [];
        
        if (q) {
            query += ` AND (name LIKE ? OR email LIKE ? OR phone LIKE ?)`;
            const searchTerm = `%${q}%`;
            params.push(searchTerm, searchTerm, searchTerm);
        }
        
        if (role) {
            query += ` AND role = ?`;
            params.push(role);
        }
        
        if (status) {
            query += ` AND status = ?`;
            params.push(status);
        }
        
        query += ` ORDER BY created_at DESC LIMIT ?`;
        params.push(parseInt(limit));
        
        const [users] = await db.execute(query, params);
        
        res.json({
            success: true,
            data: users,
            total: users.length
        });
    } catch (error) {
        console.error('Error searching users:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to search users',
            error: error.message
        });
    }
};

// Get all consultation requests
const getAllConsultations = async (req, res) => {
    try {
        const query = `
            SELECT 
                id,
                name,
                email,
                phone,
                company,
                message,
                preferred_datetime,
                status,
                created_at
            FROM consultation_requests 
            ORDER BY created_at DESC
        `;
        
        const [consultations] = await db.execute(query);
        
        res.json({
            success: true,
            data: consultations,
            total: consultations.length
        });
    } catch (error) {
        console.error('Error fetching consultations:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch consultations',
            error: error.message
        });
    }
};

// Get all contacts
const getAllContacts = async (req, res) => {
    try {
        const query = `
            SELECT 
                id,
                firstName,
                lastName,
                email,
                phone,
                country,
                company,
                website,
                revenue,
                message,
                created_at
            FROM contacts 
            ORDER BY created_at DESC
        `;
        
        const [contacts] = await db.execute(query);
        
        res.json({
            success: true,
            data: contacts,
            total: contacts.length
        });
    } catch (error) {
        console.error('Error fetching contacts:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch contacts',
            error: error.message
        });
    }
};

// Send email
const sendEmail = async (req, res) => {
    try {
        const { to, subject, message, consultationId, contactId } = req.body;

        // Validate required fields
        if (!to || !subject || !message) {
            return res.status(400).json({
                success: false,
                message: 'To, subject, and message are required'
            });
        }

        // Email configuration (you'll need to set up your email service)
        const emailConfig = {
            from: process.env.EMAIL_FROM || 'noreply@clickspark.com',
            to: to,
            subject: subject,
            text: message,
            html: message.replace(/\n/g, '<br>')
        };

        // For now, we'll just log the email and return success
        // In production, you would integrate with a real email service like SendGrid, AWS SES, etc.
        console.log('Email to be sent:', emailConfig);

        // Log email in database for tracking
        const logQuery = `
            INSERT INTO email_logs (to_email, subject, message, consultation_id, contact_id, sent_at)
            VALUES (?, ?, ?, ?, ?, NOW())
        `;
        
        await db.execute(logQuery, [to, subject, message, consultationId || null, contactId || null]);

        res.json({
            success: true,
            message: 'Email sent successfully',
            emailConfig: emailConfig
        });

    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to send email',
            error: error.message
        });
    }
};

export {
    getAllUsers,
    getDashboardStats,
    updateUserStatus,
    updateUserRole,
    deleteUser,
    getUserActivity,
    searchUsers,
    getAllConsultations,
    getAllContacts,
    sendEmail
};
