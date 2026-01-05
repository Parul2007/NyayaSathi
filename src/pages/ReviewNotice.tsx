import React, { useState } from "react";
import { ArrowLeft, Download, Shield, Eye, AlertTriangle, FileText, CheckCircle, Info, Zap, Search } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const ReviewNotice: React.FC = () => {
    const navigate = useNavigate();
    const [selectedId, setSelectedId] = useState<number | null>(null);

    const insights = [
        {
            id: 1,
            title: "Invalid Notice Window",
            description: "The notice was sent 45 days after the dishonor. Under NI Act, it must be sent within 30 days. This is a strong defense.",
            type: "critical",
            icon: <AlertTriangle size={20} />,
            color: "amber"
        },
        {
            id: 2,
            title: "Missing Liability Details",
            description: "The complainant fails to specify the legal debt for which the cheque was issued. A vital loophole.",
            type: "warning",
            icon: <Search size={20} />,
            color: "blue"
        },
        {
            id: 3,
            title: "Incorrect Accused Name",
            description: "The notice addresses the Director personally for a company debt without invoking Section 141.",
            type: "info",
            icon: <Info size={20} />,
            color: "purple"
        }
    ];

    return (
        <div className="min-h-screen bg-black text-white pt-32 pb-20 px-4 relative overflow-hidden selection:bg-amber-500/30">
            {/* Immersive Background */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-0 left-0 w-[50vw] h-[50vh] bg-red-900/10 blur-[120px] rounded-full opacity-50" />
                <div className="absolute bottom-0 right-0 w-[40vw] h-[40vh] bg-amber-900/10 blur-[100px] rounded-full opacity-50" />
                <div className="absolute inset-0 bg-grid-white/[0.02]" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto">
                {/* Top Action Bar */}
                <div className="flex items-center justify-between mb-12 animate-fade-in">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all group"
                    >
                        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                        <span className="text-[10px] font-black uppercase tracking-widest">Back to Timeline</span>
                    </button>

                    <div className="flex gap-4">
                        <button className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-neutral-400 font-bold text-xs uppercase tracking-widest transition-all hover:text-white hover:bg-white/10">
                            <Shield size={16} /> Verify Authenticity
                        </button>
                        <button className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-black font-bold text-xs uppercase tracking-widest transition-all hover:bg-emerald-400 hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                            <Download size={16} /> Download Case PDF
                        </button>
                    </div>
                </div>

                <div className="grid lg:grid-cols-12 gap-12">

                    {/* Left - Legal Document Canvas */}
                    <div className="lg:col-span-12 xl:col-span-8 flex flex-col gap-6 animate-slide-in-left">
                        <div className="relative group">
                            {/* Document Frame */}
                            <div className="bg-[#fdfdfd] text-black shadow-2xl rounded-[1rem] md:rounded-[2rem] overflow-hidden border-8 border-neutral-900 min-h-[1000px] flex flex-col">

                                {/* Paper Texture & Grain */}
                                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')] opacity-10 pointer-events-none" />

                                {/* Document Header */}
                                <div className="p-16 pb-0 flex flex-col items-center">
                                    <h3 className="text-xl font-display font-black tracking-[0.3em] uppercase mb-2 border-b-2 border-black pb-2">LEGAL NOTICE</h3>
                                    <p className="text-[10px] font-bold tracking-widest mb-12">BY REGISTERED POST WITH AD / SPEED POST</p>

                                    <div className="w-full flex justify-between text-xs font-serif font-semibold italic">
                                        <span>Ref No: NS/2025/INV/089</span>
                                        <span>Date: 24th December, 2025</span>
                                    </div>
                                    <div className="w-full h-px bg-black/10 my-8" />
                                </div>

                                {/* Document Body */}
                                <div className="px-16 pb-20 font-serif leading-relaxed text-lg text-neutral-800 space-y-8">
                                    <div>
                                        <p className="font-bold underline mb-4">TO,</p>
                                        <div className="ml-8 space-y-1 not-italic">
                                            <p>Mr. Rajesh Kumar,</p>
                                            <p>Managing Director, TechStream Solutions Pvt. Ltd.,</p>
                                            <p>A-45, Hitech Park, Sector 62,</p>
                                            <p>Noida, UP - 201301.</p>
                                        </div>
                                    </div>

                                    <div className="relative group/clause cursor-help">
                                        <p>
                                            <span className="font-bold">Subject:</span> Notice under <span className="underline decoration-2 decoration-black/20">Section 138 of the Negotiable Instruments Act, 1881</span> regarding dishonor of Cheque No. 440912 for an amount of ₹4,50,000/-.
                                        </p>
                                    </div>

                                    <p>Dear Sir,</p>

                                    <p>
                                        Our client, <span className="font-bold">Global Finance Services Ltd.</span>, having its branch office at New Delhi, has instructed us to serve upon you this legal notice, the contents of which are as follows:
                                    </p>

                                    {/* Critical Point 1 */}
                                    <div
                                        className={`p-4 -mx-4 rounded-xl transition-all duration-300 relative group/anno cursor-pointer ${selectedId === 1 ? 'bg-amber-500/10 ring-2 ring-amber-500/50' : 'hover:bg-amber-500/5'}`}
                                        onClick={() => setSelectedId(1)}
                                    >
                                        <p className="relative z-10">
                                            1. That you, for and on behalf of the company, issued a cheque bearing No. 440912 dated 10th October 2025 for ₹4,50,000/- towards your legal liability. However, upon presentation on 20th October 2025, the same was returned unpaid with the remarks <span className="font-bold italic">"Insufficient Funds"</span>.
                                        </p>
                                        <div className="absolute -right-4 top-1/2 -translate-y-1/2 flex items-center gap-2 opacity-0 group-hover/anno:opacity-100 transition-opacity translate-x-full pr-8">
                                            <div className="w-8 h-px bg-amber-500" />
                                            <div className="bg-amber-500 text-black text-[9px] font-black px-2 py-1 rounded animate-pulse">AI ALERT</div>
                                        </div>
                                        {selectedId === 1 && (
                                            <div className="mt-3 p-4 bg-amber-500/10 border-l-4 border-amber-500 rounded-r-lg text-sm font-sans animate-fade-in">
                                                <div className="flex items-center gap-2 text-amber-700 font-bold mb-1">
                                                    <AlertTriangle size={14} /> DEFENSE LOOPHOLE
                                                </div>
                                                <p className="text-amber-900/70 border-none p-0 inline">The 30-day presentation window seems valid, but the notice was served 45 days after return. This violates Section 138(b).</p>
                                            </div>
                                        )}
                                    </div>

                                    {/* Critical Point 2 */}
                                    <div
                                        className={`p-4 -mx-4 rounded-xl transition-all duration-300 relative group/anno cursor-pointer ${selectedId === 2 ? 'bg-blue-500/10 ring-2 ring-blue-500/50' : 'hover:bg-blue-500/5'}`}
                                        onClick={() => setSelectedId(2)}
                                    >
                                        <p>
                                            2. Despite repeated verbal requests, you have failed to make the payment. Our client is hereby making a formal demand for the payment of the said amount within 15 days of receipt of this notice.
                                        </p>
                                        <div className="absolute -right-4 top-1/2 -translate-y-1/2 flex items-center gap-2 opacity-0 group-hover/anno:opacity-100 transition-opacity translate-x-full pr-8">
                                            <div className="w-8 h-px bg-blue-500" />
                                            <div className="bg-blue-500 text-white text-[9px] font-black px-2 py-1 rounded">MISSING INFO</div>
                                        </div>
                                    </div>

                                    <p>
                                        3. Please note that if you fail to remit the payment within 15 days, our client shall be constrained to initiate criminal proceedings under Section 138 of the NI Act, besides civil suit for recovery.
                                    </p>

                                    <div className="pt-12 text-right">
                                        <p>Sincerely,</p>
                                        <div className="h-20 w-40 ml-auto border-b border-black mb-4 flex items-center justify-center italic text-neutral-300 pointer-events-none font-serif">
                                            (Signature of Counsel)
                                        </div>
                                        <p className="font-bold">Adv. S. K. Sharma</p>
                                        <p className="text-sm">Enrolment No: D/402/2012</p>
                                    </div>
                                </div>
                            </div>

                            {/* Floating AI Helper */}
                            <div className="absolute top-1/2 -right-12 translate-x-full hidden xl:block space-y-4">
                                <div className="p-4 rounded-2xl bg-black/60 border border-white/10 backdrop-blur-xl animate-float">
                                    <Zap size={24} className="text-amber-400 mb-2" />
                                    <div className="text-[10px] font-black tracking-widest text-neutral-400">AI CONFIDENCE</div>
                                    <div className="text-2xl font-display text-white">88%</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right - Analysis Sidebar */}
                    <div className="lg:col-span-12 xl:col-span-4 space-y-8 animate-slide-in-right">
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 mb-3">
                                <Zap size={14} className="text-amber-500" />
                                <span className="text-[10px] font-black text-amber-500 tracking-widest uppercase">Intelligence Layer Actve</span>
                            </div>
                            <h2 className="text-4xl font-display text-white mb-2">Legal Artifact <span className="text-gradient-gold italic">Insights</span></h2>
                            <p className="text-neutral-500 text-sm font-light">Interactive highlights connected to your document. Click any point to view details.</p>
                        </div>

                        <div className="space-y-4">
                            {insights.map((item) => (
                                <div
                                    key={item.id}
                                    onClick={() => setSelectedId(item.id)}
                                    className={`p-6 rounded-[2rem] border transition-all duration-500 cursor-pointer group relative overflow-hidden
                                        ${selectedId === item.id ?
                                            `bg-gradient-to-br from-neutral-900 to-black border-${item.color}-500/50 shadow-2xl scale-105` :
                                            'bg-neutral-900/30 border-white/5 hover:border-white/10'}`}
                                >
                                    {selectedId === item.id && (
                                        <div className={`absolute top-0 right-0 w-32 h-32 bg-${item.color}-500/5 blur-[40px] pointer-events-none`} />
                                    )}

                                    <div className="flex items-start gap-4">
                                        <div className={`shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500
                                            ${selectedId === item.id ? `bg-${item.color}-500 text-black` : `bg-${item.color}-500/10 text-${item.color}-400 group-hover:scale-110`}`}>
                                            {item.icon}
                                        </div>
                                        <div>
                                            <h4 className={`font-bold mb-2 transition-colors duration-500 ${selectedId === item.id ? 'text-white' : 'text-neutral-400 group-hover:text-white'}`}>
                                                {item.title}
                                            </h4>
                                            <p className={`text-xs leading-relaxed font-light transition-colors duration-500 ${selectedId === item.id ? 'text-neutral-300' : 'text-neutral-500 group-hover:text-neutral-400'}`}>
                                                {item.description}
                                            </p>
                                        </div>
                                    </div>

                                    {selectedId === item.id && (
                                        <div className={`mt-4 pt-4 border-t border-white/5 flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-${item.color}-500`}>
                                            <span>Procedural Defense</span>
                                            <CheckCircle size={14} />
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Summary Strategy Card */}
                        <div className="p-10 rounded-[3rem] bg-gradient-to-br from-emerald-600/20 to-teal-900/20 border border-emerald-500/30 relative overflow-hidden">
                            <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-emerald-500/10 blur-[50px]" />
                            <h4 className="text-xl font-display text-white mb-4">Master Strategy</h4>
                            <p className="text-neutral-400 text-xs leading-relaxed font-light mb-8">
                                Based on the 45-day notice delay and the missing liability details, our AI recommends a <span className="text-emerald-400 font-bold">Strict Denial & Challenge</span> approach.
                            </p>
                            <Link
                                to="/timeline/file-reply"
                                className="w-full py-5 bg-emerald-500 text-black rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-emerald-400 transition-all flex items-center justify-center gap-3 shadow-[0_20px_40px_rgba(16,185,129,0.2)]"
                            >
                                Start Formal Reply <Zap size={16} />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReviewNotice;
