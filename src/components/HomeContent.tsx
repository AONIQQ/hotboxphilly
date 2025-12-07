"use client";
import { motion, useScroll, useTransform, Variants } from "framer-motion";
import { useState } from "react";
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

const introCopy = [
    "The hot sauce category is growing fast worldwide, and new brands are launching every day. But many of those brands hit the same wall: big co-packers won't take them seriously, minimums are huge, and communication is slow.",
    "HotBox exists to be the partner those brands wish they'd had from day one.",
    "Because we've built and scaled our own sauce brands, we understand the realities on both sides of the table. We've invested in a facility, team, and processes designed specifically to give growing brands consistent, high-quality manufacturing and the support they need to scale."
];

const reasons = [
    {
        title: "Flexible minimums and order sizes",
        paragraphs: [
            "Most large co-packers set high minimum order quantities that lock smaller, experimenting, and emerging brands out. We built HotBox to do the opposite.",
            "We can run smaller batches for test launches, seasonal flavors, and first production runs.",
            "As your brand grows, we scale production with you so you never have to switch co-packers mid-flight.",
            "This flexibility lets us work with early-stage brands and established companies that want to trial new product lines without committing to massive volume."
        ]
    },
    {
        title: "Fast, reliable lead times",
        paragraphs: [
            "Long, unpredictable lead times are one of the biggest complaints brands have about co-packers. We've built our operation around speed and reliability.",
            "Streamlined production and tight supply-chain management keep your timelines as short as possible.",
            "A hands-on, owner-operator team means we take deadlines personally and do what it takes to hit them - even if it means pulling an all-nighter in the kitchen.",
            "Transparent schedules and regular updates mean you always know where your production stands."
        ]
    },
    {
        title: "Direct, responsive communication",
        paragraphs: [
            "We treat communication as a core part of manufacturing, not an afterthought.",
            "You get direct access to the team actually making your product - no annoying, inefficient bureaucracy.",
            "We aim to respond to emails and messages quickly so you're never stuck wondering what's going on.",
            "Every client, regardless of order size, gets treated with the same respect. Many of our long-term relationships began with a small first batch that a bigger co-packer wouldn't take seriously."
        ]
    },
    {
        title: "Customization without compromise",
        paragraphs: [
            "Big co-packers often push brands into rigid, boilerplate systems that make their life easier, but limit your quality control and creativity.",
            "We go the other way:"
        ],
        bullets: [
            "Flexible packaging, labeling, and formulation options so your sauce looks and tastes the way you want.",
            "Willingness to tweak heat levels, viscosity, salinity, sweetness, and whatever's needed to get your recipe right.",
            "Ability to support unique or specialty ingredients, not just standard industrial formulations."
        ],
        closing: "Our job is to bring your vision to life, not force it into a template."
    },
    {
        title: "Obsessive quality control & food safety",
        paragraphs: [
            "Consistency is everything when your name is on the bottle.",
            "Rigorous quality control processes at every stage of production.",
            "Transparency about how we cook, fill, and test your product - so you know exactly what's happening in the facility.",
            "Close relationships with key suppliers to keep things like flavor and heat levels consistent from batch to batch (for example, managing pepper sourcing so heat doesn't swing wildly from harvest to harvest).",
            "Fully licensed and inspected facility with FDA registration and relevant state and city manufacturing and distribution permits. This makes sure you are in a strong position to sell and scale.",
            "We treat every sauce we make as if our own brand were on the label."
        ]
    },
    {
        title: "Built-in R&D and product development support",
        paragraphs: [
            "Many co-packers will only run whatever you hand them. We actively help make your product better.",
            "Support with developing new flavors from scratch or scaling a home or restaurant recipe to production.",
            "Cost-optimization help - finding smart substitutions or process tweaks that can reduce your cost per bottle without sacrificing taste.",
            "On-site test days where you join us in the kitchen while we experiment, cook, taste, and refine in real time. (These are fun)",
            "We love being able to call a client and say, \"We just figured out how to improve your margins,\" without you even having to ask. Sometimes simply onboarding multiple clients who all need the same ingredient unlocks volume-driven savings for everyone."
        ]
    },
    {
        title: "One-stop launch and compliance support",
        paragraphs: [
            "Getting a sauce retail-ready involves more than just cooking it. We help you handle the unsexy but critical pieces too.",
            "HotBox can support you with:"
        ],
        bullets: [
            "Lab testing and shelf-stability work",
            "FDA registration and process authority letters",
            "NDAs to protect your intellectual property - we can provide trusted legal referrals to effective lawyers who've helped us and our clients.",
            "Label design, FDA-compliant label reviews, barcodes, and product photography"
        ],
        closing: "That means fewer vendors to juggle and a smoother path from idea to on the shelf."
    },
    {
        title: "Scalable capacity as you grow",
        paragraphs: [
            "We've optimized our process to handle many types of sauces efficiently today, and we continue to invest in equipment and technology that increase throughput while preserving small-shop attention to detail.",
            "Practically, that means:"
        ],
        bullets: [
            "You can start with small runs and confidently ramp up volume without outgrowing us. We'll always be straightforward about limitations so we can strategize effectively as a team.",
            "As you scale into regional or national distribution, we can adapt production schedules and capacity around that growth.",
            "You get big-co-packer capability with small-team care."
        ]
    },
    {
        title: "Transparent, partnership-oriented pricing",
        paragraphs: [
            "We keep pricing simple, competitive, and easy to understand.",
            "Clear quotes before we produce - no surprise line items - ever.",
            "Volume discounts for larger runs and long-term relationships.",
            "Guidance on how different packaging, formulations, and batch sizes will impact your per-bottle margin so you can make the right decisions for your brand.",
            "Our goal is to help you build a sustainable, smooth, profitable product line, not just to sell you a one-off production run."
        ]
    },
    {
        title: "People you actually want to work with",
        paragraphs: [
            "HotBox is a community-rooted, owner-operated business with deep ties to Philadelphia's food scene and chambers of commerce. We've grown by caring about our clients' success as much as our own.",
            "We invite you into the facility to see your product being made.",
            "We celebrate your launches, wins, and milestones alongside you.",
            "We're in this for the long-term relationship, not a quick transaction."
        ]
    }
];

