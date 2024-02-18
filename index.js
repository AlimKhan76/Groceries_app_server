const express = require('express')
const mongoose = require('mongoose')
const app = express()
const userRoutes = require("./routes/userRoutes")
const productRoutes = require("./routes/productRoutes")
const { errorHandler } = require('./middlewares/errorHandlingMiddleware')

app.use(express.json())


app.get("/", (req, res) => {
    res.send("Groceries API")
})

mongoose
    .connect("mongodb+srv://coder34521:Ru3eOcZc9RMhYCI0@cluster0.pq9euua.mongodb.net/Groceries")
    .then(() => {
        app.listen(3000, () => {
            console.log("Connected to Mongo ");
        });
    })
    .catch((err) => {
        console.log("Error connecting to Server " + err);
    });


app.use("/user", userRoutes);
app.use("/product",express.static("./public/product"))

app.use("/product", productRoutes)

app.use(errorHandler);
