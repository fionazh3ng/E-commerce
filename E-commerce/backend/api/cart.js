const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const router = require("express").Router();

router.get("/", async (req, res, next) => {
  try {
    const cart = await prisma.cart.findMany({
      where: {
        userid: Number(1),
      },
    });
    let result=[]
    for(let x of cart){
        result.push({...x,productDescription:await prisma.products.findFirst({
            where:{
                id:x.productid
            }
        })})
    }
    res.send(result);
  } catch (error) {
    next(error);
  }
});

// router.get("/:id", async (req, res, next) => {
//     try {
//       const cart = await prisma.cart.findFirst({
//         where: {
//           productid:Number(req.params.id),
//         },
//       });
//       res.send(cart);
//     } catch (error) {
//       next(error);
//     }
//   });

router.post("/",async(req, res, next)=>{
    try{
        const add=await prisma.cart.create({
            data:{
                userid:req.user.id,
                productid:req.body.id
            }
        })
        return res.send(add)
    }catch(error){
        next(error)
    }
})

router.delete("/", async(req,res,next)=>{
    try{
        const checkout=await prisma.cart.delete({
            where:{
                productid:req.body.id
            }
        })
        return res.send(checkout)
    }catch(error){
        next(error)
    }
})

module.exports = router;
