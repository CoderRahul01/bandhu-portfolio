"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const CATEGORIES = ["ALL", "PORTRAITS", "WEDDING", "STREET"];

// Cloudinary loader for optimized delivery
const cloudinaryLoader = ({ src, width, quality }: { src: string; width: number; quality?: number }) => {
    // Cloudinary's auto-optimization and auto-format are better for performance
    const params = [
        `w_${width}`,
        'c_limit',
        `q_${quality || 'auto'}`,
        'f_auto'
    ].join(',');
    return src.replace('/upload/', `/upload/${params}/`);
};

function MediaComponent({ url, title, mediaType, priority = false }: { url: string; title: string; mediaType: string; priority?: boolean }) {
    const [isLoaded, setIsLoaded] = useState(false);

    if (mediaType === 'video') {
        return (
            <div className="w-full h-full relative group/video">
                <video
                    src={url}
                    className="w-full h-full object-cover rounded-sm"
                    muted
                    loop
                    playsInline
                    onMouseOver={(e) => (e.target as HTMLVideoElement).play()}
                    onMouseOut={(e) => {
                        const v = e.target as HTMLVideoElement;
                        v.pause();
                        v.currentTime = 0;
                    }}
                />
                <div className="absolute top-4 right-4 z-20">
                    <div className="bg-black/50 backdrop-blur-md p-2 rounded-full border border-white/10">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <>
            {!isLoaded && (
                <div className="absolute inset-0 bg-neutral-900 animate-pulse flex items-center justify-center">
                    <div className="w-8 h-8 border-2 border-white/5 border-t-white/20 rounded-full animate-spin" />
                </div>
            )}
            <div className={`w-full h-full relative transition-opacity duration-300 ${isLoaded ? "opacity-100" : "opacity-0"}`}>
                <Image
                    loader={cloudinaryLoader}
                    src={url}
                    alt={title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover select-none touch-none pointer-events-auto group-hover:scale-105 transition-transform duration-1000"
                    onLoad={() => setIsLoaded(true)}
                    priority={priority}
                />
                <div
                    className="absolute inset-0 z-10"
                    onContextMenu={(e) => e.preventDefault()}
                    onDragStart={(e) => e.preventDefault()}
                />
            </div>
        </>
    );
}

import Link from "next/link";

export default function Gallery({ images }: { images: { id: string; url: string; title: string; type: string; mediaType: string; }[] }) {
    const [activeCategory, setActiveCategory] = useState("ALL");

    const filteredImages = activeCategory === "ALL"
        ? images
        : images.filter(img => img.type.toUpperCase() === activeCategory);

    const displayedImages = filteredImages.slice(0, 6);
    const hasMore = filteredImages.length > 6;

    return (
        <section id="portfolio" className="py-24 sm:py-40 bg-black border-y border-white/5">
            <div className="max-w-7xl mx-auto px-6 sm:px-12">
                <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-20 space-y-12 lg:space-y-0 text-center lg:text-left">
                    <div className="space-y-4 max-w-xl">
                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            className="text-white/20 text-[10px] font-bold tracking-[0.6em] uppercase"
                        >
                            Selection
                        </motion.p>
                        <h2 className="text-4xl sm:text-7xl font-bold tracking-tighter uppercase leading-[0.85]">Selected <br /> Works</h2>
                        <p className="text-white/30 text-xs sm:text-sm font-light max-w-xs mx-auto lg:mx-0">
                            A curated collection across three distinct domains of photography.
                        </p>
                    </div>

                    <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-[10px] font-bold tracking-[0.3em] uppercase">
                        {CATEGORIES.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`relative pb-2 transition-all group ${activeCategory === cat ? "text-white" : "text-white/30 hover:text-white"
                                    }`}
                            >
                                {cat}
                                {activeCategory === cat && (
                                    <motion.div
                                        layoutId="underline"
                                        className="absolute -bottom-1 left-0 right-0 h-[2px] bg-white opacity-50"
                                    />
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                <motion.div
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 sm:gap-20"
                >
                    <AnimatePresence mode="popLayout">
                        {displayedImages.map((image, index) => (
                            <motion.div
                                key={image.id}
                                layout
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.6 }}
                                viewport={{ once: true }}
                                className="group relative"
                            >
                                <div className="overflow-hidden aspect-[3/4] bg-neutral-900 rounded-sm relative">
                                    <MediaComponent
                                        url={image.url}
                                        title={image.title}
                                        mediaType={image.mediaType}
                                        priority={index < 3}
                                    />
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                {hasMore && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="mt-24 flex justify-center"
                    >
                        <Link 
                            href={`/gallery?category=${activeCategory.toLowerCase()}`}
                            className="group flex flex-col items-center gap-4 text-white/40 hover:text-white transition-colors"
                        >
                            <span className="text-[10px] font-bold tracking-[0.4em] uppercase">View Full Gallery</span>
                            <div className="w-12 h-[1px] bg-white/20 group-hover:w-20 transition-all duration-500" />
                        </Link>
                    </motion.div>
                )}
            </div>
        </section>
    );
}
