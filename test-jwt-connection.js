import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

console.log('🔧 JWT Connection Test');
console.log('=====================');

// Check environment variables
console.log('1. Environment Variables:');
console.log('   JWT_SECRET:', process.env.JWT_SECRET);
console.log('   JWT_SECRET length:', process.env.JWT_SECRET?.length);
console.log('   JWT_SECRET type:', typeof process.env.JWT_SECRET);

// Test token generation
console.log('\n2. Token Generation Test:');
const testPayload = { id: 1, email: 'test@example.com', name: 'Test User' };
const generatedToken = jwt.sign(testPayload, process.env.JWT_SECRET, { expiresIn: '1h' });
console.log('   Generated token:', generatedToken.substring(0, 50) + '...');

// Test token verification
console.log('\n3. Token Verification Test:');
try {
  const decoded = jwt.verify(generatedToken, process.env.JWT_SECRET);
  console.log('   ✅ Token verification successful');
  console.log('   Decoded payload:', decoded);
} catch (error) {
  console.log('   ❌ Token verification failed:', error.message);
}

// Test with fallback secret
console.log('\n4. Fallback Secret Test:');
const fallbackSecret = "supersecretkey";
const fallbackToken = jwt.sign(testPayload, fallbackSecret, { expiresIn: '1h' });
console.log('   Fallback token:', fallbackToken.substring(0, 50) + '...');

try {
  const decodedFallback = jwt.verify(fallbackToken, fallbackSecret);
  console.log('   ✅ Fallback token verification successful');
} catch (error) {
  console.log('   ❌ Fallback token verification failed:', error.message);
}

// Test cross-verification
console.log('\n5. Cross-Verification Test:');
try {
  const crossDecoded = jwt.verify(generatedToken, fallbackSecret);
  console.log('   ✅ Generated token works with fallback secret');
} catch (error) {
  console.log('   ❌ Generated token does NOT work with fallback secret:', error.message);
}

try {
  const crossDecoded2 = jwt.verify(fallbackToken, process.env.JWT_SECRET);
  console.log('   ✅ Fallback token works with env secret');
} catch (error) {
  console.log('   ❌ Fallback token does NOT work with env secret:', error.message);
}

console.log('\n6. Conclusion:');
if (process.env.JWT_SECRET === fallbackSecret) {
  console.log('   ⚠️  JWT_SECRET is using fallback value');
} else {
  console.log('   ✅ JWT_SECRET is using environment variable');
}

