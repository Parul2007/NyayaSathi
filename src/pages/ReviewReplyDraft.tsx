import React, { useState } from "react";
import { ArrowLeft, CheckCircle, MessageSquare, AlertCircle, Edit3, Shield, Zap } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const ReviewReplyDraft: React.FC = () => {
    const navigate = useNavigate();
    const [reviewed, setReviewed] = useState(false);

    return (
        <div className="min-h-screen bg-black text-white pt-32 pb-20 px-4 relative overflow-hidden">
            {/* Background elements */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-[50vw] h-[50vh] bg-indigo-900/10 blur-[120px] rounded-full" />
                <div className="absolute bottom-0 left-0 w-[40vw] h-[40vh] bg-neutral-900/10 blur-[100px] rounded-full" />
            </div>

            <div className="relative z-10 max-w-6xl mx-auto">
                <div className="flex items-center justify-between mb-12">
                    <button
                        onClick={() => navigate(-1)}
                        className="p-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all group"
                    >
                        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                    </button>
                    <div className="flex gap-4">
                        <Link
                            to="/messages"
                            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 border border-white/10 font-bold text-xs uppercase tracking-widest hover:bg-white/10 transition-all"
                        >
                            <MessageSquare size={16} /> Consult Lawyer
                        </Link>
                        <button
                            onClick={() => {
                                setReviewed(true);
                                setTimeout(() => navigate("/timeline"), 1500);
                            }}
                            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-500 text-black font-bold text-xs uppercase tracking-widest hover:bg-amber-400 transition-all shadow-[0_0_20px_rgba(245,158,11,0.3)]"
                        >
                            <CheckCircle size={16} /> Mark as Reviewed
                        </button>
                    </div>
                </div>

                <div className="grid lg:grid-cols-12 gap-12">
                    {/* Left - Draft Content */}
                    <div className="lg:col-span-8 space-y-6">
                        <div className="p-8 md:p-12 rounded-[3rem] bg-neutral-900/40 border border-white/10 backdrop-blur-xl relative">
                            <div className="absolute top-10 right-10">
                                <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-[9px] font-black text-amber-500 uppercase tracking-widest">Draft v2.1</span>
                            </div>

                            <h1 className="text-3xl font-display font-bold mb-8 italic">Draft: Formal Reply</h1>

                            <div className="space-y-6 font-serif text-neutral-300 leading-relaxed">
                                <p>To,</p>
                                <p>The Legal Department, State Bank of India,<br />Sector 18 Branch, Lucknow.</p>
                                <p className="font-bold underline">Subject: Reply to Legal Notice u/s 138 of NI Act dated 24/12/2025.</p>
                                <p>Sir/Madam,</p>
                                <p>
                                    Under instructions from and on behalf of our client, we hereby respond to your notice with the following facts. The allegations mentioned in your notice are specifically denied as being false and baseless.
                                </p>
                                <p className="p-4 bg-amber-500/5 border-l-2 border-amber-500 text-neutral-400 italic">
                                    [Section Highlighted by AI: Denial of intentional default based on technical glitch in ECS mandate.]
                                </p>
                                <p>
                                    It is pertinent to mention that my client has always maintained sufficient balance. The dishonor occurred due to a technical server error on the bank's processing end, for which my client is not liable.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right - Feedback & Context */}
                    <div className="lg:col-span-4 space-y-6">
                        <div className="p-8 rounded-[2rem] bg-white text-black">
                            <div className="flex items-center gap-3 mb-6">
                                <Shield className="text-neutral-900" size={20} />
                                <h3 className="font-bold uppercase tracking-widest text-xs">Quality Score</h3>
                            </div>
                            <div className="flex items-baseline gap-2 mb-4">
                                <span className="text-5xl font-display font-bold italic">94</span>
                                <span className="text-sm font-bold uppercase tracking-widest">/ 100</span>
                            </div>
                            <p className="text-xs text-neutral-600 leading-relaxed font-medium">
                                This draft covers all essential legal grounds and includes specific technical denials that are crucial for court defense.
                            </p>
                        </div>

                        <div className="p-8 rounded-[2rem] bg-neutral-900/50 border border-white/10 backdrop-blur-xl">
                            <h3 className="font-bold text-white uppercase tracking-widest text-xs mb-6">Suggestions</h3>
                            <div className="space-y-4">
                                <div className="p-4 rounded-xl bg-white/5 border border-white/5 flex gap-3">
                                    <Edit3 size={16} className="text-indigo-400 shrink-0" />
                                    <p className="text-[11px] text-neutral-400 leading-relaxed">Add the reference number of the technical complaint filed with the bank.</p>
                                </div>
                                <div className="p-4 rounded-xl bg-white/5 border border-white/5 flex gap-3">
                                    <Zap size={16} className="text-amber-400 shrink-0" />
                                    <p className="text-[11px] text-neutral-400 leading-relaxed">AI suggests mentioning Section 143A for interim compensation defense.</p>
                                </div>
                            </div>
                        </div>

                        {reviewed && (
                            <div className="p-6 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center gap-3 animate-fade-in">
                                <CheckCircle className="text-emerald-500" size={20} />
                                <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">Successfully Reviewed!</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReviewReplyDraft;
