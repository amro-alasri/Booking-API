const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const body_parser = require("body-parser");
// routes
const authRoute = require("./routes/authRoute");
const usersRoute = require("./routes/usersRoute");
const hotelsRoute = require("./routes/hotelsRoute");
const roomsRoute = require("./routes/roomsRoute");
const cookie_parser = require("cookie-parser");
const cors = require("cors");

dotenv.config();
const app = express();

// middleware
// app.use(cors());
app.use(body_parser.json());
app.use(cookie_parser());
// middle route
app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);

// error middleware
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "something went wrong";

  res.status(errorStatus).json({
    status: "fail",
    errorMassage: errorMessage,
    stack: err.stake,
  });
});

app.get("/", (req, res) => {
  res.status(200).json({
    name: "good",
  });
});

// connect to database
const connect = async () => {
  try {
    console.log("connect to mongoDB");
    await mongoose.connect(process.env.DB_Connection);
  } catch (err) {
    throw err;
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("mongoDB disconnected");
});

mongoose.connection.on("connected", () => {
  console.log("mongoDB connected");
});

app.listen(8800, () => {
  connect();
  console.log("app start at port 8800");
});
