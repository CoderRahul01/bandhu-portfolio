"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Instagram, Mail, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export default function Contact() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        shootType: "",
        date: "",
        location: "",
        duration: "",
        honeypot: "" // Hidden field for bot detection
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Bot check
        if (formData.honeypot) {
            console.warn("Potential bot detected");
            return;
        }

        // Basic validation/sanitization
        const sanitize = (str: string) => str.replace(/[<>]/g, "").trim().substring(0, 100);
        const shootType = sanitize(formData.shootType);
        const date = sanitize(formData.date);
        const location = sanitize(formData.location);
        const duration = sanitize(formData.duration);

        if (!shootType || !date || !location || !duration) {
            alert("Please fill in all fields correctly.");
            return;
        }

        const subject = `Photography Inquiry: ${shootType}`;
        const body = `Hi Priyanshu,%0D%0A%0D%0AI would like to inquire about your photography services for:%0D%0A%0D%0A- Shoot Type: ${shootType}%0D%0A- Date: ${date}%0D%0A- Location: ${location}%0D%0A- Duration: ${duration}%0D%0A%0D%0ALooking forward to discussing this project with you!`;

        window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=llprofileshotsll@gmail.com&su=${subject}&body=${body}`, '_blank');
        setIsModalOpen(false);
    };

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
                    <h2 className="text-5xl sm:text-8xl font-bold tracking-tighter uppercase leading-[0.85] italic font-display">Let's <br /> Create.</h2>
                    <p className="text-white/30 text-sm sm:text-base max-w-sm mx-auto font-light leading-relaxed">
                        Ready to document your next chapter? Reserve your date and let's craft a narrative together.
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

                    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                        <DialogTrigger asChild>
                            <motion.button
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 }}
                                className="flex flex-col items-center justify-center p-10 sm:p-14 bg-white/[0.02] border border-white/5 hover:border-white/10 hover:bg-white/[0.03] transition-all group rounded-sm w-full"
                                aria-label="Request quotation"
                            >
                                <Mail size={40} className="text-white/20 group-hover:text-white transition-colors mb-6" />
                                <div className="text-center space-y-2">
                                    <p className="text-[10px] text-white/20 font-bold uppercase tracking-widest">Inquiry</p>
                                    <p className="text-base font-medium flex items-center justify-center">
                                        Request Quote <ArrowUpRight size={14} className="ml-1 opacity-20 group-hover:opacity-100 transition-opacity" />
                                    </p>
                                </div>
                            </motion.button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-xl bg-neutral-950/95 border-white/5 p-10 sm:p-16 rounded-sm shadow-[0_0_50px_-12px_rgba(255,255,255,0.1)] backdrop-blur-2xl overflow-hidden focus:outline-none">
                            {/* Subtle background flair */}
                            <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-white/[0.01] rounded-full blur-[100px] pointer-events-none" />

                            <DialogHeader className="space-y-4 relative z-10 text-left mb-2">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-[1px] bg-white/20" />
                                    <p className="text-white/40 text-[9px] font-bold tracking-[0.6em] uppercase">Private Inquiry</p>
                                </div>
                                <DialogTitle className="text-5xl sm:text-7xl font-bold tracking-tighter uppercase leading-[0.85] italic font-display text-white">
                                    Capture <br /> <span className="text-white/40">the</span> Void.
                                </DialogTitle>
                            </DialogHeader>

                            <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-12 relative z-10 mt-12">
                                <div className="space-y-4 group/field">
                                    <Label className="text-[9px] text-white/30 font-bold uppercase tracking-[0.4em] pl-0.5 group-focus-within/field:text-white transition-colors">
                                        Focus Area
                                    </Label>
                                    <Select
                                        required
                                        value={formData.shootType}
                                        onValueChange={(value) => setFormData({ ...formData, shootType: value })}
                                    >
                                        <SelectTrigger className="w-full bg-transparent border-t-0 border-x-0 border-b border-white/5 text-white/80 pb-3 text-sm rounded-none px-0 h-auto focus:ring-0 focus:border-white/40 transition-all hover:border-white/20">
                                            <SelectValue placeholder="Select Session" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-neutral-950 border-white/5 text-white/80 backdrop-blur-2xl">
                                            <SelectItem value="Portrait" className="focus:bg-white/5 focus:text-white cursor-pointer">Honest Portrait</SelectItem>
                                            <SelectItem value="Wedding" className="focus:bg-white/5 focus:text-white cursor-pointer">Candid Wedding</SelectItem>
                                            <SelectItem value="Street" className="focus:bg-white/5 focus:text-white cursor-pointer">Street Editorial</SelectItem>
                                            <SelectItem value="Commercial" className="focus:bg-white/5 focus:text-white cursor-pointer">Brand / Commercial</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-4 group/field">
                                    <Label className="text-[9px] text-white/30 font-bold uppercase tracking-[0.4em] pl-0.5 group-focus-within/field:text-white transition-colors">
                                        Reserved Date
                                    </Label>
                                    <Input
                                        type="date"
                                        required
                                        className="w-full bg-transparent border-t-0 border-x-0 border-b border-white/5 text-white/80 pb-3 text-sm rounded-none px-0 h-auto focus-visible:ring-0 focus-visible:border-white/40 transition-all hover:border-white/20 [color-scheme:dark]"
                                        value={formData.date}
                                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                    />
                                </div>

                                <div className="space-y-4 group/field">
                                    <Label className="text-[9px] text-white/30 font-bold uppercase tracking-[0.4em] pl-0.5 group-focus-within/field:text-white transition-colors">
                                        Venue / City
                                    </Label>
                                    <Input
                                        type="text"
                                        required
                                        placeholder="Location details"
                                        className="w-full bg-transparent border-t-0 border-x-0 border-b border-white/5 text-white/80 pb-3 text-sm rounded-none px-0 h-auto focus-visible:ring-0 focus-visible:border-white/40 transition-all hover:border-white/20 placeholder:text-white/5"
                                        value={formData.location}
                                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                    />
                                </div>

                                <div className="space-y-4 group/field">
                                    <Label className="text-[9px] text-white/30 font-bold uppercase tracking-[0.4em] pl-0.5 group-focus-within/field:text-white transition-colors">
                                        Time Frame
                                    </Label>
                                    <Select
                                        required
                                        value={formData.duration}
                                        onValueChange={(value) => setFormData({ ...formData, duration: value })}
                                    >
                                        <SelectTrigger className="w-full bg-transparent border-t-0 border-x-0 border-b border-white/5 text-white/80 pb-3 text-sm rounded-none px-0 h-auto focus:ring-0 focus:border-white/40 transition-all hover:border-white/20">
                                            <SelectValue placeholder="Session Length" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-neutral-950 border-white/5 text-white/80 backdrop-blur-2xl">
                                            <SelectItem value="2 Hours" className="focus:bg-white/5 focus:text-white cursor-pointer">2 Hours</SelectItem>
                                            <SelectItem value="4 Hours" className="focus:bg-white/5 focus:text-white cursor-pointer">4 Hours</SelectItem>
                                            <SelectItem value="Full Day" className="focus:bg-white/5 focus:text-white cursor-pointer">Full Day (8h)</SelectItem>
                                            <SelectItem value="Multi-day" className="focus:bg-white/5 focus:text-white cursor-pointer">Multi-day Project</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="hidden">
                                    <input
                                        type="text"
                                        name="honeypot"
                                        value={formData.honeypot}
                                        onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                                        tabIndex={-1}
                                        autoComplete="off"
                                    />
                                </div>
                                <div className="sm:col-span-2 pt-12 flex flex-col items-center gap-8">
                                    <Button
                                        type="submit"
                                        className="w-full bg-white text-black font-bold uppercase tracking-[0.5em] text-[10px] py-10 hover:bg-neutral-200 transition-all flex items-center justify-center group rounded-sm h-auto shadow-2xl relative overflow-hidden"
                                    >
                                        <span className="relative z-10 flex items-center">
                                            Initiate Dialogue <ArrowUpRight size={14} className="ml-3 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                                        </span>
                                    </Button>
                                    <div className="flex flex-col items-center gap-2 opacity-20 hover:opacity-100 transition-opacity duration-700">
                                        <div className="w-6 h-[1px] bg-white" />
                                        <p className="text-[8px] font-bold tracking-[0.8em] uppercase text-white">Reserved 2024</p>
                                    </div>
                                </div>
                            </form>
                        </DialogContent>
                    </Dialog>
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
