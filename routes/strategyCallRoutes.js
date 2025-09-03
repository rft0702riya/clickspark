import express from 'express';
import { sendConsultationEmail } from '../utils/emailService.js';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

dotenv.config();

// Database connection
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'click',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Request strategy call (requires authentication)
router.post('/request', verifyToken, async (req, res) => {
  try {
    const { firstName, lastName, email, phone, company, message } = req.body;
    const userId = req.user.id;
    const userName = req.user.name;
    const userEmail = req.user.email;

    // Validate required fields
    if (!message || !firstName || !lastName || !email) {
      return res.status(400).json({ 
        success: false, 
        message: 'Please provide all required fields: first name, last name, email, and message' 
      });
    }

    // Save strategy call request to database
    const connection = await pool.getConnection();
    try {
      const [result] = await connection.execute(
        'INSERT INTO strategy_calls (user_id, user_name, user_email, user_phone, company, message, first_name, last_name, contact_email, contact_phone) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [userId, userName, userEmail, phone || null, company || null, message, firstName, lastName, email, phone || null]
      );

      console.log('✅ Strategy call request saved to database with ID:', result.insertId);

      // Send confirmation email to user
      const userEmailContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #f59e0b; text-align: center;">Strategy Call Request Confirmed! 🎯</h2>
          <p>Dear ${firstName} ${lastName},</p>
          <p>Thank you for requesting your <strong>15-minute Free Strategy Call</strong> with ClickSpark! We're excited to help you develop a winning digital marketing strategy.</p>
          
          <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #333; margin-top: 0;">Your Request Details:</h3>
            <p><strong>Name:</strong> ${firstName} ${lastName}</p>
            <p><strong>Email:</strong> ${email}</p>
            ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
            ${company ? `<p><strong>Company:</strong> ${company}</p>` : ''}
            <p><strong>Call Duration:</strong> 15 minutes</p>
            <p><strong>Request ID:</strong> #${result.insertId}</p>
          </div>
          
          <div style="background-color: #fff3cd; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #ffc107;">
            <h4 style="color: #856404; margin-top: 0;">What happens next?</h4>
            <ul style="color: #856404; margin: 10px 0; padding-left: 20px;">
              <li>Our team will review your request within 24 hours</li>
              <li>We'll call you to schedule the strategy session</li>
              <li>During the call, we'll discuss your business goals</li>
              <li>You'll receive a customized strategy recommendation</li>
              <li>No pressure sales - just valuable insights!</li>
            </ul>
          </div>
          
          <div style="background-color: #e8f5e8; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #28a745;">
            <h4 style="color: #155724; margin-top: 0;">What to prepare:</h4>
            <ul style="color: #155724; margin: 10px 0; padding-left: 20px;">
              <li>Your current marketing challenges</li>
              <li>Business goals and objectives</li>
              <li>Target audience information</li>
              <li>Any specific questions you have</li>
            </ul>
          </div>
          
          <p>We look forward to helping you create a winning digital strategy!</p>
          <p>Best regards,<br>The ClickSpark Team</p>
          
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
          <p style="color: #666; font-size: 14px; text-align: center;">
            📧 contact@clickspark.com | 📞 +1-555-123-4567<br>
            🌐 www.clickspark.com
          </p>
        </div>
      `;

      await sendConsultationEmail(email, 'Strategy Call Request Confirmed - ClickSpark', userEmailContent);

      // Send notification email to admin
      const adminEmailContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #f59e0b;">New Strategy Call Request</h2>
          <p>A new strategy call request has been submitted with the following details:</p>
          
          <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #333; margin-top: 0;">Request Details:</h3>
            <p><strong>Request ID:</strong> #${result.insertId}</p>
            <p><strong>Name:</strong> ${firstName} ${lastName}</p>
            <p><strong>Email:</strong> ${email}</p>
            ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
            ${company ? `<p><strong>Company:</strong> ${company}</p>` : ''}
            <p><strong>Message:</strong></p>
            <div style="background: white; padding: 15px; border-radius: 5px; margin: 10px 0;">
              ${message}
            </div>
            <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
          </div>
          
          <p style="color: #666;">Please contact the client within 24 hours to schedule the strategy call.</p>
        </div>
      `;

      await sendConsultationEmail('admin@clickspark.com', 'New Strategy Call Request', adminEmailContent);

      res.status(200).json({
        success: true,
        message: 'Strategy call request submitted successfully! We\'ll contact you within 24 hours to schedule your 15-minute strategy session.',
        requestId: result.insertId
      });

    } catch (dbError) {
      console.error('❌ Database error:', dbError);
      res.status(500).json({
        success: false,
        message: 'Failed to save strategy call request. Please try again.'
      });
    } finally {
      connection.release();
    }

  } catch (error) {
    console.error('Strategy call request error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit strategy call request. Please try again.'
    });
  }
});

// Get all strategy call requests (for admin dashboard)
router.get('/all', verifyToken, async (req, res) => {
  try {
    const connection = await pool.getConnection();
    
    const [rows] = await connection.execute(`
      SELECT 
        sc.*,
        u.name as user_name,
        u.email as user_email
      FROM strategy_calls sc
      LEFT JOIN users u ON sc.user_id = u.id
      ORDER BY sc.created_at DESC
    `);
    
    connection.release();
    
    res.json({
      success: true,
      data: rows
    });
  } catch (error) {
    console.error('Error fetching strategy calls:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch strategy calls'
    });
  }
});

// Update strategy call status
router.patch('/:id/status', verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { status, scheduled_date, notes } = req.body;
    
    const connection = await pool.getConnection();
    
    await connection.execute(
      'UPDATE strategy_calls SET status = ?, scheduled_date = ?, notes = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
      [status, scheduled_date || null, notes || null, id]
    );
    
    connection.release();
    
    res.json({
      success: true,
      message: 'Strategy call status updated successfully'
    });
  } catch (error) {
    console.error('Error updating strategy call status:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update strategy call status'
    });
  }
});

export default router;
