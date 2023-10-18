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

module.exports = router;
