import ErrorHandler from "../middlewares/error.js";
import { User } from "../models/user.js";
import bcrypt from "bcrypt";

export const SignUp = async (req, res,next) => {
  try {
    const { name, email, password } = req.body;

    console.log("Received request body:", req.body);
    if (!name || !email || !password) {
      return res.status(400).json({ error: "Please provide both email and password" });
  }
  console.log("line 13")
 
    let user = await User.findOne({email});
    console.log(user)
    console.log("line 15")
    if (user) {
      return res.status(404).json({
        success: false,
        message: "User already exist",
      });
    }
    console.log("line 22")
    const hashedPswd = await bcrypt.hash(password, 10);
    console.log(hashedPswd);
    user = await User.create({ name, email, password: hashedPswd });

    return res.status(200).json({
      success:true,
      message:"Register successfully",
      user
    })
  } catch (error) {
    return next(new ErrorHandler("Please Enter Email & Password",400));
  }
};

export const Login = async(req,res,next)=>{
  try {
   const {email,password} = req.body;
   console.log("Hello")
   if (!email || !password) {
     return next(new ErrorHandler("Please Enter Email & Password",400));
   }
   let user = await User.findOne({email}).select("+password");
 
   if(!user){
     return res.status(404).json({
       success:false,
       message: "User does not exist ",
     })
   }
   const isMatch= await bcrypt.compare(password,user.password);
   if(!isMatch){
     return res.status(404).json({
     success:false,
     message: "invalid password or email"})
   };
   req.session.user = {
    id:user._id,
    name:user.name,
    email:user.email,
   };
   res.status(200).json({
    success:true,
    message:"Login Successfully",
    user:req.session.user,
   })

  } catch (error) {
    console.error("Error in login"+error);  
   return next(new ErrorHandler(error.message, 500));
  }
 };

 export const Logout = (req,res,next) =>{
try{
  req.session.destroy((error)=>{
    if(error){
      console.error("Session Error is "+ error);
      return next(new ErrorHandler(error.message,500));
    }
    return res.status(200).json({
      success:true,
      message:"Logout Successfully",
    })
  })
}catch(e){
  console.log("line 81" + e);
  return next(new ErrorHandler(error.message,500));
}
}

export const getMyProfile =(req,res,next)=>{
try {
  const user = req.session.user;
  if(!user) return next(new ErrorHandler("Login First",404));
  
  res.status(200).json({
    success:true,
    message:"Here is the user",
    user,
  })
} catch (error) {
  return next(new ErrorHandler(error.message, 500));
}
}
