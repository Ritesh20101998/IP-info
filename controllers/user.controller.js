const user = require("../models/user.model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const redisClient = require("../helpers/redis")

const signup =  async(req,res)=>{
    try{
        const {name,email,password}= req.body;

        const isUseravailable = await user.findOne({email});
        if(isUseravailable){
            res.send("User already Present here, please login for ")
        }

        const hashed = await bcrypt.hash(password,8)

        const newUser = new user({name,email,password:hashed})

        await newUser.save()

        res.send("Signup Successfully done")
    }catch(err){
        res.send(err.message)
    }
}

const login = async()=>{
    try{
        const {email,password}= req.body;
        const isUseravailable = await user.finfOne({email})
        if(!isUseravailable){
            return res.send("user not present here, please register first")
        }
        const isPasswordCorrect = await bcrypt.compare(password,isUseravailable.password)

        if(!isPasswordCorrect) return res.send("Invalid Credentials")

        const token = await jwt.sign({userId:isUserPresent._id},process.env.JWT_SECRET,{expiresIn:"6hr"})

        res.send({message:"Login successfully done",token})

    }catch(err){
        res.send(err.message)
    }
}

const logout = async(req,res)=>{
    try{
        const token = req.headers?.authorization?.split(" ")[1];

        if(!token){
            return res.status(403).send({message:"unauthorized"})
        } 

        await redisClient.set(token,token);

        res.status(200).send({message:"Logout Successfull"})

    }catch(err){
        res.send(err.message)
    }
}

module.exports = {signup,login,logout}