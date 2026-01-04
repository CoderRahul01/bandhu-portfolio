"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Instagram, Mail } from "lucide-react";
import { useState, useEffect } from "react";

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            <motion.nav
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                    ? "bg-black/90 backdrop-blur-xl py-4 border-b border-white/5"
                    : "bg-transparent py-6 sm:py-8"
                    }`}
            >
                <div className="max-w-7xl mx-auto px-6 sm:px-12 flex justify-between items-center">
                    <Link
                        href="/"
                        className="text-lg sm:text-xl font-bold tracking-[0.3em] text-white hover:text-white/70 transition-colors"
                    >
                        llprofileshotsll
                    </Link>

                    {/* Desktop Links */}
                    <div className="hidden md:flex items-center space-x-12 text-[10px] font-bold tracking-[0.3em]">
                        <Link href="#portfolio" className="text-white/40 hover:text-white transition-colors uppercase">Portfolio</Link>
                        <Link href="#about" className="text-white/40 hover:text-white transition-colors uppercase">About</Link>
                        <Link href="#contact" className="text-white/40 hover:text-white transition-colors uppercase">Contact</Link>
                    </div>

                    <div className="flex items-center space-x-6 sm:space-x-8">
                        <a
                            href="https://www.instagram.com/_profileshots_?igsh=MWJ1bGl3bjZmZGI4YQ=="
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white/40 hover:text-white transition-colors"
                            aria-label="Instagram"
                        >
                            <Instagram size={18} />
                        </a>
                        <Link
                            href="#contact"
                            className="bg-white text-black px-6 py-2 rounded-sm hover:bg-neutral-200 transition-all uppercase tracking-widest text-[8px] font-bold"
                        >
                            Request Quote
                        </Link>
                        <button
                            className="md:hidden text-white/60 hover:text-white transition-colors pl-2"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[60] bg-black flex flex-col items-center justify-center p-6"
                    >
                        <button
                            className="absolute top-8 right-8 text-white/40 hover:text-white transition-colors"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            <X size={32} />
                        </button>

                        <div className="flex flex-col items-center space-y-12">
                            <Link
                                href="#portfolio"
                                className="text-4xl sm:text-5xl font-bold tracking-tighter uppercase"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Work
                            </Link>
                            <Link
                                href="#about"
                                className="text-4xl sm:text-5xl font-bold tracking-tighter uppercase"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Story
                            </Link>
                            <Link
                                href="#contact"
                                className="text-4xl sm:text-5xl font-bold tracking-tighter uppercase"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Contact
                            </Link>
                        </div>

                        <div className="absolute bottom-16 flex space-x-12">
                            <a href="https://www.instagram.com/_profileshots_?igsh=MWJ1bGl3bjZmZGI4YQ==" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white">
                                <Instagram size={28} />
                            </a>
                            <a
                                href="https://mail.google.com/mail/?view=cm&fs=1&to=llprofileshotsll@gmail.com&su=Photography%20Inquiry%20via%20llprofileshotsll&body=Hi%20Priyanshu%2C%0D%0A%0D%0AI%20love%20your%20work%20on%20llprofileshotsll%20and%20would%20like%20to%20discuss%20a%20potential%20photography%20project%20with%20you.%0D%0A%0D%0ABest%20regards%2C"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-white/40 hover:text-white"
                            >
                                <svg
                                    viewBox="0 0 24 24"
                                    className="w-[28px] h-[28px]"
                                    fill="currentColor"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                                </svg>
                            </a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
