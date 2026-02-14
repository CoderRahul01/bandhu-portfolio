import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import path from 'path';
import 'dotenv/config';

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const IMAGES_DIR = './public/images';

async function uploadImages() {
    const categories = ['PORTRAITS', 'WEDDING', 'STREET', 'about'];
    const results = [];
    const aboutResults = [];

    console.log('Starting upload process...');

    for (const category of categories) {
        const dirPath = path.join(IMAGES_DIR, category);
        if (!fs.existsSync(dirPath)) {
            console.warn(`Directory not found: ${dirPath}`);
            continue;
        }

        const files = fs.readdirSync(dirPath);
        for (const file of files) {
            if (!file.match(/\.(jpg|jpeg|png)$/i)) continue;

            const publicId = `bandhu-portfolio/${category}/${path.parse(file).name}`;
            const filePath = path.join(dirPath, file);
            
            console.log(`Processing ${file}...`);

            try {
                // We use overwrite: false to "skip" existing images
                const result = await cloudinary.uploader.upload(filePath, {
                    folder: `bandhu-portfolio/${category}`,
                    public_id: path.parse(file).name,
                    use_filename: true,
                    unique_filename: false,
                    overwrite: false, 
                });

                const resultData = {
                    id: `${category.toLowerCase()}-${path.parse(file).name}`,
                    category: category.toUpperCase(),
                    url: result.secure_url,
                    title: `${category.charAt(0).toUpperCase()}${category.slice(1).toLowerCase()} ${path.parse(file).name}`,
                };

                if (category.toUpperCase() === 'ABOUT' || category === 'about') {
                    aboutResults.push(resultData);
                } else {
                    results.push(resultData);
                }
                console.log(`Successfully uploaded ${file}`);
            } catch (error) {
                if (error.message && error.message.includes('already exists')) {
                    console.log(`Skipping ${file} - already exists in Cloudinary.`);
                    
                    const resultData = {
                        id: `${category.toLowerCase()}-${path.parse(file).name}`,
                        category: category.toUpperCase(),
                        url: cloudinary.url(publicId, { secure: true }),
                        title: `${category.charAt(0).toUpperCase()}${category.slice(1).toLowerCase()} ${path.parse(file).name}`,
                    };

                    if (category.toUpperCase() === 'ABOUT' || category === 'about') {
                        aboutResults.push(resultData);
                    } else {
                        results.push(resultData);
                    }
                } else {
                    console.error(`Failed to upload ${file}:`, error.message || error);
                }
            }
        }
    }

    // Save the metadata
    const dataDir = './src/data';
    if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
    
    if (results.length > 0) {
        fs.writeFileSync(
            path.join(dataDir, 'gallery.json'),
            JSON.stringify(results, null, 2)
        );
        console.log('src/data/gallery.json has been updated.');
    }

    if (aboutResults.length > 0) {
        fs.writeFileSync(
            path.join(dataDir, 'about.json'),
            JSON.stringify(aboutResults, null, 2)
        );
        console.log('src/data/about.json has been updated.');
    }

    console.log('\nSync Complete!');
}

uploadImages();
