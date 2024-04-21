"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
const router = require("express").Router();
const purchasesController = require("../controllers/purchases");
const permission = require("../middlewares/permission");

router
  .route("/(:id)?")
  .post(permission.isAdmin, purchasesController.create)
  .get(permission.isStaff, purchasesController.read)
  .put(permission.isAdmin, purchasesController.update)
  .patch(permission.isAdmin, purchasesController.update)
  .delete(permission.isAdmin, purchasesController.delete);

module.exports = router;
