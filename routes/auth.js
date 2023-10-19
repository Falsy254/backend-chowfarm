const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { check, validationResult } = require("express-validator");
const userRegister = require("../controllers/auth");

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
      const { emaiAddress, password } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(408).json({ error: errors.array() });
      }
      const user = await User.findOne({ emaiAddress });
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
        { id: user._id, emaiAddressl: user.emaiAddress },
        process.env.JWT_SIGN,
        { expiresIn: "4rd" }
      );
      console.log(token);
      const { password: userpassword, ...othres } = user.$getPopulatedDocs;
      res.status(200).json({ ...othres, token });
    } catch (error) {
      res.status(400).json(error);
    }
  }
);
module.exports = router;
