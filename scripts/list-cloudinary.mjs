import { v2 as cloudinary } from "cloudinary";
import "dotenv/config";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function listAssets() {
  try {
    const result = await cloudinary.api.resources({
      type: "upload",
      prefix: "bandhu-portfolio/",
      max_results: 500,
    });
    console.log(JSON.stringify(result.resources, null, 2));
  } catch (error) {
    console.error("Error fetching resources:", error);
  }
}

listAssets();
