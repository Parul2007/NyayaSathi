import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Scale, Users, Zap, LogIn, Info, Gavel, FileText, ShieldCheck, BookOpen } from "lucide-react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

// Enhanced Magnetic Button with High Contrast
const MagneticButton: React.FC<{ children: React.ReactNode; className?: string; to?: string; primary?: boolean }> = ({ children, className = "", to, primary = false }) => {
    const btnRef = useRef<HTMLAnchorElement | HTMLButtonElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!btnRef.current) return;
        const { left, top, width, height } = btnRef.current.getBoundingClientRect();
        const x = e.clientX - (left + width / 2);
        const y = e.clientY - (top + height / 2);
        setPosition({ x: x * 0.15, y: y * 0.15 });
    };

    const handleMouseLeave = () => {
        setPosition({ x: 0, y: 0 });
    };

    const style = { transform: `translate(${position.x}px, ${position.y}px)` };

    const baseClasses = `relative overflow-hidden group px-10 py-5 rounded-full font-sans font-bold text-lg tracking-wide transition-all duration-300 ease-out flex items-center gap-3 ${className}`;
    const activeClasses = primary
        ? "bg-white text-black hover:bg-neutral-200 shadow-[0_0_30px_rgba(255,255,255,0.4)] hover:shadow-[0_0_50px_rgba(255,255,255,0.6)] hover:scale-105"
        : "bg-white/5 text-white border border-white/20 hover:bg-white/10 hover:border-white/50 backdrop-blur-md";

    const content = (
        <span className="relative z-10 flex items-center gap-2">{children}</span>
    );

    if (to) {
        return (
            <Link
                ref={btnRef as React.RefObject<HTMLAnchorElement>}
                to={to}
                className={`${baseClasses} ${activeClasses}`}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={style}
            >
                {content}
            </Link>
        );
    }

    return (
        <button
            ref={btnRef as React.RefObject<HTMLButtonElement>}
            className={`${baseClasses} ${activeClasses}`}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={style}
        >
            {content}
        </button>
    );
};

const ScalesOfJustice: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!containerRef.current) return;
            const x = (e.clientX / window.innerWidth - 0.5) * 15;
            const y = (e.clientY / window.innerHeight - 0.5) * 15;
            // Direct DOM manipulation for performance
            containerRef.current.style.transform = `rotateX(${-y}deg) rotateY(${x}deg)`;
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div ref={containerRef} className="flex-1 w-full h-[600px] flex items-center justify-center relative z-10 preserve-3d transition-transform duration-100 ease-out">
            <div className="w-6 h-[28rem] bg-gradient-to-r from-yellow-700 via-yellow-200 to-yellow-800 rounded-full shadow-[0_0_60px_rgba(212,175,55,0.3)] relative flex flex-col items-center">
                <div className="absolute -top-4 w-10 h-10 rounded-full bg-gradient-to-tr from-yellow-100 to-yellow-600 shadow-lg" />
                <div className="absolute top-8 w-[22rem] h-4 bg-gradient-to-r from-yellow-700 via-yellow-100 to-yellow-700 rounded-full animate-swing origin-center z-20 flex justify-between items-center px-1 shadow-lg">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-gradient-to-br from-yellow-300 to-yellow-800 border-2 border-yellow-100 shadow-md z-30" />
                    <div className="relative h-full flex justify-center items-end group">
                        <div className="absolute top-2 w-[110px] h-[180px] border-l border-r border-yellow-200/40 opacity-80" style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }} />
                        <div className="absolute top-[180px] w-28 h-8 bg-gradient-to-b from-black/80 to-yellow-900/40 border-b-2 border-yellow-500 rounded-b-full backdrop-blur-md shadow-[0_10px_40px_rgba(0,0,0,0.5)] flex items-center justify-center transform origin-top hover:rotate-3 transition-transform duration-1000">
                            <div className="absolute -top-12 animate-float">
                                <div className="relative p-3 bg-black/60 rounded-full border border-yellow-500/30 shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                                    <Gavel size={28} className="text-yellow-100" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="relative h-full flex justify-center items-end group">
                        <div className="absolute top-2 w-[110px] h-[180px] border-l border-r border-yellow-200/40 opacity-80" style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }} />
                        <div className="absolute top-[180px] w-28 h-8 bg-gradient-to-b from-black/80 to-yellow-900/40 border-b-2 border-yellow-500 rounded-b-full backdrop-blur-md shadow-[0_10px_40px_rgba(0,0,0,0.5)] flex items-center justify-center transform origin-top hover:-rotate-3 transition-transform duration-1000">
                            <div className="absolute -top-12 animate-float delay-700">
                                <div className="relative p-3 bg-black/60 rounded-full border border-yellow-500/30 shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                                    <FileText size={28} className="text-yellow-100" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="absolute -bottom-2 w-48 h-12 bg-gradient-to-t from-yellow-900 via-yellow-600 to-yellow-200 rounded-t-full shadow-[0_0_60px_rgba(0,0,0,0.8)] z-10" />
            </div>
            <div className="absolute inset-0 bg-yellow-500/10 blur-[100px] rounded-full pointer-events-none" />
        </div>
    );
};

