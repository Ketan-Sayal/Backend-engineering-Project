const mongoose = require("mongoose");
const { DB_NAME } = require("../constants");

const connectDB = async ()=>{
    try{
        console.log("MongoDB connecting...");
        const connectionObj = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log("\nMongoDB connected\nMongoDB connection host: ",connectionObj.connection.host, "\n");

    }catch(err){
        console.log("Mongodb connection err: ", err);
        process.exit(1);// For forceful stop of  the process by the os
    }
}

module.exports = {
    connectDB
}