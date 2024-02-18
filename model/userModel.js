const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    password: { type: String, required: true, unique: true },
    contactNo: { type: String, minlength: [10, "Minimum 10 numbers are required"], required: true },
    role: { type: String, default: "customer", required: true },
    verified: { type: Boolean, default: false, required: true },
    address: [{

    }],
    orders: [{
        orderNo: {},
        amount: {},
        date: {},
    }],
    favourite: [{ type: Object }]
})

const User = mongoose.model("User", userSchema)

module.exports = User