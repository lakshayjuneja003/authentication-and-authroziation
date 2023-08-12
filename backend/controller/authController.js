const userModel = require("../model/userSchema.js");
const emailvalidator = require("email-validator")
 // creating signin form js
const signup = async (req,res)=>{
    const {name ,email , password , confirmpassword} = req.body;

    console.log(name ,email , password , confirmpassword)

    if(!name || !email || !password || !confirmpassword){
        return res.status(400).json({
            sucess:false,
            message:"every field is required"
        })
    }
 const validEmail = emailvalidator.validate(email);

 if(!validEmail){
    return res.status(400).json({
        sucess:false,
        message:"Plesae provide a valid email id"
    })
 }
 if (password !== confirmpassword){
    return res.status(400).json({
        sucess:false,
        message:"Password and Confirm password does not match"
    })
 }
try {
    const userInfo = userModel(req.body);
    const result = await userInfo.save();
    console.log(result)
    return res.status(200).json({
        sucess:true,
        data :{}
    })
} catch (error) {
    if(error.code === 11000){ // for checking email id exists or not
        return res.status(400).json({
            success:false,
            message:"account already exists with provided email address"
        }) ;
    }
 return res.status(400).json({
    sucess:false,
    mesage:error.mesage
 })   
}
}
// signup setup
const signin = async ()=>{
const {email, password } = req.body
if(!email || !password){
    return res.status(400).json({
        sucess:false,
        message:"every field is menadatory"
    })
}

try {
    const user = await userModel
.findOne({email})
.select('+password')

if(!user || !user.password !== password){
    return res.status(400).json({
        sucess:false,
        message:"Invalid Crendiatls"
    })
}

const token = user.jwtToken();
user.password = undefined;

const cookieOption = {
    maxAge: 24*60*60*1000,
    httpOnly:true
}

res.cookie("token", token, cookieOption);
res.status(200).json({
    sucess:true,
    data:user
})

} catch (error) {
    res.status(400).json({
        sucess:false,
        message:error.message
    })
}

}

module.exports ={
    signup,
    signin
}
