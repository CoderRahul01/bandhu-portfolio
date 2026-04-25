import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { addComment, likeBlog } from "@/app/actions/blog";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Heart, MessageSquare, Share2 } from "lucide-react";
import Image from "next/image";

export const revalidate = 300;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const blog = await prisma.blog.findUnique({ where: { slug, deletedAt: null } });
  
  if (!blog) return { title: "Blog Not Found" };

  const plainText = blog.body.replace(/<[^>]*>/g, '').substring(0, 160) + "...";

  return {
    title: `${blog.title} | Bandhu Portfolio`,
    description: plainText,
    openGraph: {
      title: blog.title,
      description: plainText,
      type: "article",
      publishedTime: blog.createdAt.toISOString(),
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
    <div className="flex flex-col min-h-screen bg-black text-zinc-300 font-sans">
      <main className="flex-1 py-24 sm:py-32">
        <article className="max-w-3xl mx-auto px-6">
          
          <header className="space-y-8 mb-16">
            <div className="space-y-4">
              <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">
                <span>{new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                <span className="w-1 h-1 bg-zinc-800 rounded-full" />
                <span>Journal</span>
              </div>
              <h1 className="text-4xl sm:text-7xl font-bold tracking-tight text-white leading-[0.95]">
                {blog.title}
              </h1>
            </div>

            <div className="flex items-center justify-between border-y border-zinc-900 py-6">
              <div className="flex items-center gap-6">
                <form action={async () => {
                  "use server"
                  await likeBlog(blog.id);
                }}>
                  <button type="submit" className="flex items-center gap-2 group">
                    <div className="p-2 rounded-full group-hover:bg-red-500/10 transition-colors">
                      <Heart className="w-5 h-5 group-hover:fill-red-500 group-hover:text-red-500 transition-all" />
                    </div>
                    <span className="text-sm font-medium group-hover:text-white transition-colors">{blog.likesCount}</span>
                  </button>
                </form>
                <div className="flex items-center gap-2 text-zinc-500">
                  <MessageSquare className="w-5 h-5" />
                  <span className="text-sm font-medium">{blog.comments.length}</span>
                </div>
              </div>
              <button className="p-2 rounded-full hover:bg-zinc-900 transition-colors">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </header>

          {blog.coverImage && (
            <div className="w-full aspect-[16/9] bg-zinc-900 rounded-2xl relative overflow-hidden mb-16 border border-zinc-800">
              <Image 
                src={blog.coverImage} 
                alt={blog.title} 
                fill 
                className="object-cover"
                priority
              />
            </div>
          )}

          <div className="prose prose-invert prose-zinc prose-lg max-w-none text-zinc-300 leading-relaxed 
            prose-headings:text-white prose-headings:tracking-tight prose-headings:font-bold
            prose-h1:text-4xl prose-h2:text-3xl prose-h3:text-2xl
            prose-p:mb-8 prose-p:leading-[1.8]
            prose-strong:text-white prose-a:text-white prose-a:underline prose-a:underline-offset-4
            prose-img:rounded-2xl prose-img:border prose-img:border-zinc-800
            prose-code:text-emerald-400 prose-code:bg-emerald-500/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none
          ">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {blog.body}
            </ReactMarkdown>
          </div>

          <footer className="mt-32 space-y-24">
            <hr className="border-zinc-900" />
            
            <section className="max-w-2xl mx-auto space-y-16">
              <div className="space-y-4">
                <h3 className="text-3xl font-bold text-white tracking-tight">Responses ({blog.comments.length})</h3>
                <p className="text-zinc-500 text-sm">Join the conversation and share your perspective.</p>
              </div>
              
              <form action={addComment} className="space-y-6">
                <input type="hidden" name="blogId" value={blog.id} />
                <div className="grid grid-cols-1 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Name</label>
                    <input 
                      type="text" 
                      name="authorName" 
                      placeholder="Alex Newman" 
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-zinc-500 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Message</label>
                    <textarea 
                      name="content" 
                      placeholder="What are your thoughts?" 
                      required 
                      rows={4}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-4 text-white text-sm focus:outline-none focus:border-zinc-500 transition-all resize-none"
                    />
                  </div>
                </div>
                <button type="submit" className="w-full bg-white text-black font-bold uppercase tracking-[0.2em] text-[10px] py-4 rounded-xl hover:bg-zinc-200 transition-all active:scale-[0.98]">
                  Send
                </button>
              </form>

              <div className="space-y-10 pt-8">
                {blog.comments.map(comment => (
                  <div key={comment.id} className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-xs font-bold text-white border border-zinc-700">
                        {comment.authorName.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-white">{comment.authorName}</p>
                        <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-mono">{new Date(comment.createdAt).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <p className="text-sm text-zinc-400 leading-relaxed pl-14">{comment.content}</p>
                  </div>
                ))}
                {blog.comments.length === 0 && (
                  <div className="text-center py-20 border-2 border-dashed border-zinc-900 rounded-3xl">
                    <p className="text-zinc-600 text-xs font-bold uppercase tracking-widest">No responses yet.</p>
                  </div>
                )}
              </div>
            </section>
          </footer>

        </article>
      </main>
    </div>
  );
}
