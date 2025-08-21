import { sendContactConfirmation, sendAdminNotification } from './utils/emailService.js';
import dotenv from 'dotenv';

dotenv.config();

console.log('🧪 Final Email Test...');
console.log('📧 Email Configuration:');
console.log(`   User: ${process.env.EMAIL_USER || '❌ Not set'}`);
console.log(`   Password: ${process.env.EMAIL_PASS ? '✅ Set' : '❌ Not set'}`);

// Test contact data
const testContactData = {
  firstName: 'Test',
  lastName: 'User',
  email: 'hiringrft@gmail.com', // Send to your email for testing
  phone: '1234567890',
  country: 'USA (+1)',
  company: 'Test Company',
  website: 'https://test.com',
  revenue: '$100k-$500k',
  message: 'This is a test message from the contact form.'
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

console.log('\n🏁 Email testing completed!');
console.log('📧 Check your email inbox for the test messages.');
