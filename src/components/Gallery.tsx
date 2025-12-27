"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CATEGORIES = ["ALL", "PORTRAITS", "NATURE", "STREETS"];

const IMAGES = [
    { id: 1, category: "PORTRAITS", url: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=687&auto=format&fit=crop", title: "Soul" },
    { id: 2, category: "NATURE", url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2070&auto=format&fit=crop", title: "Mist" },
    { id: 3, category: "STREETS", url: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=2013&auto=format&fit=crop", title: "Neon" },
    { id: 4, category: "PORTRAITS", url: "https://images.unsplash.com/photo-1531746020798-e795c5399c5c?q=80&w=764&auto=format&fit=crop", title: "Perspective" },
    { id: 5, category: "NATURE", url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2071&auto=format&fit=crop", title: "Deep Forest" },
    { id: 6, category: "STREETS", url: "https://images.unsplash.com/photo-1449156001437-37c645dce501?q=80&w=2070&auto=format&fit=crop", title: "Cobblestone" },
    { id: 7, category: "PORTRAITS", url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=687&auto=format&fit=crop", title: "Gaze" },
    { id: 8, category: "NATURE", url: "https://images.unsplash.com/photo-1501854140801-50d01698950b?q=80&w=1950&auto=format&fit=crop", title: "Horizon" },
    { id: 9, category: "STREETS", url: "https://images.unsplash.com/photo-1493397212122-2b85def8d0b0?q=80&w=2070&auto=format&fit=crop", title: "Modernist" },
];

export default function Gallery() {
    const [activeCategory, setActiveCategory] = useState("ALL");

    const filteredImages = activeCategory === "ALL"
        ? IMAGES
        : IMAGES.filter(img => img.category === activeCategory);

    return (
        <section id="portfolio" className="py-24 bg-black">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 space-y-6 md:space-y-0 text-center md:text-left">
                    <div className="space-y-2">
                        <h2 className="text-4xl font-bold tracking-tight uppercase">Featured Work</h2>
                        <div className="h-1 w-20 bg-white mx-auto md:mx-0" />
                    </div>

                    <div className="flex flex-wrap justify-center gap-4 text-xs font-bold tracking-widest uppercase">
                        {CATEGORIES.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`pb-1 transition-all ${activeCategory === cat
                                        ? "text-white border-b-2 border-white"
                                        : "text-white/40 border-b-2 border-transparent hover:text-white/70"
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                <motion.div
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    <AnimatePresence mode="popLayout">
                        {filteredImages.map((image) => (
                            <motion.div
                                key={image.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.5 }}
                                className="group relative aspect-[3/4] overflow-hidden bg-neutral-900"
                            >
                                <img
                                    src={image.url}
                                    alt={image.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    loading="lazy"
                                />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
                                    <div className="space-y-1">
                                        <p className="text-xs text-accent font-bold tracking-widest uppercase">{image.category}</p>
                                        <h3 className="text-xl font-medium tracking-tight">{image.title}</h3>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>
        </section>
    );
}
