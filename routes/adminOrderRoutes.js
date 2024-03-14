const express = require('express')
const { getPendingOrders, getProcessedOrders, getPackedOrders, downloadPendingOrder } = require('../controllers/adminControllers/adminOrderController')
const router = express.Router()
const auth = require('../middlewares/authMiddleware')

router.get("/getPendingOrders", auth, getPendingOrders)
router.get("/getProcessedOrders", auth, getProcessedOrders)
router.get("/getPackedOrders", auth, getPackedOrders)
router.get("/downloadPendingOrders", downloadPendingOrder)

module.exports = router;