const router = require("express").Router();
const productController = require("../controllers/product.controller");

router.get("/", productController.getFProduct);
router.get("/:id", productController.getProductByHerId);

module.exports = router;
