import express from 'express';
import { sendConsultationEmail } from '../utils/emailService.js';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

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

// Request consultation
router.post('/request', async (req, res) => {
  try {
    const { name, email, phone, company, message, preferredDate, preferredTime } = req.body;

    // Validate required fields
    if (!name || !email || !phone || !preferredDate || !preferredTime) {
      return res.status(400).json({ 
        success: false, 
        message: 'Please fill in all required fields' 
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please enter a valid email address'
      });
    }

    // Check if the preferred date is in the future
    const preferredDateTime = new Date(`${preferredDate}T${preferredTime}`);
    if (preferredDateTime <= new Date()) {
      return res.status(400).json({
        success: false,
        message: 'Please select a future date and time'
      });
    }

    // Format the preferred date and time
    const formattedDateTime = preferredDateTime.toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZoneName: 'short'
    });

    // Send confirmation email to user
    const userEmailContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #f59e0b; text-align: center;">Consultation Request Received!</h2>
        <p>Dear ${name},</p>
        <p>Thank you for requesting a free consultation with ClickSpark. We're excited to discuss your digital marketing needs!</p>
        
        <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #333; margin-top: 0;">Your Request Details:</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          ${company ? `<p><strong>Company:</strong> ${company}</p>` : ''}
          <p><strong>Preferred Date & Time:</strong> ${formattedDateTime}</p>
          ${message ? `<p><strong>Project Details:</strong> ${message}</p>` : ''}
        </div>
        
        <p>Our team will review your request and contact you within 24 hours to confirm your consultation appointment.</p>
        
        <div style="background-color: #fff3cd; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #ffc107;">
          <h4 style="color: #856404; margin-top: 0;">What to expect:</h4>
          <ul style="color: #856404; margin: 10px 0; padding-left: 20px;">
            <li>We'll call you to confirm the appointment</li>
            <li>Discuss your project requirements in detail</li>
            <li>Provide customized recommendations</li>
            <li>Answer all your questions</li>
          </ul>
        </div>
        
        <p>Best regards,<br>The ClickSpark Team</p>
      </div>
    `;

    await sendConsultationEmail(email, 'Consultation Request Received - ClickSpark', userEmailContent);

    // Send notification email to admin
    const adminEmailContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #f59e0b;">New Consultation Request</h2>
        <p>A new consultation request has been submitted with the following details:</p>
        
        <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #333; margin-top: 0;">Request Details:</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          ${company ? `<p><strong>Company:</strong> ${company}</p>` : ''}
          <p><strong>Preferred Date & Time:</strong> ${formattedDateTime}</p>
          ${message ? `<p><strong>Project Details:</strong> ${message}</p>` : ''}
        </div>
        
        <p>Please contact the client within 24 hours to confirm the consultation appointment.</p>
      </div>
    `;

    // Save consultation request to database
    const connection = await pool.getConnection();
    try {
      const [result] = await connection.execute(
        'INSERT INTO consultation_requests (name, email, phone, company, message, preferred_datetime) VALUES (?, ?, ?, ?, ?, ?)',
        [name, email, phone, company || null, message || null, preferredDateTime]
      );

      console.log('✅ Consultation request saved to database with ID:', result.insertId);

      // Send to admin email
      await sendConsultationEmail('admin@clickspark.com', 'New Consultation Request', adminEmailContent);

      res.status(200).json({
        success: true,
        message: 'Consultation request submitted successfully! We\'ll contact you within 24 hours.',
        requestId: result.insertId
      });

    } catch (dbError) {
      console.error('❌ Database error:', dbError);
      res.status(500).json({
        success: false,
        message: 'Failed to save consultation request. Please try again.'
      });
    } finally {
      connection.release();
    }

  } catch (error) {
    console.error('Consultation request error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit consultation request. Please try again.'
    });
  }
});

// Get all consultation requests (for admin dashboard)
router.get('/requests', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    try {
      const [rows] = await connection.execute(
        'SELECT * FROM consultation_requests ORDER BY preferred_datetime DESC'
      );

      res.status(200).json({
        success: true,
        requests: rows
      });

    } catch (dbError) {
      console.error('❌ Database error:', dbError);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch consultation requests'
      });
    } finally {
      connection.release();
    }

  } catch (error) {
    console.error('Consultation requests fetch error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch consultation requests. Please try again.'
    });
  }
});

// Update consultation request status
router.put('/requests/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['pending', 'confirmed', 'completed', 'cancelled'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status'
      });
    }

    const connection = await pool.getConnection();
    try {
      const [result] = await connection.execute(
        'UPDATE consultation_requests SET status = ? WHERE id = ?',
        [status, id]
      );

      if (result.affectedRows === 0) {
        return res.status(404).json({
          success: false,
          message: 'Consultation request not found'
        });
      }

      res.status(200).json({
        success: true,
        message: 'Consultation request status updated successfully'
      });

    } catch (dbError) {
      console.error('❌ Database error:', dbError);
      res.status(500).json({
        success: false,
        message: 'Failed to update consultation request status'
      });
    } finally {
      connection.release();
    }

  } catch (error) {
    console.error('Consultation request update error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update consultation request. Please try again.'
    });
  }
});

export default router;
