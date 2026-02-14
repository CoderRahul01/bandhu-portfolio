import { v2 as cloudinary } from 'cloudinary';
import 'dotenv/config';

cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

console.log('Configured Cloud Name:', cloudinary.config().cloud_name);
console.log('Configured API Key:', cloudinary.config().api_key);

async function test() {
    console.log('Testing Cloudinary ping...');
    try {
        const result = await cloudinary.api.ping();
        console.log('Ping result:', result);
    } catch (error) {
        console.error('Ping failed:', error.message);
    }
}

test();
