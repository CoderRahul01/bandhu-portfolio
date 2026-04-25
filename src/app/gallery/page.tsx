import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PhotoGallery from "@/components/PhotoGallery";
import { prisma } from "@/lib/prisma";

export const metadata = {
  title: "Gallery | Bandhu Portfolio",
  description: "A complete archive of professional works spanning across various types and domains.",
};

export default async function GalleryPage() {
  const images = await prisma.galleryImage.findMany({
    where: { deletedAt: null },
    orderBy: { createdAt: "desc" }
  });

  return (
    <div className="flex flex-col min-h-screen bg-black">
      <Navbar />
      <main className="flex-1">
        <PhotoGallery images={images} />
      </main>
      <Footer />
    </div>
  );
}
