const Product = require("../models/product");
const addproduct = async (req, res) => {
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
    } catch (error) {
      console.log(error);
    }
  };
