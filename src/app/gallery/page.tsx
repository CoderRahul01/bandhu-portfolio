import PhotoGallery from "@/components/PhotoGallery";
import { prisma } from "@/lib/prisma";

export const metadata = {
  title: "Gallery | llProfileShotsll",
  description: "A complete archive of professional works spanning across various types and domains.",
};

export const revalidate = 300;

export default async function GalleryPage({ searchParams }: { searchParams: Promise<{ category?: string }> }) {
  const { category } = await searchParams;

  const images = await prisma.galleryImage.findMany({
    where: { deletedAt: null },
    orderBy: { createdAt: "desc" }
  });

  return (
    <div className="flex flex-col min-h-screen bg-black">
      <main className="flex-1">
        <PhotoGallery images={images} initialCategory={category} />
      </main>
    </div>
  );
}
