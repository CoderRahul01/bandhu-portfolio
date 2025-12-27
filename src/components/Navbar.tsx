"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Instagram, Mail } from "lucide-react";
import { useState, useEffect } from "react";

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                    ? "bg-black/80 backdrop-blur-md py-4 border-b border-white/10"
                    : "bg-transparent py-6"
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
                <Link
                    href="/"
                    className="text-xl font-bold tracking-widest text-white hover:text-accent transition-colors"
                >
                    PROFILESHOTS
                </Link>

                <div className="hidden md:flex items-center space-x-10 text-sm font-medium tracking-wide">
                    <Link href="#portfolio" className="text-white/70 hover:text-white transition-colors">PORTFOLIO</Link>
                    <Link href="#about" className="text-white/70 hover:text-white transition-colors">ABOUT</Link>
                    <Link href="#contact" className="text-white/70 hover:text-white transition-colors">CONTACT</Link>
                </div>

                <div className="flex items-center space-x-5">
                    <a
                        href="https://www.instagram.com/_profileshots_?igsh=MWJ1bGl3bjZmZGI4YQ=="
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white/70 hover:text-white transition-colors"
                        aria-label="Instagram"
                    >
                        <Instagram size={20} />
                    </a>
                    <a
                        href="mailto:llprofileshotsll@gmail.com"
                        className="text-white/70 hover:text-white transition-colors"
                        aria-label="Email"
                    >
                        <Mail size={20} />
                    </a>
                </div>
            </div>
        </motion.nav>
    );
}
