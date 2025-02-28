import ImageKit from "imagekit";

export const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

const MAX_FILE_SIZE_MB = 2;

export async function uploadOnImagekit(file, fileName) {
  try {
    if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      throw new Error("File size exceeds 2MB. Please upload a smaller image.");
    }

    const result = await imagekit.upload({
      file: file,
      fileName: fileName,
      isPublished: true,
    });

    console.log("Upload successful:", result);
    return result;
  } catch (error) {
    console.error("ImageKit upload error:", error);
    throw error;
  }
}
