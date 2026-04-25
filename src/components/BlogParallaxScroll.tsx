"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

type BlogPreview = {
  id: string;
  title: string;
  slug: string;
  coverImage: string | null;
  createdAt: Date;
  body: string;
};

function BlogCard({ blog, index, progress, total }: { blog: BlogPreview; index: number; progress: any; total: number }) {
  const start = index / total;
  const end = (index + 1) / total;
  
  // Animation mapping: 
  // 0 -> start: Invisible, scaled down
  // start -> mid: Visible, center
  // mid -> end: Slide right, fade out
  const opacity = useTransform(progress, [start - 0.1, start, end - 0.1, end], [0, 1, 1, 0]);
  const scale = useTransform(progress, [start - 0.1, start, end - 0.1, end], [0.8, 1, 1, 0.9]);
  const x = useTransform(progress, [start, end - 0.1, end], [0, 0, 400]);
  const rotate = useTransform(progress, [start, end - 0.1, end], [0, 0, 10]);

  const smoothOpacity = useSpring(opacity, { stiffness: 100, damping: 20 });
  const smoothScale = useSpring(scale, { stiffness: 100, damping: 20 });
  const smoothX = useSpring(x, { stiffness: 100, damping: 20 });
  const smoothRotate = useSpring(rotate, { stiffness: 100, damping: 20 });

  return (
    <motion.div
      style={{ 
        opacity: smoothOpacity, 
        scale: smoothScale, 
        x: smoothX,
        rotate: smoothRotate,
        zIndex: total - index 
      }}
      className="absolute inset-0 flex items-center justify-center p-6"
    >
      <Link href={`/blog/${blog.slug}`} className="group block w-full max-w-4xl bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden flex flex-col md:flex-row shadow-2xl shadow-black/50 hover:border-zinc-700 transition-all duration-500">
        {blog.coverImage && (
          <div className="w-full md:w-1/2 aspect-[4/3] md:aspect-auto relative overflow-hidden bg-zinc-950">
            <Image 
              src={blog.coverImage} 
              alt={blog.title} 
              fill
              className="object-cover transition-transform duration-1000 group-hover:scale-110"
            />
          </div>
        )}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center space-y-6 bg-gradient-to-br from-zinc-900 to-black">
          <div className="space-y-2">
            <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-[0.4em]">
              {new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </p>
            <h3 className="text-3xl sm:text-4xl font-bold tracking-tight text-white group-hover:text-white transition-colors leading-tight">
              {blog.title}
            </h3>
          </div>
          <p className="text-zinc-400 text-sm line-clamp-3 leading-relaxed font-light">
            {blog.body.replace(/<[^>]*>/g, '')}
          </p>
          <div className="flex items-center gap-4 pt-4">
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-white group-hover:tracking-[0.3em] transition-all duration-300">
              Read Entry
            </span>
            <div className="w-8 h-[1px] bg-white/20 group-hover:w-12 transition-all duration-300" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function BlogParallaxScroll({ blogs }: { blogs: BlogPreview[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  if (blogs.length === 0) return null;

  return (
    <section ref={containerRef} className="relative bg-black border-t border-white/5" style={{ height: `${(blogs.length + 1) * 100}vh` }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col">
        
        <div className="max-w-7xl mx-auto px-6 sm:px-12 w-full pt-24 relative z-20 pointer-events-none">
          <div className="flex flex-col md:flex-row md:items-end justify-between">
            <div className="space-y-4">
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="text-white/20 text-[10px] font-bold tracking-[0.6em] uppercase"
              >
                Journal
              </motion.p>
              <h2 className="text-5xl sm:text-8xl font-bold tracking-tighter uppercase leading-[0.8] text-white">The <br /> Archive</h2>
            </div>
            <Link href="/blog" className="mt-8 md:mt-0 text-[10px] font-bold tracking-[0.4em] uppercase text-white/40 hover:text-white transition-all border-b border-white/10 pb-2 pointer-events-auto active:scale-95">
              Explore All
            </Link>
          </div>
        </div>

        <div className="flex-1 relative mt-12">
          {blogs.map((blog, index) => (
            <BlogCard 
              key={blog.id} 
              blog={blog} 
              index={index} 
              progress={scrollYProgress} 
              total={blogs.length} 
            />
          ))}
        </div>

        {/* Scroll Progress Indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-4 z-20">
          <div className="text-[10px] font-mono text-zinc-600">01</div>
          <div className="w-32 h-[1px] bg-zinc-900 relative">
            <motion.div 
              style={{ scaleX: scrollYProgress }} 
              className="absolute inset-0 bg-white origin-left"
            />
          </div>
          <div className="text-[10px] font-mono text-zinc-600">0{blogs.length}</div>
        </div>
      </div>
    </section>
  );
}
