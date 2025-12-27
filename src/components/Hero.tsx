"use client";

import { motion } from "framer-motion";

export default function Hero() {
    return (
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
            {/* Immersive Background */}
            <div className="absolute inset-0 z-0">
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-[10s] ease-linear scale-110"
                    style={{
                        backgroundImage: "url('https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=2070&auto=format&fit=crop')",
                        filter: "brightness(0.3)"
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black" />
            </div>

            <div className="relative z-10 text-center px-6">
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-accent text-sm md:text-base font-medium tracking-[0.4em] uppercase mb-4"
                >
                    Priyanshu Bandhu Presents
                </motion.p>

                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-5xl md:text-8xl font-bold tracking-tighter text-white mb-8"
                >
                    Capturing <br /> <span className="text-white/80 italic">Unspoken</span> Stories.
                </motion.h1>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.8 }}
                    className="flex flex-col md:flex-row items-center justify-center gap-6"
                >
                    <a
                        href="#portfolio"
                        className="px-8 py-3 bg-white text-black text-sm font-bold tracking-widest uppercase hover:bg-neutral-200 transition-colors"
                    >
                        Explore Work
                    </a>
                    <a
                        href="#contact"
                        className="px-8 py-3 border border-white/30 text-white text-sm font-bold tracking-widest uppercase hover:bg-white hover:text-black transition-all"
                    >
                        Get In Touch
                    </a>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/30"
            >
                <div className="w-[1px] h-12 bg-gradient-to-b from-white/30 to-transparent mx-auto" />
            </motion.div>
        </section>
    );
}
