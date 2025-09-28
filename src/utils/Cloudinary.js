import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
dotenv.config();


cloudinary.config({
  cloud_name:process.env.CLOUD_NAME, 
  api_key:process.env.API_KEY,        
  api_secret:process.env.API_SECRET,  
});

export const uploadFileToCloudinary = async (files) => {
    try {
  
      const fileArray = Array.isArray(files) ? files : [files];
  
      const uploadPromises = fileArray.map((file) =>
        new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder: "images" }, // Optional: Specify folder in Cloudinary
            (error, result) => {
              if (error) {
                console.error(`Upload failed for ${file.originalname}:`, error);
                reject(error);
              } else {
                resolve({
                  secure_url: result.secure_url,
                  public_id: result.public_id,
                });
              }
            }
          );
          stream.end(file.buffer); // ✅ Uploading the actual image buffer
        })
      );
  
      let uploadResults = await Promise.all(uploadPromises);
  
    
  
      return uploadResults;
    } catch (error) {
      console.error(`File upload failed: ${error}`);
      return [];
    }
  };
  
  
  export const deleteFileFromCloudinary = async (public_id) => {
    try {
      const result = await cloudinary.uploader.destroy(public_id);
      return result;
    } catch (error) {
      console.error(`Failed to delete ${public_id}:`, error);
      throw error;
    }
  };