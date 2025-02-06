const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

//sign up user
exports.signup = async (req, res) => {
  try {
    if (!req.body.email || !req.body.password)
      return res
        .status(200)
        .json({ status: false, message: "Invalid details!" });
    const isUserExist = await User.findOne({ email: req.body.email });
    if (isUserExist) {
      return res.status(200).json({
        status: false,
        message: "This is existing user please do signin.",
      });
    }

    const user = new User();
    user.email = req.body.email;
    user.password = req.body.password;
    await user.save();

    const payload = {
      _id: user._id,
      email: user.email,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET);

    return res.status(200).json({
      status: true,
      message: "Success!!",
      token,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: false, error: error.message || "Server Error" });
  }
};

//user login
exports.login = async (req, res) => {
  try {
    if (!req.body.email || !req.body.password)
      return res
        .status(200)
        .json({ status: false, message: "Invalid details!" });

    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(200).json({
        status: false,
        message: "Oops! Email doesn't exist.",
      });
    }
    const isPassword = bcrypt.compareSync(req.body.password, user.password);
    if (!isPassword) {
      return res.status(200).json({
        status: false,
        message: "Oops! Password doesn't match.",
      });
    }

    const payload = {
      _id: user._id,
      email: user.email,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET);

    return res.status(200).json({ status: true, message: "Success!!", token });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: false, error: error.message || "Server Error" });
  }
};

//get user list
exports.usersList = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user)
      return res
        .status(401)
        .json({ status: false, message: "Unauthorized user! " });

    const users = await User.find({ _id: { $ne: user._id } });

    return res
      .status(200)
      .json({ status: true, message: "Success!!", data: users });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: false, error: error.message || "Server Error" });
  }
};
