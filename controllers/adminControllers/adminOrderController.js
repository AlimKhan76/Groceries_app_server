const asyncHandler = require('express-async-handler');
const Order = require('../../model/orderModel');
const { Parser } = require('@json2csv/plainjs');

exports.getPendingOrders = asyncHandler(async (req, res) => {
    const pendingOrders = await
        Order.find({ status: "pending" })

    return res.status(200).json(pendingOrders)

})

exports.getProcessedOrders = asyncHandler(async (req, res) => {
    console.log(req.body)
    const processedOrders = await Order.find({ status: "processed" })

    return res.status(200).json(processedOrders);
})

exports.getPackedOrders = asyncHandler(async (req, res) => {
    console.log(req.body)
    const packedOrders = await Order.find({ status: "packed" })

    return res.status(200).json(packedOrders);
})


exports.downloadPendingOrder = asyncHandler(async (req, res) => {
    console.log("runnfdhskdh")
    const pendingOrders = await
        Order.aggregate([
            {
                $match: { status: "pending" }
            },
            {
                $unwind: "$items"
            },
            {
                $group: {
                    _id: "$items.title",
                    totalQuantity: { $sum: "$items.quantity" },
                    // totalQuantity: { $toString: { $sum: "$items.quantity" } },
                    unit: { $first: "$items.unit" },
                }
            },
            {
                $project: {
                    _id: 0,
                    Product: "$_id",
                    Quantity: { $concat: [{ $toString: "$totalQuantity" }, " ", "$unit"] }
                }
            }
        ])
    console.log(pendingOrders)

    const json2csv = new Parser({});
    const csv = json2csv.parse(pendingOrders);

    // const updateToProcessedProduct=()

    return res.attachment('orders.csv').send(csv);


})

exports.updateStatusOfProduct = asyncHandler(async (req, res) => {
    console.log(req.body)

    const { status, orderID } = req.body

    const order = await Order.findByIdAndUpdate(orderID,{
        // $set: { "status": "pending" }
    })

})