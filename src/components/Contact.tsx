"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Instagram, Mail, ArrowUpRight, X } from "lucide-react";

export default function Contact() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        shootType: "",
        date: "",
        location: "",
        duration: ""
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const subject = `Photography Inquiry: ${formData.shootType}`;
        const body = `Hi Priyanshu,%0D%0A%0D%0AI would like to inquire about your photography services for:%0D%0A%0D%0A- Shoot Type: ${formData.shootType}%0D%0A- Date: ${formData.date}%0D%0A- Location: ${formData.location}%0D%0A- Duration: ${formData.duration}%0D%0A%0D%0ALooking forward to discussing this project with you!`;

        window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=llprofileshotsll@gmail.com&su=${subject}&body=${body}`, '_blank');
        setIsModalOpen(false);
    };

    return (
        <section id="contact" className="py-24 sm:py-40 bg-black relative overflow-hidden">
            {/* Decorative background element */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[800px] aspect-square bg-white/[0.03] rounded-full blur-[120px] -z-0" />

            {/* Premium Quotation Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center px-6 bg-black/90 backdrop-blur-md"
                    >
                        <motion.div
                            initial={{ y: 50, opacity: 0, scale: 0.95 }}
                            animate={{ y: 0, opacity: 1, scale: 1 }}
                            exit={{ y: 50, opacity: 0, scale: 0.95 }}
                            className="w-full max-w-xl bg-white/[0.02] border border-white/10 p-10 sm:p-16 rounded-sm shadow-2xl relative overflow-hidden group"
                        >
                            {/* Subtle background flair */}
                            <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-white/[0.02] rounded-full blur-[80px] pointer-events-none" />

                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="absolute top-8 right-8 text-white/30 hover:text-white transition-colors"
                            >
                                <X size={24} />
                            </button>

                            <div className="space-y-10 relative z-10">
                                <div className="space-y-4">
                                    <p className="text-white/20 text-[10px] font-bold tracking-[0.5em] uppercase">Inquiry form</p>
                                    <h3 className="text-4xl sm:text-6xl font-bold tracking-tighter uppercase leading-none italic">Book <br /> Session.</h3>
                                </div>

                                <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                                    <div className="space-y-2">
                                        <label className="text-[10px] text-white/20 font-bold uppercase tracking-widest pl-1">Shoot Type</label>
                                        <input
                                            type="text"
                                            required
                                            placeholder="e.g. Portrait, Wedding"
                                            className="w-full bg-transparent border-b border-white/10 text-white pb-2 text-sm focus:outline-none focus:border-white transition-colors placeholder:text-white/10"
                                            value={formData.shootType}
                                            onChange={(e) => setFormData({ ...formData, shootType: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] text-white/20 font-bold uppercase tracking-widest pl-1">Date</label>
                                        <input
                                            type="text"
                                            required
                                            placeholder="Preferred Date"
                                            className="w-full bg-transparent border-b border-white/10 text-white pb-2 text-sm focus:outline-none focus:border-white transition-colors placeholder:text-white/10"
                                            value={formData.date}
                                            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] text-white/20 font-bold uppercase tracking-widest pl-1">Location</label>
                                        <input
                                            type="text"
                                            required
                                            placeholder="City / Venue"
                                            className="w-full bg-transparent border-b border-white/10 text-white pb-2 text-sm focus:outline-none focus:border-white transition-colors placeholder:text-white/10"
                                            value={formData.location}
                                            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] text-white/20 font-bold uppercase tracking-widest pl-1">Duration</label>
                                        <input
                                            type="text"
                                            required
                                            placeholder="e.g. 4 Hours"
                                            className="w-full bg-transparent border-b border-white/10 text-white pb-2 text-sm focus:outline-none focus:border-white transition-colors placeholder:text-white/10"
                                            value={formData.duration}
                                            onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                                        />
                                    </div>

                                    <div className="sm:col-span-2 pt-6">
                                        <button
                                            type="submit"
                                            className="w-full bg-white text-black font-bold uppercase tracking-[0.2em] text-[10px] py-6 hover:bg-neutral-200 transition-all flex items-center justify-center group"
                                        >
                                            Generate Quotation <ArrowUpRight size={14} className="ml-2 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

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

                    <motion.button
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        onClick={() => setIsModalOpen(true)}
                        className="flex flex-col items-center justify-center p-10 sm:p-14 bg-white/[0.02] border border-white/5 hover:border-white/10 hover:bg-white/[0.03] transition-all group rounded-sm w-full"
                    >
                        <Mail size={40} className="text-white/20 group-hover:text-white transition-colors mb-6" />
                        <div className="text-center space-y-2">
                            <p className="text-[10px] text-white/20 font-bold uppercase tracking-widest">Inquiry</p>
                            <p className="text-base font-medium flex items-center justify-center">
                                Get Quotation <ArrowUpRight size={14} className="ml-1 opacity-20 group-hover:opacity-100 transition-opacity" />
                            </p>
                        </div>
                    </motion.button>
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
