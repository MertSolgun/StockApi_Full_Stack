"use strict";

const router = require("express").Router();
const brandsController = require("../controllers/brands");
const permission = require("../middlewares/permission");

router
  .route("/(:id)?")
  .post(permission.isAdmin, brandsController.create)
  .get(permission.isStaff, brandsController.read)
  .put(permission.isAdmin, brandsController.update)
  .patch(permission.isAdmin, brandsController.update)
  .delete(permission.isAdmin, brandsController.delete);

module.exports = router;
