const UserModel = require("../models/userModel");
const TaskModel= require("../models/userTask");

const userLogin = async (req, res) => {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email: email });
    if (!user) {
        res.status(400).send({ msg: "Invalid Email" });
    }
    if (user.password != password) {
        res.status(400).send({ msg: "Invalid Password" });
    }
    res.send({ user, msg: "Login Succesfully!" });
}

const getuserTask = async (req, res) => {
    const { id } = req.query;

    const task = await TaskModel.find({ userid: id });

    console.log("TASK:", task);

    res.send(task); 
}

const setTaskStatus=async(req, res) =>{
    const {taskID, taskStatus, compDay}=req.body;
    console.log(taskID);
    const task= await TaskModel.findByIdAndUpdate(taskID, {
        taskstatus:taskStatus,
        compday:compDay
    })
    console.log(task);
    res.status(201).send({msg:"Task Succefully Updated!!!"});
}

module.exports = {
    userLogin,
    getuserTask,
    setTaskStatus
    
}