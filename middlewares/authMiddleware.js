const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const AppError = require("../utils/AppError");

const auth = asyncHandler((req, res, next) => {
    if (!req.headers.authorization) {
        throw new AppError(401, "Not Authorized")
    }
    try {
        const token = req.headers.authorization
        const decodedToken = jwt.verify(token, "Groceries");
        req.body = { ...req.body, userId: decodedToken.userId }
        next()
    }
    catch (error) {
        throw new AppError(401, error.message)
    }
})

module.exports = auth