import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { addComment } from "@/app/actions/blog";

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const blog = await prisma.blog.findUnique({ where: { slug, deletedAt: null } });
  
  if (!blog) return { title: "Blog Not Found" };

  return {
    title: `${blog.title} | Bandhu Portfolio`,
    description: blog.body.substring(0, 160) + "...",
    openGraph: {
      title: blog.title,
      description: blog.body.substring(0, 160) + "...",
      type: "article",
      publishedTime: blog.createdAt.toISOString(),
      images: blog.coverImage ? [blog.coverImage] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: blog.body.substring(0, 160) + "...",
      images: blog.coverImage ? [blog.coverImage] : [],
    }
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  const blog = await prisma.blog.findUnique({
    where: { slug, deletedAt: null },
    include: {
      comments: { orderBy: { createdAt: "desc" } }
    }
  });

  if (!blog) notFound();

  return (
    <div className="flex flex-col min-h-screen bg-black">
      <main className="flex-1 py-24 sm:py-32">
        <article className="max-w-3xl mx-auto px-6 sm:px-12">
          <div className="space-y-6 text-center mb-16">
            <p className="text-white/40 text-sm font-mono tracking-wider">
              {new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </p>
            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white leading-tight">
              {blog.title}
            </h1>
          </div>

          {blog.coverImage && (
            <div className="w-full aspect-[16/9] bg-neutral-900 rounded-sm relative overflow-hidden mb-16 border border-white/5">
              <img src={blog.coverImage} alt={blog.title} className="object-cover w-full h-full" />
            </div>
          )}

          <div className="prose prose-invert prose-lg max-w-none text-white/80 whitespace-pre-wrap leading-relaxed">
            {blog.body}
          </div>

          <hr className="my-20 border-white/10" />

          {/* Comments Section */}
          <section className="space-y-12">
            <h3 className="text-2xl font-bold text-white tracking-tight">Responses ({blog.comments.length})</h3>
            
            <form action={addComment} className="flex flex-col gap-4 bg-neutral-900/50 p-6 rounded border border-white/5">
              <input type="hidden" name="blogId" value={blog.id} />
              <input 
                type="text" 
                name="authorName" 
                placeholder="Your Name (Optional)" 
                className="bg-black border border-white/10 rounded px-4 py-2 text-white text-sm focus:outline-none focus:border-white/30"
              />
              <textarea 
                name="content" 
                placeholder="What are your thoughts?" 
                required 
                rows={4}
                className="bg-black border border-white/10 rounded px-4 py-3 text-white text-sm focus:outline-none focus:border-white/30 resize-y"
              />
              <button type="submit" className="self-end bg-white text-black font-medium px-6 py-2 rounded text-sm hover:bg-neutral-200 transition-colors">
                Publish Response
              </button>
            </form>

            <div className="space-y-6">
              {blog.comments.map(comment => (
                <div key={comment.id} className="border-b border-white/5 pb-6">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-full bg-neutral-800 flex items-center justify-center text-xs font-medium text-white/50">
                      {comment.authorName.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">{comment.authorName}</p>
                      <p className="text-xs text-white/40">{new Date(comment.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <p className="text-sm text-white/70 pl-11">{comment.content}</p>
                </div>
              ))}
            </div>
          </section>

        </article>
      </main>
    </div>
  );
}
