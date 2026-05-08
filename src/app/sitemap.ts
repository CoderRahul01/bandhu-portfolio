import { MetadataRoute } from "next";
// Blog is hidden for now — re-enable blog sitemap entries when blog is brought back
// import { prisma } from "@/lib/prisma";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://llprofileshotsll.in";

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/gallery`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    // Blog routes hidden for now — can be re-enabled later
    // {
    //   url: `${baseUrl}/blog`,
    //   lastModified: new Date(),
    //   changeFrequency: "weekly",
    //   priority: 0.8,
    // },
  ];

  // Blog routes hidden for now — can be re-enabled later
  // const blogs = await prisma.blog.findMany({
  //   where: { deletedAt: null },
  //   select: { slug: true, updatedAt: true, createdAt: true },
  //   orderBy: { createdAt: "desc" },
  // });
  // const blogRoutes: MetadataRoute.Sitemap = blogs.map((blog) => ({
  //   url: `${baseUrl}/blog/${blog.slug}`,
  //   lastModified: blog.updatedAt ?? blog.createdAt,
  //   changeFrequency: "monthly",
  //   priority: 0.7,
  // }));

  return [...staticRoutes];
}

