"use client";
import { motion, useScroll, useTransform, Variants } from "framer-motion";
import { Button } from "./ui/button";
import { ServiceCard } from "./ServiceCard";
import { ContactForm } from "./ContactForm";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

// Animation variants
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.2 }
    }
};

const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }
    }
};

export function HomeContent() {
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 500], [0, 200]);
    const y2 = useTransform(scrollY, [0, 500], [0, -100]);

    return (
        <div className="flex flex-col min-h-screen overflow-hidden">

            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center justify-center pt-20">
                {/* Background Effects */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                    {/* Subtle technical grid instead of blobs */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,black,transparent)]" />
                </div>

                <div className="container relative z-10 px-6 text-center">
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="mb-12 relative w-64 h-64 md:w-80 md:h-80 mx-auto"
                    >
                        <Image
                            src="/logo.webp"
                            alt="Hot Box Philly Logo"
                            fill
                            className="object-contain drop-shadow-xl relative z-10"
                            priority
                        />
                    </motion.div>

                    <motion.h1
                        initial="hidden"
                        animate="visible"
                        variants={fadeInUp}
                        className="font-heading text-5xl md:text-8xl font-bold uppercase tracking-tight mb-6 text-white leading-tight"
                    >
                        Scaling Your <br className="md:hidden" /> <span className="text-white">Culinary Vision</span>
                    </motion.h1>

                    <motion.p
                        initial="hidden"
                        animate="visible"
                        variants={fadeInUp}
                        className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto mb-12 font-sans font-light tracking-wide"
                    >
                        Premium co-packing and manufacturing for sauces, dressings, <br className="hidden md:block" /> and acidified foods. From concept to shelf.
                    </motion.p>

                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={fadeInUp}
                        className="flex flex-col md:flex-row gap-4 justify-center items-center"
                    >
                        <Button size="lg" className="text-lg px-12 rounded-sm" onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}>
                            Our Process
                        </Button>
                        <Button variant="outline" size="lg" className="text-lg px-8 rounded-sm border-white/10 hover:bg-white/5" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
                            Contact Us <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                    </motion.div>
                </div>
            </section>

            {/* Trusted By Ticker */}
            <div className="w-full bg-brand-card border-y border-white/5 py-16 overflow-hidden relative z-20">
                <div className="container mx-auto px-6">
                    <div className="flex items-center justify-center gap-6 mb-12 opacity-80">
                        <div className="h-px w-12 md:w-24 bg-gradient-to-r from-transparent to-brand-red/50" />
                        <span className="text-brand-red font-heading font-bold text-xl md:text-2xl uppercase tracking-[0.2em]">Trusted By</span>
                        <div className="h-px w-12 md:w-24 bg-gradient-to-l from-transparent to-brand-red/50" />
                    </div>
                    <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 cursor-pointer">
                        <div className="relative w-24 h-24 md:w-32 md:h-32 hover:scale-105 transition-transform duration-300">
                            <Image src="/trustedby/FAIYA_PEPPER_DIE_CUT_STICKER_copy.webp" alt="Faiya" fill className="object-contain" />
                        </div>
                        <div className="relative w-24 h-24 md:w-32 md:h-32 hover:scale-105 transition-transform duration-300">
                            <Image src="/trustedby/WeakSauce_Logo.avif" alt="Weak Sauce" fill className="object-contain" />
                        </div>
                        <div className="relative w-24 h-24 md:w-32 md:h-32 hover:scale-105 transition-transform duration-300">
                            <Image src="/trustedby/picklemonster.jpg" alt="Pickle Monster" fill className="object-contain mix-blend-screen" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Intro Section */}
            <section id="about" className="py-32 relative z-10">
                <div className="container mx-auto px-6">
                    <div className="max-w-4xl mx-auto" >
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8 }}
                            className="glass-panel rounded-2xl p-12 md:p-20 text-center relative overflow-hidden bg-brand-card"
                        >
                            <div className="absolute top-0 left-0 w-full h-1 bg-brand-red opacity-80" />

                            <h2 className="font-heading text-3xl md:text-5xl font-bold mb-8 relative z-10 uppercase tracking-wide">
                                <span className="text-white/40">The Evolution of</span> <br />
                                <span className="text-white">Food Manufacturing</span>
                            </h2>
                            <div className="w-16 h-1 bg-white/10 mx-auto mb-8" />
                            <p className="text-xl md:text-2xl text-white/70 leading-relaxed font-light relative z-10 max-w-3xl mx-auto text-justify">
                                We understand the journey from small batches to mass market.
                                <br /><br />
                                We utilize our deep industry experience to categorize and produce a diverse lineup of high-quality food products. We bring top-tier co-packing services to brands looking to scale without compromise.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Core Values */}
            <section className="py-24 border-y border-white/5 bg-brand-card/20">
                <div className="container mx-auto px-6">
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-8"
                    >
                        <ServiceCard
                            index={1}
                            title="R&D Innovation & Process Optimization"
                            description="From new flavor development to formulation improvements. Join us in the kitchen to test, taste, and refine your culinary creations in real-time."
                        />
                        <ServiceCard
                            index={2}
                            title="Quality Assurance"
                            description="Rigorous quality control meets open communication. We work with you to master each variable and ensure your product consistency is maintained as you scale."
                        />
                        <ServiceCard
                            index={3}
                            title="Flexible Scaling"
                            description="We assist brands at every stage. With batches as small as 25 gallons, we help you bring your vision to life without the barriers of prohibitive minimums."
                        />
                    </motion.div>
                </div>
            </section>

            {/* Detailed Services */}
            <section id="services" className="py-32 relative">
                <div className="container mx-auto px-6 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-20"
                    >
                        <h2 className="font-heading text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight">One Partner, <span className="text-brand-red">Endless Possibilities</span></h2>
                        <p className="text-white/50 max-w-2xl mx-auto text-lg">Comprehensive manufacturing solutions designed for scalability.</p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="p-10 card-3d glass-panel rounded-2xl h-full flex flex-col items-start border border-white/5 hover:border-brand-red/30 bg-brand-card shadow-lg relative overflow-hidden">
                                <div className="absolute -right-10 -top-10 w-40 h-40 bg-brand-red/5 rounded-full blur-3xl pointer-events-none" />
                                <h3 className="font-heading text-3xl font-bold mb-6">Manufacturing & R&D</h3>
                                <ul className="space-y-4 w-full relative z-10">
                                    {["Recipe Development & Scaling", "Process Authority & FDA Compliance", "Acidified Foods Certification", "Cost-effective Small Batch Runs", "Diverse Packaging Options"].map((item, i) => (
                                        <li key={i} className="flex items-center gap-4 text-white/70 p-3 rounded-xl hover:bg-white/5 transition-colors border-b border-white/5 last:border-0">
                                            <div className="w-1.5 h-1.5 rounded-full bg-brand-red" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="p-10 card-3d glass-panel rounded-2xl h-full flex flex-col items-start border border-white/5 hover:border-white/20 bg-brand-card shadow-lg relative overflow-hidden">
                                <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/5 rounded-full blur-3xl pointer-events-none" />
                                <h3 className="font-heading text-3xl font-bold mb-6">Brand Consulting</h3>
                                <ul className="space-y-4 w-full relative z-10">
                                    {["Label Design & Compliance", "Barcode Generation (GS1)", "Product Photography", "Market Strategy Consulting", "Supply Chain Optimization"].map((item, i) => (
                                        <li key={i} className="flex items-center gap-4 text-white/70 p-3 rounded-xl hover:bg-white/5 transition-colors border-b border-white/5 last:border-0">
                                            <div className="w-1.5 h-1.5 rounded-full bg-white" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="mt-20 mx-auto max-w-4xl"
                    >
                        <div className="glass-panel rounded-2xl p-12 flex flex-col md:flex-row items-center gap-10 text-center md:text-left bg-brand-card border border-brand-red/20 shadow-xl relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-1 h-full bg-brand-red" />
                            <div>
                                <h3 className="font-heading text-3xl font-bold mb-2">More than a manufacturer</h3>
                                <p className="text-white/60 text-lg">
                                    At HotBox Philly, we are partners in your growth. Experience our transparency and expertise firsthand.
                                </p>
                            </div>
                            <Button size="lg" className="shrink-0 md:ml-auto rounded-xl border-white/10" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
                                Partner With Us
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* CTA Section */}
            <section id="contact" className="py-32 relative overflow-hidden flex flex-col items-center justify-center border-t border-white/5">
                <div className="container relative z-10 px-6">
                    <div className="text-center mb-16">
                        <h2 className="font-heading text-5xl md:text-8xl font-bold text-white mb-6 opacity-90">
                            READY TO <br /> SCALE YOUR BRAND?
                        </h2>
                        <p className="text-xl text-white/50 max-w-2xl mx-auto">
                            Let's discuss how we can help you manufacture and grow.
                        </p>
                    </div>

                    <ContactForm />
                </div>
            </section>

        </div>
    );
}
