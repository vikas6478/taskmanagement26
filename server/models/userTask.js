const mongoose = require("mongoose");
const taskSchema = new mongoose.Schema({
    usertask:String,
    days:Number,
    taskstatus:String,
    compday:Number,
    userid:{type:mongoose.Schema.Types.ObjectId, ref:"createuser"}
})



module.exports = mongoose.model("usertask", taskSchema);

