import React from "react";
import { Route, Routes, Navigate, useLocation, Link } from "react-router-dom";
import {
    Calendar, Clock, AlertCircle, CheckCircle, ArrowRight, Hourglass,
    FileText, ChevronRight, Scale, Shield, Zap, Info, Briefcase,
    MessageSquare, Landmark, Gavel, ArrowUpRight
} from "lucide-react";

// Detailed Legal Roadmap Data
const timelineEvents = [
    {
        id: 1,
        date: "24 Dec 2025",
        title: "Incident / Notice Served",
        description: "Official legal notice received under Section 138 of the Negotiable Instruments Act. This marks the initiation of the pre-litigation phase.",
        status: "completed",
        type: "critical",
        tags: ["Litigation", "BNS"]
    },
    {
        id: 2,
        date: "08 Jan 2026",
        title: "Reply Filing Deadline",
        description: "Mandatory 15-day window to respond to the bank's notice. A precise, legally-sound reply can prevent future criminal charges.",
        status: "pending",
        type: "warning",
        daysLeft: 7,
        priority: "High",
        actions: ["Review Reply Draft", "Dispatch Reply"]
    },
    {
        id: 3,
        date: "20 Jan 2026",
        title: "Mediation Window",
        description: "Optional stage to settle the dispute out of court. AI predicts a 65% chance of successful settlement based on similar cases.",
        status: "upcoming",
        type: "info",
        tags: ["ADR", "Settlement"]
    },
    {
        id: 4,
        date: "05 Feb 2026",
        title: "Case Filing (Probable)",
        description: "If mediation fails, the complainant is likely to file the formal complaint in the Judicial Magistrate Court.",
        status: "upcoming",
        type: "info"
    },
    {
        id: 5,
        date: "15 Feb 2026",
        title: "Summons Issuance",
        description: "The Court reviews the complaint and issues summons. You'll be required to appear and secure bail.",
        status: "upcoming",
        type: "info",
        tags: ["Court Procedure"]
    },
    {
        id: 6,
        date: "10 Mar 2026",
        title: "First Appearance / Framing Charge",
        description: "Personal appearance in court. The Judge will read the charges and ask if you plead guilty or claim trial.",
        status: "upcoming",
        type: "info"
    },
    {
        id: 7,
        date: "25 Apr 2026",
        title: "Evidence Recording (Trial)",
        description: "The complainant's witnesses will be cross-examined. This is a critical stage for defense strategy.",
        status: "upcoming",
        type: "info",
        priority: "Critical"
    },
    {
        id: 8,
        date: "20 Jun 2026",
        title: "Final Arguments & Judgment",
        description: "Closing statements from both sides. The Judge will pronounce the verdict based on evidence and legal precedents.",
        status: "upcoming",
        type: "info"
    }
];

