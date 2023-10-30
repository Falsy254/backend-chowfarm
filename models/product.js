const mongoose = require("mongoose");
const Productschema = new mongoose.Schema({
  productImg: { type: String, required: true },
  productName: { type: String, required: true },
  productPrice: { type: String, required: true },
  productDescription: { type: String, required: true },
  stock: { type: String, required: true },
  uid: { type: String, required: true },
});
module.exports = mongoose.model("Product", Productschema);
