import { sendContactConfirmation, sendAdminNotification } from './utils/emailService.js';
import dotenv from 'dotenv';

dotenv.config();

console.log('🧪 Testing Contact Form Email Service...');
console.log('📧 Email Configuration:');
console.log(`   User: ${process.env.EMAIL_USER || '❌ Not set'}`);
console.log(`   Password: ${process.env.EMAIL_PASS ? '✅ Set' : '❌ Not set'}`);
console.log(`   Admin Email: ${process.env.ADMIN_EMAIL || '❌ Not set'}`);

// Test contact data
const testContactData = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'test@example.com', // Change this to your email for testing
  phone: '1234567890',
  country: 'USA (+1)',
  company: 'Test Company Inc.',
  website: 'https://testcompany.com',
  revenue: '$100k-$500k',
  message: 'This is a test message from the ClickSpark contact form. Please ignore this email as it is only for testing purposes.'
};

// Test user confirmation email
console.log('\n📤 Testing user confirmation email...');
try {
  const userResult = await sendContactConfirmation(testContactData);
  if (userResult.success) {
    console.log('✅ User confirmation email sent successfully!');
    console.log(`   Message ID: ${userResult.messageId}`);
  } else {
    console.log('❌ User confirmation email failed:');
    console.log(`   Error: ${userResult.error}`);
  }
} catch (error) {
  console.log('❌ User confirmation email error:', error.message);
}

// Test admin notification email
console.log('\n📤 Testing admin notification email...');
try {
  const adminResult = await sendAdminNotification(testContactData);
  if (adminResult.success) {
    console.log('✅ Admin notification email sent successfully!');
    console.log(`   Message ID: ${adminResult.messageId}`);
  } else {
    console.log('❌ Admin notification email failed:');
    console.log(`   Error: ${adminResult.error}`);
  }
} catch (error) {
  console.log('❌ Admin notification email error:', error.message);
}

console.log('\n🏁 Contact form email testing completed!');
console.log('\n📝 Next steps:');
console.log('1. Check your email inbox (and spam folder)');
console.log('2. Verify the email content and formatting');
console.log('3. Test with the actual contact form');
console.log('4. Update email templates if needed');
