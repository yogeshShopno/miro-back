const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    const Authorization = req.get("Authorization");

    if (!Authorization) {
      throw new Error();
    }

    const decodeToken = await jwt.verify(Authorization,  process.env.JWT_SECRET);
    const user = await User.findById(decodeToken._id);
    req.user = user;
    return next();
  } catch (error) {
    console.log(error);
    return res.status(403).json({ error: error.message || "Unauthorized" });
  }
};