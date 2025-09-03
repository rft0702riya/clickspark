import fetch from 'node-fetch';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

async function testStrategyCallWithNewJWT() {
  try {
    console.log('🔧 Testing Strategy Call with New JWT Secret');
    console.log('============================================');
    
    // Generate a test token with the new JWT secret
    const token = jwt.sign(
      { id: 1, email: 'test@example.com', name: 'Test User' },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    console.log('🔑 New JWT Secret length:', process.env.JWT_SECRET?.length);
    console.log('🔑 Generated token:', token.substring(0, 50) + '...');

    // Test data
    const testData = {
      firstName: 'Test',
      lastName: 'User',
      email: 'test@example.com',
      phone: '+1234567890',
      company: 'Test Company',
      message: 'I would like to schedule a free strategy call to discuss my business goals and digital marketing needs.'
    };

    console.log('📤 Sending strategy call request...');

    const response = await fetch('http://localhost:5000/api/strategy-call/request', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(testData),
    });

    console.log('📡 Response status:', response.status);

    const data = await response.json();
    console.log('📡 Response data:', data);

    if (response.ok) {
      console.log('✅ Strategy call endpoint test successful!');
      console.log('🎉 JWT authentication is working properly!');
    } else {
      console.log('❌ Strategy call endpoint test failed:', data.message || data.error);
    }

  } catch (error) {
    console.error('❌ Test error:', error.message);
  }
}

testStrategyCallWithNewJWT();

