const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose);
const moment = require('moment-timezone');


console.log(moment.tz("Asia/Kolkata").format("DD-MM-YYYY hh:mm A"))

const orderSchema = mongoose.Schema({
    orderNo: { type: Number, unique: true },
    customerName: { type: String, required: true },
    customerContact: { type: String, required: true },
    items: [{
        type: Object,
        required: true
    }],
    status: { type: String, default: "pending", required: true },
    totalPrice: { type: Number, required: true },
    address: { type: Object, required: true },
    orderedDate: { type: String, default: moment.tz("Asia/Kolkata").format("DD-MM-YYYY hh:mm A") }
})


orderSchema.plugin(AutoIncrement, {
    inc_field: "orderNo",
    startAt: 1,
})


const Order = mongoose.model("Order", orderSchema)

module.exports = Order;