const ChitraDrishti: React.FC = () => {
    return (
        <div className="min-h-screen pb-32 relative overflow-x-hidden selection:bg-amber-500 selection:text-black">
            {/* Immersive Background */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-0 left-1/4 w-[60vw] h-[60vh] bg-amber-600/5 rounded-full blur-[150px] animate-pulse-slow" />
                <div className="absolute bottom-0 right-1/4 w-[50vw] h-[50vh] bg-blue-600/5 rounded-full blur-[150px] animate-pulse-slow delay-1000" />
                <div className="absolute inset-0 bg-grid-white/[0.01]" />
            </div>

            <div className="max-w-7xl mx-auto px-6 pt-32 relative z-10">

                {/* Visual Trip Progress */}
                <div className="mb-20 animate-fade-in">
                    <div className="flex items-end justify-between mb-4">
                        <div className="space-y-1">
                            <h2 className="text-sm font-bold text-neutral-500 uppercase tracking-[0.2em]">Legal Progress</h2>
                            <p className="text-2xl font-display text-white">Stage 1: <span className="text-amber-500 italic">Pre-Litigation</span></p>
                        </div>
                        <span className="text-neutral-500 font-mono text-sm">12% Complete</span>
                    </div>
                    <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/5 backdrop-blur-sm">
                        <div className="h-full w-[12%] bg-gradient-to-r from-amber-600 to-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.3)] animate-glow" />
                    </div>
                </div>

                <div className="grid lg:grid-cols-12 gap-16">

                    {/* Left Sidebar - Intelligence Panel */}
                    <div className="lg:col-span-4 space-y-8 lg:sticky lg:top-32 h-fit">

                        {/* Title Section */}
                        <div className="space-y-6 animate-slide-in-left">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 backdrop-blur-xl">
                                <Zap size={14} className="text-amber-400" />
                                <span className="text-[10px] font-black text-amber-300 tracking-[0.2em] uppercase">Intelligence Node</span>
                            </div>
                            <h1 className="text-6xl font-display leading-none text-white">
                                Chitra<span className="text-gradient-gold italic font-bold pr-4">Drishti</span>
                            </h1>
                            <p className="text-neutral-400 leading-relaxed font-light">
                                An AI-synthesized chronological map of your legal proceedings, projected based on Procedural Law and court history.
                            </p>
                        </div>

                        {/* Critical Action Widget */}
                        <div className="relative overflow-hidden rounded-[2.5rem] bg-neutral-900/50 border border-amber-500/30 p-8 backdrop-blur-2xl group transition-all duration-500 hover:border-amber-500/60 shadow-2xl animate-fade-in delay-200">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 blur-[60px] group-hover:bg-amber-500/20 transition-all" />

                            <div className="flex items-center gap-4 mb-8">
                                <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-500 border border-amber-500/20">
                                    <Clock size={24} />
                                </div>
                                <div>
                                    <h4 className="text-white font-bold tracking-tight">Time Pressure</h4>
                                    <p className="text-[10px] text-neutral-500 uppercase tracking-widest font-black">Urgent Action Required</p>
                                </div>
                            </div>

                            <div className="flex items-baseline gap-3 mb-6">
                                <span className="text-7xl font-display font-medium text-white italic">07</span>
                                <span className="text-lg text-neutral-500 font-light">Days Left</span>
                            </div>

                            <Link
                                to="/timeline/file-reply"
                                className="w-full py-5 rounded-2xl bg-white text-black font-bold text-sm tracking-widest uppercase hover:bg-amber-400 transition-all flex items-center justify-center gap-2 group-hover:scale-[1.02]"
                            >
                                File Formal Reply <ArrowUpRight size={18} />
                            </Link>
                        </div>

                        {/* Recommendation Card */}
                        <div className="p-8 rounded-[2.5rem] bg-neutral-950/40 border border-white/5 backdrop-blur-xl animate-fade-in delay-400">
                            <h3 className="text-white font-display text-xl mb-6">Expert Guidance</h3>
                            <div className="space-y-6">
                                <div className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/5">
                                    <div className="shrink-0 w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400">
                                        <Scale size={18} />
                                    </div>
                                    <p className="text-[13px] text-neutral-400 leading-relaxed">
                                        Maintain all <span className="text-white">Postal Receipts</span>. They are critical proof of service in Section 138 cases.
                                    </p>
                                </div>
                                <div className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/5">
                                    <div className="shrink-0 w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400">
                                        <MessageSquare size={18} />
                                    </div>
                                    <p className="text-[13px] text-neutral-400 leading-relaxed">
                                        Consider <span className="text-white">Pre-Litigation Mediation</span> to avoid travel to Judicial Magistrate Courts.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - The Vertical Odyssey */}
                    <div className="lg:col-span-8 relative">
                        {/* Elegant Guide Rail */}
                        <div className="absolute left-8 md:left-32 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-neutral-800 to-transparent" />

                        <div className="space-y-16">
                            {timelineEvents.map((event, index) => (
                                <div key={event.id} className="relative group animate-fade-in" style={{ animationDelay: `${index * 150}ms` }}>

                                    {/* Timeline Node */}
                                    <div className="absolute left-8 md:left-32 -translate-x-1/2 top-10 z-10">
                                        <div className={`w-6 h-6 rounded-full border-4 border-black transition-all duration-500 group-hover:scale-125
                                            ${event.status === 'completed' ? 'bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)]' :
                                                event.status === 'pending' ? 'bg-amber-500 animate-pulse shadow-[0_0_20px_rgba(245,158,11,0.6)]' :
                                                    'bg-neutral-800 border-neutral-700'}`}
                                        />
                                    </div>

                                    {/* Date Flag */}
                                    <div className="absolute left-0 md:left-0 top-10 w-24 hidden md:flex flex-col items-end pr-8">
                                        <span className={`text-[10px] font-black uppercase tracking-[0.2em] font-sans
                                            ${event.status === 'pending' ? 'text-amber-500' : 'text-neutral-600'}`}>
                                            {event.date.split(' ').slice(1).join(' ')}
                                        </span>
                                        <span className={`text-xl font-display
                                            ${event.status === 'pending' ? 'text-white' : 'text-neutral-500'}`}>
                                            {event.date.split(' ')[0]}
                                        </span>
                                    </div>

                                    {/* Event Card */}
                                    <div className="pl-20 md:pl-48">
                                        <div className={`relative p-10 rounded-[3rem] border transition-all duration-500 hover:-translate-y-2
                                            ${event.status === 'pending' ?
                                                'bg-gradient-to-br from-neutral-900 to-black border-amber-500/20 shadow-2xl' :
                                                'bg-neutral-950/40 border-white/5 hover:border-white/10'}`}>

                                            {/* Tag Row */}
                                            <div className="flex flex-wrap gap-2 mb-6">
                                                {event.tags?.map(tag => (
                                                    <span key={tag} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[9px] font-black text-neutral-500 uppercase tracking-widest">
                                                        {tag}
                                                    </span>
                                                ))}
                                                {event.priority === 'Critical' && (
                                                    <span className="px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-[9px] font-black text-red-500 uppercase tracking-widest flex items-center gap-1 animate-pulse">
                                                        <AlertCircle size={10} /> High Priority
                                                    </span>
                                                )}
                                            </div>

                                            <div className="flex md:items-start justify-between flex-col md:row gap-6 mb-6">
                                                <div className="space-y-4">
                                                    <h3 className={`text-3xl md:text-4xl font-display tracking-tight leading-tight
                                                        ${event.status === 'completed' ? 'text-neutral-500 font-light' : 'text-white'}`}>
                                                        {event.title}
                                                    </h3>
                                                    <p className={`text-lg font-light leading-relaxed
                                                        ${event.status === 'completed' ? 'text-neutral-600' : 'text-neutral-400'}`}>
                                                        {event.description}
                                                    </p>
                                                </div>

                                                {event.status === 'pending' && (
                                                    <div className="shrink-0">
                                                        <Link
                                                            to="/timeline/review-notice"
                                                            className="px-8 py-4 bg-white text-black text-xs font-black uppercase tracking-widest rounded-2xl hover:bg-amber-400 hover:scale-105 transition-all shadow-xl"
                                                        >
                                                            Review Notice
                                                        </Link>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Action List (if pending) */}
                                            {event.actions && (
                                                <div className="grid sm:grid-cols-2 gap-4 pt-8 mt-4 border-t border-white/5">
                                                    {event.actions.map(action => (
                                                        <Link
                                                            to={action === "Consult Lawyer" ? "/messages" : action === "Review Reply Draft" ? "/timeline/review-draft" : action === "Dispatch Reply" ? "/timeline/dispatch" : "#"}
                                                            className="flex items-center gap-3 text-sm text-neutral-300 group/item cursor-pointer"
                                                        >
                                                            <div className="w-5 h-5 rounded-full border border-amber-500/30 flex items-center justify-center group-hover/item:bg-amber-500/10 transition-colors">
                                                                <ArrowRight size={10} className="text-amber-500" />
                                                            </div>
                                                            {action}
                                                        </Link>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Final Roadmap Signpost */}
                <div className="mt-32 p-16 rounded-[4rem] bg-gradient-to-br from-neutral-900 to-black border border-white/5 text-center relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none" />
                    <div className="relative z-10 flex flex-col items-center">
                        <div className="w-20 h-20 rounded-3xl bg-amber-500/10 flex items-center justify-center text-amber-500 mb-8 border border-amber-500/20 shadow-[0_0_50px_rgba(245,158,11,0.1)]">
                            <Gavel size={40} />
                        </div>
                        <h2 className="text-4xl md:text-6xl font-display text-white mb-6">Strategy <span className="text-gradient-gold italic">Ready?</span></h2>
                        <p className="text-neutral-500 max-w-xl mx-auto font-light leading-relaxed mb-12">
                            The journey ahead is mapped, but the strategy is dynamic. Our AI continuously updates these timestamps based on the latest High Court rulings.
                        </p>
                        <div className="flex gap-6">
                            <Link
                                to="/vakeel-connect"
                                className="px-10 py-5 rounded-full bg-white text-black font-bold text-sm tracking-widest uppercase hover:bg-neutral-200 transition-all"
                            >
                                Connect with legal aid
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChitraDrishti;

