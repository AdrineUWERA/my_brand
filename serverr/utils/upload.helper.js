import cloudinary from "../configs/cloudinary.config.js"
// import fileUpload from "express-fileupload"

const cloudinaryUpload = async (file) => {
    return new Promise(resolve => {
        cloudinary.uploader.upload(file, (err, result) => {
            if (err) return err
            resolve({
                url: result.url,
            })
        })
    })
}

export default cloudinaryUpload