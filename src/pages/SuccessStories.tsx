import React from "react";
import { Quote, TrendingUp, Users, Award, CheckCircle, Star } from "lucide-react";
import { Link } from "react-router-dom";

const SuccessStories: React.FC = () => {
    const stories = [
        {
            id: 1,
            name: "Priya Sharma",
            location: "Mumbai, Maharashtra",
            caseType: "Consumer Dispute",
            issue: "E-commerce platform charged hidden subscription fees without consent",
            outcome: "Full refund of ₹12,000 + compensation",
            timeline: "14 days",
            quote: "NyayaSathi's AI helped me understand the new Dark Patterns law. I filed a complaint via the NCH app and got my money back in 2 weeks. I never thought consumer rights could be this accessible!",
            image: "https://i.pravatar.cc/150?img=5",
            successMetric: "100% refund"
        },
        {
            id: 2,
            name: "Rajesh Kumar",
            location: "Delhi",
            caseType: "Criminal Defense (BNS)",
            issue: "Arrested for minor theft (first offense, ₹4,000)",
            outcome: "Community service instead of jail",
            timeline: "7 days",
            quote: "I was terrified of a criminal record ruining my career. NyayaSathi showed me Section 4(f) of the new BNS. The lawyer I found through VakeelConnect got me community service. My life is back on track.",
            image: "https://i.pravatar.cc/150?img=12",
            successMetric: "0 jail time"
        },
        {
            id: 3,
            name: "Anjali Verma",
            location: "Bangalore, Karnataka",
            caseType: "Digital Privacy Violation",
            issue: "Police seized phone during protest without warrant",
            outcome: "Phone returned, FIR quashed",
            timeline: "21 days",
            quote: "The AI assistant cited the Supreme Court judgment on digital privacy. I knew my rights instantly. The platform connected me with a human rights lawyer who got my phone back and cleared my record.",
            image: "https://i.pravatar.cc/150?img=9",
            successMetric: "Case dismissed"
        },
        {
            id: 4,
            name: "Vikram Singh",
            location: "Jaipur, Rajasthan",
            caseType: "Landlord Dispute",
            issue: "Security deposit not returned (₹50,000)",
            outcome: "Full deposit + 12% interest",
            timeline: "45 days",
            quote: "The NyayaDraft tool helped me generate a legal notice. After sending it via registered post, my landlord settled within a month. I didn't even need to go to court!",
            image: "https://i.pravatar.cc/150?img=14",
            successMetric: "₹56,000 recovered"
        },
        {
            id: 5,
            name: "Meera Nair",
            location: "Kerala",
            caseType: "Family Law (Maintenance)",
            issue: "Ex-husband not paying child maintenance",
            outcome: "Court order for monthly payments",
            timeline: "60 days",
            quote: "I consulted lawyers for months but couldn't afford the fees. NyayaSathi's AI helped me understand Section 125 CrPC. I drafted my own petition and got a favorable order. My kids are financially secure now.",
            image: "https://i.pravatar.cc/150?img=20",
            successMetric: "₹15K/month secured"
        },
        {
            id: 6,
            name: "Arjun Patel",
            location: "Ahmedabad, Gujarat",
            caseType: "RTI Application",
            issue: "Government office refusing public records",
            outcome: "Information disclosed under RTI",
            timeline: "30 days",
            quote: "Using the RTI template from NyayaDraft, I filed my first RTI in 10 minutes. The CIC ruled in my favor. Transparency is power, and NyayaSathi made it accessible to a common citizen like me.",
            image: "https://i.pravatar.cc/150?img=33",
            successMetric: "Info disclosed"
        }
    ];

    const stats = [
        { icon: <Users size={40} />, value: "12,000+", label: "Cases Resolved" },
        { icon: <TrendingUp size={40} />, value: "87%", label: "Success Rate" },
        { icon: <Award size={40} />, value: "₹2.4 Cr+", label: "Total Compensation Won" },
        { icon: <CheckCircle size={40} />, value: "45 days", label: "Avg Resolution Time" }
    ];

    return (
        <div className="min-h-screen bg-black text-white py-20">
            <div className="max-w-7xl mx-auto px-6">

                {/* Hero */}
                <div className="text-center mb-20 animate-fade-in">
                    <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-md">
                        <Star className="text-accent" size={16} />
                        <span className="text-xs font-bold tracking-widest uppercase text-neutral-400">Real Impact, Real People</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold font-display mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-neutral-600">
                        Success Stories
                    </h1>
                    <p className="text-xl text-neutral-400 max-w-3xl mx-auto font-light leading-relaxed">
                        Ordinary Indians using NyayaSathi to win cases, recover money, and secure justice. These aren't just statistics—they're lives changed.
                    </p>
                </div>

                {/* Impact Stats */}
                <div className="grid md:grid-cols-4 gap-6 mb-20">
                    {stats.map((stat, idx) => (
                        <div key={idx} className="relative group">
                            <div className="absolute inset-0 bg-accent/20 blur-2xl opacity-0 group-hover:opacity-40 transition-opacity duration-500" />
                            <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 text-center hover:bg-white/10 transition-all duration-300">
                                <div className="text-accent mx-auto mb-4 group-hover:scale-110 transition-transform">{stat.icon}</div>
                                <div className="text-4xl font-bold mb-2 text-white">{stat.value}</div>
                                <div className="text-sm text-neutral-500 uppercase tracking-wider">{stat.label}</div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Stories Grid */}
                <div className="grid md:grid-cols-2 gap-8">
                    {stories.map((story) => (
                        <div key={story.id} className="relative group">
                            {/* Glow effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-accent/10 to-indigo-500/10 blur-3xl opacity-0 group-hover:opacity-50 transition-opacity duration-500" />

                            {/* Card */}
                            <div className="relative bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-all duration-300 h-full flex flex-col">

                                {/* Header with Photo */}
                                <div className="flex items-start gap-4 mb-6">
                                    <img
                                        src={story.image}
                                        alt={story.name}
                                        className="w-16 h-16 rounded-full border-2 border-accent/30 shadow-lg"
                                    />
                                    <div className="flex-1">
                                        <h3 className="text-xl font-bold text-white">{story.name}</h3>
                                        <p className="text-sm text-neutral-500">{story.location}</p>
                                        <div className="mt-2 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20">
                                            <CheckCircle size={14} className="text-accent" />
                                            <span className="text-xs font-bold text-accent">{story.caseType}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Issue & Outcome */}
                                <div className="mb-6 space-y-4">
                                    <div>
                                        <p className="text-xs uppercase tracking-wider text-neutral-600 font-bold mb-1">Issue</p>
                                        <p className="text-sm text-neutral-400 leading-relaxed">{story.issue}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs uppercase tracking-wider text-neutral-600 font-bold mb-1">Outcome</p>
                                        <p className="text-sm text-white font-semibold">{story.outcome}</p>
                                    </div>
                                </div>

                                {/* Quote */}
                                <div className="relative bg-black/40 border-l-4 border-accent/40 rounded-r-2xl p-6 mb-6 flex-1">
                                    <Quote className="absolute top-4 left-4 text-accent/20" size={32} />
                                    <p className="text-sm text-neutral-300 italic leading-relaxed pl-8">{story.quote}</p>
                                </div>

                                {/* Footer Metrics */}
                                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                                    <div className="flex items-center gap-2">
                                        <TrendingUp className="text-accent" size={16} />
                                        <span className="text-sm font-bold text-accent">{story.successMetric}</span>
                                    </div>
                                    <div className="text-xs text-neutral-500">
                                        Resolved in <span className="font-bold text-white">{story.timeline}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* CTA Section */}
                <div className="mt-20 relative">
                    <div className="absolute inset-0 bg-accent/10 blur-3xl opacity-30" />
                    <div className="relative bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[3rem] p-12 md:p-20 text-center">
                        <h2 className="text-4xl md:text-6xl font-bold font-display mb-6">Your story could be next.</h2>
                        <p className="text-xl text-neutral-300 mb-10 max-w-2xl mx-auto font-light">
                            Join thousands of Indians who are taking control of their legal rights with NyayaSathi.
                        </p>
                        <Link
                            to="/login"
                            className="inline-flex items-center gap-3 px-14 py-6 rounded-full bg-white text-black text-xl font-bold hover:bg-accent transition-all shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:shadow-[0_0_50px_rgba(212,175,55,0.6)] hover:scale-105"
                        >
                            Get Started Now
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SuccessStories;
