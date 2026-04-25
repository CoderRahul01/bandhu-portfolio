"use client";
import { useState } from "react";

export default function AdminTabs({ galleryContent, blogContent }: { galleryContent: React.ReactNode, blogContent: React.ReactNode }) {
  const [activeTab, setActiveTab] = useState<'gallery' | 'blog'>('gallery');

  return (
    <div className="space-y-8">
      <div className="flex border-b border-zinc-800 overflow-x-auto no-scrollbar">
        <button 
          onClick={() => setActiveTab('gallery')}
          className={`px-8 py-4 text-[10px] font-bold uppercase tracking-[0.2em] whitespace-nowrap transition-all border-b-2 ${activeTab === 'gallery' ? 'border-white text-white' : 'border-transparent text-zinc-500 hover:text-zinc-300'}`}
        >
          Gallery & Videos
        </button>
        <button 
          onClick={() => setActiveTab('blog')}
          className={`px-8 py-4 text-[10px] font-bold uppercase tracking-[0.2em] whitespace-nowrap transition-all border-b-2 ${activeTab === 'blog' ? 'border-white text-white' : 'border-transparent text-zinc-500 hover:text-zinc-300'}`}
        >
          Blog Journal
        </button>
      </div>

      <div className="transition-all duration-500">
        {activeTab === 'gallery' ? galleryContent : blogContent}
      </div>
    </div>
  );
}
