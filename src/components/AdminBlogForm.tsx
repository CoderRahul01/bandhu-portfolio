"use client";

import { useActionState, useState, useMemo } from "react";
import { createBlog } from "@/app/actions/admin";
import type { BlogActionState } from "@/app/actions/admin";
import dynamic from "next/dynamic";
import 'react-quill-new/dist/quill.snow.css';

const ReactQuill = dynamic(() => import("react-quill-new"), { 
  ssr: false,
  loading: () => <div className="h-64 w-full bg-zinc-950 animate-pulse rounded-lg border border-zinc-800" />
});

const initialBlogActionState: BlogActionState = {
  status: "idle",
  message: "",
};

export default function AdminBlogForm() {
  const [state, formAction] = useActionState(createBlog, initialBlogActionState);
  const [content, setContent] = useState("");

  const modules = useMemo(() => ({
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      ['link', 'image', 'clean'],
      [{ 'font': [] }],
      [{ 'align': [] }],
    ],
  }), []);

  return (
    <form action={formAction} className="flex flex-col gap-6 bg-zinc-900/50 p-8 rounded-2xl border border-zinc-800/50 backdrop-blur-sm">
      <div className="flex flex-col gap-2">
        <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Cover Image</label>
        <input type="file" name="coverImage" accept="image/*" className="text-[10px] file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-[10px] file:font-bold file:bg-zinc-800 file:text-zinc-300 hover:file:bg-zinc-700 cursor-pointer" />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Title</label>
        <input type="text" name="title" placeholder="A Day in the Life..." required className="bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-zinc-500 transition-all placeholder:text-zinc-700" />
      </div>

      <div className="flex flex-col gap-2 min-h-[400px]">
        <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Content</label>
        <div className="bg-zinc-950 rounded-lg border border-zinc-800 overflow-hidden">
          <ReactQuill 
            theme="snow" 
            value={content} 
            onChange={setContent} 
            modules={modules}
            className="text-zinc-200"
          />
        </div>
        <input type="hidden" name="body" value={content} />
      </div>

      <style jsx global>{`
        .ql-toolbar.ql-snow {
          border: none !important;
          border-bottom: 1px solid #27272a !important;
          background: #09090b !important;
        }
        .ql-container.ql-snow {
          border: none !important;
          min-height: 300px;
          font-family: inherit;
        }
        .ql-editor {
          font-size: 0.875rem;
          line-height: 1.6;
        }
        .ql-snow .ql-stroke {
          stroke: #71717a !important;
        }
        .ql-snow .ql-fill {
          fill: #71717a !important;
        }
        .ql-snow .ql-picker {
          color: #71717a !important;
        }
        .ql-snow .ql-picker-options {
          background-color: #09090b !important;
          border: 1px solid #27272a !important;
        }
        .ql-editor.ql-blank::before {
          color: #3f3f46 !important;
          font-style: normal !important;
        }
      `}</style>

      {state.status !== "idle" && (
        <p className={`rounded-lg border px-4 py-3 text-xs font-bold uppercase tracking-widest ${
            state.status === "success"
              ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
              : "border-red-500/30 bg-red-500/10 text-red-300"
          }`}
        >
          {state.message}
        </p>
      )}

      <button type="submit" className="bg-white text-black rounded-lg px-8 py-3.5 font-bold uppercase tracking-[0.2em] text-[10px] hover:bg-zinc-200 transition-all active:scale-95 shadow-xl shadow-white/5">
        Publish Entry
      </button>
    </form>
  );
}
