import express from "express";
import mysql from "mysql2/promise";
import dotenv from "dotenv";
import cors from "cors";
import { verifyToken } from "./middleware/authMiddleware.js";
import authRoutes from "./routes/authRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import consultationRoutes from "./routes/consultationRoutes.js";

dotenv.config();
const app = express();
app.use(express.json());

// ✅ Allow frontend access (React at 5173)
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  })
);

// ============================
// ✅ Routes
// ============================
app.use("/", authRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/consultation", consultationRoutes);

// Test route to verify server is running
app.get("/test", (req, res) => {
  res.json({ message: "Server is running! 🚀" });
});

// ============================
// ✅ Protected Dashboard Route
// ============================
app.get("/dashboard", verifyToken, (req, res) => {
  res.json({
    message: "Welcome to your dashboard 🚀",
    user: req.user, // decoded token data
  });
});

// ============================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
