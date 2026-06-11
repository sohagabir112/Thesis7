import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./db.js";

import { toNodeHandler } from "better-auth/node";
import { auth } from "./auth.js";
import bookingRoutes from "./routes/bookings.js";
import contactRoutes from "./routes/contacts.js";
import orderRoutes from "./routes/orders.js";
import enrollmentRoutes from "./routes/enrollments.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || "http://localhost:5173";

// Middleware
app.use(cors({ origin: FRONTEND_ORIGIN, credentials: true }));
// Better Auth handler (must be mounted before express.json)
app.all("/api/auth/*", toNodeHandler(auth));

app.use(express.json());

// Routes
app.use("/api/bookings", bookingRoutes);
app.use("/api/contacts", contactRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/enrollments", enrollmentRoutes);

// Health check
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Start
async function start() {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`🚀 Thesis7 API running on http://localhost:${PORT}`);
  });
}

start();
