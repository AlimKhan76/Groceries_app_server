const asyncHandler = require('express-async-handler')
const User = require('../model/userModel')
const bcrypt = require('bcrypt')
const AppError = require('../utils/AppError')
const jwt = require('jsonwebtoken')

exports.loginUser = asyncHandler(async (req, res) => {
    console.log(req.body)
    const { contactNo, password } = req.body
    const existingUser = await User.findOne({ contactNo })
    if (!existingUser) throw new AppError(400, "No User found of the given contact number")

    const checkPassword = await bcrypt.compare(password, existingUser.password)

    if (!checkPassword) throw new AppError(400, "Invalid credentials !!")
    console.log("User logged in successfully")

    const secret = "Groceries"
    const token = jwt.sign({ userId: existingUser._id }, secret)
    console.log(token)
    return res.status(200).json({ token, role: existingUser?.role })
})

exports.registerUser = asyncHandler(async (req, res) => {
    const { name, password, contactNo } = req.body

    const existingUser = await User.findOne({ contactNo })

    if (existingUser) throw new AppError(400, "A User already exists with this contact number")

    const encryptedPassword = await bcrypt.hash(password, await bcrypt.genSalt(10))
    const registeredUser = await User.create({
        name: name, password: encryptedPassword, contactNo: contactNo
    })

    if (!registeredUser) throw new AppError(400, "Error in creating User")

    return res.status(200).json(registeredUser)

    // console.log(error)
    // if (error.status !== 400) throw new AppError(500, "Someething went wrong, Please try again later")


})


exports.getUserInfo = asyncHandler(async (req, res) => {
    console.log(req.body)
    const { userId } = req.body
    const userInfo = await User.findById(userId,
        { role: 0, password: 0, cart: 0, orders: 0, address: 0 })
    if (!userInfo) throw new AppError(500, "No User data found")
    return res.status(200).json(userInfo)
})