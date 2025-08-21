import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Email transporter configuration (same as registration system)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'your-email@gmail.com',
    pass: process.env.EMAIL_PASS || 'your-app-password'
  }
});

// Send contact form confirmation email
export const sendContactConfirmation = async (contactData) => {
  try {
    console.log('📧 Sending contact confirmation email to:', contactData.email);
    
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: contactData.email,
      subject: 'Thank you for contacting ClickSpark! 🚀',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8f9fa;">
          <div style="background: linear-gradient(135deg, #fbbf24 0%, #f97316 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 28px;">ClickSpark</h1>
            <p style="color: white; margin: 10px 0 0 0; font-size: 16px;">Digital Marketing Excellence</p>
          </div>
          
          <div style="background: white; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
            <h2 style="color: #333; margin-bottom: 20px;">Thank you for reaching out! 🙏</h2>
            
            <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
              Dear <strong>${contactData.firstName} ${contactData.lastName}</strong>,
            </p>
            
            <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
              Thank you for contacting ClickSpark! We have received your message and our team will review your inquiry within 24 hours.
            </p>
            
            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #333; margin-top: 0;">Your Contact Details:</h3>
              <p style="color: #666; margin: 5px 0;"><strong>Name:</strong> ${contactData.firstName} ${contactData.lastName}</p>
              <p style="color: #666; margin: 5px 0;"><strong>Email:</strong> ${contactData.email}</p>
              <p style="color: #666; margin: 5px 0;"><strong>Phone:</strong> ${contactData.country} ${contactData.phone}</p>
              <p style="color: #666; margin: 5px 0;"><strong>Company:</strong> ${contactData.company}</p>
              <p style="color: #666; margin: 5px 0;"><strong>Website:</strong> ${contactData.website}</p>
              <p style="color: #666; margin: 5px 0;"><strong>Annual Revenue:</strong> ${contactData.revenue}</p>
            </div>
            
            <div style="background-color: #fff3cd; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #ffc107;">
              <h4 style="color: #856404; margin-top: 0;">What happens next?</h4>
              <ul style="color: #856404; margin: 10px 0; padding-left: 20px;">
                <li>Our team will review your requirements</li>
                <li>We'll schedule a consultation call</li>
                <li>You'll receive a customized proposal</li>
                <li>We'll discuss next steps for your project</li>
              </ul>
            </div>
            
            <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
              In the meantime, feel free to explore our services and case studies on our website.
            </p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="http://localhost:5173" style="background: linear-gradient(135deg, #fbbf24 0%, #f97316 100%); color: white; padding: 12px 30px; text-decoration: none; border-radius: 25px; display: inline-block; font-weight: bold;">
                Visit Our Website
              </a>
            </div>
            
            <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
            
            <div style="text-align: center; color: #999; font-size: 14px;">
              <p>Best regards,<br>The ClickSpark Team</p>
              <p>📧 contact@clickspark.com<br>📞 +1-555-123-4567</p>
            </div>
          </div>
        </div>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Contact confirmation email sent:', info.messageId);
    return { success: true, messageId: info.messageId };
    
  } catch (error) {
    console.error('❌ Email sending error:', error);
    return { success: false, error: error.message };
  }
};

// Send notification email to admin
export const sendAdminNotification = async (contactData) => {
  try {
    console.log('📧 Sending admin notification email to:', process.env.ADMIN_EMAIL || process.env.EMAIL_USER);
    
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL || process.env.EMAIL_USER,
      subject: 'New Contact Form Submission - ClickSpark',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #333;">New Contact Form Submission</h2>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #333; margin-top: 0;">Contact Details:</h3>
            <p><strong>Name:</strong> ${contactData.firstName} ${contactData.lastName}</p>
            <p><strong>Email:</strong> ${contactData.email}</p>
            <p><strong>Phone:</strong> ${contactData.country} ${contactData.phone}</p>
            <p><strong>Company:</strong> ${contactData.company}</p>
            <p><strong>Website:</strong> ${contactData.website}</p>
            <p><strong>Annual Revenue:</strong> ${contactData.revenue}</p>
            <p><strong>Message:</strong></p>
            <div style="background: white; padding: 15px; border-radius: 5px; margin: 10px 0;">
              ${contactData.message}
            </div>
            <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
          </div>
          
          <p style="color: #666;">Please respond to this inquiry within 24 hours.</p>
        </div>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Admin notification email sent:', info.messageId);
    return { success: true, messageId: info.messageId };
    
  } catch (error) {
    console.error('❌ Admin email sending error:', error);
    return { success: false, error: error.message };
  }
};

// Send consultation email
export const sendConsultationEmail = async (to, subject, htmlContent) => {
  try {
    console.log('📧 Sending consultation email to:', to);
    
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: to,
      subject: subject,
      html: htmlContent
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Consultation email sent:', info.messageId);
    return { success: true, messageId: info.messageId };
    
  } catch (error) {
    console.error('❌ Consultation email sending error:', error);
    return { success: false, error: error.message };
  }
};
