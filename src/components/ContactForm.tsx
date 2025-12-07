"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Send, CheckCircle, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

export function ContactForm() {
    const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

    // We can't easily prevent default and use fetch for formsubmit.co if we want to use their free tier without CAPTCHA issues sometimes, 
    // but the user pasted a standard HTML form snippet. 
    // To make it look "premium" but use their backend, we can use a standard form submit 
    // or use fetch if we handle the response correctly. 
    // For reliability with formsubmit.co without configuration, a standard form submission is safest, 
    // but it redirects. We can add `type="hidden" name="_next"` to redirect back.
    // Or we can try fetch. Let's use a standard form but styled beautifully.

    return (
        <div className="w-full max-w-xl mx-auto glass-panel p-8 md:p-12 rounded-2xl bg-brand-card border border-white/5 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 left-0 w-full h-1 bg-brand-red" />

            <h3 className="font-heading text-3xl font-bold mb-2 text-white">Get in Touch</h3>
            <p className="text-white/50 mb-8">Ready to scale? Send us a message.</p>

            <form
                action="https://formsubmit.co/info@hotboxphilly.com"
                method="POST"
                className="space-y-6"
            >
                {/* Honeypot for spam */}
                <input type="text" name="_honey" className="hidden" />
                {/* Disable Captcha for cleaner look (optional, might need paid plan or simple captcha) - removing for now to be safe */}
                {/* <input type="hidden" name="_captcha" value="false" /> */}
                {/* Redirect to same page or a thank you page */}
                <input type="hidden" name="_next" value="https://hotboxphilly.com/thanks" />
                {/* Since we don't know the domain for sure in dev, maybe just let it show their thank you page, or use a relative path if supported? 
                   Standard formsubmit shows a generic success page if _next isn't set. 
                   I'll omit _next for now to ensure it works in dev (localhost). 
                */}

                <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-white/70 uppercase tracking-wider">Name</label>
                    <input
                        type="text"
                        name="name"
                        required
                        className="w-full bg-white/5 border border-white/10 rounded-sm px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-brand-red/50 focus:bg-white/10 transition-all"
                        placeholder="John Doe"
                    />
                </div>

                <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-white/70 uppercase tracking-wider">Email</label>
                    <input
                        type="email"
                        name="email"
                        required
                        className="w-full bg-white/5 border border-white/10 rounded-sm px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-brand-red/50 focus:bg-white/10 transition-all"
                        placeholder="john@example.com"
                    />
                </div>

                <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium text-white/70 uppercase tracking-wider">Message</label>
                    <textarea
                        name="message"
                        required
                        rows={4}
                        className="w-full bg-white/5 border border-white/10 rounded-sm px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-brand-red/50 focus:bg-white/10 transition-all resize-none"
                        placeholder="Tell us about your product and scaling needs..."
                    />
                </div>

                <Button type="submit" size="lg" className="w-full rounded-sm text-lg gap-2 group">
                    Send Message
                </Button>
            </form>
        </div>
    );
}
