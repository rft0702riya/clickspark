import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

console.log('JWT Secret:', process.env.JWT_SECRET);

// Test token generation and verification
const payload = { id: 1, email: 'test@example.com' };
const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

console.log('Generated token:', token);

try {
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  console.log('✅ Token verification successful:', decoded);
} catch (error) {
  console.log('❌ Token verification failed:', error.message);
}

