import React, { useState } from "react";
import { ArrowLeft, Send, Upload, Info, CheckCircle, FileText, Landmark, Clock, ShieldCheck, Mail } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const DispatchReply: React.FC = () => {
    const navigate = useNavigate();
    const [trackingNumber, setTrackingNumber] = useState("");
    const [isUploaded, setIsUploaded] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleUpload = () => {
        setIsSubmitting(true);
        setTimeout(() => {
            setIsUploaded(true);
            setIsSubmitting(false);
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-black text-white pt-32 pb-20 px-4 relative overflow-hidden selection:bg-sky-500/30">
            {/* Ambient Lighting */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-0 left-0 w-[50vw] h-[50vh] bg-sky-900/10 blur-[120px] rounded-full opacity-50" />
                <div className="absolute bottom-0 right-0 w-[40vw] h-[40vh] bg-indigo-900/10 blur-[100px] rounded-full opacity-50" />
            </div>

            <div className="relative z-10 max-w-6xl mx-auto">
                <header className="mb-12 flex items-center justify-between">
                    <div className="flex items-center gap-6">
                        <button
                            onClick={() => navigate(-1)}
                            className="p-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all group"
                        >
                            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                        </button>
                        <div>
                            <h1 className="text-4xl font-display font-medium text-white italic">Dispatch <span className="text-gradient-blue">& Proof</span></h1>
                            <p className="text-neutral-500 text-[10px] font-black uppercase tracking-[0.2em] mt-1">Procedural Compliance: Sec 138 NI Act</p>
                        </div>
                    </div>
                    <Link
                        to="/vault"
                        className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs font-bold uppercase tracking-widest hover:bg-white/10 transition-all"
                    >
                        < Landmark size={16} className="text-sky-400" /> View DocVault
                    </Link>
                </header>

                <div className="grid lg:grid-cols-12 gap-12">
                    {/* Left - Procedural Guide */}
                    <div className="lg:col-span-7 space-y-8 animate-slide-in-left">
                        <div className="p-10 rounded-[3rem] bg-neutral-900/40 border border-white/5 backdrop-blur-xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-40 h-40 bg-sky-500/5 blur-[60px]" />

                            <h3 className="text-2xl font-display text-white mb-8 border-b border-white/5 pb-4">Dispatch Instructions (India)</h3>

                            <div className="space-y-8">
                                <section className="flex gap-6">
                                    <div className="shrink-0 w-12 h-12 rounded-2xl bg-sky-500/10 flex items-center justify-center text-sky-400 border border-sky-500/20">
                                        <Mail size={24} />
                                    </div>
                                    <div className="space-y-2">
                                        <h4 className="font-bold text-white tracking-tight">1. Registered Post w/ AD or Speed Post</h4>
                                        <p className="text-sm text-neutral-400 leading-relaxed font-light">
                                            In India, legal replies MUST be sent via <span className="text-white font-medium italic">Registered Post with Acknowledgement Due (AD)</span> or <span className="text-white font-medium italic">Speed Post</span>. Courier services are often challenged in court.
                                        </p>
                                    </div>
                                </section>

                                <section className="flex gap-6">
                                    <div className="shrink-0 w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-400 border border-amber-500/20">
                                        <FileText size={24} />
                                    </div>
                                    <div className="space-y-2">
                                        <h4 className="font-bold text-white tracking-tight">2. Preserve the Original Receipt</h4>
                                        <p className="text-sm text-neutral-400 leading-relaxed font-light">
                                            The postal receipt is your <span className="text-amber-400 font-bold">Primary Evidence</span>. It proves you attempted service within the 15-day window. Take a clear photo immediately.
                                        </p>
                                    </div>
                                </section>

                                <section className="flex gap-6">
                                    <div className="shrink-0 w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 border border-emerald-500/20">
                                        <ShieldCheck size={24} />
                                    </div>
                                    <div className="space-y-2">
                                        <h4 className="font-bold text-white tracking-tight">3. Acknowledgement Card (AD)</h4>
                                        <p className="text-sm text-neutral-400 leading-relaxed font-light">
                                            If using RPAD, the postman will return a signed 'AD Card'. This is conclusive proof of delivery. Scan and upload it once received.
                                        </p>
                                    </div>
                                </section>
                            </div>
                        </div>

                        <div className="p-8 rounded-[2rem] bg-indigo-900/10 border border-indigo-500/20 flex items-start gap-4">
                            <Clock className="text-indigo-400 shrink-0" size={24} />
                            <div>
                                <h5 className="text-sm font-bold text-white mb-1 tracking-tight">AI Deadline Tracker</h5>
                                <p className="text-xs text-neutral-400 leading-relaxed font-light">
                                    Based on your notice received on Dec 24, you must dispatch this reply before <span className="text-indigo-400 font-bold">08 Jan 2026</span> (4:00 PM Post Office close).
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right - Proof Submission */}
                    <div className="lg:col-span-5 space-y-6 animate-slide-in-right">
                        <div className="p-8 rounded-[3rem] bg-neutral-900/60 border border-white/10 backdrop-blur-2xl">
                            <h3 className="text-xl font-bold text-white mb-8 tracking-tight">Submit Postal Proof</h3>

                            <div className="space-y-6">
                                <div>
                                    <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-neutral-500 mb-2">Recipient Lawyer / Party</label>
                                    <input
                                        type="text"
                                        defaultValue="Adv. S. K. Sharma (Global Finance)"
                                        readOnly
                                        className="w-full bg-white/5 border border-white/5 rounded-xl px-5 py-4 text-neutral-400 text-sm focus:outline-none"
                                    />
                                </div>

                                <div>
                                    <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-neutral-500 mb-2">Tracking Number (Speed Post / RPAD)</label>
                                    <input
                                        type="text"
                                        value={trackingNumber}
                                        onChange={(e) => setTrackingNumber(e.target.value)}
                                        placeholder="e.g. EU123456789IN"
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white text-sm focus:border-sky-500/50 transition-all focus:outline-none placeholder:text-neutral-700"
                                    />
                                </div>

                                <div>
                                    <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-neutral-500 mb-2">Upload Postal Receipt</label>
                                    <div
                                        className={`w-full aspect-video rounded-2xl border-2 border-dashed transition-all duration-300 flex flex-col items-center justify-center gap-4 cursor-pointer
                                            ${isUploaded ? 'border-emerald-500/50 bg-emerald-500/5' : 'border-neutral-800 hover:border-sky-500/30 hover:bg-white/5'}`}
                                        onClick={handleUpload}
                                    >
                                        {isSubmitting ? (
                                            <div className="flex flex-col items-center gap-2">
                                                <div className="w-8 h-8 rounded-full border-4 border-sky-500/30 border-t-sky-500 animate-spin" />
                                                <span className="text-[10px] font-bold text-sky-500 uppercase">Processing...</span>
                                            </div>
                                        ) : isUploaded ? (
                                            <>
                                                <div className="w-12 h-12 rounded-full bg-emerald-500 flex items-center justify-center text-black shadow-lg shadow-emerald-500/20 animate-fade-in">
                                                    <CheckCircle size={24} />
                                                </div>
                                                <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">Receipt Verified</span>
                                            </>
                                        ) : (
                                            <>
                                                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-neutral-600 border border-white/5">
                                                    <Upload size={24} />
                                                </div>
                                                <span className="text-xs font-bold text-neutral-500 uppercase tracking-widest">Select Image or PDF</span>
                                            </>
                                        )}
                                    </div>
                                </div>

                                <button
                                    className={`w-full py-5 rounded-2xl font-black text-xs uppercase tracking-widest transition-all
                                        ${isUploaded && trackingNumber
                                            ? 'bg-sky-500 text-black hover:bg-sky-400 hover:scale-[1.02] shadow-xl shadow-sky-500/20'
                                            : 'bg-neutral-800 text-neutral-600 cursor-not-allowed'}`}
                                    onClick={() => isUploaded && trackingNumber && navigate("/timeline")}
                                >
                                    Confirm Action & Update Timeline
                                </button>
                            </div>
                        </div>

                        <div className="p-6 rounded-2xl bg-white/5 border border-white/5 flex items-start gap-4">
                            <div className="shrink-0 w-10 h-10 rounded-xl bg-sky-500/10 flex items-center justify-center text-sky-400">
                                <Info size={18} />
                            </div>
                            <p className="text-[11px] text-neutral-500 leading-relaxed italic">
                                Note: Once confirmed, this event will be marked as "Completed" on your roadmap and your lawyer will be notified.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DispatchReply;
