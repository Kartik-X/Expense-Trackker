const jwt = require("jsonwebtoken");
const { User } = require("../models/index");
const { JWT_KEY } = require("../config/serverConfig");

const Authenticate = (req, res, next) => {
  try {
    const token = req.header("Authorization");
    const user = jwt.verify(token, JWT_KEY);

    User.findByPk(user.userId).then((user) => {
      req.user = user;
      next();
    });
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      success: false,
    });
  }
};
module.exports = {
  Authenticate,
};
