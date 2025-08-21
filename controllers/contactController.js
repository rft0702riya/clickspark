import pool from '../config/db.js';
import { sendContactConfirmation, sendAdminNotification } from '../utils/emailService.js';

// Submit contact form
export const submitContact = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      country,
      company,
      website,
      revenue,
      message,
      agree
    } = req.body;

    // Validate required fields
    if (!firstName || !lastName || !email || !phone || !company || !website || !revenue || !message) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
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

    // Validate agreement
    if (!agree) {
      return res.status(400).json({
        success: false,
        message: 'You must agree to the privacy policy'
      });
    }

    // Insert contact into database
    const [result] = await pool.execute(
      `INSERT INTO contacts (firstName, lastName, email, phone, country, company, website, revenue, message, agree) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [firstName, lastName, email, phone, country, company, website, revenue, message, agree ? 1 : 0]
    );

    // Send confirmation email to user
    const emailResult = await sendContactConfirmation({
      firstName,
      lastName,
      email,
      phone,
      country,
      company,
      website,
      revenue,
      message
    });

    // Send notification email to admin
    await sendAdminNotification({
      firstName,
      lastName,
      email,
      phone,
      country,
      company,
      website,
      revenue,
      message
    });

    res.status(201).json({
      success: true,
      message: 'Contact form submitted successfully! Check your email for confirmation.',
      contactId: result.insertId,
      emailSent: emailResult.success
    });

  } catch (error) {
    console.error('Contact submission error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error. Please try again later.'
    });
  }
};

// Get all contacts (for admin purposes)
export const getAllContacts = async (req, res) => {
  try {
    const [rows] = await pool.execute(
      'SELECT * FROM contacts ORDER BY created_at DESC'
    );

    res.status(200).json({
      success: true,
      data: rows
    });

  } catch (error) {
    console.error('Get contacts error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Get contact by ID
export const getContactById = async (req, res) => {
  try {
    const { id } = req.params;

    const [rows] = await pool.execute(
      'SELECT * FROM contacts WHERE id = ?',
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }

    res.status(200).json({
      success: true,
      data: rows[0]
    });

  } catch (error) {
    console.error('Get contact by ID error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Delete contact (for admin purposes)
export const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await pool.execute(
      'DELETE FROM contacts WHERE id = ?',
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Contact deleted successfully'
    });

  } catch (error) {
    console.error('Delete contact error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};
