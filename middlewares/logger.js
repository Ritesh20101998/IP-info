const winston = require("winston");
const {MongoDB} = require("winston-mongodb")

const logger = winston.createLogger({
    level:"info",
    format: winston.format.json(),
    transports:[
        new MongoDB ({
            db:process.env.Mongo_Url,
            collection:"logs",
            options: {
                useUnifiedTopology:true
            }
        })
    ]
})

module.exports = logger