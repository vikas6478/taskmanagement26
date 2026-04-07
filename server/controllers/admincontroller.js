const AdminModel = require("../models/adminModel");
const UserModel = require("../models/userModel");
const TaskModel = require("../models/userTask")
const RandomPass = require("../middleware/randonPassword");
const nodemailer = require("nodemailer");

const userLogin = async (req, res) => {
  const { email, password } = req.body;
  const admin = await AdminModel.findOne({ email: email });

  if (!admin) {
    res.status(400).send({ msg: "Invalid email" });
  }

  if (admin.password != password) {
    res.status(400).send({ msg: "Invalid password" });
  }
  res.send({ admin, msg: "login succesfully!!" });
};

const CreateUser = async (req, res) => {
  try{
  const { name, email, post } = req.body;
  const UserPassword = RandomPass.randomPassword();

   const user = await UserModel.create({
    name: name,
    email: email,
    post: post,
    password: UserPassword,
  });

  const mailTransporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
     secure: true, // optional
  });

  const mailDetails = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "User Login Details!",
    text: `Hello ${name},

Your account has been created.

Email: ${email}
Password: ${UserPassword}

Please change your password after login.

Regards,  
Team`,
  };

 

  // mailTransporter.sendMail(
  //   mailDetails,

  //   function (err, data) {
  //     if (err) {
  //       console.log(err,"gfyftuyjyjrdthdrxt");
  //     } else {
  //       console.log("Email sent");
  //     }
  //   },
  // );

  // res.send({ msg: "Email successfully sent!!" });

     // Wait for email to be sent
   const info = await mailTransporter.sendMail(mailDetails);
    console.log("Email sent successfully!!!!!", info.response);

    // Only after email is sent, respond to frontend
    res.status(200).send({ msg: "User created & Email sent!!" });

  } catch (err) {
    console.error("CreateUser Error:", err);
    res.status(500).send({ msg: "Email failed to send or something went wrong" });
  }

 
  
};



const getUserData = async(req,res)=>{
  const User = await UserModel.find()
  res.status(200).send(User)
}

const assignTask = async (req, res) => {
  const { userid,usertask, days, } = req.body;
  const task = await TaskModel.create({
        usertask:usertask,
        days:days,
        userid:userid
  })
    res.send({msg:"okkkkk"});
}

const getTaskReport=async(req, res) =>{
     const task = await TaskModel.find().populate("userid");
     res.send(task);
}

module.exports = {
  userLogin,
  CreateUser,
  getUserData,
  assignTask,
  getTaskReport
};
