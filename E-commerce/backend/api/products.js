const { PrismaClient } = require("@prisma/client");
const { product } = require("../db");
const prisma = new PrismaClient();
const router = require("express").Router();

// Get all products
router.get("/", async (req, res, next) => {
  try {
    const products = await prisma.products.findMany();
    res.send(products);
  } catch (error) {
    next(error);
  }
});

// Get product by id
router.get("/:id", async (req, res, next) => {
  try {
    const product = await prisma.products.findFirst({
      where: {
        id: Number(req.params.id),
      },
    });
    res.send(product);
  } catch (error) {
    next(error);
  }
});

// create new product
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
    res.status(201).send(product);
  } catch (error) {
    next(error);
  }
});

// Update product
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
    res.send(product);
  } catch (error) {
    next(error);
  }
});

// Delete product
// router.put("/:id", async (req, res, next) => {
//   try {
//     const product = await prisma.products.delete({
//       where: {
//         id: Number(req.params.id),
//       },
//     });
//     if (!product) {
//       return res.status(404).send("product not found.");
//     }
//     res.send(product);
//   } catch (error) {
//     next(error);
//   }
// });

module.exports = router;
