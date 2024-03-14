const express = require('express')
const mongoose = require('mongoose')
const app = express()
const userRoutes = require("./routes/userRoutes")
const productRoutes = require("./routes/productRoutes")
const cartRoutes = require("./routes/cartRoutes")
const searchRoutes = require("./routes/searchRoutes")
const addressRoutes = require("./routes/addressRoutes")
const orderRoutes = require("./routes/orderRoutes")
const adminOrderRoutes = require("./routes/adminOrderRoutes")
const { errorHandler } = require('./middlewares/errorHandlingMiddleware')

app.use(express.json())


app.get("/", (req, res) => {
    res.send("Groceries API")
})

mongoose
    .connect("mongodb+srv://coder34521:Ru3eOcZc9RMhYCI0@cluster0.pq9euua.mongodb.net/Groceries")
    .then(() => {
        app.listen(5000, () => {


            console.log("Connected to Mongo ");
        });
    })
    .catch((err) => {
        console.log("Error connecting to Server " + err);
    });

app.use("/user", userRoutes);
app.use("/productImage", express.static("./public/product"))

app.use("/product", productRoutes)
app.use("/cart", cartRoutes)
app.use("/search", searchRoutes)
app.use("/address", addressRoutes)
app.use("/order", orderRoutes)
app.use("/adminOrder", adminOrderRoutes)

app.use(errorHandler);



module.exports = app