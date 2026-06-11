import { Router } from "express";
import { Enrollment } from "../models/Enrollment.js";

const router = Router();

// POST /api/enrollments — enroll in a course
router.post("/", async (req, res) => {
  try {
    const { courseName, name, phone, email, message, userId } = req.body;

    if (!courseName || !name || !phone || !email) {
      res.status(400).json({ error: "Course name, name, phone, and email are required" });
      return;
    }

    const enrollment = await Enrollment.create({
      courseName,
      name,
      phone,
      email,
      message,
      userId,
    });

    res.status(201).json({ message: "Enrollment submitted successfully", enrollment });
  } catch (err) {
    console.error("Enrollment error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
