const mongoose = require("mongoose")

const UserSchema= mongoose.Schema({
    name:String,
    email:String,
    password:String,
    mobile:Number
})
module.exports=mongoose.model("User",UserSchema)