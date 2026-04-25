import { v2 as cloudinary } from 'cloudinary';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });
dotenv.config(); // fallback to .env

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const prisma = new PrismaClient();

const FOLDER_TO_TYPE = {
  PORTRAITS: 'portrait',
  WEDDING: 'wedding',
  STREET: 'street',
};

async function listAllInFolder(prefix) {
  const results = [];
  let nextCursor = undefined;
  do {
    const res = await cloudinary.api.resources({
      type: 'upload',
      prefix,
      max_results: 500,
      ...(nextCursor ? { next_cursor: nextCursor } : {}),
    });
    results.push(...res.resources);
    nextCursor = res.next_cursor;
  } while (nextCursor);
  return results;
}

async function seed() {
  console.log('Fetching existing DB entries...');
  const existing = await prisma.galleryImage.findMany({ select: { url: true } });
  const existingUrls = new Set(existing.map(r => r.url));
  console.log(`Found ${existingUrls.size} existing entries in DB.`);

  let inserted = 0;
  let skipped = 0;

  for (const [folder, type] of Object.entries(FOLDER_TO_TYPE)) {
    const prefix = `bandhu-portfolio/${folder}`;
    console.log(`\nListing Cloudinary folder: ${prefix}`);
    const resources = await listAllInFolder(prefix);
    console.log(`  Found ${resources.length} images`);

    for (const resource of resources) {
      const url = resource.secure_url;
      if (existingUrls.has(url)) {
        skipped++;
        continue;
      }
      await prisma.galleryImage.create({
        data: { url, type, description: '' },
      });
      existingUrls.add(url);
      inserted++;
      console.log(`  + ${type}: ${url.split('/').pop()}`);
    }
  }

  console.log(`\nDone. Inserted: ${inserted}, Skipped (already in DB): ${skipped}`);
  await prisma.$disconnect();
}

seed().catch(async (e) => {
  console.error(e);
  await prisma.$disconnect();
  process.exit(1);
});
