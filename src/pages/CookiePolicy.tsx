import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Cookie, Settings, BarChart3, Target, Shield, ExternalLink, Sparkles } from "lucide-react";

const CookiePolicy: React.FC = () => {
    return (
        <div className="min-h-screen bg-black text-white pb-20 pt-32 px-4 relative overflow-hidden">
            {/* Premium Background */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-gradient-to-b from-amber-900/20 via-orange-900/10 to-transparent blur-[150px] rounded-full opacity-60" />
                <div className="absolute bottom-0 right-0 w-[700px] h-[700px] bg-indigo-900/20 blur-[150px] rounded-full" />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 mix-blend-overlay" />
            </div>

            <div className="relative z-10 max-w-5xl mx-auto">
                {/* Back Button */}
                <Link
                    to="/"
                    className="inline-flex items-center gap-2 mb-8 text-neutral-400 hover:text-white transition-colors group animate-fade-in"
                >
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-white/20 transition-all">
                        <ArrowLeft size={18} />
                    </div>
                    <span className="text-sm font-bold uppercase tracking-widest">Back to Home</span>
                </Link>

                {/* Header */}
                <header className="mb-16 animate-fade-in-up">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 mb-6 backdrop-blur-md">
                        <Cookie size={14} className="text-amber-400" />
                        <span className="text-xs font-bold text-amber-300 tracking-widest uppercase">Legal Documents</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-bold font-display mb-6 leading-tight">
                        Cookie <span className="text-gradient-gold">Policy</span>
                    </h1>
                    <p className="text-xl text-neutral-400 leading-relaxed font-light max-w-3xl">
                        Transparency in how we use cookies to enhance your experience on NyayaSathi.
                    </p>
                    <div className="mt-6 inline-flex items-center gap-2 text-sm text-neutral-500">
                        <span className="px-3 py-1 bg-white/5 rounded-full border border-white/5 font-mono">Last Updated: January 2026</span>
                    </div>
                </header>

                {/* Hero Card - What Are Cookies */}
                <div className="mb-16 group relative rounded-[2.5rem] bg-gradient-to-br from-amber-500/10 to-orange-500/5 border border-amber-500/20 p-10 hover:border-amber-500/30 transition-all duration-500 animate-slide-up backdrop-blur-xl">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent rounded-[2.5rem]" />
                    <div className="relative flex items-start gap-6">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-500/30 flex items-center justify-center shrink-0 shadow-lg shadow-amber-900/20">
                            <Cookie size={28} className="text-amber-400" />
                        </div>
                        <div className="flex-1">
                            <h2 className="text-3xl font-bold text-white mb-4 font-display">What Are Cookies?</h2>
                            <p className="text-neutral-300 leading-relaxed text-lg">
                                Cookies are small text files placed on your device when you visit a website. They're the digital equivalent of a bookmark - they help websites remember you and provide personalized services. NyayaSathi uses cookies responsibly to enhance your legal research experience.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Section Header */}
                <div className="flex items-center gap-4 mb-10 animate-fade-in" style={{ animationDelay: '100ms' }}>
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent to-white/10" />
                    <div className="flex items-center gap-3">
                        <Settings size={20} className="text-sky-400" />
                        <h2 className="text-3xl font-bold font-display text-white">Types of Cookies</h2>
                    </div>
                    <div className="h-px flex-1 bg-gradient-to-l from-transparent to-white/10" />
                </div>

                {/* Cookie Types Grid */}
                <div className="grid md:grid-cols-3 gap-6 mb-20">
                    {[
                        {
                            icon: <Shield size={24} className="text-emerald-400" />,
                            title: "Essential Cookies",
                            desc: "Necessary for the website to function. They include session cookies for authentication, security tokens, and privacy preferences. Without them, core services cannot be provided.",
                            color: "from-emerald-500/10 to-emerald-500/5",
                            border: "border-emerald-500/20",
                            hoverBorder: "hover:border-emerald-500/40",
                            delay: "200ms"
                        },
                        {
                            icon: <BarChart3 size={24} className="text-blue-400" />,
                            title: "Analytics Cookies",
                            desc: "Help us measure and improve site performance. We use Google Analytics to understand which pages are popular and how visitors navigate. All data is aggregated and anonymous.",
                            color: "from-blue-500/10 to-blue-500/5",
                            border: "border-blue-500/20",
                            hoverBorder: "hover:border-blue-500/40",
                            delay: "300ms"
                        },
                        {
                            icon: <Target size={24} className="text-purple-400" />,
                            title: "Functional Cookies",
                            desc: "Enable enhanced functionality and personalization. They remember your language preferences, case analysis history, and preferred legal categories for a better experience.",
                            color: "from-purple-500/10 to-purple-500/5",
                            border: "border-purple-500/20",
                            hoverBorder: "hover:border-purple-500/40",
                            delay: "400ms"
                        }
                    ].map((cookie, idx) => (
                        <div
                            key={idx}
                            className={`group relative p-8 rounded-[2rem] bg-gradient-to-br ${cookie.color} border ${cookie.border} ${cookie.hoverBorder} transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl cursor-pointer animate-slide-up backdrop-blur-xl`}
                            style={{ animationDelay: cookie.delay }}
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="relative">
                                <div className="w-14 h-14 rounded-2xl bg-black/40 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg">
                                    {cookie.icon}
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3 font-display">{cookie.title}</h3>
                                <p className="text-neutral-300 text-sm leading-relaxed">{cookie.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Managing Cookies Section */}
                <div className="mb-16 p-10 rounded-[2.5rem] bg-[#0a0a0f] border border-white/10 hover:border-white/20 transition-all animate-fade-in" style={{ animationDelay: '500ms' }}>
                    <div className="flex items-center gap-3 mb-6">
                        <Sparkles size={24} className="text-accent" />
                        <h2 className="text-2xl font-bold text-white font-display">Managing Your Cookie Preferences</h2>
                    </div>
                    <p className="text-neutral-300 leading-relaxed text-lg mb-6">
                        Most web browsers allow cookie control through settings. You can refuse cookies or delete specific ones. However, blocking cookies may limit some website features.
                    </p>
                    <a
                        href="https://www.allaboutcookies.org"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-accent hover:bg-white/10 hover:border-accent/30 transition-all group font-bold"
                    >
                        <span>Learn More at AllAboutCookies.org</span>
                        <ExternalLink size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </a>
                </div>

                {/* Third-Party Cookies */}
                <div className="p-10 rounded-[2.5rem] bg-[#0a0a0f] border border-white/10 hover:border-white/20 transition-all animate-fade-in" style={{ animationDelay: '600ms' }}>
                    <h2 className="text-2xl font-bold text-white font-display mb-6">Third-Party Cookies</h2>
                    <p className="text-neutral-300 leading-relaxed mb-6">
                        We use cookies from trusted third parties to enhance functionality:
                    </p>
                    <div className="grid sm:grid-cols-3 gap-4">
                        {[
                            { name: "Google Analytics", purpose: "User behavior insights" },
                            { name: "Auth Providers", purpose: "Secure login" },
                            { name: "Payment Processors", purpose: "Safe transactions" }
                        ].map((provider, idx) => (
                            <div key={idx} className="p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all">
                                <h4 className="text-white font-bold mb-1">{provider.name}</h4>
                                <p className="text-neutral-400 text-sm">{provider.purpose}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Contact Footer */}
                <div className="mt-16 text-center animate-fade-in" style={{ animationDelay: '700ms' }}>
                    <p className="text-neutral-400 mb-4">Questions about our cookie usage?</p>
                    <a href="mailto:privacy@nyayasathi.in" className="text-accent hover:underline font-bold">
                        privacy@nyayasathi.in
                    </a>
                </div>
            </div>
        </div>
    );
};

export default CookiePolicy;
