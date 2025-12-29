"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CATEGORIES = ["ALL", "PORTRAITS", "EVENTS", "STREET"];

const IMAGES = [
    { id: 1, category: "PORTRAITS", url: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=687&auto=format&fit=crop", title: "Soul" },
    { id: 2, category: "PORTRAITS", url: "https://images.unsplash.com/photo-1605369527339-b9d97a61250b?q=80&w=687&auto=format&fit=crop", title: "Raw" },
    { id: 3, category: "EVENTS", url: "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=2070&auto=format&fit=crop", title: "Connection" },
    { id: 4, category: "STREET", url: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=2013&auto=format&fit=crop", title: "Neon" },
    { id: 5, category: "PORTRAITS", url: "https://images.unsplash.com/photo-1531746020798-e795c5399c5c?q=80&w=764&auto=format&fit=crop", title: "Perspective" },
    { id: 6, category: "EVENTS", url: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2070&auto=format&fit=crop", title: "Energy" },
    { id: 7, category: "STREET", url: "https://images.unsplash.com/photo-1449156001437-37c645dce501?q=80&w=2070&auto=format&fit=crop", title: "Cobblestone" },
    { id: 8, category: "PORTRAITS", url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=687&auto=format&fit=crop", title: "Gaze" },
    { id: 9, category: "STREET", url: "https://images.unsplash.com/photo-1493397212122-2b85def8d0b0?q=80&w=2070&auto=format&fit=crop", title: "Modernist" },
];

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
                                <div className="overflow-hidden aspect-[3/4] bg-neutral-900 rounded-sm">
                                    <img
                                        src={image.url}
                                        alt={image.title}
                                        className="w-full h-full object-cover transition-transform duration-1000 scale-[1.01] group-hover:scale-105"
                                        loading="lazy"
                                    />
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
