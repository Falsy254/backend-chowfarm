const User = require("../models/user");
const bcrypt = require("bcrypt");
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

const userRegister = async (req, res) => {
    try {
      const { emailAddress, password, firstName, lastName, phoneNumber } = req.body;
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
    return  res.status(400).json(error);
    }
  }

  module.exports = userRegister