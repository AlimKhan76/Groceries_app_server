const express = require("express")
const { getBestSellingProducts,
    addProduct,
    changeFavouriteProducts, 
    getProductByCategory} = require("../controllers/productController")
const auth = require("../middlewares/authMiddleware")

const router = express.Router()

router.get('/bestSelling', getBestSellingProducts)
router.post("/add", addProduct)
router.post("/addToFavourite", auth, changeFavouriteProducts)
router.get("/getByCategory/:category", getProductByCategory)

module.exports = router