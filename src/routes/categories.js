"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
const router = require("express").Router();
const categoriesController = require("../controllers/categories");
const permission = require("../middlewares/permission");

router
  .route("/(:id)?")
  .post(permission.isAdmin, categoriesController.create)
  .get(permission.isStaff, categoriesController.read)
  .put(permission.isAdmin, categoriesController.update)
  .patch(permission.isAdmin, categoriesController.update)
  .delete(permission.isAdmin, categoriesController.delete);

module.exports = router;
