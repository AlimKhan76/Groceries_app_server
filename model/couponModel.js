const mongoose = require("mongoose")

const couponSchema = mongoose.Schema({
    code: { type: String, unique: true, required: true },
    value: { type: Number, default: 0, required: true },
})

const Coupon = mongoose.model("Coupon", couponSchema)

module.exports = Coupon