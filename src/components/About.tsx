"use client";

import { motion } from "framer-motion";

export default function About() {
    return (
        <section id="about" className="py-32 bg-neutral-950">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1 }}
                    viewport={{ once: true }}
                    className="relative aspect-[4/5] overflow-hidden"
                >
                    <img
                        src="https://images.unsplash.com/photo-1554080353-a576cf803bda?q=80&w=687&auto=format&fit=crop"
                        alt="Priyanshu Bandhu"
                        className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                    />
                    <div className="absolute inset-0 border-[20px] border-black/20 pointer-events-none" />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1 }}
                    viewport={{ once: true }}
                    className="space-y-8"
                >
                    <div className="space-y-2">
                        <p className="text-accent text-sm font-bold tracking-[0.3em] uppercase">The Visionary</p>
                        <h2 className="text-5xl md:text-6xl font-bold tracking-tight">Priyanshu Bandhu</h2>
                    </div>

                    <div className="space-y-6 text-white/60 text-lg leading-relaxed font-light">
                        <p>
                            Under the name <span className="text-white font-medium">Profileshots</span>, I seek to bridge the gap between human emotion and the frozen frame. Every click is a search for truth within the chaos of the streets and the quietude of nature.
                        </p>
                        <p>
                            Based out of India, my work is a dedication to the craft of storytelling through light. I don't just take pictures; I capture moments that would otherwise be lost to time.
                        </p>
                    </div>

                    <div className="pt-6 grid grid-cols-2 gap-8 text-center md:text-left">
                        <div>
                            <p className="text-white text-3xl font-bold">5+</p>
                            <p className="text-white/40 text-xs uppercase tracking-widest font-bold">Years Experience</p>
                        </div>
                        <div>
                            <p className="text-white text-3xl font-bold">500+</p>
                            <p className="text-white/40 text-xs uppercase tracking-widest font-bold">Projects Shot</p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
