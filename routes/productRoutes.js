const express = require("express");
const router = express.Router();
const Product = require("../shoppyglobe-api/models/Product");

// GET all products
router.get("/products", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// GET product by ID
router.get("/products/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch {
    res.status(400).json({ message: "Invalid ID" });
  }
});

module.exports = router;