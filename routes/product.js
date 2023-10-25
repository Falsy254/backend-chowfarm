const router = require("express").Router();

const {
    addProduct,
  getProduct,
  singleProduct,
  updateProduct,
  deletedProduct,
} = require("../controllers/product");

//Adding product
router.post("/new",addProduct);
//Getting all products
router.get("/", getProduct);
//Getting single Produvt
router.get("/:id", singleProduct);
//Updating product
router.patch("/update/:id", updateProduct);
//Delete product
router.delete("/delete/:id", deletedProduct);

module.exports = router;
