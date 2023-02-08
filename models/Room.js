const mongoose = require("mongoose");

const Roomschema = new mongoose.Schema(
  {
    title: {
      type: String,
      unique: true,
    },
    price: {
      type: Number,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    maxPeople: {
      type: Number,
      required: true,
    },
    roomNumbers: [
      {
        number: Number,
        unavailableDates: { type: [Date] },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Room", Roomschema);
