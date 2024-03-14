const express = require("express")
const auth = require("../middlewares/authMiddleware")
const { addToCart, removeFromCart, getItemsFromCart } = require("../controllers/cartController")
const router = express.Router()

router.post('/add', auth, addToCart)
router.post("/remove", auth, removeFromCart)
router.get("/get", auth, getItemsFromCart)

module.exports = router