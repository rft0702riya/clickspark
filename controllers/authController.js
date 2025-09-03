// controllers/authController.js
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import pool from "../config/db.js"; // uses mysql2/promise
import nodemailer from "nodemailer";

// Temporary storage for OTP (in production, use Redis or database)
const otpStorage = new Map();

// Email transporter configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'your-email@gmail.com',
    pass: process.env.EMAIL_PASS || 'your-app-password'
  }
});

// Generate OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Send OTP email
const sendOTPEmail = async (email, otp) => {
  const mailOptions = {
    from: process.env.EMAIL_USER || 'your-email@gmail.com',
    to: email,
    subject: 'Email Verification OTP - ClickSpark',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #f59e0b;">ClickSpark - Email Verification</h2>
        <p>Thank you for registering with ClickSpark!</p>
        <p>Your verification OTP is:</p>
        <div style="background-color: #f3f4f6; padding: 20px; text-align: center; border-radius: 8px; margin: 20px 0;">
          <h1 style="color: #f59e0b; font-size: 32px; margin: 0; letter-spacing: 5px;">${otp}</h1>
        </div>
        <p>This OTP will expire in 10 minutes.</p>
        <p>If you didn't request this verification, please ignore this email.</p>
        <hr style="margin: 20px 0;">
        <p style="color: #6b7280; font-size: 12px;">ClickSpark Team</p>
      </div>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`✅ OTP email sent to: ${email}`);
    return true;
  } catch (error) {
    console.error(`❌ Failed to send OTP email to ${email}:`, error);
    return false;
  }
};

// INITIAL REGISTRATION - Send OTP
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log("📩 Incoming register request:", req.body);

    // 1. Check if user already exists
    const [existingUser] = await pool.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (existingUser.length > 0) {
      console.log("⚠ User already exists with email:", email);
      return res.status(400).json({ message: "User already exists" });
    }

    // 2. Generate OTP
    const otp = generateOTP();
    
    // 3. Store OTP temporarily (with user data)
    otpStorage.set(email, {
      name,
      email,
      password,
      otp,
      createdAt: Date.now()
    });

    // 4. Send OTP email
    const emailSent = await sendOTPEmail(email, otp);
    
    if (!emailSent) {
      otpStorage.delete(email);
      return res.status(500).json({ message: "Failed to send verification email" });
    }

    console.log("✅ OTP sent for registration:", email);

    res.status(200).json({ 
      message: "OTP sent to your email. Please check your inbox and verify your email." 
    });
  } catch (error) {
    console.error("❌ Error in register:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// VERIFY OTP AND COMPLETE REGISTRATION
export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    console.log("🔐 OTP verification attempt:", email);

    // 1. Check if OTP exists
    const userData = otpStorage.get(email);
    if (!userData) {
      return res.status(400).json({ message: "OTP expired or not found. Please register again." });
    }

    // 2. Check OTP expiration (10 minutes)
    const now = Date.now();
    const otpAge = now - userData.createdAt;
    if (otpAge > 10 * 60 * 1000) { // 10 minutes
      otpStorage.delete(email);
      return res.status(400).json({ message: "OTP expired. Please register again." });
    }

    // 3. Verify OTP
    if (userData.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    // 4. Hash password and create user
    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(userData.password, salt);

    // 5. Insert new user
    await pool.query(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [userData.name, userData.email, password_hash]
    );

    // 6. Clean up OTP storage
    otpStorage.delete(email);

    // 7. Send success email
    const successMailOptions = {
      from: process.env.EMAIL_USER || 'your-email@gmail.com',
      to: email,
      subject: 'Registration Successful - ClickSpark',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #f59e0b;">Welcome to ClickSpark! 🎉</h2>
          <p>Dear ${userData.name},</p>
          <p>Your account has been successfully registered!</p>
          <p>You can now login to your account and start using ClickSpark.</p>
          <hr style="margin: 20px 0;">
          <p style="color: #6b7280; font-size: 12px;">ClickSpark Team</p>
        </div>
      `
    };

    try {
      await transporter.sendMail(successMailOptions);
    } catch (emailError) {
      console.error("Failed to send success email:", emailError);
    }

    console.log("✅ User registration completed:", email);

    res.status(201).json({ 
      message: "Registration successful! You can now login to your account." 
    });
  } catch (error) {
    console.error("❌ Error in OTP verification:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// RESEND OTP
export const resendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    console.log("🔄 Resend OTP request:", email);

    // 1. Check if user data exists
    const userData = otpStorage.get(email);
    if (!userData) {
      return res.status(400).json({ message: "No pending registration found. Please register again." });
    }

    // 2. Generate new OTP
    const newOtp = generateOTP();
    
    // 3. Update OTP in storage
    otpStorage.set(email, {
      ...userData,
      otp: newOtp,
      createdAt: Date.now()
    });

    // 4. Send new OTP email
    const emailSent = await sendOTPEmail(email, newOtp);
    
    if (!emailSent) {
      return res.status(500).json({ message: "Failed to send OTP email" });
    }

    console.log("✅ OTP resent for:", email);

    res.status(200).json({ 
      message: "New OTP sent to your email. Please check your inbox." 
    });
  } catch (error) {
    console.error("❌ Error in resend OTP:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// LOGIN USER
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("🔑 Login attempt:", email);

    // 1. Find user
    const [userRows] = await pool.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (userRows.length === 0) {
      return res.status(400).json({ 
        message: "Account not found. Please sign up first to create an account before logging in.",
        code: "ACCOUNT_NOT_FOUND"
      });
    }

    const user = userRows[0];

    // 2. Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ 
        message: "Incorrect password. Please check your password and try again.",
        code: "INVALID_PASSWORD"
      });
    }

    // 3. Generate JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email, name: user.name },
      process.env.JWT_SECRET || "supersecretkey",
      { expiresIn: "1h" }
    );

    console.log("✅ Login successful for:", email);

    res.json({
      message: "Login successful!",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("❌ Error in login:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// VERIFY EMAIL (stub)
export const verifyEmail = async (req, res) => {
  res.json({ message: "📩 Verify email endpoint (to be implemented)" });
};

// RESEND VERIFICATION (stub)
export const resendVerification = async (req, res) => {
  res.json({ message: "🔁 Resend verification endpoint (to be implemented)" });
};
