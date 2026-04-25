import Hero from "@/components/Hero";
import Gallery from "@/components/Gallery";
import About from "@/components/About";
import LandingBlogSection from "@/components/LandingBlogSection";
import Contact from "@/components/Contact";

import { prisma } from "@/lib/prisma";
import { GalleryImage } from "@prisma/client";

export const revalidate = 300;

export default async function Home() {
  const images = await prisma.galleryImage.findMany({
    where: { deletedAt: null },
    orderBy: { createdAt: "desc" },
    // Fetch all to allow local filtering on landing page
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
      <LandingBlogSection />
      <Contact />
    </div>
  );
}
