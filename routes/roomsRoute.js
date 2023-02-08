const express = require("express");
const router = express.Router();
const verify = require("./../utils/verifyToken");
const roomController = require("./../controllers/roomController");

// create room in specific hotel
router.post("/:hotelid", verify.verifyAdmin, roomController.createRoom);

router.get("/", roomController.getRooms);
router.get("/:id", roomController.getRoom);

router.put("/:id", verify.verifyAdmin, roomController.updateRoom);
router.delete("/:id/:hotelId", verify.verifyAdmin, roomController.deleteRoom);

module.exports = router;
