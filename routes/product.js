const {
    addProduct,
  getProduct,
  singleProduct,
  updateProduct,
  deletedProduct,
} = require("../controllers/product");
const router = express.Router();
//Adding posts
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
