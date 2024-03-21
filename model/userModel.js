const mongoose = require('mongoose')
const Order = require("../model/orderModel");
const Product = require("../model/productModel");

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    // password: { type: String, required: true, unique: true },
    contactNo: { type: String, minlength: [10, "Minimum 10 numbers are required"], required: true },
    role: { type: String, default: "customer", required: true },
    verified: { type: Boolean, default: false, required: true },
    address: [{
        type: Object,

    }],
    orders: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: Order,
    }],
    favourite: [{ type: Object }],
    cart: [{ type: Object, ref: Product }]
    // cart: [{ type: mongoose.Schema.Types.ObjectId, ref: Product, unique: true }]

})

const User = mongoose.model("User", userSchema)

module.exports = User