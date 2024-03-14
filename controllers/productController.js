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

const removeFromFavouriteProducts = asyncHandler(async (product, userId) => {
    const removeFavourite = await User.findByIdAndUpdate(userId,
        { $pull: { favourite: { $in: [product] } } }
        , { new: true })
    return `Removed ${product?.title} from favourite`
})


exports.changeFavouriteProducts = asyncHandler(async (req, res) => {
    const { product, userId } = req.body
    const existingInFavourite = await User.findOne({
        _id: userId,
        favourite: { $elemMatch: { $eq: product } }
    })

    if (existingInFavourite !== null) {
        const data = await removeFromFavouriteProducts(product, userId)
        console.log(data)
        return res.status(200).json(data)
    }
    else {
        const addedToFavourite = await User.findByIdAndUpdate(userId,
            { $push: { favourite: product } }
            , { new: true, })

        return res.status(200).json(`Added ${product?.title} to Favourite`)
    }

})

