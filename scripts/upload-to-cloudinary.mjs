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
    const categories = ['PORTRAITS', 'WEDDING', 'STREET', 'ABOUT'];
    const results = [];
    const aboutResults = [];

    for (const category of categories) {
        const dirPath = path.join(IMAGES_DIR, category);
        if (!fs.existsSync(dirPath)) continue;

        const files = fs.readdirSync(dirPath);
        for (const file of files) {
            if (!file.endsWith('.jpg') && !file.endsWith('.jpeg') && !file.endsWith('.png')) continue;

            const filePath = path.join(dirPath, file);
            console.log(`Uploading ${filePath}...`);

            try {
                const result = await cloudinary.uploader.upload(filePath, {
                    folder: `bandhu-portfolio/${category}`,
                    public_id: path.parse(file).name,
                    use_filename: true,
                    unique_filename: false,
                });

                const resultData = {
                    id: `${category.toLowerCase()}-${path.parse(file).name}`,
                    category,
                    url: result.secure_url,
                    title: `${category.charAt(0)}${category.slice(1).toLowerCase()} ${path.parse(file).name}`,
                };

                if (category === 'ABOUT') {
                    aboutResults.push(resultData);
                } else {
                    results.push(resultData);
                }
                console.log(`Successfully uploaded ${file}`);
            } catch (error) {
                console.error(`Failed to upload ${file}:`, error.message);
            }
        }
    }

    // Save the new metadata
    const dataDir = './src/data';
    if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
    fs.writeFileSync(
        path.join(dataDir, 'gallery.json'),
        JSON.stringify(results, null, 2)
    );

    if (aboutResults.length > 0) {
        fs.writeFileSync(
            path.join(dataDir, 'about.json'),
            JSON.stringify(aboutResults, null, 2)
        );
        console.log('src/data/about.json has been updated.');
    }

    console.log('\nMigration Complete! src/data/gallery.json has been updated with Cloudinary URLs.');
    console.log('You can now safely delete the local public/images folder.');
}

uploadImages();
