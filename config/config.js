const {config} = require("dotenv");
config({path:"./sample.env"})

module.exports= {
    PORT: process.env.PORT,
    MONGO_CONNECTION_STRING: process.env.MONGO_CONNECTION_STRING
}