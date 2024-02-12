const express = require("express");
const router = express.Router();

router.use("/orders", require("./orders"));
router.use("/cart", require("./cart"));

module.exports = router;
