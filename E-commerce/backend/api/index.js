const express = require("express");
const router = express.Router();

router.use("/orders", require("./orders"));
router.use("/users", require("./users"));

module.exports = router;
