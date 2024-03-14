const asyncHandler = require('express-async-handler');
const Order = require('../model/orderModel');
const User = require('../model/userModel');
const AppError = require('../utils/AppError')

exports.placeOrder = asyncHandler(async (req, res) => {
    console.log(req.body)
    const { address, name, items, totalPrice, userId, contactNo } = req.body


    const placeOrder = await Order.create({
        address, customerName: name, items: items,
        customerContact: contactNo,
        totalPrice
    })
    if (!placeOrder) throw new AppError(400, "Order cannot be placed ")

    const clearCart = await User.findByIdAndUpdate(userId,
        { $set: { cart: [] } },
        { new: true, upsert: true })
    console.log(clearCart?.cart)


    const addToUserOrders = await User.findByIdAndUpdate(userId,
        {
            $push: { orders: placeOrder?._id }
        },
        { new: true })

    // if{!addToUserOrders} throw new AppError(400,"Error i")



    return res.status(200).json("Order Placed Successfully")

})

exports.getOrder = asyncHandler(async (req, res) => {

})