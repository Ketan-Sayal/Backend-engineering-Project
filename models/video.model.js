const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    videoFile:{
        type:String,
        required:true
    }
});

const Video = mongoose.model("Video", videoSchema);
module.exports = Video;