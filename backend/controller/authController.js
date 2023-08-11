const userModel = require("../model/userSchema.js");

const signup = async (req,res)=>{
    const {name ,email , password , confirmpassword} = req.body;
    console.log(name ,email , password , confirmpassword)
try {
    const userInfo = userModel(req.body);
    const result = await userInfo.save();
    return res.status(200).json({
        sucess:true,
        data :{}
    })
} catch (error) {
    if(error.code === 11000){
        return res.status(400).json({
            success:false,
            message:"account already exists with provided email address"
        })
 
    }
 return res.status(400).json({
    sucess:false,
    mesage:error.meassage
 })   
}
}

module.exports ={
    signup
}