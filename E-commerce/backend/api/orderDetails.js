const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const router = require("express").Router();

router.get("/", async (req, res, next) => {
  try {
    const orderDetails = await prisma.orderdetails.findMany();
    res.send(orderDetails);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const orderDetails = await prisma.orderdetails.findFirst({
      where: {
        id: Number(req.params.id),
      },
    });
    res.send(orderDetails);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
