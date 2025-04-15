const express = require("express")
const app = express()
app.use(express.json())
require("dotenv").config()
const mongoose = require("mongoose")
app.use(express.json());
const cors = require("cors");
app.use(cors());
app.use(express.urlencoded({ extended: true }));
const userRouter = require("./routes/users");
const cityRouter = require("./routes/cities");

connectDB();
app.listen(5000, console.log("Server Listening"))

app.use("/users", userRouter)
app.use("/cities", cityRouter)

async function connectDB (){
    try {
        await mongoose.connect("mongodb://localhost:27017/Histopedia");
        console.log("mongo db connected")

        
    } catch (error) {
        console.log(error)
        
    }
}