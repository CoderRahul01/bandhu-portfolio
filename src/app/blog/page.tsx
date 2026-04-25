import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export const metadata = {
  title: "Blog | Bandhu Portfolio",
  description: "Insights, stories, and learnings from the lens of a professional photographer.",
};

export default async function BlogPage() {
  const blogs = await prisma.blog.findMany({
    where: { deletedAt: null },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      title: true,
      slug: true,
      coverImage: true,
      createdAt: true,
      body: true
    }
  });

  return (
    <div className="flex flex-col min-h-screen bg-black">
      <Navbar />
      <main className="flex-1 py-24 sm:py-40">
        <div className="max-w-7xl mx-auto px-6 sm:px-12">
          
          <div className="space-y-4 mb-20 text-center lg:text-left">
            <p className="text-white/20 text-[10px] font-bold tracking-[0.6em] uppercase">
              Stories & Insights
            </p>
            <h2 className="text-4xl sm:text-7xl font-bold tracking-tighter uppercase leading-[0.85]">The <br /> Journal</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {blogs.map(blog => (
              <Link href={`/blog/${blog.slug}`} key={blog.id} className="group flex flex-col space-y-4 cursor-pointer">
                <div className="aspect-[16/10] overflow-hidden bg-neutral-900 rounded-sm relative border border-white/5 transition-colors group-hover:border-white/20">
                  {blog.coverImage && (
                    <img
                      src={blog.coverImage}
                      alt={blog.title}
                      className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                    />
                  )}
                </div>
                <div className="space-y-2">
                  <p className="text-white/40 text-xs font-mono tracking-wider">
                    {new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </p>
                  <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-white/90 group-hover:text-white transition-colors line-clamp-2">
                    {blog.title}
                  </h3>
                  <p className="text-white/50 text-sm line-clamp-3 leading-relaxed">
                    {blog.body}
                  </p>
                </div>
              </Link>
            ))}

            {blogs.length === 0 && (
              <div className="col-span-full text-center py-20 text-white/30">
                No articles published yet.
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
