const express = require("express");
const router = express.Router();
const User = require("../models/user");
const { model, models } = require("mongoose");
const bcrypt = require("bcrypt");
const { check, validationResult } = require("express-validator");
const user = require("../models/user");
router.post("/signup", [
  check("email", "please enter a valid email").isEmail(),
  check(
    "password",
    "please use alphabets and numbers in the password"
  ).isAlphanumeric(),
  check("password", "password should be six characters or more ").isLength({
    min: 6,
  }),
]);
