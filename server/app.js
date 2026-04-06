const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const adminRoute =require("./routes/adminRoute");
const userRoute =require("./routes/userRoute");
require("dotenv").config();

const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL;

app.use(bodyParser.urlencoded())
app.use(bodyParser.json())

app.use(cors());

mongoose.connect(MONGO_URL).then(() => {
    console.log("mongodb is successfully connected!!")
})

app.use("/admin", adminRoute)
app.use("/user", userRoute)


app.listen(PORT, () => {
    console.log(`server run on ${PORT}`);
})

