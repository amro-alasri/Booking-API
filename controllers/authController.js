const User = require("./../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// register ************
exports.register = async (req, res, next) => {
  try {
    const hash = bcrypt.hashSync(req.body.password, 10);

    const newUser = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: hash,
    });

    res.status(200).json({
      status: "success",
      data: newUser,
    });
  } catch (err) {
    next(err);
  }
};

// login *******************
exports.login = async (req, res, next) => {
  try {
    // check email and password
    if (!req.body.email || !req.body.password) {
      return res.status(400).json({
        status: "fail",
        err: "email and password must require for login",
      });
    }
    // find user
    const user = await User.findOne({ email: req.body.email });
    // if user is null
    if (!user) {
      return res.status(400).json({
        status: "fail",
        err: "email or password is wronge",
      });
    }

    // check password
    const isCorrectPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isCorrectPassword) {
      return res.status(400).json({
        status: "fail",
        err: "email or password is wronge",
      });
    }

    // send json web token
    const token = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SECRET_KEY, // to create secret key ->  openssl rand -base64 32
      {
        expiresIn: process.env.JWT_EXPAIRED_DATE,
      }
    );

    const { password, isAdmin, ...other } = user._doc;
    res
      .cookie("amr_accses_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({
        status: "success",
        data: other,
      });
  } catch (err) {
    next(err);
  }
};
