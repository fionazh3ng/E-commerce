const express = require("express");
const router = express.Router();

router.use("/auth"), require("../auth/index");
router.use("/users"), require("./users");

module.exports = router;
