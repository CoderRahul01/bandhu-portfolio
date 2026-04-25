"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

type GalleryImage = {
  id: string;
  url: string;
  type: string;
  description: string | null;
};

const cloudinaryLoader = ({ src, width, quality }: { src: string; width: number; quality?: number }) => {
    const params = [
        `w_${width}`,
        'c_limit',
        `q_${quality || 'auto'}`,
        'f_auto'
    ].join(',');
    return src.replace('/upload/', `/upload/${params}/`);
};

function ImageComponent({ url, title, priority = false }: { url: string; title: string; priority?: boolean }) {
    const [isLoaded, setIsLoaded] = useState(false);

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

export default function PhotoGallery({ images }: { images: GalleryImage[] }) {
    const [activeCategory, setActiveCategory] = useState("ALL");

    // Extract unique categories from DB, make them uppercase
    const categories = ["ALL", ...Array.from(new Set(images.map(img => img.type.toUpperCase())))];

    const filteredImages = activeCategory === "ALL"
        ? images
        : images.filter(img => img.type.toUpperCase() === activeCategory);

    return (
        <section className="py-24 sm:py-40 bg-black min-h-screen">
            <div className="max-w-7xl mx-auto px-6 sm:px-12">
                <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-20 space-y-12 lg:space-y-0 text-center lg:text-left">
                    <div className="space-y-4 max-w-xl">
                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            className="text-white/20 text-[10px] font-bold tracking-[0.6em] uppercase"
                        >
                            Full Archive
                        </motion.p>
                        <h2 className="text-4xl sm:text-7xl font-bold tracking-tighter uppercase leading-[0.85]">Photo <br /> Gallery</h2>
                        <p className="text-white/30 text-xs sm:text-sm font-light max-w-xs mx-auto lg:mx-0">
                            A complete archive of professional works spanning across various types and domains.
                        </p>
                    </div>

                    <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-[10px] font-bold tracking-[0.3em] uppercase">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`relative pb-2 transition-all group ${activeCategory === cat ? "text-white" : "text-white/30 hover:text-white"
                                    }`}
                            >
                                {cat}
                                {activeCategory === cat && (
                                    <motion.div
                                        layoutId="underlineGallery"
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
                        {filteredImages.map((image, index) => (
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
                                    <ImageComponent
                                        url={image.url}
                                        title={image.description || "Gallery Image"}
                                        priority={index < 3}
                                    />
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>
        </section>
    );
}
