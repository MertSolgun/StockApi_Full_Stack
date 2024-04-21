"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
const router = require("express").Router();
const salesController = require("../controllers/sales");
const permission = require("../middlewares/permission");

router
  .route("/(:id)?")
  .post(permission.isAdmin, salesController.create)
  .get(permission.isStaff, salesController.read)
  .put(permission.isAdmin, salesController.update)
  .patch(permission.isAdmin, salesController.update)
  .delete(permission.isAdmin, salesController.delete);

module.exports = router;
