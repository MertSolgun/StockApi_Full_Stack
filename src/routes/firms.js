"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
const router = require("express").Router();
const firmsController = require("../controllers/firms");
const permission = require("../middlewares/permission");

router
  .route("/(:id)?")
  .post(permission.isAdmin, firmsController.create)
  .get(permission.isLogin, firmsController.read)
  .put(permission.isAdmin, firmsController.update)
  .patch(permission.isAdmin, firmsController.update)
  .delete(permission.isAdmin, firmsController.delete);

module.exports = router;
