import { Router } from "express";
import { Booking } from "../models/Booking.js";

const router = Router();

// POST /api/bookings — create a new booking request
router.post("/", async (req, res) => {
  try {
    const { name, phone, email, eventType, eventDate, location, notes } = req.body;

    if (!name || !phone || !email || !eventType || !eventDate || !location) {
      res.status(400).json({ error: "All required fields must be provided" });
      return;
    }

    const booking = await Booking.create({
      name,
      phone,
      email,
      eventType,
      eventDate,
      location,
      notes,
    });

    res.status(201).json({ message: "Booking request submitted successfully", booking });
  } catch (err) {
    console.error("Booking error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
