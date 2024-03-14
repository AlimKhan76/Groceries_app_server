const express = require('express')
const auth = require('../middlewares/authMiddleware')
const { placeOrder } = require('../controllers/orderController')
const router = express.Router()

router.post("/placeOrder", auth, placeOrder)

module.exports = router