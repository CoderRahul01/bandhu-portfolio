import Hero from "@/components/Hero";
import Gallery from "@/components/Gallery";
import About from "@/components/About";
import LandingBlogSection from "@/components/LandingBlogSection";
import Contact from "@/components/Contact";

import { prisma } from "@/lib/prisma";
import { GalleryImage } from "@prisma/client";

export const dynamic = 'force-dynamic';

export default async function Home() {
  const images = await prisma.galleryImage.findMany({
    where: { deletedAt: null },
    orderBy: { createdAt: "desc" },
    take: 6,
  });

  const formattedImages = images.map((img: GalleryImage) => ({
    id: img.id,
    url: img.url,
    title: img.description || "Gallery Image",
    category: img.type.toUpperCase()
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
