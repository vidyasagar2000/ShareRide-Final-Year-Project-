// const cloudinary = require("cloudinary").v2;
// const fs = require("fs");
// require("dotenv").config(); 

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
//   secure: true,
// });

// const uploadOnCloudinary = async (localFilePath) => {
//   console.log(localFilePath);
//   try {
//     if (!localFilePath) return null;
//     // Upload the file to Cloudinary
//     const response = await cloudinary.uploader.upload(localFilePath, {
//       resource_type: "auto",
//     });
//     console.log("File is uploaded on Cloudinary");
//     console.log(response.url);
//     // Clean up the temporary files
//     fs.unlinkSync(localFilePath);
//     return response;
//   } catch (error) {
//     console.error("Error uploading file to Cloudinary:", error);
//     // Remove the locally saved temporary file as the upload operation failed
//     if (fs.existsSync(localFilePath)) {
//       fs.unlinkSync(localFilePath);
//     }
//     return null;
//   }
// };

// module.exports = { uploadOnCloudinary }; 
