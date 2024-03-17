const express = require("express")
const auth = require("../../middlewares/authMiddleware")
const { addCoupon, deleteCoupon, useCoupon } = require("../../controllers/adminControllers/couponController")
const router = express.Router()

router.post("/add", addCoupon)
router.delete("/delete", deleteCoupon)
router.get("/use/:code", useCoupon)

module.exports = router