// import cloudinaryUpload from "../utils/upload.helper.js";
import cloudinary from "../configs/cloudinary.config.js"; 

const imageUpload = async (req, res, next) => {
  try {  
    // console.log("in upload")
    const result = await cloudinary.v2.uploader.upload(req.file.path);  
    // console.log("before returning the url", result.url)
    req.body.coverImage = result.url
    next();
    
  } catch (error) {
    console.log(error);
  }
};

export default imageUpload;
