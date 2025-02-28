import ImageKit from "imagekit";

export const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

export async function uploadOnImageKit(files) {
  try {
    if (!files) {
      throw new Error("No file provided for upload.");
    }

    const uploadPromises = files.map((file, index) =>
      imagekit.upload({
        file: file.buffer,
        fileName: `product_image_${Date.now()}_${index}.jpg`,
        folder: "/products",
      })
    );
    const uploadedImages = await Promise.all(uploadPromises);
    return uploadedImages.map((img) => img.url);
  } catch (error) {
    console.error("ImageKit upload error:", error.message);
    return { success: false, message: error.message };
  }
}
