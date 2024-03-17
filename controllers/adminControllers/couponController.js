const asyncHandler = require("express-async-handler")
const Coupon = require("../../model/couponModel")
const AppError = require("../../utils/AppError")

exports.addCoupon = asyncHandler(async (req, res) => {
    console.log(req.body)
    const { code, value } = req.body

    const checkIfExists = await Coupon.findOne({ code })


    if (checkIfExists) throw new AppError(400, "Coupon already exists")

    const addCoupon = await Coupon.create({
        code, value
    })
    return res.status(200).json("Coupon is Added ")

})

exports.deleteCoupon = asyncHandler(async (req, res) => {

    const { code, couponID } = req.body
    if (!couponID) throw new AppError(400, "Please provide coupon Id")
    const deleteCoupon = await Coupon.findByIdAndDelete(couponID)
    console.log(deleteCoupon)

    return res.status(200).json("Coupon is Deleted")
})

exports.useCoupon = asyncHandler(async (req, res) => {
    console.log(req.params)
    const { code } = req.params
    const coupon = await Coupon.findOne({ code })
    console.log(coupon)
    if (!coupon || coupon === null) {
         throw new AppError(400,"Invalid Token")
    }
    return res.status(200).json(coupon)

})