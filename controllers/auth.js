const User = require("../models/user");
const bcrypt = require("bcrypt");
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const router = require("../routes/auth");

const userRegister = async (req, res) => {
  try {
    const {
      emailAddress,
      password,
      firstName,
      lastName,
      phoneNumber,
      isFarmer,
    } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(404).json({ error: errors.array() });
    }
    const user = await User.findOne({ emailAddress });
    if (user) {
      return res.status(400).json({
        error: [
          {
            msg: "User already exists",
          },
        ],
      });
    }
    const hashedpassword = await bcrypt.hash(password, 10);
    console.log(hashedpassword);
    const newUser = new User({
      firstName,
      lastName,
      emailAddress,
      phoneNumber,
      password: hashedpassword,
      isFarmer,
    });
    const savedUser = await newUser.save();
    const token = await jwt.sign(
      {
        id: savedUser._id,
        email: savedUser.emailAddress,
      },
      process.env.JWT_SIGN,
      {
        expiresIn: "2d",
      }
    );
    console.log(token);
    res.status(200).json(savedUser);
  } catch (error) {
    res.status(400).json(error);
  }
};

// Get all users

const getUsers = async (req, res) => {
  try {
    const users = await User.find();

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = { userRegister, getUsers };
