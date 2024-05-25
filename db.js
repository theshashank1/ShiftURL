// ShiftURL/config/db.js

const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        // mongodb://localhost:27017/shashank
        await mongoose.connect("mongodb://localhost:27017/shifturl");
        console.log("Database is connected successfully");
    } catch (error) {
        console.log(`There is an error found in connecting, ${error}`);
    }
};

const disconnectDB = async () => {
    try {
        await mongoose.disconnect();
        console.log("Database is disconnected successfully");
    } catch (error) {
        console.log(`There is an error found in disconnecting, ${error}`);
    }
};

module.exports = { connectDB, disconnectDB };
