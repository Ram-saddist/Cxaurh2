const express=require("express")
const router = express.Router()
const UserSchema=require("../models/UserSchema.js")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")

const generateTokens = (user)=>{
    const accessToken= jwt.sign(
        {id:user._id,email:user.email},
        process.env.JWT_SECRET,
        {expiresIn:"15m"}
    )
    const refreshToken = jwt.sign(
        {id:user._id},
        process.env.JWT_REFRESH_SECRET,
        {expiresIn:"4d"}
    )
    return {accessToken,refreshToken}
}


router.post("/register",async (req,res)=>{
    const {name,email,password,mobile}=req.body
    try{
        const existingUser = await UserSchema.findOne({email})
        if(existingUser){
            return res.status(400).json({message:"Email already existing"})
        }
        
        const hashedPassword=await bcrypt.hash(password,10)

        const newUser= new UserSchema({
            name,
            email,
            password:hashedPassword,
            mobile:Number(mobile)
        })
        await newUser.save()
        return res.status(201).json({message:"User created successfully"})
    }
    catch(err){
        console.log(err)
        return res.status(500).json({message:"Server error"})
    }
})


router.post("/login",async (req,res)=>{
    const {email,password}=req.body
    try{
        const user= await UserSchema.findOne({email})
        if(!user){
            return res.status(404).json({message:"User not found login once again"})
        }

        const isMatch=await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.status(400).json({"message":"Incorrect password"})
        }

        const {accessToken,refreshToken}= generateTokens(user)
        console.log("---from login route----",accessToken)
        res.cookie("refreshToken",refreshToken,{
            httpOnly:true,
            path:"/",
            secure:false,
            sameSite:"lax"
        })
        return res.status(200).json({
            message:"Login successful",
            token:accessToken,
            user:{id:user._id,email:user.email}
        })
    }
    catch(err){
        console.log("Internal server error for login route", err)
        return res.status(500).json({message:"Internal server error"})
    }
})

router.post("/refresh-token",async (req,res)=>{
    const token= req.cookies.refreshToken 
    console.log("token refresh", token)
    if(!token){
        return res.status(404).json({message:"No token in the cookie"})
    }
    try{
        const decoded= jwt.verify(token,process.env.JWT_REFRESH_SECRET)
        const user = await UserSchema.findById(decoded.id)
        const newAccessToken= jwt.sign(
            {id:user._id,email:user.email},
            process.env.JWT_SECRET,
            {expiresIn:"15m"}
        )
        return res.json({
            accessToken:newAccessToken,
            user:{id:user._id,email:user.email}
        })
    }
    catch(err){
        console.log("while creating the new token in refresh route",err)
        return res.status(500).json({message:"Internal server error"})
    }
})



router.post("/logout", async (req,res)=>{
    res.clearCookie('refreshToken', { path: '/' }); 
    return res.status(200).json({message:"Logged out successful"})
})

module.exports=router