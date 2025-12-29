"use client";

import { motion } from "framer-motion";

export default function About() {
    return (
        <section id="about" className="py-24 sm:py-40 bg-black border-b border-white/5">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    viewport={{ once: true }}
                    className="relative order-2 lg:order-1"
                >
                    <div className="aspect-[3/4] overflow-hidden rounded-sm grayscale">
                        <img
                            src="https://images.unsplash.com/photo-1554080353-a576cf803bda?q=80&w=687&auto=format&fit=crop"
                            alt="Priyanshu Bandhu"
                            className="w-full h-full object-cover transition-all duration-1000 scale-105 hover:scale-100"
                        />
                    </div>
                    <div className="absolute top-8 left-8 w-24 h-24 border-t border-l border-white/20 -translate-x-12 -translate-y-12 hidden lg:block" />
                    <div className="absolute bottom-8 right-8 w-24 h-24 border-b border-r border-white/20 translate-x-12 translate-y-12 hidden lg:block" />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="space-y-10 order-1 lg:order-2 text-center lg:text-left"
                >
                    <div className="space-y-4">
                        <span className="text-white/20 text-[10px] font-bold tracking-[0.5em] uppercase">The Visionary</span>
                        <h2 className="text-4xl sm:text-7xl font-bold tracking-tighter leading-[0.9] uppercase">Priyanshu <br /> Bandhu</h2>
                        <p className="text-white/40 text-[10px] sm:text-xs font-medium tracking-widest uppercase pt-2">
                            Photography journey since 2018 | Professional work since 2021
                        </p>
                    </div>

                    <div className="space-y-6 text-white/40 text-sm sm:text-base leading-relaxed max-w-md mx-auto lg:mx-0">
                        <p>
                            Under the name <span className="text-white">Profileshots</span>, I focus on creating honest portraits and candid moments that feel natural and unforced.
                        </p>
                        <p>
                            My approach is simple — observe quietly, understand the person in front of the lens, and let real expressions emerge without interruption. I believe the strongest photographs are created when people are comfortable being themselves.
                        </p>
                        <p>
                            Based in India, my work revolves around portraits, events, and street moments, capturing emotion through light, timing, and authenticity. Every frame is an attempt to preserve a moment exactly as it felt.
                        </p>
                    </div>

                    <div className="pt-8 flex flex-col sm:flex-row gap-8 sm:gap-12 border-t border-white/5">
                        <div className="max-w-[200px]">
                            <p className="text-white/60 text-xs leading-relaxed font-medium">
                                Exploring photography since <span className="text-white">2018</span>, working professionally since <span className="text-white">2021</span>.
                            </p>
                        </div>
                        <div>
                            <p className="text-white text-3xl font-light tracking-tighter">300+</p>
                            <p className="text-white/20 text-[10px] uppercase tracking-widest font-bold">Portraits Delivered</p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
