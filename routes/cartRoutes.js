const express = require("express");
const router = express.Router();
const Cart = require("../shoppyglobe-api/models/Cart");
const auth = require("./middleware/authMiddleware");

// Add to cart
router.post("/cart", auth, async (req, res) => {
  const item = new Cart({
    userId: req.user.id,
    productId: req.body.productId,
    quantity: req.body.quantity
  });

  await item.save();
  res.status(201).json(item);
});

// Update quantity
router.put("/cart/:id", auth, async (req, res) => {
  const updated = await Cart.findByIdAndUpdate(
    req.params.id,
    { quantity: req.body.quantity },
    { new: true }
  );

  res.json(updated);
});

// Delete item
router.delete("/cart/:id", auth, async (req, res) => {
  await Cart.findByIdAndDelete(req.params.id);
  res.json({ message: "Item removed" });
});

module.exports = router;