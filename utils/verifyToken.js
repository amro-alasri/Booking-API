const jwt = require("jsonwebtoken");
const { createError } = require("./../utils/error");
exports.verifyToken = (req, res, next) => {
  const token = req.cookies.amr_accses_token;
  // const token = req.cookies.jwt;
  if (!token) {
    return next(createError(401, "You are not authenticated!"));
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) return next(createError(401, "the token not valid!"));
    req.user = user;
    console.log(user);
    next();
  });
};

exports.verifyUser = (req, res, next) => {
  this.verifyToken(req, res, next, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      return next(createError(403, "You are not authorized!"));
    }
  });
};

exports.verifyAdmin = (req, res, next) => {
  this.verifyToken(req, res, next, (err) => {
    if (req.user.isAdmin) {
      next();
    } else {
      return next(createError(403, "You are not authorized!"));
    }
  });
};
