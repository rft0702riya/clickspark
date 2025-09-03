import crypto from 'crypto';
import fs from 'fs';

// Generate a secure random JWT secret
const generateJWTSecret = () => {
  return crypto.randomBytes(64).toString('hex');
};

// Read current .env file
const envPath = '.env';
let envContent = '';

try {
  envContent = fs.readFileSync(envPath, 'utf8');
} catch (error) {
  console.log('❌ Error reading .env file:', error.message);
  process.exit(1);
}

// Generate new JWT secret
const newJWTSecret = generateJWTSecret();
console.log('🔐 Generated new JWT secret:', newJWTSecret);

// Replace the old JWT_SECRET with the new one
const updatedEnvContent = envContent.replace(
  /JWT_SECRET=.*/,
  `JWT_SECRET=${newJWTSecret}`
);

// Write back to .env file
try {
  fs.writeFileSync(envPath, updatedEnvContent);
  console.log('✅ JWT secret updated in .env file');
  console.log('🔑 New JWT_SECRET length:', newJWTSecret.length);
} catch (error) {
  console.log('❌ Error writing to .env file:', error.message);
  process.exit(1);
}

console.log('\n🎉 JWT secret has been successfully generated and updated!');
console.log('📝 Please restart your server to use the new JWT secret.');
