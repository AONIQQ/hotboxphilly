"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./ui/button";
import Image from "next/image";

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 flex justify-center ${scrolled ? "pt-4" : "pt-6"
                }`}
        >
            <div
                className={`relative transition-all duration-300 flex justify-between items-center px-6 md:px-8
            ${scrolled
                        ? "w-[95%] md:w-[90%] max-w-6xl bg-brand-card/90 backdrop-blur-md border border-white/10 rounded-sm py-4 shadow-xl"
                        : "w-full max-w-7xl bg-transparent py-6"
                    }
        `}
            >
                <Link href="/" className="flex items-center gap-3">
                    <div className="relative w-32 h-12 md:w-48 md:h-16">
                        <Image
                            src="/logo.webp"
                            alt="Hot Box Philly Logo"
                            fill
                            className="object-contain object-left"
                            priority
                        />
                    </div>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-8">
                    <NavLink href="#about">About</NavLink>
                    <NavLink href="#services">Services</NavLink>
                    <NavLink href="#process">Process</NavLink>
                    <Button variant="default" size={scrolled ? "sm" : "default"} onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
                        Get Started
                    </Button>
                </nav>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden z-50 text-white"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>

                {/* Mobile Nav Overlay */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -20, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -20, scale: 0.95 }}
                            className="absolute top-16 left-0 right-0 mx-4 p-6 bg-brand-card/95 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl flex flex-col items-center gap-6 md:hidden overflow-hidden"
                        >
                            <NavLink href="#about" onClick={() => setIsOpen(false)}>About</NavLink>
                            <NavLink href="#services" onClick={() => setIsOpen(false)}>Services</NavLink>
                            <NavLink href="#process" onClick={() => setIsOpen(false)}>Process</NavLink>
                            <Button variant="default" className="w-full" onClick={() => { setIsOpen(false); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}>
                                Get Started
                            </Button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </header>
    );
}

function NavLink({ href, children, onClick }: { href: string; children: React.ReactNode; onClick?: () => void }) {
    return (
        <Link
            href={href}
            onClick={onClick}
            className="text-white/80 hover:text-brand-red font-medium tracking-wide transition-colors uppercase text-sm"
        >
            {children}
        </Link>
    );
}
