const mongoose= require("mongoose");
//Ye basic model setup karne ke liye banaya hai

const chatSchema= new mongoose.Schema({
    from:{
        type:String,
        required:true,
    },
    to:{
        type:String,
        required:true,
    },
    msg:{
        type:String,
        maxLength: 50,
    },
    created_at:{
        type:Date,
        required:true,
    }
})

//Chat schema ready ho gya hai to ab hum model create karenge
//or model se apn database me data daal skte hai
const Chat= mongoose.model("Chat",chatSchema);
module.exports= Chat;
//iska matlab ki apn isko kahi use kar ske