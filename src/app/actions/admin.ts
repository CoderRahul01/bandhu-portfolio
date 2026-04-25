"use server"

import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { uploadImage, deleteImage } from "@/lib/cloudinary";
import { revalidatePath } from "next/cache";

// ----------------- Auth -----------------

export async function checkAdminAuth() {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value;
  if (!process.env.ADMIN_PASSWORD) return false;
  return token === process.env.ADMIN_PASSWORD;
}

export async function loginAdmin(password: string) {
  if (!process.env.ADMIN_PASSWORD) return false;
  if (password === process.env.ADMIN_PASSWORD) {
    const cookieStore = await cookies();
    cookieStore.set("admin_token", password, { httpOnly: true, secure: process.env.NODE_ENV === "production" });
    return true;
  }
  return false;
}

export async function logoutAdmin() {
  const cookieStore = await cookies();
  cookieStore.delete("admin_token");
}

// ----------------- Purge Logic -----------------

function getPublicIdFromUrl(url: string) {
  try {
    // example url: https://res.cloudinary.com/demo/image/upload/v1312461204/bandhu-portfolio/sample.webp
    const parts = url.split("/");
    const uploadIndex = parts.findIndex(p => p === "upload");
    if (uploadIndex === -1) return null;
    
    // public_id starts after the version (v123456)
    const publicIdWithExt = parts.slice(uploadIndex + 2).join("/");
    const publicId = publicIdWithExt.substring(0, publicIdWithExt.lastIndexOf('.'));
    return publicId;
  } catch (e) {
    return null;
  }
}

export async function purgeOldSoftDeletedData() {
  const isAuth = await checkAdminAuth();
  if (!isAuth) return;

  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  // 1. Purge old Gallery Images
  const oldImages = await prisma.galleryImage.findMany({
    where: { deletedAt: { lt: sevenDaysAgo } }
  });

  for (const img of oldImages) {
    const publicId = getPublicIdFromUrl(img.url);
    if (publicId) await deleteImage(publicId).catch(() => {});
    await prisma.galleryImage.delete({ where: { id: img.id } });
  }

  // 2. Purge old Blogs
  const oldBlogs = await prisma.blog.findMany({
    where: { deletedAt: { lt: sevenDaysAgo } }
  });

  for (const blog of oldBlogs) {
    if (blog.coverImage) {
      const publicId = getPublicIdFromUrl(blog.coverImage);
      if (publicId) await deleteImage(publicId).catch(() => {});
    }
    await prisma.blog.delete({ where: { id: blog.id } });
  }
}

// ----------------- Gallery Actions -----------------

export async function uploadGalleryImage(formData: FormData) {
  const isAuth = await checkAdminAuth();
  if (!isAuth) throw new Error("Unauthorized");

  const file = formData.get("file") as File;
  const type = formData.get("type") as string || "uncategorized";
  const description = formData.get("description") as string || "";

  if (!file) throw new Error("No file provided");

  const buffer = Buffer.from(await file.arrayBuffer());
  const uploadResult = await uploadImage(buffer);

  await prisma.galleryImage.create({
    data: {
      url: uploadResult.secure_url,
      type,
      description
    }
  });

  revalidatePath("/gallery");
  revalidatePath("/admin");
}

export async function softDeleteGalleryImage(id: string) {
  const isAuth = await checkAdminAuth();
  if (!isAuth) throw new Error("Unauthorized");

  await prisma.galleryImage.update({
    where: { id },
    data: { deletedAt: new Date() }
  });

  revalidatePath("/gallery");
  revalidatePath("/admin");
}

export async function restoreGalleryImage(id: string) {
  const isAuth = await checkAdminAuth();
  if (!isAuth) throw new Error("Unauthorized");

  await prisma.galleryImage.update({
    where: { id },
    data: { deletedAt: null }
  });

  revalidatePath("/gallery");
  revalidatePath("/admin");
}

// ----------------- Blog Actions -----------------

export async function createBlog(formData: FormData) {
  const isAuth = await checkAdminAuth();
  if (!isAuth) throw new Error("Unauthorized");

  const title = formData.get("title") as string;
  const body = formData.get("body") as string;
  const file = formData.get("coverImage") as File;

  if (!title || !body) throw new Error("Title and body are required");

  let coverImageUrl = null;
  if (file && file.size > 0) {
    const buffer = Buffer.from(await file.arrayBuffer());
    const uploadResult = await uploadImage(buffer);
    coverImageUrl = uploadResult.secure_url;
  }

  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Date.now();

  await prisma.blog.create({
    data: {
      title,
      slug,
      body,
      coverImage: coverImageUrl
    }
  });

  revalidatePath("/blog");
  revalidatePath("/admin");
}

export async function softDeleteBlog(id: string) {
  const isAuth = await checkAdminAuth();
  if (!isAuth) throw new Error("Unauthorized");

  await prisma.blog.update({
    where: { id },
    data: { deletedAt: new Date() }
  });

  revalidatePath("/blog");
  revalidatePath("/");
  revalidatePath("/admin");
}

export async function restoreBlog(id: string) {
  const isAuth = await checkAdminAuth();
  if (!isAuth) throw new Error("Unauthorized");

  await prisma.blog.update({
    where: { id },
    data: { deletedAt: null }
  });

  revalidatePath("/blog");
  revalidatePath("/");
  revalidatePath("/admin");
}
