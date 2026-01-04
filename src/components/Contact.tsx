"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Instagram, Mail, ArrowUpRight } from "lucide-react";

export default function Contact() {
    return (
        <section id="contact" className="py-24 sm:py-40 bg-black relative overflow-hidden">
            {/* Decorative background element */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[800px] aspect-square bg-white/[0.03] rounded-full blur-[120px] -z-0" />

            <div className="max-w-4xl mx-auto px-6 relative z-10 text-center space-y-20 lg:space-y-32">
                <div className="space-y-6">
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="text-white/20 text-[10px] font-bold tracking-[0.5em] uppercase"
                    >
                        Get In Touch
                    </motion.p>
                    <h2 className="text-5xl sm:text-8xl font-bold tracking-tighter uppercase leading-[0.85] italic">Let's <br /> Create.</h2>
                    <p className="text-white/30 text-sm sm:text-base max-w-sm mx-auto font-light leading-relaxed">
                        Ready to capture your next project? Secure your date and let's tell a story together.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-10">
                    <motion.a
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        href="https://www.instagram.com/_profileshots_?igsh=MWJ1bGl3bjZmZGI4YQ=="
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col items-center justify-center p-10 sm:p-14 bg-white/[0.02] border border-white/5 hover:border-white/10 hover:bg-white/[0.03] transition-all group rounded-sm"
                    >
                        <Instagram size={40} className="text-white/20 group-hover:text-white transition-colors mb-6" />
                        <div className="text-center space-y-2">
                            <p className="text-[10px] text-white/20 font-bold uppercase tracking-widest">Connect</p>
                            <p className="text-base font-medium flex items-center justify-center">
                                Instagram <ArrowUpRight size={14} className="ml-1 opacity-20 group-hover:opacity-100 transition-opacity" />
                            </p>
                        </div>
                    </motion.a>

                    <motion.a
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        href="https://mail.google.com/mail/?view=cm&fs=1&to=llprofileshotsll@gmail.com&su=Photography%20Inquiry%20via%20llprofileshotsll&body=Hi%20Priyanshu%2C%0D%0A%0D%0AI%20love%20your%20work%20on%20llprofileshotsll%20and%20would%20like%20to%20discuss%20a%20potential%20photography%20project%20with%20you.%0D%0A%0D%0ABest%20regards%2C"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col items-center justify-center p-10 sm:p-14 bg-white/[0.02] border border-white/5 hover:border-white/10 hover:bg-white/[0.03] transition-all group rounded-sm w-full"
                    >
                        <Mail size={40} className="text-white/20 group-hover:text-white transition-colors mb-6" />
                        <div className="text-center space-y-2">
                            <p className="text-[10px] text-white/20 font-bold uppercase tracking-widest">Email</p>
                            <p className="text-base font-medium flex items-center justify-center">
                                Email Me <ArrowUpRight size={14} className="ml-1 opacity-20 group-hover:opacity-100 transition-opacity" />
                            </p>
                        </div>
                    </motion.a>
                </div>

                <div className="pt-10 flex flex-col items-center space-y-4">
                    <div className="w-12 h-[1px] bg-white/10" />
                    <p className="text-white/20 text-[10px] font-bold uppercase tracking-[0.5em]">Direct</p>
                    <p className="text-xl sm:text-2xl font-light tracking-[0.2em] text-white/60">+91 82075-97203</p>
                </div>
            </div>
        </section>
    );
}
