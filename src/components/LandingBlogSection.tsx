import { prisma } from "@/lib/prisma";
import BlogParallaxScroll from "./BlogParallaxScroll";

export default async function LandingBlogSection() {
  const blogs = await prisma.blog.findMany({
    where: { deletedAt: null },
    orderBy: { createdAt: "desc" },
    take: 3,
    select: {
      id: true,
      title: true,
      slug: true,
      coverImage: true,
      createdAt: true,
      body: true
    }
  });

  return <BlogParallaxScroll blogs={blogs} />;
}
