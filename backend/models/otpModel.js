const {Schema,model} =require("mongoose")
module.exports.Otp = model('Otp',Schema({
    email: {
        type: String,
        required: [true, "Please Enter Your Email"],
        unique: true,
        
      },
      otp:{
        type:String,
        required:true
      },
      createdAt:{type:Date,default:Date.now,index:{expires:300}}
},{timestamps:true}))