import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadImage(fileBuffer: Buffer, folder: string = "bandhu-portfolio"): Promise<UploadApiResponse> {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        format: "webp",
        quality: "auto",
        width: 1920,
        crop: "limit", // Only scale down if wider than 1920px, keep aspect ratio
      },
      (error, result) => {
        if (error || !result) reject(error || new Error("Failed to upload image"));
        else resolve(result);
      }
    );
    uploadStream.end(fileBuffer);
  });
}

export async function deleteImage(publicId: string) {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.destroy(publicId, (error, result) => {
      if (error) reject(error);
      else resolve(result);
    });
  });
}

export default cloudinary;