const Home: React.FC = () => {
    const steps = [
        { icon: <LogIn size={28} className="text-accent" />, title: "1. Create Account", desc: "Join NyayaSathi to access your personalized legal dashboard" },
        { icon: <Info size={28} className="text-blue-400" />, title: "2. Get Help", desc: "Ask our AI or connect with verified lawyers" },
        { icon: <FileText size={28} className="text-emerald-400" />, title: "3. Take Action", desc: "Draft documents, file complaints, know your rights" }
    ];

    return (
        <div className="min-h-screen bg-black text-white overflow-x-hidden">
            <Header />

            {/* Hero Section */}
            <section className="relative min-h-[95vh] flex items-center px-6 py-32">
                <div className="absolute inset-0 bg-gradient-to-b from-black via-blue-950/5 to-black pointer-events-none" />
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-blue-600/10 blur-[120px] rounded-full" />

                <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center relative z-10">
                    <div className="space-y-10 animate-fade-in-up">
                        <div>
                            <span className="inline-block px-6 py-2 bg-white/5 border border-white/10 rounded-full text-sm font-bold tracking-wider mb-8 backdrop-blur-md">
                                <Scale size={14} className="inline mr-2 text-accent" /> AI-Powered Legal Companion
                            </span>
                            <h1 className="text-7xl md:text-8xl font-display leading-[0.9] mb-10 tracking-tight">
                                <span className="font-light block mb-2">Justice,</span>
                                <span className="text-gradient-gold italic font-bold">Simplified.</span>
                            </h1>
                            <p className="text-xl md:text-2xl text-neutral-300 mb-12 leading-relaxed font-light max-w-xl">
                                From understanding <span className="text-white font-medium">BNS 420</span> to filing an <span className="text-white font-medium">RTI</span>, NyayaSathi is here.
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-6">
                            <MagneticButton to="/login" primary>
                                Login <ArrowRight />
                            </MagneticButton>
                            <MagneticButton to="/about-us">
                                Our Mission
                            </MagneticButton>
                            <MagneticButton to="/stories">
                                Stories
                            </MagneticButton>
                        </div>
                    </div>

                    {/* Interactive 3D Scales of Justice */}
                    <ScalesOfJustice />
                </div>
            </section>

            {/* Updated Steps Section */}
            <section className="py-24 bg-neutral-900/20 border-y border-white/5">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-6xl font-bold font-display mb-6 tracking-tight">Your Path to Justice</h2>
                        <p className="text-neutral-400 max-w-2xl mx-auto text-lg">Simplified. Digital. Effective.</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        {steps.map((step, idx) => (
                            <div key={idx} className="relative group p-[1px] rounded-3xl bg-gradient-to-b from-white/10 to-transparent hover:from-accent/50 transition-colors duration-500">
                                <div className="h-full p-8 rounded-[23px] bg-[#0a0a0a] relative overflow-hidden group-hover:bg-[#0f0f0f] transition-colors">
                                    {/* Radial Glow on Hover */}
                                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                                        style={{ background: 'radial-gradient(circle at center, rgba(212,175,55,0.15), transparent 70%)' }}
                                    />
                                    <div className="w-14 h-14 rounded-xl bg-white/5 flex items-center justify-center mb-6 border border-white/10 group-hover:scale-110 group-hover:border-accent/40 group-hover:bg-accent/10 transition-all duration-300">
                                        {step.icon}
                                    </div>
                                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-accent transition-colors">{step.title}</h3>
                                    <p className="text-neutral-400 leading-relaxed font-light">{step.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Trending Topics (Replaces Legal Pulse) */}
            <section className="py-24 px-6 relative z-10">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center gap-4 mb-10">
                        <div className="h-px flex-1 bg-gradient-to-r from-transparent to-white/10" />
                        <h2 className="text-3xl font-bold font-display text-white">Trending Topics</h2>
                        <div className="h-px flex-1 bg-gradient-to-l from-transparent to-white/10" />
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Main Featured Card - BNS Article */}
                        <Link
                            to="/legal-article/bns-2024"
                            className="relative group rounded-[2.5rem] overflow-hidden min-h-[400px] border border-white/10 hover:border-red-500/30 transition-all"
                        >
                            <img
                                src="https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&q=80"
                                alt="Law"
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-90" />

                            <div className="absolute inset-0 p-10 flex flex-col justify-end">
                                <span className="inline-block px-4 py-1.5 rounded-lg bg-red-600/90 text-white text-xs font-bold tracking-wider mb-4 w-fit backdrop-blur-sm shadow-lg shadow-red-900/20">
                                    CRITICAL UPDATE
                                </span>
                                <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 font-display leading-tight">
                                    New Criminal Laws 2024: Bharatiya Nyaya Sanhita
                                </h3>
                                <p className="text-neutral-300 mb-8 max-w-lg leading-relaxed">
                                    The BNS replaces the IPC. Key changes include community service as punishment, new definitions for organized crime, and stricter penalties.
                                </p>
                                <div className="flex items-center gap-4">
                                    <span className="px-8 py-3 bg-white text-black rounded-xl font-bold group-hover:bg-neutral-200 transition-colors">
                                        Read Full Breakdown
                                    </span>
                                </div>
                            </div>
                        </Link>

                        {/* Secondary Cards Column */}
                        <div className="flex flex-col gap-6">
                            {/* Card 1: Privacy Rights */}
                            <Link
                                to="/legal-article/privacy-rights"
                                className="flex-1 p-8 rounded-[2.5rem] bg-[#0a0a0f] border border-white/10 hover:border-purple-500/30 transition-all hover:bg-white/5 group cursor-pointer flex flex-col justify-center"
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <span className="text-xs font-bold text-accent uppercase tracking-widest">Constitutional Law</span>
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-3 font-display group-hover:text-accent transition-colors">
                                    Right to Privacy: A Fundamental Right?
                                </h3>
                                <p className="text-neutral-400 text-sm leading-relaxed mb-6">
                                    Exploring the landmark Puttaswamy judgment and what it means for your digital data privacy today.
                                </p>
                                <div className="flex items-center text-sm font-bold text-white group-hover:gap-2 transition-all">
                                    <BookOpen size={16} className="mr-2" />
                                    Read Article <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </Link>

                            {/* Card 2: Women's Safety (Replaces Duplicate) */}
                            <Link
                                to="/legal-article/womens-safety"
                                className="flex-1 p-8 rounded-[2.5rem] bg-[#0a0a0f] border border-white/10 hover:border-pink-500/30 transition-all hover:bg-white/5 group cursor-pointer flex flex-col justify-center"
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <span className="text-xs font-bold text-pink-500 uppercase tracking-widest">Women's Rights</span>
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-3 font-display group-hover:text-pink-400 transition-colors">
                                    Women's Safety & Legal Rights
                                </h3>
                                <p className="text-neutral-400 text-sm leading-relaxed mb-6">
                                    Understanding Zero FIR, Domestic Violence Act 2005, and laws against workplace harassment.
                                </p>
                                <div className="flex items-center text-sm font-bold text-white group-hover:gap-2 transition-all">
                                    <BookOpen size={16} className="mr-2" />
                                    Read Article <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-32 px-6 relative overflow-hidden">
                <div className="max-w-5xl mx-auto relative z-10">
                    <div className="glass-premium p-12 md:p-20 rounded-[3rem] text-center border border-white/10 relative overflow-hidden bg-gradient-to-br from-white/5 to-black/40">
                        <div className="absolute top-0 transform -translate-x-1/2 left-1/2 w-[600px] h-[300px] bg-accent/20 blur-[100px] rounded-full opacity-50 pointer-events-none" />
                        <h2 className="text-4xl md:text-6xl font-bold font-display mb-8 relative z-10">Ready to take control?</h2>
                        <p className="text-xl text-neutral-300 mb-12 max-w-2xl mx-auto relative z-10 font-light">
                            Join thousands of citizens using NyayaSathi to navigate the law with confidence.
                        </p>
                        <div className="flex justify-center relative z-10">
                            <MagneticButton to="/login" primary className="px-14 py-6 text-xl">
                                Get Started Now
                            </MagneticButton>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Home;
