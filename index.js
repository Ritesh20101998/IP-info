const express = require("express");
const connection = require("./config/db");
const { userRouter } = require("./routes/user.route");
const { findip } = require("./routes/findip.route");
const {auth} = require("./middlewares/auth")
require("dotenv").config()

const PORT = process.env.PORT ;
const app = express();
app.use(express.json());

app.get("/", async(req,res)=>{
    res.send(await redisClient.get("name"));
})

app.use("/api/user",userRouter)
app.use(auth)
app.use("/api/ip",findip)

app.listen(PORT, async ()=>{
      try{
       await connection();
       console.log("connected to db")
       logger.log("info","connected")
      } catch(err) {
        console.log(err.message)
        logger.log("error","connection fail")
      }
    console.log("server is running on",PORT)
})


