const mongoose = require("mongoose")
const {Schema} = mongoose;

const userSchema = new Schema({
name:{
    type:String,
    required:[true,"user name is required"],
    unique:true,
    minLength:[5,"name must be at least 5 char"],
    maxLength:[50,"name must be at less than 50 char"],
    trim:true
},
email:{
    type:String,
    required:[true,"email is required"],
    unique:[true,"email already registerd"],
    trim:true
},
password:{
type:String,
select:false
},
forgetPasswordToken:{
    type:String
},
forgetPasswordExpiryDate:{
    type:String
}},

{
    timestamps:true
})

const userModel = mongoose.model("user",userSchema)
module.exports = userModel;
