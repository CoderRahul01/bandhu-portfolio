import Hero from "@/components/Hero";
import Gallery from "@/components/Gallery";
import About from "@/components/About";
// Blog section hidden for now — can be re-enabled later
// import LandingBlogSection from "@/components/LandingBlogSection";
import Contact from "@/components/Contact";

import { prisma } from "@/lib/prisma";
import { GalleryImage } from "@prisma/client";

export const revalidate = 300;

export default async function Home() {
  const images = await prisma.galleryImage.findMany({
    where: { deletedAt: null },
    orderBy: { createdAt: "asc" }, // Oldest first — first uploaded appears first
  });

  const formattedImages = images.map((img: GalleryImage) => ({
    id: img.id,
    url: img.url,
    title: img.description || "Gallery Image",
    type: img.type,
    mediaType: img.mediaType
  }));

  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <Gallery images={formattedImages} />
      <About />
      {/* Blog section hidden for now — can be re-enabled later */}
      {/* <LandingBlogSection /> */}
      <Contact />
    </div>
  );
}
