import { Router } from "express";
import { Order } from "../models/Order.js";
import { authMiddleware } from "../middleware/auth.js";

const router = Router();

// POST /api/orders — create a new order (auth required)
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { customerName, customerPhone, customerEmail, items, total, shippingAddress, notes } =
      req.body;

    if (!customerName || !customerPhone || !customerEmail || !items?.length || !total || !shippingAddress) {
      res.status(400).json({ error: "All required fields must be provided" });
      return;
    }

    const order = await Order.create({
      userId: req.user!.id,
      customerName,
      customerPhone,
      customerEmail,
      items,
      total,
      shippingAddress,
      notes,
    });

    res.status(201).json({ message: "Order placed successfully", order });
  } catch (err) {
    console.error("Order error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// GET /api/orders — get current user's orders (auth required)
router.get("/", authMiddleware, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user!.id }).sort({ createdAt: -1 });
    res.json({ orders });
  } catch (err) {
    console.error("Get orders error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
