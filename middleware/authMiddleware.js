import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res.status(401).json({ error: "No token provided" });
  }

  const parts = authHeader.split(" ");
  if (parts.length !== 2 || parts[0] !== "Bearer") {
    return res.status(401).json({ error: "Token format invalid. Use: Bearer <token>" });
  }

  const token = parts[1];

  // Debug logs
  console.log("Authorization Header:", authHeader);
  console.log("Raw Token:", token);

  const decodedUnverified = jwt.decode(token, { complete: true });
  console.log("Decoded (unverified):", decodedUnverified);

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    console.log("Verified Payload:", decoded);

    req.user = decoded;
    next();
  } catch (err) {
    console.error("JWT verification failed:", err.message);
    return res.status(403).json({ error: `Invalid or expired token: ${err.message}` });
  }
};
