import { checkAdminAuth, loginAdmin, logoutAdmin, uploadGalleryImage, softDeleteGalleryImage, restoreGalleryImage, createBlog, softDeleteBlog, restoreBlog, purgeOldSoftDeletedData } from "@/app/actions/admin";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import Image from "next/image";
import { GalleryImage, Blog } from "@prisma/client";
export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  const isAuth = await checkAdminAuth();

  if (!isAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-950 text-zinc-50">
        <form action={async (formData) => {
          "use server"
          const pwd = formData.get("password") as string;
          await loginAdmin(pwd);
          revalidatePath("/admin");
        }} className="flex flex-col gap-4 p-8 border border-zinc-800 rounded-xl bg-zinc-900 w-full max-w-sm">
          <h1 className="text-2xl font-bold tracking-tight">Admin Access</h1>
          <input type="password" name="password" placeholder="Admin Password" required className="bg-zinc-950 border border-zinc-800 rounded px-3 py-2 text-sm focus:outline-none focus:border-zinc-500" />
          <button type="submit" className="bg-zinc-50 text-zinc-950 rounded px-4 py-2 font-medium hover:bg-zinc-200 transition-colors">Login</button>
        </form>
      </div>
    );
  }

  // Trigger purge
  await purgeOldSoftDeletedData();

  // Fetch data for dashboard
  const galleryImages = await prisma.galleryImage.findMany({ orderBy: { createdAt: "desc" } });
  const blogs = await prisma.blog.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 p-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-12">
        
        <header className="flex justify-between items-center border-b border-zinc-800 pb-6">
          <h1 className="text-3xl font-bold tracking-tight">Portfolio Admin</h1>
          <form action={async () => {
            "use server"
            await logoutAdmin();
            revalidatePath("/admin");
          }}>
            <button type="submit" className="text-sm text-zinc-400 hover:text-white transition-colors">Logout</button>
          </form>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Gallery Management */}
          <section className="space-y-6">
            <h2 className="text-xl font-semibold border-b border-zinc-800 pb-2">Gallery Upload</h2>
            <form action={uploadGalleryImage} className="flex flex-col gap-4 bg-zinc-900 p-6 rounded-xl border border-zinc-800">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-zinc-400">High-Res Photo</label>
                <input type="file" name="file" accept="image/*" required className="text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-zinc-800 file:text-zinc-300 hover:file:bg-zinc-700" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-zinc-400">Category / Type</label>
                <select name="type" className="bg-zinc-950 border border-zinc-800 rounded px-3 py-2 text-sm focus:outline-none focus:border-zinc-500">
                  <option value="landscape">Landscape</option>
                  <option value="portrait">Portrait</option>
                  <option value="architecture">Architecture</option>
                  <option value="street">Street</option>
                  <option value="uncategorized">Uncategorized</option>
                </select>
              </div>
              <button type="submit" className="bg-zinc-50 text-zinc-950 rounded px-4 py-2 font-medium hover:bg-zinc-200 transition-colors mt-2">Upload Photo</button>
            </form>

            <div className="space-y-4">
              <h3 className="font-medium text-zinc-300">Manage Gallery</h3>
              <div className="space-y-2 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
                {galleryImages.map((img: GalleryImage) => (
                  <div key={img.id} className={`flex items-center justify-between p-3 rounded-lg border ${img.deletedAt ? 'bg-red-950/20 border-red-900/30' : 'bg-zinc-900 border-zinc-800'}`}>
                    <div className="flex items-center gap-3">
                      <Image src={img.url} alt="" width={48} height={48} className="w-12 h-12 object-cover rounded bg-zinc-800" />
                      <div>
                        <p className="text-sm font-medium">{img.type}</p>
                        <p className="text-xs text-zinc-500">{new Date(img.createdAt).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <form action={img.deletedAt ? restoreGalleryImage.bind(null, img.id) : softDeleteGalleryImage.bind(null, img.id)}>
                      <button type="submit" className={`text-xs px-3 py-1.5 rounded-full font-medium ${img.deletedAt ? 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700' : 'bg-red-500/10 text-red-400 hover:bg-red-500/20'}`}>
                        {img.deletedAt ? 'Restore' : 'Delete'}
                      </button>
                    </form>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Blog Management */}
          <section className="space-y-6">
            <h2 className="text-xl font-semibold border-b border-zinc-800 pb-2">Create Blog</h2>
            <form action={createBlog} className="flex flex-col gap-4 bg-zinc-900 p-6 rounded-xl border border-zinc-800">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-zinc-400">Cover Image</label>
                <input type="file" name="coverImage" accept="image/*" className="text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-zinc-800 file:text-zinc-300 hover:file:bg-zinc-700" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-zinc-400">Title</label>
                <input type="text" name="title" required className="bg-zinc-950 border border-zinc-800 rounded px-3 py-2 text-sm focus:outline-none focus:border-zinc-500" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-zinc-400">Content (Markdown supported if you use a renderer later)</label>
                <textarea name="body" required rows={5} className="bg-zinc-950 border border-zinc-800 rounded px-3 py-2 text-sm focus:outline-none focus:border-zinc-500 resize-y" />
              </div>
              <button type="submit" className="bg-zinc-50 text-zinc-950 rounded px-4 py-2 font-medium hover:bg-zinc-200 transition-colors mt-2">Publish Blog</button>
            </form>

            <div className="space-y-4">
              <h3 className="font-medium text-zinc-300">Manage Blogs</h3>
              <div className="space-y-2 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
                {blogs.map((blog: Blog) => (
                  <div key={blog.id} className={`flex items-center justify-between p-3 rounded-lg border ${blog.deletedAt ? 'bg-red-950/20 border-red-900/30' : 'bg-zinc-900 border-zinc-800'}`}>
                    <div className="flex flex-col">
                      <p className="text-sm font-medium truncate max-w-[200px]">{blog.title}</p>
                      <p className="text-xs text-zinc-500">{new Date(blog.createdAt).toLocaleDateString()}</p>
                    </div>
                    <form action={blog.deletedAt ? restoreBlog.bind(null, blog.id) : softDeleteBlog.bind(null, blog.id)}>
                      <button type="submit" className={`text-xs px-3 py-1.5 rounded-full font-medium ${blog.deletedAt ? 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700' : 'bg-red-500/10 text-red-400 hover:bg-red-500/20'}`}>
                        {blog.deletedAt ? 'Restore' : 'Delete'}
                      </button>
                    </form>
                  </div>
                ))}
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
