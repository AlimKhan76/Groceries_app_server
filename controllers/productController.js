const asyncHandler = require("express-async-handler")
const Product = require('../model/productModel')
const AppError = require("../utils/AppError")
const User = require("../model/userModel")

exports.addProduct = asyncHandler(async (req, res) => {
    console.log(req.body)

    const { title, description, price, baseQuantity, category, url } = req.body

    const addedProduct = await Product.create({
        title, description, baseQuantity, category, price, url
    })

    if (!addedProduct) throw new AppError(400, "Error in creating product")

    return res.status(200).json(addedProduct)





})

exports.getBestSellingProducts = asyncHandler(async (req, res) => {
    console.log(req.params)
    const bestSellingProducts = await Product.find({ category: "Best-Selling" })
    if (!bestSellingProducts) return
    return res.status(200).json(bestSellingProducts)
})


exports.addToFavouriteProducts = asyncHandler(async (req, res) => {
    console.log(req.body)
    const { product, userId } = req.body
    const addToFavourite = await User.findByIdAndUpdate(userId, {
        favourite: product
    })
})

exports.removeFromFavouriteProducts = asyncHandler(async (req, res) => {

})