"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
const router = require("express").Router();
const userController = require("../controllers/user");
const permission = require("../middlewares/permission");

router
  .route("/")
  .get(permission.isLogin, userController.list)
  .post(userController.create);

router
  .route("/:id")
  .get(permission.isLogin, userController.read)
  .put(permission.isLogin, userController.update)
  .patch(permission.isLogin, userController.update)
  .delete(permission.isAdmin, userController.delete);

module.exports = router;
