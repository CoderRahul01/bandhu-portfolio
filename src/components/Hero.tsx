"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function Hero() {
    return (
        <section className="relative h-screen flex items-center justify-center overflow-hidden bg-black">
            {/* Premium Background with Next.js Image Optimization */}
            <div className="absolute inset-0 z-0">
                <motion.div
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="relative w-full h-full"
                >
                    <Image
                        src="https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=2070&auto=format&fit=crop"
                        alt="Photography Hero Background"
                        fill
                        priority
                        className="object-cover brightness-[0.35] contrast-[1.1]"
                        sizes="100vw"
                    />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black" />
                <div className="absolute inset-0 opacity-[0.1]"
                    style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "30px 30px" }} />
            </div>

            <div className="relative z-10 text-center px-6 max-w-5xl">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="inline-block px-4 py-1.5 border border-white/10 bg-white/5 backdrop-blur-md rounded-full mb-8"
                >
                    <p className="text-white/60 text-[10px] sm:text-xs font-bold tracking-[0.4em] uppercase">
                        Priyanshu Bandhu Presents
                    </p>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="mb-10 leading-[0.9] font-display"
                >
                    <span className="text-white font-bold tracking-tighter text-5xl sm:text-7xl lg:text-9xl">Sculpting</span>{" "}
                    <span className="text-4xl sm:text-6xl lg:text-8xl font-normal italic text-white/50">light.</span>
                    <br />
                    <span className="text-4xl sm:text-6xl lg:text-8xl font-normal italic text-white/50">Crafting</span>{" "}
                    <span className="text-white font-bold tracking-tighter text-5xl sm:text-7xl lg:text-9xl">silence.</span>
                </motion.h1>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.8 }}
                    className="flex flex-col items-center gap-6 mt-12"
                >
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
                        <a
                            href="#portfolio"
                            className="w-full sm:w-auto px-12 py-4 bg-white text-black text-[10px] font-bold tracking-[0.2em] uppercase hover:bg-neutral-200 transition-all rounded-sm"
                        >
                            View Collection
                        </a>
                        <a
                            href="#contact"
                            className="w-full sm:w-auto px-12 py-4 border border-white/20 text-white text-[10px] font-bold tracking-[0.2em] uppercase hover:bg-white/10 transition-all rounded-sm"
                        >
                            Begin Dialogue
                        </a>
                    </div>
                    <p className="text-white/30 text-[10px] tracking-widest uppercase">
                        Photographer based in India.
                    </p>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute bottom-12 left-1/2 -translate-x-1/2 text-white/20"
            >
                <div className="w-[1px] h-16 bg-gradient-to-b from-white to-transparent mx-auto" />
            </motion.div>
        </section>
    );
}
