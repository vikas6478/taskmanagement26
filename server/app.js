const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const adminRoute =require("./routes/adminRoute");
const userRoute =require("./routes/userRoute");

app.use(bodyParser.urlencoded())
app.use(bodyParser.json())

app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/taskmanagement26").then(() => {
    console.log("mongodb is successfully connected!!")
})

app.use("/admin", adminRoute)
app.use("/user", userRoute)


app.listen(8000, () => {
    console.log("server run on 8000");
})

