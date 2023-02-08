const Room = require("./../models/Room");
const { createError } = require("./../utils/error");
const Hotel = require("./../models/Hotel");

// createRoom *************************
exports.createRoom = async (req, res, next) => {
  const hotelId = req.params.hotelid;
  const newRoom = new Room(req.body);

  try {
    const savedRoom = await newRoom.save();
    try {
      await Hotel.findByIdAndUpdate(hotelId, {
        $push: { rooms: savedRoom._id },
      });
    } catch (err) {
      next(err);
    }

    // response
    res.status(200).json({
      status: "success",
      data: savedRoom,
    });
  } catch (err) {
    next(err);
  }
};

// update Hotels
exports.updateRoom = async (req, res, next) => {
  try {
    const updatedRoom = await RoomupdateRoom.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );
    res.status(200).json(updatedRoom);
  } catch (err) {
    next(err);
  }
};

exports.deleteRoom = async (req, res, next) => {
  try {
    const data = await Room.findByIdAndDelete(req.params.id);
    const hotelId = req.params.hotelId;
    // update the hotel
    try {
      await Hotel.findByIdAndUpdate(hotelId, {
        $pull: { rooms: req.params.id },
      });
    } catch (err) {
      next(err);
    }

    res.status(204).json({
      status: "success",
      data: data,
    });
  } catch (err) {
    next(err);
  }
};

exports.getRoom = async (req, res, next) => {
  try {
    const data = await Room.findById(req.params.id);

    res.status(200).json({
      status: "success",
      data: data,
    });
  } catch (err) {
    Error.createError(500, "");
  }
};

// Get All Rooms **************
exports.getRooms = async (req, res) => {
  try {
    const data = await Room.find();
    res.status(200).json({
      status: "success",
      data: data,
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      err: err,
    });
  }
};
