const mongoose = require("mongoose");

const Hotelschema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  City: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  distance: {
    type: String,
    required: true,
  },
  photos: {
    type: [String],
  },
  desc: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    max: 5,
    min: 0,
  },

  rooms: {
    type: [String],
  },
  cheapestPrice: {
    type: Number,
    required: true,
  },

  featured: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Hotel", Hotelschema);