export function HomeContent() {
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 500], [0, 200]);
    const y2 = useTransform(scrollY, [0, 500], [0, -100]);
    const [activeIndex, setActiveIndex] = useState(0);
    const activeReason = reasons[activeIndex];
    const totalReasons = reasons.length;
    const progress = ((activeIndex + 1) / totalReasons) * 100;

    const handlePrev = () => setActiveIndex((prev) => (prev - 1 + totalReasons) % totalReasons);
    const handleNext = () => setActiveIndex((prev) => (prev + 1) % totalReasons);

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

            {/* Why HotBox Section */}
            <section className="py-32 bg-brand-card/10 border-y border-white/5 relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute -left-20 top-0 w-80 h-80 bg-brand-red/25 blur-3xl" />
                    <div className="absolute right-[-10%] bottom-[-10%] w-96 h-96 bg-white/10 blur-3xl" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.05),transparent_35%),radial-gradient(circle_at_80%_30%,rgba(255,60,60,0.07),transparent_35%),linear-gradient(120deg,rgba(255,255,255,0.03),transparent_45%)]" />
                </div>

                <div className="container mx-auto px-6 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-80px" }}
                        transition={{ duration: 0.8 }}
                        className="max-w-5xl mx-auto text-center mb-16 space-y-6"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-white/70 text-sm uppercase tracking-[0.25em]">
                            <span className="w-2 h-2 rounded-full bg-brand-red animate-pulse" />
                            Built for modern sauce brands
                        </div>
                        <h2 className="font-heading text-4xl md:text-6xl font-bold text-white tracking-tight leading-tight">
                            Why brands choose HotBox as their hot sauce co-packer
                        </h2>
                        <div className="space-y-4 text-white/70 text-lg leading-relaxed max-w-4xl mx-auto">
                            {introCopy.map((copy, idx) => (
                                <p key={idx}>{copy}</p>
                            ))}
                        </div>
                    </motion.div>

                    <div className="grid md:grid-cols-12 gap-6 lg:gap-10 items-start">
                        <div className="md:col-span-5 space-y-3 md:sticky md:top-28">
                            {reasons.map((reason, index) => {
                                const isActive = index === activeIndex;
                                return (
                                    <motion.button
                                        key={reason.title}
                                        type="button"
                                        onClick={() => setActiveIndex(index)}
                                        variants={fadeInUp}
                                        initial="hidden"
                                        whileInView="visible"
                                        viewport={{ once: true, margin: "-60px" }}
                                        className={`w-full text-left rounded-xl border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-brand-red/50 ${
                                            isActive
                                                ? "border-brand-red/70 bg-brand-card shadow-[0_20px_60px_-30px_rgba(255,60,60,0.8)] translate-y-0"
                                                : "border-white/5 bg-brand-card/40 hover:border-white/20 hover:bg-brand-card/70 hover:-translate-y-0.5"
                                        }`}
                                        style={{ transformOrigin: "left center" }}
                                    >
                                        <div className="flex items-start gap-4 p-4 md:p-5">
                                            <div className={`w-11 h-11 rounded-lg flex items-center justify-center font-heading font-bold text-lg tracking-tight ${
                                                isActive ? "bg-brand-red text-white shadow-lg shadow-brand-red/40" : "bg-white/5 text-white/70"
                                            }`}>
                                                {String(index + 1).padStart(2, "0")}
                                            </div>
                                            <div className="space-y-1">
                                                <p className="font-heading text-lg md:text-xl text-white">{reason.title}</p>
                                                <p className="text-white/60 text-sm md:text-base leading-relaxed">
                                                    {reason.paragraphs[0]}
                                                </p>
                                            </div>
                                        </div>
                                        {isActive && <div className="h-1 w-full bg-gradient-to-r from-brand-red via-brand-red/60 to-transparent" />}
                                    </motion.button>
                                );
                            })}

                            <div className="flex items-center justify-between gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={handlePrev}
                                    className="flex-1 px-4 py-3 rounded-lg border border-white/10 bg-white/5 text-white/80 hover:border-white/30 hover:bg-white/10 transition"
                                >
                                    Previous
                                </button>
                                <button
                                    type="button"
                                    onClick={handleNext}
                                    className="flex-1 px-4 py-3 rounded-lg border border-brand-red/40 bg-brand-red/80 text-white font-semibold hover:brightness-110 transition"
                                >
                                    Next
                                </button>
                            </div>
                        </div>

                        <motion.div
                            key={activeReason.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                            className="md:col-span-7 glass-panel rounded-2xl p-8 md:p-10 bg-brand-card border border-white/10 shadow-2xl relative overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-brand-red/12 via-transparent to-white/6 pointer-events-none" />
                            <div className="absolute -top-10 -right-16 w-64 h-64 bg-brand-red/10 blur-3xl pointer-events-none" />
                            <div className="relative z-10 space-y-6">
                                <div className="flex flex-wrap items-center gap-3 text-xs md:text-sm uppercase tracking-[0.2em] text-white/60">
                                    <span className="px-3 py-1 rounded-full border border-white/10 bg-white/5">HotBox Edge</span>
                                    <span>{String(activeIndex + 1).padStart(2, "0")} / {String(totalReasons).padStart(2, "0")}</span>
                                    <span className="hidden sm:inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5">
                                        Tap or click cards to explore
                                    </span>
                                </div>

                                <div className="w-full h-1.5 rounded-full bg-white/5 overflow-hidden">
                                    <div className="h-full bg-gradient-to-r from-brand-red via-brand-red/70 to-white" style={{ width: `${progress}%` }} />
                                </div>

                                <div className="space-y-4">
                                    <h3 className="font-heading text-2xl md:text-3xl font-bold text-white">
                                        {activeReason.title}
                                    </h3>
                                    <div className="space-y-3 text-white/70 text-lg leading-relaxed">
                                        {activeReason.paragraphs.map((text, i) => (
                                            <p key={`${activeReason.title}-p-${i}`}>{text}</p>
                                        ))}
                                        {activeReason.bullets && (
                                            <ul className="list-disc pl-5 space-y-2 marker:text-brand-red">
                                                {activeReason.bullets.map((bullet, i) => (
                                                    <li key={`${activeReason.title}-b-${i}`} className="text-white/70">
                                                        {bullet}
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                        {activeReason.closing && <p>{activeReason.closing}</p>}
                                    </div>
                                </div>
                            </div>
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
