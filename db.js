const mongoose = require("mongoose")

const connectDB = async () =>{
    try{
        await mongoose.connect("mongodb://localhost:27017/shifturl")
        console.log("Database is connected sucessfully")
    }
    catch(error){
        console.log(`There is an error found in connecting, ${error}`);
    }
}


const disconnectDB = async () =>{
    try{
        await mongoose.disconnect()
    }
    catch(error){
        console.log(`There is an error found in disconnecting , ${error}`)
    }
}

module.exports = { connectDB, disconnectDB }

