// import cloudinaryUpload from "../utils/upload.helper.js";
import cloudinary from "../configs/cloudinary.config.js"; 

const imageUpload = async (path) => {
  try {  
    // console.log("in upload", path)
    const result = await cloudinary.v2.uploader.upload(path);  
    // console.log("before returning the url")
    return result.url;
    
  } catch (error) {
    console.log(error);
  }
};

export default imageUpload;
