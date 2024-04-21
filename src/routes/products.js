"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
const router = require("express").Router();
const productController = require("../controllers/products");
const permission = require("../middlewares/permission");

router
  .route("/(:id)?")
  .post(permission.isAdmin, productController.create)
  .get(permission.isStaff, productController.read)
  .put(permission.isAdmin, productController.update)
  .patch(permission.isAdmin, productController.update)
  .delete(permission.isAdmin, productController.delete);

module.exports = router;
