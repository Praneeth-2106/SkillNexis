const express = require("express");
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const auth = require("../middleware/auth");

const router = express.Router();

// Add to Cart
router.post("/", auth, async (req, res) => {
  try {
    const { productId } = req.body;

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    if (product.stock <= 0) {
      return res.status(400).json({
        message: "Out of Stock",
      });
    }

    const existing = await Cart.findOne({
      user: req.user.id,
      product: productId,
    });

    if (existing) {
      existing.quantity += 1;
      await existing.save();
    } else {
      await Cart.create({
        user: req.user.id,
        product: productId,
      });
    }

    // Reduce stock by 1
    product.stock -= 1;
    await product.save();

    res.json({
      message: "Product added to cart",
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

// Get Cart
router.get("/", auth, async (req, res) => {
  try {
    const items = await Cart.find({
      user: req.user.id,
    }).populate("product");

    res.json(items);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

// Remove Item
router.delete("/:id", auth, async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);

    res.json({
      message: "Removed",
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

module.exports = router;