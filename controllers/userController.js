const User = require("./../models/User");

// Get All User **************
exports.getAllUsers = async (req, res) => {
  try {
    const data = await User.find();
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

// update User
exports.updateUser = async (req, res, next) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    next(err);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const data = await User.findByIdAndDelete(req.params.id);
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

exports.getUserById = async (req, res, next) => {
  try {
    const data = await User.findById(req.params.id);
    res.status(200).json({
      status: "success",
      data: data,
    });
  } catch (err) {
    next(err);
  }
};
