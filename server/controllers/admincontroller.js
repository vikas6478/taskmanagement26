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
  const { name, email, post } = req.body;
  const UserPassword = RandomPass.randomPassword();

  try {
    // 1️⃣ First, create user in DB
    const user = await UserModel.create({
      name,
      email,
      post,
      password: UserPassword,
    });

    // 2️⃣ Setup nodemailer
    const mailTransporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // app password
      },
      secure: true,
    });

    console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log("EMAIL_PASS:", process.env.EMAIL_PASS ? "SET" : "NOT SET");

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

    // 3️⃣ Try sending email
    try {
      const info = await mailTransporter.sendMail(mailDetails);
      console.log("Email sent successfully:", info.response);
      // Respond success
      res.status(200).send({ msg: "User created & Email sent!!" });
    } catch (emailErr) {
      console.error("Email sending failed:", emailErr);
      // Respond DB success but email failed
      res.status(200).send({
        msg: "User created, but email could not be sent. Check logs!",
      });
    }

  } catch (err) {
    console.error("CreateUser Error:", err);
    res.status(500).send({ msg: "Something went wrong while creating user" });
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
