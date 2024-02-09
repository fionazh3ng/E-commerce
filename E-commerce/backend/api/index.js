const express = require("express");
const router = express.Router();

router.use("/orders", require("./orders"));
router.use("/orderdetails", require("./orderDetails"));

module.exports = router;
