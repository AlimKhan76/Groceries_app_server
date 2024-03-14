const asyncHandler = require('express-async-handler');
const Order = require('../../model/orderModel');
const { Parser } = require('@json2csv/plainjs');

exports.getPendingOrders = asyncHandler(async (req, res) => {
    const pendingOrders = await
        Order.find({ status: "pending" })

    return res.status(200).json(pendingOrders)

    //     Order.aggregate([
    //         {
    //             $match: { status: "pending" }
    //         },
    //         {
    //             $unwind: "$items"
    //         },
    //         {
    //             $group: {
    //                 _id: "$items.title",
    //                 totalQuantity: { $sum: "$items.quantity" },
    //                 unit: { $first: "$items.unit" },
    //                 // Total_Quantity: {
    //                 //     $concat: [{ $sum: "$items.quantity" }, " ", "$items.unit"]
    //                 // }
    //             }
    //         },
    //         {
    //             $project: {
    //                 _id: 0,
    //                 Product: "$_id",
    //                 // Total_Quantity: {
    //                 //     // $concat: ["$totalQuantity", " ", "$items.unit"]
    //                 // },
    //                 TotalQuantity: "$totalQuantity",
    //                 Unit: "$unit",
    //             }
    //         }
    //     ])
    // console.log(pendingOrders)


    // const csvStream = fastcsv.format({ headers: true });
    // csvStream.pipe(fs.createWriteStream('data.csv'));
    // pendingOrders.forEach((row) => {
    //     csvStream.write(row);
    // });
    // csvStream.end();

    // const json2csv = new Parser({});

    // const csv = json2csv.parse(pendingOrders);



    // return res.attachment('data.csv').send(csv)

    // res.setHeader('Content-Type', 'text/csv')
    //     .setHeader('Content-Disposition', 'attachment; filename=data.csv')
    //     .sendFile("../../data.csv")
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
                    unit: { $first: "$items.unit" },
                }
            },
            {
                $project: {
                    _id: 0,
                    Product: "$_id",
                    TotalQuantity: "$totalQuantity",
                    Unit: "$unit",
                }
            }
        ])
    console.log(pendingOrders)
    // const csvStream = fastcsv.format({ headers: true });
    // csvStream.pipe(fs.createWriteStream('data.csv'));
    // pendingOrders.forEach((row) => {
    //     csvStream.write(row);
    // });
    // csvStream.end();

    const json2csv = new Parser({});
    const csv = json2csv.parse(pendingOrders);

    return res.attachment('data.csv').send(csv)


})