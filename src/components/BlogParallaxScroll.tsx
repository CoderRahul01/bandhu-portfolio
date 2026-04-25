"use client";

import { useRef } from "react";
import { motion, useScroll } from "framer-motion";
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

export default function BlogParallaxScroll({ blogs }: { blogs: BlogPreview[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });



  return (
    <section ref={containerRef} className="py-24 sm:py-40 bg-black relative overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 relative z-10">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20">
          <div className="space-y-4 max-w-xl">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-white/20 text-[10px] font-bold tracking-[0.6em] uppercase"
            >
              Latest Thoughts
            </motion.p>
            <h2 className="text-4xl sm:text-7xl font-bold tracking-tighter uppercase leading-[0.85]">The <br /> Journal</h2>
          </div>
          <Link href="/blog" className="mt-8 md:mt-0 text-xs font-bold tracking-[0.2em] uppercase text-white/50 hover:text-white transition-colors border-b border-white/20 pb-1 inline-block w-max">
            Read All Entries
          </Link>
        </div>

        <div className="relative flex flex-col items-center">
          {blogs.map((blog, index) => {
            // Create an alternating left-to-right effect
            const isEven = index % 2 === 0;
            const xOffset = isEven ? -50 : 50;
            
            return (
              <motion.div
                key={blog.id}
                initial={{ opacity: 0, x: xOffset, scale: 0.9 }}
                whileInView={{ opacity: 1, x: 0, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="w-full max-w-4xl group relative z-10 mb-16 last:mb-0"
              >
                <Link href={`/blog/${blog.slug}`} className="block relative bg-neutral-900 border border-white/5 group-hover:border-white/20 transition-colors rounded-sm overflow-hidden flex flex-col md:flex-row">
                  {blog.coverImage && (
                    <div className="w-full md:w-1/2 aspect-[4/3] md:aspect-auto relative overflow-hidden">
                      <Image 
                        src={blog.coverImage} 
                        alt={blog.title} 
                        fill
                        className="object-cover transition-transform duration-1000 group-hover:scale-105"
                      />
                    </div>
                  )}
                  <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center space-y-4">
                    <p className="text-white/40 text-xs font-mono tracking-wider">
                      {new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </p>
                    <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white/90 group-hover:text-white transition-colors">
                      {blog.title}
                    </h3>
                    <p className="text-white/50 text-sm line-clamp-3 leading-relaxed">
                      {blog.body}
                    </p>
                    <span className="text-xs font-bold tracking-[0.2em] uppercase text-white/30 group-hover:text-white/70 transition-colors pt-4 inline-block">
                      Read Entry →
                    </span>
                  </div>
                </Link>
              </motion.div>
            );
          })}

          {blogs.length === 0 && (
            <div className="text-center py-20 text-white/30">
              No entries published yet.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
