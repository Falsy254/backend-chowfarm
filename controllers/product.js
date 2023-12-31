const Product = require("../models/product");
const addProduct = async (req, res) => {
  try {
    const { productName, productImg, productDescription, productPrice,stock, uid } =
      req.body;
    const newProduct = new Product({
      productName,
      productImg,
      productDescription,
      productPrice,
      stock,
      uid
    });
    const savedProducts = await newProduct.save();
    res.status(201).json(savedProducts);
  } catch (error) {
    console.log(error);
  }
};
const getProduct = async (req, res) => {
  try {
    const product = await Product.find();
    res.status(200).json(product);
  } catch (error) {
    res.status(404).json(error);
  }
};
const singleProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const singleProduct = await Product.findById(id);
    res.status(200).json(singleProduct);
  } catch (error) {
    res.status(404).json(error);
  }
};
const updateProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const options = { new: true };
    const updateproduct = await Product.findByIdAndUpdate(id, req.body, options);
    res.status(200).json(updateproduct);
  } catch (error) {
    res.status(404).json(error);
  }
};
const deletedProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedProduct = await Product.findByIdAndDelete(id);
    res.status(200).json(deletedProduct);
  } catch (error) {
    res.status(404).json(error);
  }
};
module.exports = {
  addProduct,
  getProduct,
  singleProduct,
  updateProduct,
  deletedProduct,
};
