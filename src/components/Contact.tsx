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
import DateTimePicker from "./DateTimePicker";

export default function Contact() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        shootType: "",
        date: "",
        startTime: "",
        endTime: "",
        location: "",
        duration: "",
        manualTime: false,
        honeypot: ""
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Bot check
        if (formData.honeypot) {
            console.warn("Potential bot detected");
            return;
        }

        // Safe Mode Check
        const isTestMode = process.env.NEXT_PUBLIC_TEST_MODE === "true";
        if (isTestMode) {
            console.log("Safe Mode: Email would be sent with following data:", {
                to: "llprofileshotsll@gmail.com",
                subject: `Photography Inquiry: ${formData.shootType}`,
                body: `Shoot Type: ${formData.shootType}\nDate: ${formData.date}\nTime: ${formData.startTime} to ${formData.endTime}\nLocation: ${formData.location}`
            });
            alert("Safe Mode Enabled: Form submission logged to console (no email sent).");
            setIsModalOpen(false);
            return;
        }

        // Basic validation/sanitization
        const sanitize = (str: string) => str.replace(/[<>]/g, "").trim().substring(0, 100);
        const shootType = sanitize(formData.shootType);
        const date = sanitize(formData.date);
        const location = sanitize(formData.location);
        const duration = sanitize(formData.duration);

        if (!shootType || !date || !location || (!formData.duration && (!formData.startTime || !formData.endTime))) {
            alert("Please fill in all fields correctly (including date and duration or time).");
            return;
        }

        const subject = `Photography Inquiry: ${shootType}`;
        const timeInfo = formData.duration 
            ? `Duration: ${formData.duration === 'multi' ? 'Multi-day Project' : formData.duration}`
            : `Time: ${formData.startTime} to ${formData.endTime}`;
            
        const body = `Hi Priyanshu,%0D%0A%0D%0AI would like to inquire about your photography services for:%0D%0A%0D%0A- Shoot Type: ${shootType}%0D%0A- Date: ${date}%0D%0A- ${timeInfo}%0D%0A- Location: ${location}%0D%0A%0D%0ALooking forward to discussing this project with you!`;

        window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=llprofileshotsll@gmail.com&su=${subject}&body=${body}`, '_blank');
        setIsModalOpen(false);
    };

    const handleReset = () => {
        setFormData({
            ...formData,
            date: "",
            startTime: "",
            endTime: "",
            duration: ""
        });
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
                        <DialogContent className="sm:max-w-2xl bg-black/90 border-white/10 p-8 sm:p-14 rounded-sm shadow-[0_0_100px_-10px_rgba(255,255,255,0.08)] backdrop-blur-3xl overflow-hidden focus:outline-none antialiased">
                            {/* Subtle background flair - reduced intensity for clarity */}
                            <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-white/[0.005] rounded-full blur-[120px] pointer-events-none" />

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
                                        <SelectTrigger className="w-full bg-transparent border-t-0 border-x-0 border-b border-white/10 text-white/90 pb-3 text-sm rounded-none px-0 h-auto focus:ring-0 focus:border-white/40 transition-all hover:border-white/20">
                                            <SelectValue placeholder="Select Session" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-neutral-900 border border-white/10 text-white/90 shadow-2xl backdrop-blur-3xl p-1">
                                            <SelectItem value="Portrait Shoot" className="focus:bg-white/5 focus:text-white cursor-pointer py-3 transition-colors px-4 border-b border-white/[0.02] last:border-0">Portrait Shoot</SelectItem>
                                            <SelectItem value="Candid Shoot" className="focus:bg-white/5 focus:text-white cursor-pointer py-3 transition-colors px-4 border-b border-white/[0.02] last:border-0">Candid Shoot</SelectItem>
                                            <SelectItem value="Wedding Shoot" className="focus:bg-white/5 focus:text-white cursor-pointer py-3 transition-colors px-4 border-b border-white/[0.02] last:border-0">Wedding Shoot</SelectItem>
                                            <SelectItem value="Fashion Shoot" className="focus:bg-white/5 focus:text-white cursor-pointer py-3 transition-colors px-4 border-b border-white/[0.02] last:border-0">Fashion Shoot</SelectItem>
                                            <SelectItem value="Brand & Commercial Shoot" className="focus:bg-white/5 focus:text-white cursor-pointer py-3 transition-colors px-4">Brand & Commercial Shoot</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="sm:col-span-2 space-y-4 group/field">
                                    <div className="flex items-center justify-between">
                                        <Label className="text-[9px] text-white/30 font-bold uppercase tracking-[0.4em] pl-0.5 group-focus-within/field:text-white transition-colors">
                                            Schedule & Duration
                                        </Label>
                                        {(formData.date || formData.startTime || formData.endTime) && (
                                            <button 
                                                type="button"
                                                onClick={handleReset}
                                                className="text-[8px] text-white/20 hover:text-white font-bold uppercase tracking-widest transition-colors flex items-center gap-1.5 px-2 py-1 rounded-full border border-white/5 hover:border-white/20"
                                            >
                                                Clear Selection
                                            </button>
                                        )}
                                    </div>
                                    <DateTimePicker 
                                        date={formData.date}
                                        startTime={formData.startTime}
                                        endTime={formData.endTime}
                                        duration={formData.duration}
                                        onChange={(data) => setFormData({ ...formData, ...data })}
                                        onClear={handleReset}
                                    />
                                </div>

                                <div className="sm:col-span-2 space-y-4 group/field">
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
                                <div className="sm:col-span-2 pt-16 flex flex-col items-center gap-10">
                                    <Button
                                        type="submit"
                                        className="w-full bg-white text-black font-bold uppercase tracking-[0.5em] text-[10px] py-12 hover:bg-neutral-200 transition-all flex items-center justify-center group rounded-sm h-auto shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden active:scale-[0.98]"
                                    >
                                        <span className="relative z-10 flex items-center">
                                            Initiate Dialogue <ArrowUpRight size={14} className="ml-3 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                                        </span>
                                    </Button>
                                    <div className="flex flex-col items-center gap-3 opacity-30 hover:opacity-100 transition-opacity duration-700">
                                        <div className="w-8 h-[1px] bg-white/20" />
                                        <p className="text-[8px] font-bold tracking-[0.8em] uppercase text-white/60">Reserved 2024</p>
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
