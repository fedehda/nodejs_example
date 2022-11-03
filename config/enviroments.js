const dotenv = require("dotenv")
dotenv.config()

module.exports={
    secretKey:process.env.SECRET_KEY,
    dbName:process.env.DB_NAME,
    dbHost:process.env.DB_HOST
}