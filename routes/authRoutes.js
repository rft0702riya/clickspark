import express from "express";
import { register, login, verifyOtp, resendOtp, verifyEmail, resendVerification } from "../controllers/authController.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

// OTP verification endpoints
router.post("/verify-otp", verifyOtp);
router.post("/resend-otp", resendOtp);

// Legacy endpoints (stubs)
router.get("/verify-email", verifyEmail);
router.post("/resend-verification", resendVerification);

export default router;
