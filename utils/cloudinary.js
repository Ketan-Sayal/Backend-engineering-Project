const { v2 } = require('cloudinary');
const fs = require('fs');
require('dotenv').config();

const cloudinary = v2;

cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET// Click 'View API Keys' above to copy your API secret
});

const uploadFile = async(loacalPath)=>{
    if(!loacalPath) return null;
    try{
        const uploadResult = await cloudinary.uploader
       .upload(
           loacalPath, {
               resource_type:"image"
           }
       );
       if(!uploadResult) return null;
       fs.unlinkSync(loacalPath);
       return uploadResult;
    }catch(err){
        console.log("Cloudinary error: ", err);
        fs.unlinkSync(loacalPath);
        return null;
    }

}

const uploadVideo = async(loacalPath)=>{
    if(!loacalPath) return null;
    try{
        const uploadResult = await cloudinary.uploader
       .upload(
           loacalPath, {
               resource_type:"video"
           }
       );
       if(!uploadResult) return null;
       fs.unlinkSync(loacalPath);
       return uploadResult;
    }catch(err){
        console.log("Cloudinary error: ", err);
        fs.unlinkSync(loacalPath);
        return null;
    }

}

module.exports ={
    uploadFile,
    uploadVideo
}