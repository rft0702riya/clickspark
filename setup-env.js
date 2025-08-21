import fs from 'fs';
import path from 'path';

console.log('🔧 Setting up environment configuration...');

const envContent = `# =====================================================
# ClickSpark Environment Configuration
# =====================================================

# Database Configuration
DB_HOST=localhost
DB_USER=riya0701
DB_PASSWORD=riya1234
DB_NAME=click
DB_PORT=3306

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_here_change_in_production
JWT_EXPIRES_IN=1h

# Email Configuration (for contact form and notifications)
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
ADMIN_EMAIL=admin@clickspark.com

# Server Configuration
PORT=5000
NODE_ENV=development

# Security Configuration
BCRYPT_ROUNDS=10
SESSION_SECRET=your_session_secret_here
CORS_ORIGIN=http://localhost:5173
`;

const envPath = path.join(process.cwd(), '.env');

try {
  if (fs.existsSync(envPath)) {
    console.log('⚠️  .env file already exists!');
    console.log('📝 Please update your existing .env file with these email settings:');
    console.log('');
    console.log('EMAIL_USER=your_email@gmail.com');
    console.log('EMAIL_PASS=your_app_password');
    console.log('ADMIN_EMAIL=admin@clickspark.com');
    console.log('');
    console.log('🔑 Make sure to use your Gmail App Password, not your regular password!');
  } else {
    fs.writeFileSync(envPath, envContent);
    console.log('✅ .env file created successfully!');
    console.log('');
    console.log('📝 Next steps:');
    console.log('1. Edit the .env file and update these values:');
    console.log('   - EMAIL_USER: your Gmail address');
    console.log('   - EMAIL_PASS: your Gmail App Password');
    console.log('   - ADMIN_EMAIL: where you want to receive admin notifications');
    console.log('');
    console.log('2. To get Gmail App Password:');
    console.log('   - Go to Google Account → Security');
    console.log('   - Enable 2-Factor Authentication');
    console.log('   - Create App Password for "Mail"');
    console.log('   - Use the 16-character password');
    console.log('');
    console.log('3. Test email configuration:');
    console.log('   node test-email-simple.js');
  }
} catch (error) {
  console.error('❌ Error creating .env file:', error.message);
  console.log('');
  console.log('📝 Please create .env file manually with this content:');
  console.log(envContent);
}
