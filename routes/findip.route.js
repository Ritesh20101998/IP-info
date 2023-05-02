const {Router} = require("express")
const {getipdata,getIp} = require("../controllers/user.controller")
const { auth } = require("../middlewares/auth")

const findIp = Router()

findIp.get("/getipdata",getipdata)
findIp.get("/getIp",getIp)

module.exports ={findIp}