import Link from "next/link";
import { Instagram } from "lucide-react";

export function Footer() {
    return (
        <footer className="bg-brand-black border-t border-white/10 py-12">
            <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="text-center md:text-left">
                    <h3 className="font-heading text-2xl font-bold tracking-widest text-white mb-2">
                        HOTBOX<span className="text-brand-red">PHILLY</span>
                    </h3>
                    <p className="text-white/40 text-sm leading-relaxed max-w-xs">
                        Premium co-packing and manufacturing solutions. Scaling your vision from concept to shelf.
                    </p>
                </div>

                <div className="flex gap-6">
                    <Link href="https://www.instagram.com/hotboxphilly_/?hl=en" target="_blank" className="text-white/60 hover:text-brand-red transition-colors">
                        <Instagram size={24} />
                        <span className="sr-only">Instagram</span>
                    </Link>
                </div>

                <div className="text-white/40 text-xs">
                    &copy; {new Date().getFullYear()} Hot Box Philly. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
