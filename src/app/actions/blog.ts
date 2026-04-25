"use server"

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function addComment(formData: FormData) {
  const blogId = formData.get("blogId") as string;
  const content = formData.get("content") as string;
  const authorName = formData.get("authorName") as string || "Anonymous";

  if (!blogId || !content) {
    throw new Error("Blog ID and content are required");
  }

  const blog = await prisma.blog.findUnique({ where: { id: blogId } });
  if (!blog) throw new Error("Blog not found");

  await prisma.comment.create({
    data: {
      content,
      authorName,
      blogId
    }
  });

  revalidatePath(`/blog/${blog.slug}`);
}
export async function likeBlog(blogId: string) {
  if (!blogId) return;

  const blog = await prisma.blog.update({
    where: { id: blogId },
    data: { likesCount: { increment: 1 } }
  });

  revalidatePath(`/blog/${blog.slug}`);
  revalidatePath("/");
}
