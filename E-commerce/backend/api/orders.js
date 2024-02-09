const { PrismaClient } = require("@prisma/client");
const { product } = require("../db");
const prisma = new PrismaClient();
const router = require("express").Router();

// router.use((req, res, next) => {
//     if (!req.user) {
//       return res.status(401).send("You must be logged in to do that.");
//     }
//     next();
//   });

router.get("/", async (req, res, next) => {
  try {
    const orders = await prisma.orders.findMany();
    res.send(orders);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const orders = await prisma.orders.findFirst({
      where: {
        id: Number(req.params.id),
      },
    });
    res.send(orders);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    console.log(req.user);
    const orders = await prisma.orders.create({
      data: {
        userid: 1,
      },
    });
    const orderDetails =await prisma.orderdetails.create({
        data: {
            orderid:orders.id,
            productid:2
          },
    })
    let obj={
        orderid:orders.id,
        productItems: orderDetails.productid
    }
    res.send(obj);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
