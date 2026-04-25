import { checkAdminAuth, loginAdmin, logoutAdmin, uploadGalleryImage, softDeleteGalleryImage, restoreGalleryImage, softDeleteBlog, restoreBlog, purgeOldSoftDeletedData } from "@/app/actions/admin";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import Image from "next/image";
import { GalleryImage, Blog } from "@prisma/client";
import AdminBlogForm from "@/components/AdminBlogForm";
import AdminTabs from "@/components/AdminTabs";
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
    <div className="min-h-screen bg-zinc-950 text-zinc-50 font-sans">
      <div className="max-w-6xl mx-auto p-8 space-y-12">
        
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-zinc-800 pb-8 gap-6">
          <div className="space-y-1">
            <h1 className="text-4xl font-bold tracking-tight">Portfolio Admin</h1>
            <p className="text-zinc-500 text-sm">Manage your professional archive and journal.</p>
          </div>
          <div className="flex items-center gap-4">
            <a href="/" className="text-xs text-zinc-500 hover:text-white transition-colors border border-zinc-800 px-4 py-2 rounded-full">View Site</a>
            <form action={async () => {
              "use server"
              await logoutAdmin();
              revalidatePath("/admin");
            }}>
              <button type="submit" className="text-xs bg-zinc-800 text-zinc-300 px-4 py-2 rounded-full hover:bg-zinc-700 hover:text-white transition-all">Logout</button>
            </form>
          </div>
        </header>

        <AdminTabs 
          galleryContent={
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-1 space-y-6">
                <h2 className="text-xl font-semibold border-b border-zinc-800 pb-2 text-zinc-200">Upload Media</h2>
                <form action={uploadGalleryImage} className="flex flex-col gap-4 bg-zinc-900/50 p-6 rounded-2xl border border-zinc-800/50 backdrop-blur-sm">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">File (Photo/Video)</label>
                    <input type="file" name="file" accept="image/*,video/*" required className="text-[10px] file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-[10px] file:font-bold file:bg-zinc-800 file:text-zinc-300 hover:file:bg-zinc-700 cursor-pointer" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Cloud Folder</label>
                    <input type="text" name="folder" placeholder="e.g. Wedding Shoots 2024" className="bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-zinc-500 transition-all" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Category</label>
                    <select name="type" className="bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-zinc-500 transition-all">
                      <option value="portrait">Portrait</option>
                      <option value="wedding">Wedding</option>
                      <option value="street">Street</option>
                      <option value="landscape">Landscape</option>
                      <option value="architecture">Architecture</option>
                      <option value="uncategorized">Uncategorized</option>
                    </select>
                  </div>
                  <button type="submit" className="bg-white text-black rounded-lg px-4 py-2.5 font-bold uppercase tracking-widest text-[10px] hover:bg-zinc-200 transition-all mt-2 active:scale-95">Upload Asset</button>
                </form>
              </div>

              <div className="lg:col-span-2 space-y-6">
                <h2 className="text-xl font-semibold border-b border-zinc-800 pb-2 text-zinc-200">Manage Gallery</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[70vh] overflow-y-auto pr-2 custom-scrollbar">
                  {galleryImages.map((img: GalleryImage) => (
                    <div key={img.id} className={`flex items-center gap-4 p-3 rounded-xl border transition-all ${img.deletedAt ? 'bg-red-950/10 border-red-900/20 opacity-60' : 'bg-zinc-900 border-zinc-800 hover:border-zinc-700'}`}>
                      <div className="relative w-16 h-16 shrink-0 bg-zinc-800 rounded-lg overflow-hidden">
                        {img.mediaType === 'video' ? (
                          <div className="w-full h-full flex items-center justify-center text-[10px] text-zinc-500 font-bold bg-zinc-950">VIDEO</div>
                        ) : (
                          <Image src={img.url} alt="" fill className="object-cover" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[10px] font-bold uppercase tracking-tighter text-zinc-400">{img.type}</p>
                        <p className="text-[10px] text-zinc-600 truncate font-mono">{img.folder}</p>
                      </div>
                      <form action={img.deletedAt ? restoreGalleryImage.bind(null, img.id) : softDeleteGalleryImage.bind(null, img.id)}>
                        <button type="submit" className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full transition-all ${img.deletedAt ? 'bg-zinc-800 text-zinc-300' : 'bg-red-500/10 text-red-400 hover:bg-red-500/20'}`}>
                          {img.deletedAt ? 'Restore' : 'Delete'}
                        </button>
                      </form>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          }
          blogContent={
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2 space-y-6">
                <h2 className="text-xl font-semibold border-b border-zinc-800 pb-2 text-zinc-200">Journal Entries</h2>
                <AdminBlogForm />
              </div>
              <div className="lg:col-span-1 space-y-6">
                <h2 className="text-xl font-semibold border-b border-zinc-800 pb-2 text-zinc-200">Past Entries</h2>
                <div className="space-y-3 max-h-[70vh] overflow-y-auto pr-2 custom-scrollbar">
                  {blogs.map((blog: Blog) => (
                    <div key={blog.id} className={`p-4 rounded-2xl border space-y-3 transition-all ${blog.deletedAt ? 'bg-red-950/10 border-red-900/20 opacity-60' : 'bg-zinc-900 border-zinc-800 hover:border-zinc-700'}`}>
                      <div className="space-y-1">
                        <p className="text-sm font-bold tracking-tight text-zinc-100 line-clamp-1">{blog.title}</p>
                        <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-mono">{new Date(blog.createdAt).toLocaleDateString()}</p>
                      </div>
                      <form action={blog.deletedAt ? restoreBlog.bind(null, blog.id) : softDeleteBlog.bind(null, blog.id)}>
                        <button type="submit" className={`w-full text-[10px] font-bold uppercase tracking-widest py-2 rounded-lg transition-all ${blog.deletedAt ? 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700' : 'bg-red-500/10 text-red-400 hover:bg-red-500/20'}`}>
                          {blog.deletedAt ? 'Restore' : 'Delete Entry'}
                        </button>
                      </form>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          }
        />
      </div>
    </div>
  );
}
