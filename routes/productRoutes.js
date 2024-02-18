const express = require("express")
const { getBestSellingProducts, addProduct } = require("../controllers/productController")
const router = express.Router()

router.get('/bestSelling', getBestSellingProducts)
router.post("/add", addProduct)

module.exports= router