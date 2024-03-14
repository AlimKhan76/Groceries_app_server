const asyncHandler = require("express-async-handler")
const Product = require("../model/productModel")

exports.searchProduct = asyncHandler(async (req, res) => {
    console.log(req.query)

    const { product } = req.query
    const searchProduct = await Product.find({ title: { $regex: `^${product}`, $options: 'i' } })
    // console.log(searchProduct);


    return res.status(200).json(searchProduct)
})