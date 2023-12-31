const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const {userRegister, getUsers} = require("../controllers/auth");
// const usesignin = require("./././../controllers/auth")
const User = require("../models/user");
router.post(
  "/signup",
  [
    check("emailAddress", "Please enter a valid email").isEmail(),
    check(
      "password",
      "Please use alphabets and numbers in the password"
    ).isAlphanumeric(),
    check("password", "Password should be six characters or more ").isLength({
      min: 6,
    }),
  ],
  userRegister
);
router.post(
  "/signin",
  [check("emailAddress", "please enter a valid email").isEmail()],
  async (req, res) => {
    try {
      const { emailAddress, password } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(408).json({ error: errors.array() });
      }
      const user = await User.findOne({ emailAddress });
      if (!user) {
        return res.status(400).json({
          error: [
            {
              msg: "Invald Credentials",
            },
          ],
        });
      }
      const checkpassword = await bcrypt.compare(password, user.password);
      if (!checkpassword) {
        return res.status(400).json({
          error: [
            {
              msg: "Invalid credentials",
            },
          ],
        });
      }
      const token = await jwt.sign(
        { id: user._id, emailAddress: user.emaiAddress },
        process.env.JWT_SIGN,
        { expiresIn: "4d" }
      );
      console.log(token);
      const { password: userpassword, ...others } = user._doc;
      res.status(200).json({ ...others, token });
    } catch (error) {
      res.status(400).json(error);
    }
  }
);

router.get("/", getUsers);
module.exports = router;
