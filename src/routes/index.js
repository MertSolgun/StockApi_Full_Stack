"use strict";
const router = require("express").Router();

router.use("/user", require("./user"));
router.use("/firms", require("./firms"));
router.use("/sales", require("./sales"));
router.use("/purchases", require("./purchases"));
router.use("/products", require("./products"));
router.use("/categories", require("./categories"));
router.use("/brands", require("./brands"));
router.use("/token", require("./token"));
router.use("/auth", require("./auth"));

module.exports = router;
