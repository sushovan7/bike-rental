import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadOnCloudinary(localFilePath) {
  try {
    if (!localFilePath) {
      return;
    }
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    fs.unlinkSync(localFilePath);

    return response;
  } catch (error) {
    console.log(error.stack);
    fs.unlinkSync(localFilePath);
  }
}

export async function deleteFromCloudinary(publicId) {
  try {
    if (!publicId) {
      return;
    }
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.log(error.stack);
  }
}
