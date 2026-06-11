import { Router } from "express";
import { Contact } from "../models/Contact.js";

const router = Router();

// POST /api/contacts — submit a contact message
router.post("/", async (req, res) => {
  try {
    const { name, phone, email, subject, message } = req.body;

    if (!name || !phone || !subject || !message) {
      res.status(400).json({ error: "Name, phone, subject, and message are required" });
      return;
    }

    const contact = await Contact.create({ name, phone, email, subject, message });

    res.status(201).json({ message: "Message sent successfully", contact });
  } catch (err) {
    console.error("Contact error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
