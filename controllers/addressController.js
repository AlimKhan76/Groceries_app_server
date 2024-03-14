const asyncHandler = require("express-async-handler");
const User = require("../model/userModel");
const AppError = require("../utils/AppError");

exports.addAddress = asyncHandler(async (req, res) => {
    console.log(req.body)
    const { address, userId } = req.body

    const saveAddress = await User.findByIdAndUpdate(userId,
        {
            $push: { address: address }
        },
        { new: true, upsert: true })
    if (!saveAddress) throw new AppError(400, "Error in Adding Address")
    return res.status(200).json("Address Added Successfully");
})

exports.getAddresses = asyncHandler(async (req, res) => {
    const { userId } = req.body
    const userAddresses = await User.findById(userId, { address: 1, _id: 0 })
    return res.status(200).json(userAddresses);

})