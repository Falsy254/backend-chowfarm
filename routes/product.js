const {
  getProduct,
  singleProduct,
  updateProduct,
  deletedProduct,
} = require("../controllers/product");
const router = express.Router();
//Getting all products
router.get("/", getProduct);
//Getting single Produvt
router.get("/:id", singleProduct);
//Updating product
router.patch("/update/:id", updateProduct);
//Delete product
router.delete("/delete/:id", deletedProduct);
module.exports = router;
