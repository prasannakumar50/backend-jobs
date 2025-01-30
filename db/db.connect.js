const mongoose = require('mongoose')
require("dotenv").config();

const mongoUri = process.env.MONGODB;


async function initializeDatabase(){

    await mongoose.connect(mongoUri)
    .then(()=>{
    console.log("connected to Database")
    })
    .catch((error)=>{
    console.log("Error while connecting to database", error)
    })

}

module.exports = {initializeDatabase}

