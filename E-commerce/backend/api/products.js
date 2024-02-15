// getProducts.js
const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

router.get("/", async (req, res, next) => {
  try {
    const products = await prisma.products.findMany();
    res.json(products);
  } catch (error) {
    next(error);
  }
});

// getProductById.js

router.get("/:id", async (req, res, next) => {
  try {
    const product = await prisma.products.findFirst({
      where: {
        id: Number(req.params.id),
      },
    });
    if (!product) {
      res.status(404).json({ error: "Product not found" });
    } else {
      res.json(product);
    }
  } catch (error) {
    next(error);
  }
});

// createProduct.js

router.post("/", async (req, res, next) => {
  try {
    const { name, url, description, price } = req.body;
    const product = await prisma.products.create({
      data: {
        name,
        url,
        description,
        price,
      },
    });
    res.status(201).json(product);
  } catch (error) {
    next(error);
  }
});

// updateProduct.js

router.put("/:id", async (req, res, next) => {
  try {
    const { name, url, description, price } = req.body;
    const product = await prisma.products.update({
      where: {
        id: Number(req.params.id),
      },
      data: {
        name,
        url,
        description,
        price,
      },
    });
    res.json(product);
  } catch (error) {
    next(error);
  }
});

// deleteProduct.js

router.delete("/:id", async (req, res, next) => {
  try {
    const product = await prisma.products.delete({
      where: {
        id: Number(req.params.id),
      },
    });
    if (!product) {
      return res.status(404).send("Product not found.");
    }
    res.json(product);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
