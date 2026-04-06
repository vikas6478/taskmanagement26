const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
// const bodyParser = require("body-parser");
const adminRoute =require("./routes/adminRoute");
const userRoute =require("./routes/userRoute");
require("dotenv").config();

const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(cors());

mongoose.connect(MONGO_URL)
.then(() => console.log("mongodb connected"))
.catch(err => console.log("DB ERROR:", err));

app.use("/admin", adminRoute)
app.use("/user", userRoute)


app.listen(PORT, () => {
    console.log(`server run on ${PORT}`);
})

