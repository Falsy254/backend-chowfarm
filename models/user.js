const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  emailAddress: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  password: { type: String, required: true },
  isFarmer:{type:Boolean, default:false}
});
module.exports = mongoose.model("User", userSchema);
