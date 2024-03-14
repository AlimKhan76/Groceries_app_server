const express = require("express")
const { getBestSellingProducts,
    addProduct,
    changeFavouriteProducts } = require("../controllers/productController")
const auth = require("../middlewares/authMiddleware")

const router = express.Router()

router.get('/bestSelling', getBestSellingProducts)
router.post("/add", addProduct)
router.post("/addToFavourite", auth, changeFavouriteProducts)

module.exports = router