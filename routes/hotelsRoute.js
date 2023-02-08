const express = require("express");
const router = express.Router();
const hotelsController = require("./../controllers/hotelController");
const verifyToken = require("./../utils/verifyToken");

router.get("/countByCity", hotelsController.countByCity);
router.get("/countByType", hotelsController.countByType);

router
  .route("/")
  .post(verifyToken.verifyAdmin, hotelsController.createHotel)
  .get(hotelsController.GetAllHotels);

router
  .route("/:id")
  .put(verifyToken.verifyAdmin, hotelsController.updateHotel)
  .delete(verifyToken.verifyAdmin, hotelsController.deleteHotel)
  .get(hotelsController.getHotelById);

module.exports = router;
