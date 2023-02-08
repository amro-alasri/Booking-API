const Hotel = require("./../models/Hotel");
const Error = require("./../utils/error");
// Create Hotel  *********************
exports.createHotel = async (req, res) => {
  const newHotel = new Hotel(req.body);

  try {
    const savedHotel = await newHotel.save();
    res.status(200).json(savedHotel);
  } catch (err) {
    console.log("error");
    res.status(500).json(err);
  }
};

// Get All Hotels **************
exports.GetAllHotels = async (req, res) => {
  const { min, max, ...other } = req.query;
  try {
    const data = await Hotel.find({
      ...other,
      cheapestPrice: { $gt: min || 1, $lt: max || 20000 },
    }).limit(req.query.limit);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({
      status: "fail",
      err: err,
    });
  }
};

// update Hotels
exports.updateHotel = async (req, res, next) => {
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );
    res.status(200).json(updatedHotel);
  } catch (err) {
    next(err);
  }
};

exports.deleteHotel = async (req, res, next) => {
  try {
    const data = await Hotel.findByIdAndDelete(req.params.id);
    if (!data) {
      return res.status(404).json({
        status: "There is no element with this id",
      });
    }
    res.status(204).json({
      status: "success",
      data: data,
    });
  } catch (err) {
    next(err);
  }
};

exports.getHotelById = async (req, res, next) => {
  try {
    const data = await Hotel.findById(req.params.id);
    res.status(200).json(data);
  } catch (err) {
    next(Error.createError(500, ""));
  }
};

exports.countByCity = async (req, res, next) => {
  const cities = req.query.cities?.split(",") || [];
  try {
    const list = await Promise.all(
      cities.map((city) => {
        return Hotel.countDocuments({ City: city });
      })
    );

    // response
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};

exports.countByType = async (req, res, next) => {
  try {
    const hotelCount = await Hotel.countDocuments({ type: "hotel" });
    const apartmentCount = await Hotel.countDocuments({ type: "apartment" });
    const resortCount = await Hotel.countDocuments({ type: "resort" });
    const villaCount = await Hotel.countDocuments({ type: "villa" });
    const cabinCount = await Hotel.countDocuments({ type: "cabin" });

    // response
    res.status(200).json([
      { type: "hotel", count: hotelCount },
      { type: "apartment", count: apartmentCount },
      { type: "resorts", count: resortCount },
      { type: "villas", count: villaCount },
      { type: "cabins", count: cabinCount },
    ]);
  } catch (err) {
    next(err);
  }
};
