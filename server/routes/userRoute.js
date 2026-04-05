const express = require("express");
const route = express.Router();
const UserController = require("../controllers/usercontroller");

route.post("/userlogin",  UserController.userLogin);
route.get("/getusertask",  UserController.getuserTask);
route.post("/settaskstatus",  UserController.setTaskStatus);


module.exports = route;