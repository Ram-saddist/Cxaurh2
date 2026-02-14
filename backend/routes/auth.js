const express=require("express")
const router = express.Router()
const UserSchema=require("../models/UserSchema.js")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")

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

        const token=jwt.sign(
            {id:user._id,email:user.email},
            process.env.JWT_SECRET,
            {expiresIn:"1h"}
        )
        return res.status(200).json({
            message:"Login successful",
            token
        })
    }
    catch(err){
        console.log("Internal server error for login route", err)
        return res.status(500).json({message:"Internal server error"})
    }
})


module.exports=router