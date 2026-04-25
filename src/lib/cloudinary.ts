import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';

export const CLOUDINARY_ROOT_FOLDER = "bandhu-portfolio";
export const BLOG_COVER_IMAGE_FOLDER = `${CLOUDINARY_ROOT_FOLDER}/coverimage`;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadMedia(
  fileBuffer: Buffer,
  folder: string = CLOUDINARY_ROOT_FOLDER,
  resourceType: "image" | "video" | "auto" = "auto"
): Promise<UploadApiResponse> {
  return new Promise((resolve, reject) => {
    const uploadOptions: any = {
      folder,
      resource_type: resourceType,
    };

    // Only apply image transformations if it's an image
    if (resourceType === "image" || (resourceType === "auto" && !folder.includes("video"))) {
      uploadOptions.format = "webp";
      uploadOptions.quality = "auto";
      uploadOptions.width = 1920;
      uploadOptions.crop = "limit";
    }

    const uploadStream = cloudinary.uploader.upload_stream(
      uploadOptions,
      (error, result) => {
        if (error || !result) reject(error || new Error("Failed to upload media"));
        else resolve(result);
      }
    );
    uploadStream.end(fileBuffer);
  });
}

// Keep uploadImage for backward compatibility but use uploadMedia internally
export async function uploadImage(
  fileBuffer: Buffer,
  folder: string = CLOUDINARY_ROOT_FOLDER
): Promise<UploadApiResponse> {
  return uploadMedia(fileBuffer, folder, "image");
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
