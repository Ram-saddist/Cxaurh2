const express =require("express")
const app=express()
require("dotenv").config()
const cors =require("cors")
const mongoose=require("mongoose")
const authRoutes=require("./routes/auth.js")
const cookieParser= require("cookie-parser")

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

mongoose.connect(process.env.MONGODB_URL)
    .then(()=>{
        console.log("DB connected")
    })
    .catch(err=>{
        console.log(err)
    })
app.get("/",(req,res)=>{
   return res.json({message:"Server is running"})
})

app.use("/auth",authRoutes)

app.listen(2000,()=>console.log("Server is started on port",2000))