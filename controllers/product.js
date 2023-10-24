const Product = require("../models/product");
const addProduct = async (req, res) => {
    try {
      const {
        productname,
        productimage,
        productdescription,
        productprice,
      } = req.body;
      const newProduct = new Product({
        productname,
        productimage,
        productdescription,
        productprice,
      });
      const savedProducts = await newProduct.save();
      res.status(201).json(savedProducts);
    } catch (error) {
      console.log(error);
    }
  };
  const getProduct = async (req, res) => {
    try {
      const Product = await Product.find();
      res.status(200).json(Product);
    } catch (error) {
      res.status(404).json(error);
    }
  };
  const singleProduct = async (req, res) => {
    try {
      const id = req.params.id;
      const Product = await Post.findById(id);
      res.status(200).json(post);
    } catch (error) {
      res.status(404).json(error);
    }
  };
  const updateProduct = async (req, res) => {
    try {
      const id = req.params.id;
      const options = { new: true };
      const updateProduct = await Post.findByIdAndUpdate(id, req.body, options);
      res.status(200).json(updateProduct);
    } catch (error) {
      res.status(404).json(error);
    }
  };
  const deletedProduct = async (req, res) => {
    try {
      const id = req.params.id;
      const deletedProduct = await Post.findByIdAndDelete(id);
      res.status(200).json(deletedProduct);
    } catch (error) {
      res.status(404).json(error);
    }
  };
  module.exports = { getProduct,singleProduct,updateProduct,deletedProduct };
