"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CATEGORIES = ["ALL", "PORTRAITS", "WEDDING", "STREET"];

// UPDATE THESE COUNTS AS YOU ADD IMAGES TO THE PUBLIC FOLDERS
const IMAGE_COUNTS = {
    PORTRAITS: 4,
    WEDDING: 6,
    STREET: 6
};

const IMAGES = Object.entries(IMAGE_COUNTS).flatMap(([category, count]) =>
    Array.from({ length: count }).map((_, i) => ({
        id: `${category}-${i + 1}`,
        category,
        url: `/${category}/${i + 1}.jpg`, // Expects images like /public/WEDDING/1.jpg
        title: `${category.charAt(0)}${category.slice(1).toLowerCase()} ${i + 1}`
    }))
);

function ImageComponent({ url, title }: { url: string; title: string }) {
    const [isLoaded, setIsLoaded] = useState(false);

    return (
        <>
            {!isLoaded && (
                <div className="absolute inset-0 bg-neutral-900 animate-pulse flex items-center justify-center">
                    <div className="w-8 h-8 border-2 border-white/5 border-t-white/20 rounded-full animate-spin" />
                </div>
            )}
            <img
                src={url}
                alt={title}
                className={`w-full h-full object-cover transition-all duration-1000 scale-[1.01] group-hover:scale-105 select-none touch-none pointer-events-auto ${isLoaded ? "opacity-100" : "opacity-0"
                    }`}
                loading="lazy"
                onLoad={() => setIsLoaded(true)}
                onContextMenu={(e) => e.preventDefault()}
                onDragStart={(e) => e.preventDefault()}
            />
        </>
    );
}

export default function Gallery() {
    const [activeCategory, setActiveCategory] = useState("ALL");

    const filteredImages = activeCategory === "ALL"
        ? IMAGES
        : IMAGES.filter(img => img.category === activeCategory);

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
                        {filteredImages.map((image) => (
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
                                    <ImageComponent url={image.url} title={image.title} />
                                </div>
                                <div className="mt-8 flex justify-between items-end">
                                    <div className="space-y-1">
                                        <p className="text-[10px] text-white/20 font-bold tracking-widest uppercase">{image.category}</p>
                                        <h3 className="text-sm font-medium tracking-wide text-white/80">{image.title}</h3>
                                    </div>
                                    <div className="w-10 h-[1px] bg-white/10 mb-2" />
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>
        </section>
    );
}
