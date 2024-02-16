const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const router = require("express").Router();

router.get("/", async (req, res, next) => {
  try {
    const cart = await prisma.cart.findMany({
      where: {

        userid: req.user.id,
      },
    });
    let result = [];
    for (let x of cart) {
      result.push({
        ...x,
        productDescription: await prisma.products.findFirst({
          where: {
            id: x.productid,
          },
        }),
      });


    }
    res.send(result);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {//add to cart
  try {
    const add = await prisma.cart.create({
      data: {
        userid: req.user.id,
        productid: req.body.productid,
      },
    });
    return res.send(add);
  } catch (error) {
    next(error);
  }
});

router.delete("/", async (req, res, next) => { //delete one item in cart
  try {

    const findCheckoutId =await prisma.cart.findFirst({
      where:{
        productid:req.body.productid,
        userid:req.user.id
      }
    })
    const checkout = await prisma.cart.delete({
      where: {
        id:findCheckoutId.id
      },
    });
    return res.send(checkout);
  } catch (error) {
    next(error);
  }
});


module.exports = router;
