import React from "react";
import { BookOpen, Scale, Shield, ArrowRight, Gavel, FileText, Activity } from "lucide-react";
import { Link } from "react-router-dom";

const NyayaGyan: React.FC = () => {
    const topics = [
        {
            id: 1,
            title: "Arrest & Bail",
            icon: <Shield className="w-8 h-8 text-red-500" />,
            desc: "Know your rights when detained by police. DK Basu guidelines and bail provisions.",
            color: "group-hover:border-red-500/30",
            slug: "arrest-bail"
        },
        {
            id: 2,
            title: "FIR & Complaints",
            icon: <FileText className="w-8 h-8 text-blue-500" />,
            desc: "How to file a First Information Report (FIR)? What if police refuse to file it?",
            color: "group-hover:border-blue-500/30",
            slug: "fir"
        },
        {
            id: 3,
            title: "Consumer Rights",
            icon: <Scale className="w-8 h-8 text-emerald-500" />,
            desc: "Defective products? Unfair trade practices? Learn how to approach Consumer Forum.",
            color: "group-hover:border-emerald-500/30",
            slug: "consumer-rights"
        },
        {
            id: 4,
            title: "Property & Rent",
            icon: <Gavel className="w-8 h-8 text-amber-500" />,
            desc: "Tenant eviction laws, property registration, and inheritance rights.",
            color: "group-hover:border-amber-500/30",
            slug: "property-rent"
        },
        {
            id: 5,
            title: "Cyber Crime",
            icon: <Activity className="w-8 h-8 text-purple-500" />,
            desc: "Reporting online fraud, identity theft, and social media harassment.",
            color: "group-hover:border-purple-500/30",
            slug: "cyber-crime"
        },
        {
            id: 6,
            title: "Women's Safety",
            icon: <Shield className="w-8 h-8 text-pink-500" />,
            desc: "Zero FIR, Domestic Violence Act, and workplace harassment laws.",
            color: "group-hover:border-pink-500/30",
            slug: "womens-safety"
        }
    ];

    return (
        <div className="min-h-screen pb-20 pt-32 px-4 relative overflow-hidden bg-black text-white">
            {/* Ambient Background */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-indigo-900/20 blur-[150px] rounded-full opacity-60" />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 mix-blend-overlay" />
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                <header className="text-center mb-20 animate-fade-in-up">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-md">
                        <BookOpen size={14} className="text-accent" />
                        <span className="text-xs font-bold text-neutral-300 uppercase tracking-widest">Legal Literacy Mission</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-bold font-display text-white mb-8 leading-tight">
                        Nyaya<span className="text-gradient-gold">Gyan</span>
                    </h1>
                    <p className="text-xl text-neutral-400 max-w-2xl mx-auto leading-relaxed font-light">
                        Empowering citizens with simplified legal knowledge. Decode the Indian Penal Code (IPC) and Constitution in plain language.
                    </p>
                </header>

                {/* Topics Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
                    {topics.map((topic, idx) => (
                        <Link
                            key={topic.id}
                            to={`/legal-article/${topic.slug}`}
                            className={`group relative p-8 rounded-[2rem] bg-[#0a0a0f] border border-white/10 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:bg-white/[0.02] cursor-pointer animate-slide-up ${topic.color}`}
                            style={{ animationDelay: `${idx * 100 + 200}ms` }}
                        >
                            <div className="flex items-center justify-between mb-8">
                                <div className="w-16 h-16 rounded-2xl bg-black border border-white/5 flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                                    {topic.icon}
                                </div>
                                <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-colors">
                                    <ArrowRight size={18} className="-rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                                </div>
                            </div>

                            <h3 className="text-2xl font-bold text-white mb-4 font-display group-hover:text-accent transition-colors">{topic.title}</h3>
                            <p className="text-neutral-400 leading-relaxed mb-6 font-light">
                                {topic.desc}
                            </p>

                            {/* Read Article Button */}
                            <div className="flex items-center gap-2 text-sm font-bold text-emerald-400 group-hover:gap-3 transition-all">
                                <BookOpen size={16} />
                                Read Full Article
                                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                            </div>

                            {/* Progress bar effect */}
                            <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/5 rounded-b-[2rem] overflow-hidden">
                                <div className="h-full bg-gradient-to-r from-accent to-white transform -translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-out" />
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Trending Section - Asymmetrical Layout */}
                <div className="animate-fade-in" style={{ animationDelay: '800ms' }}>
                    <div className="flex items-center gap-4 mb-10">
                        <div className="h-px flex-1 bg-gradient-to-r from-transparent to-white/10" />
                        <h2 className="text-3xl font-bold font-display text-white">Trending Insights</h2>
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

                        {/* Secondary Cards Column - Privacy Rights */}
                        <div className="flex flex-col gap-6">
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
                        </div>
                    </div>
                </div>
            </div >
        </div >
    );
};

export default NyayaGyan;
