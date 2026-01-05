import React from "react";
import { Scale, Users, Award, Landmark, Globe, Target, Shield, CheckCircle, Zap, MessageSquare, Heart, ShieldCheck, ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const AboutUs: React.FC = () => {
    return (
        <div className="min-h-screen bg-black text-white relative overflow-x-hidden selection:bg-accent selection:text-black">
            {/* Elegant Background Accents */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full animate-pulse-slow" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent/5 blur-[120px] rounded-full animate-pulse-slow delay-1000" />
            </div>

            {/* Hero Section - The Grand Entrance */}
            <div className="relative min-h-[90vh] flex items-center justify-center pt-24 pb-12 overflow-hidden">
                <div className="absolute inset-0 bg-[url('/assets/images/about-hero.png')] bg-cover bg-center opacity-20 scale-105 perspective-1000" />
                <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-black" />

                <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
                    <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-white/5 border border-white/10 mb-10 backdrop-blur-2xl animate-fade-in">
                        <Sparkles className="text-accent" size={16} />
                        <span className="text-[10px] font-black tracking-[0.3em] uppercase text-accent/80">Our Legacy & Mission</span>
                    </div>

                    <h1 className="text-7xl md:text-9xl font-display leading-[0.85] mb-12 tracking-tight overflow-hidden pb-4">
                        <span className="block font-light animate-slide-up">Democratizing</span>
                        <span className="text-gradient-gold italic font-bold block animate-slide-up delay-100">Justice.</span>
                    </h1>

                    <p className="text-xl md:text-3xl text-neutral-400 leading-relaxed max-w-3xl mx-auto font-light animate-fade-in delay-300">
                        NyayaSathi is more than a platform—it's a movement to bridge the abyss between <span className="text-white font-medium italic">Legal Complexity</span> and <span className="text-accent font-medium italic">Human Understanding</span>.
                    </p>
                </div>

                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-30">
                    <div className="w-1 h-12 rounded-full bg-gradient-to-b from-accent to-transparent" />
                </div>
            </div>

            {/* Stats Overview - The Scale of Impact */}
            <div className="relative py-20 border-y border-white/5 bg-neutral-900/10 backdrop-blur-md">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-12 sm:gap-20">
                        {[
                            { label: "Citizens Empowered", val: "50K+", icon: <Users size={24} />, color: "text-blue-400" },
                            { label: "Legal Professionals", val: "1,200+", icon: <Award size={24} />, color: "text-accent" },
                            { label: "Queries Resolved", val: "1.5M+", icon: <MessageSquare size={24} />, color: "text-emerald-400" },
                            { label: "States Covered", val: "28", icon: <Globe size={24} />, color: "text-purple-400" },
                        ].map((stat, i) => (
                            <div key={i} className="group relative">
                                <div className={`flex items-center justify-center w-12 h-12 rounded-xl bg-white/5 mb-6 group-hover:scale-110 transition-transform border border-white/5 ${stat.color}`}>
                                    {stat.icon}
                                </div>
                                <h3 className="text-4xl font-bold text-white mb-2 font-display tracking-tight">{stat.val}</h3>
                                <p className="text-neutral-500 uppercase tracking-widest text-[10px] font-bold">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Our Story - The Genesis */}
            <section className="py-32 relative">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-24 items-center">
                        <div className="relative order-2 lg:order-1">
                            <div className="relative aspect-square md:aspect-[4/5] max-h-[600px] rounded-[3rem] overflow-hidden grayscale hover:grayscale-0 transition-all duration-1000 group">
                                <img
                                    src="/assets/images/about-story.png"
                                    alt="Collaboration"
                                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-1000"
                                />
                                <div className="absolute inset-0 bg-blue-900/20 mix-blend-color" />
                            </div>
                            {/* Floating Card */}
                            <div className="absolute -bottom-10 -right-6 lg:-right-10 p-8 rounded-[2rem] bg-black/80 backdrop-blur-2xl border border-white/10 shadow-2xl max-w-xs animate-float">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center text-accent">
                                        <Scale size={24} />
                                    </div>
                                    <h5 className="font-display text-xl">The Nyaya Ethos</h5>
                                </div>
                                <p className="text-neutral-400 text-sm leading-relaxed">
                                    "We didn't set out to build software. We set out to build a bridge to the Indian courtroom for the common man."
                                </p>
                            </div>
                        </div>

                        <div className="order-1 lg:order-2 space-y-12">
                            <div>
                                <h2 className="text-5xl md:text-7xl font-display mb-8 leading-tight tracking-tight">
                                    The Genesis of <br />
                                    <span className="text-accent italic">NyayaSathi</span>
                                </h2>
                                <div className="space-y-6 text-lg text-neutral-400 font-light leading-relaxed">
                                    <p>
                                        In 2023, a group of legal experts and technology enthusiasts realized a startling truth: while digital India was booming, the common citizen's interaction with the Law remained archaic and intimidating.
                                    </p>
                                    <p>
                                        Complex terminology (legalese), bureaucratic hurdles, and language barriers created a wall between the citizen and their rights. NyayaSathi was born to tear down that wall.
                                    </p>
                                </div>
                            </div>

                            <div className="grid gap-6">
                                {[
                                    { title: "Universal Access", desc: "Break language barriers with support for 22+ Indian languages.", icon: <Globe size={20} className="text-blue-400" /> },
                                    { title: "AI Precision", desc: "Advanced semantic mapping of BNS and traditional codes.", icon: <Zap size={20} className="text-accent" /> },
                                ].map((item, i) => (
                                    <div key={i} className="flex gap-6 p-6 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
                                        <div className="shrink-0 w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center">
                                            {item.icon}
                                        </div>
                                        <div>
                                            <h4 className="text-white font-bold mb-1">{item.title}</h4>
                                            <p className="text-neutral-500 text-sm">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Core Pillars Section - The Luxury Cards */}
            <section className="py-32 bg-neutral-950/40 relative">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-24">
                        <h2 className="text-5xl md:text-7xl font-display mb-6 tracking-tight">Our Core Pillars</h2>
                        <p className="text-neutral-500 uppercase tracking-[0.4em] text-xs font-bold font-sans">Defining the Standard of Legal Excellence</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                title: "Integrity",
                                desc: "Every interpretation is cross-verified against official gazettes and judicial precedents.",
                                icon: <ShieldCheck className="text-emerald-400" />,
                                highlight: "Trustworthy"
                            },
                            {
                                title: "Clarity",
                                desc: "Converting 40-page legal documents into a 2-minute actionable summary.",
                                icon: <Zap className="text-accent" />,
                                highlight: "Accessible"
                            },
                            {
                                title: "Empowerment",
                                desc: "Equipping every farmer, student, and professional with the power of the Law.",
                                icon: <Heart className="text-pink-400" />,
                                highlight: "Humanized"
                            }
                        ].map((pillar, i) => (
                            <div key={i} className="group relative p-10 rounded-[3rem] bg-neutral-900/50 border border-white/5 hover:border-accent/20 transition-all duration-500 hover:-translate-y-2 overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 blur-[50px] group-hover:bg-accent/10 transition-all" />
                                <div className="relative z-10">
                                    <div className="mb-8 p-4 w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                                        {pillar.icon}
                                    </div>
                                    <div className="text-[10px] font-bold text-accent uppercase tracking-widest mb-4">{pillar.highlight}</div>
                                    <h3 className="text-3xl font-bold font-display text-white mb-6 tracking-tight">{pillar.title}</h3>
                                    <p className="text-neutral-400 leading-relaxed font-light mb-8">
                                        {pillar.desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Technology Section - The Intelligence Behind */}
            <section className="py-40 relative overflow-hidden">
                <div className="absolute inset-0 bg-blue-900/5 -skew-y-3" />
                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-24 items-center">
                        <div className="space-y-10">
                            <h2 className="text-5xl md:text-7xl font-display leading-[1] tracking-tight">
                                Intelligence <br />
                                <span className="font-light italic text-blue-400">for the Law.</span>
                            </h2>
                            <p className="text-xl text-neutral-400 font-light leading-relaxed">
                                Our platform leverages <span className="text-white font-medium italic">Google Gemini 1.5 Pro</span>, trained on thousands of Indian judicial documents to provide context-aware, culturally relevant, and legally sound advice.
                            </p>

                            <ul className="space-y-6">
                                {[
                                    "Semantic understanding of BNS & IPC codes",
                                    "Real-time processing of complex FIR/RTI drafts",
                                    "Multilingual translation for 22+ regional scripts",
                                    "Zero-knowledge encryption for user confidentiality"
                                ].map((feature, i) => (
                                    <li key={i} className="flex items-center gap-4 text-neutral-300">
                                        <CheckCircle size={18} className="text-accent shrink-0" />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="relative group">
                            <div className="relative p-1 bg-gradient-to-br from-white/10 to-transparent rounded-[3rem]">
                                <div className="bg-neutral-900 rounded-[2.8rem] p-12 relative overflow-hidden">
                                    <div className="absolute inset-0 bg-grid-white/[0.02]" />
                                    <div className="relative z-10 flex flex-col items-center text-center py-10">
                                        <div className="w-32 h-32 rounded-full bg-blue-500/10 flex items-center justify-center mb-8 border border-blue-500/20 shadow-[0_0_50px_rgba(59,130,246,0.1)]">
                                            <Landmark size={64} className="text-blue-400" />
                                        </div>
                                        <h4 className="text-3xl font-display font-medium mb-4 text-white">Future Ready</h4>
                                        <p className="text-neutral-500 text-sm max-w-xs leading-relaxed">
                                            Building the foundation for a Paperless, Frictionless, and Fair Judicial Experience.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            {/* Decorative blur */}
                            <div className="absolute inset-x-0 -bottom-10 h-20 bg-blue-500/20 blur-[100px] -z-10 opacity-50" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Premium CTA Section */}
            <section className="py-32">
                <div className="max-w-5xl mx-auto px-6">
                    <div className="relative rounded-[4rem] bg-gradient-to-br from-neutral-900 to-black border border-white/10 p-16 md:p-24 text-center overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none" />

                        <div className="relative z-10 flex flex-col items-center">
                            <h2 className="text-5xl md:text-8xl font-display mb-10 leading-[0.9] tracking-tight">
                                Have a problem <br />
                                <span className="text-gradient-gold italic font-bold">with your case?</span>
                            </h2>
                            <p className="text-lg md:text-xl text-neutral-400 mb-12 max-w-xl font-light">
                                Get expert legal advice from our network of verified lawyers across India.
                            </p>

                            <Link to="/vakeel-connect" className="px-12 py-5 rounded-full bg-white text-black font-bold text-lg hover:bg-neutral-200 transition-all flex items-center gap-3 group shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                                Consult our Lawyers <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer Sign-off */}
            <footer className="py-12 border-t border-white/5 text-center text-neutral-600">
                <p className="text-[10px] uppercase tracking-[0.5em] font-bold">© 2024 NyayaSathi — Democratizing the Law</p>
            </footer>
        </div>
    );
};

export default AboutUs;

