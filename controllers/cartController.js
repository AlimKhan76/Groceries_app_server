const asyncHandler = require('express-async-handler')
const User = require('../model/userModel')
const AppError = require('../utils/AppError')

exports.addToCart = asyncHandler(async (req, res) => {
    const { userId, product } = req.body
    const checkIfAlreadyInCart = await User.findOne({
        _id: userId, 'cart._id': product._id
    },
        { cart: 1 }
    )

    console.log(checkIfAlreadyInCart)
    if (checkIfAlreadyInCart !== null) {
        const updateCart = await User.findOneAndUpdate({ _id: userId, 'cart._id': product._id },
            {
                $set: {
                    "cart.$.quantity": product.quantity,
                    "cart.$.totalPrice": product.totalPrice,
                }
            }, { new: true })

        return res.status(200).json(`Quantity of ${product.title} has been modified`);

    }

    const addedToCartUser = await User.findByIdAndUpdate(userId,
        { $push: { cart: product } },
        { new: true }
    )
    if (!addedToCartUser) throw new AppError(400, "Unable to add to Cart, Please try again")

    return res.status(200).json(`${product.title} has been added to Cart `)

})

exports.removeFromCart = asyncHandler(async (req, res) => {
    const { userId, productId } = req.body

    if (!productId) throw new AppError("Please try again")

    const removedFromCartUser = await User.findByIdAndUpdate(userId,
        { $pull: { cart: { _id: productId } } },
        { new: true }
    )

    return res.status(200).json(`Product has been removed from cart `)

})


exports.getItemsFromCart = asyncHandler(async (req, res) => {
    const { userId } = req.body;
    const cartItems = await User.findById(userId, { cart: 1 })
    console.log(cartItems)
    return res.status(200).json(cartItems)
})
