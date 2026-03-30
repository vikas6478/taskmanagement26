const express = require("express");
const route = express.Router();
const adminController = require("../controllers/admincontroller");

route.post("/userlogin",adminController.userLogin);
route.post("/createuser",adminController.CreateUser);

module.exports=route;