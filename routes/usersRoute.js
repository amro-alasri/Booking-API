const express = require("express");
const router = express.Router();
const userController = require("./../controllers/userController");
const verifyToken = require("./../utils/verifyToken");

router.route("/").get(verifyToken.verifyAdmin, userController.getAllUsers);
router
  .route("/:id")
  .get(verifyToken.verifyUser, userController.getUserById)
  .delete(verifyToken.verifyUser, userController.deleteUser)
  .put(verifyToken.verifyUser, userController.updateUser);

module.exports = router;
