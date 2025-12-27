"use client";

import { motion } from "framer-motion";
import { Instagram, Mail, ArrowUpRight } from "lucide-react";

export default function Contact() {
    return (
        <section id="contact" className="py-32 bg-black relative overflow-hidden">
            {/* Decorative background element */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/[0.02] rounded-full blur-3xl -z-0" />

            <div className="max-w-4xl mx-auto px-6 relative z-10 text-center space-y-16">
                <div className="space-y-4">
                    <h2 className="text-5xl md:text-7xl font-bold tracking-tight uppercase italic">Let's Create.</h2>
                    <p className="text-white/40 text-lg max-w-xl mx-auto">
                        Ready to capture your next project? Get in touch for collaborations, bookings, or just a chat about photography.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <a
                        href="https://www.instagram.com/_profileshots_?igsh=MWJ1bGl3bjZmZGI4YQ=="
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-8 bg-neutral-900/50 border border-white/5 hover:border-white/20 transition-all group"
                    >
                        <div className="flex items-center space-x-4">
                            <div className="p-4 bg-white/5 rounded-full group-hover:bg-white/10 transition-colors">
                                <Instagram size={32} />
                            </div>
                            <div className="text-left">
                                <p className="text-xs text-white/40 font-bold uppercase tracking-widest">Connect on</p>
                                <p className="text-xl font-medium">Instagram</p>
                            </div>
                        </div>
                        <ArrowUpRight className="text-white/20 group-hover:text-white transition-colors" />
                    </a>

                    <a
                        href="mailto:llprofileshotsll@gmail.com"
                        className="flex items-center justify-between p-8 bg-neutral-900/50 border border-white/5 hover:border-white/20 transition-all group"
                    >
                        <div className="flex items-center space-x-4">
                            <div className="p-4 bg-white/5 rounded-full group-hover:bg-white/10 transition-colors">
                                <Mail size={32} />
                            </div>
                            <div className="text-left">
                                <p className="text-xs text-white/40 font-bold uppercase tracking-widest">Send an</p>
                                <p className="text-xl font-medium">Email</p>
                            </div>
                        </div>
                        <ArrowUpRight className="text-white/20 group-hover:text-white transition-colors" />
                    </a>
                </div>

                <div className="pt-10">
                    <p className="text-white/20 text-xs font-bold uppercase tracking-[0.5em] mb-4">Secondary Contact</p>
                    <p className="text-2xl font-light tracking-widest">+91 82075-97203</p>
                </div>
            </div>
        </section>
    );
}
