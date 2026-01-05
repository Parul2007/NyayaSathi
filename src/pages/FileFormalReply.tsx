import React, { useState } from "react";
import { ArrowLeft, Save, Send, FileText, Shield, Zap, AlertCircle, CheckCircle, Plus, Info, Gavel } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

interface LegalGround {
    id: string;
    title: string;
    description: string;
    draftSnippet: string;
}

const LEGAL_GROUNDS: LegalGround[] = [
    {
        id: "banking-error",
        title: "Technical Banking Error",
        description: "Return caused by ECS/Server glitch, not lack of funds.",
        draftSnippet: "That the dishonor of the said cheque was not due to any shortage of funds, but rather due to a documented technical error in the bank's Automated Clearing House (ACH) processing system. My client has already initiated a grievance with the bank (Ref No: BK/ERR/903)."
    },
    {
        id: "partial-payment",
        title: "Partial Payment Made",
        description: "Significant amount was already paid before notice was served.",
        draftSnippet: "That before the issuance of the subject notice, my client had already remitted a sum of ₹1,50,000/- via IMPS (Ref: TXN88290) towards the said liability. Therefore, the demand made in the notice for the full cheque amount is legally unsustainable under Section 138 of the NI Act."
    },
    {
        id: "delayed-notice",
        title: "Statutory Delay",
        description: "Notice was served after the mandatory 30-day window.",
        draftSnippet: "That the alleged legal notice dated 24th December 2025 was received by my client only on 15th January 2026, which is beyond the statutory 30-day period from the date of receipt of information regarding the dishonor from the bank, thereby failing to satisfy the requirements of Section 138(b) of the NI Act."
    },
    {
        id: "no-debt",
        title: "Denial of Liability",
        description: "Cheque was issued for security, not for an existing debt.",
        draftSnippet: "That the cheque in question was handed over to your client purely as a 'Security Cheque' at the time of the initial agreement and was not intended to be encashed against any legally enforceable debt or liability existing at the time of presentation."
    }
];

const FileFormalReply: React.FC = () => {
    const navigate = useNavigate();
    const [selectedGrounds, setSelectedGrounds] = useState<string[]>([]);
    const [replyContent, setReplyContent] = useState("");
    const [isGenerating, setIsGenerating] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    const toggleGround = (id: string) => {
        setSelectedGrounds(prev =>
            prev.includes(id) ? prev.filter(g => g !== id) : [...prev, id]
        );
    };

    const generateAIDraft = () => {
        setIsGenerating(true);
        setTimeout(() => {
            const header = "To,\nAdv. S. K. Sharma,\nCounsel for Global Finance Services Ltd.,\nNew Delhi.\n\nSubject: REPLY TO LEGAL NOTICE DATED 24/12/2025 UNDER SECTION 138 NI ACT.\n\nSir/Madam,\n\nUnder instructions from my client, Mr. Rajesh Kumar, I hereby respond to your notice as follows:\n\n";

            const body = selectedGrounds.length > 0
                ? selectedGrounds.map(id => {
                    const ground = LEGAL_GROUNDS.find(g => g.id === id);
                    return `${ground?.draftSnippet}`;
                }).join("\n\n")
                : "That my client specifically denies all the allegations made in the said notice. The cheque in question was not issued against any legally enforceable debt.";

            const footer = "\n\nIn view of the above, your client is requested to withdraw the said notice and refrain from initiating any malicious legal proceedings, failing which my client shall be constrained to defend the same at your client's risk and cost.\n\nYours faithfully,\n[Your Name/Counsel]";

            setReplyContent(header + body + footer);
            setIsGenerating(false);
        }, 1500);
    };

    const handleSave = () => {
        setIsSaving(true);
        setTimeout(() => {
            setIsSaving(false);
            alert("Legal reply draft saved to your vault!");
        }, 1000);
    };

    return (
        <div className="min-h-screen bg-black text-white pt-32 pb-20 px-4 relative overflow-hidden selection:bg-emerald-500/30">
            {/* Background */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-[60vw] h-[60vh] bg-emerald-900/10 blur-[150px] rounded-full opacity-50" />
                <div className="absolute bottom-0 left-0 w-[50vw] h-[50vh] bg-blue-900/10 blur-[150px] rounded-full opacity-50" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto">
                {/* Header Actions */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 animate-fade-in">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => navigate(-1)}
                            className="p-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all group"
                        >
                            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                        </button>
                        <div>
                            <h1 className="text-4xl font-display font-medium text-white italic">Formal <span className="text-gradient-emerald">Reply Builder</span></h1>
                            <p className="text-neutral-500 text-[10px] font-black uppercase tracking-[0.2em] mt-1">Procedural Drafting Module</p>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <Link
                            to="/vakeel-connect"
                            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 border border-white/10 font-bold text-xs uppercase tracking-widest hover:bg-white/10 transition-all"
                        >
                            <Shield size={16} />
                            Get Expert Vetting
                        </Link>
                        <Link
                            to="/timeline/dispatch"
                            className="flex items-center gap-2 px-8 py-3 rounded-xl bg-emerald-500 text-black font-extrabold text-xs uppercase tracking-widest hover:bg-emerald-400 transition-all shadow-[0_15px_30px_rgba(16,185,129,0.2)]"
                        >
                            <Send size={16} /> Finalize & Dispatch
                        </Link>
                    </div>
                </div>

                <div className="grid lg:grid-cols-12 gap-12">

                    {/* Left - Legal Grounds Selection */}
                    <div className="lg:col-span-12 xl:col-span-4 space-y-8 animate-slide-in-left">
                        <div className="p-8 rounded-[2.5rem] bg-neutral-900/50 border border-white/5 backdrop-blur-xl">
                            <div className="flex items-center gap-3 mb-8">
                                <Gavel className="text-emerald-400" size={24} />
                                <h3 className="text-lg font-bold tracking-tight text-white">Select Defenses</h3>
                            </div>

                            <div className="space-y-4">
                                {LEGAL_GROUNDS.map((ground) => (
                                    <div
                                        key={ground.id}
                                        onClick={() => toggleGround(ground.id)}
                                        className={`p-5 rounded-2xl border transition-all duration-300 cursor-pointer group
                                            ${selectedGrounds.includes(ground.id)
                                                ? 'bg-emerald-500/10 border-emerald-500/50 ring-1 ring-emerald-500/20'
                                                : 'bg-white/5 border-white/5 hover:border-white/20'}`}
                                    >
                                        <div className="flex items-start justify-between mb-2">
                                            <h4 className={`text-sm font-bold tracking-tight ${selectedGrounds.includes(ground.id) ? 'text-emerald-400' : 'text-neutral-300'}`}>
                                                {ground.title}
                                            </h4>
                                            {selectedGrounds.includes(ground.id) ? (
                                                <CheckCircle size={16} className="text-emerald-500" />
                                            ) : (
                                                <Plus size={16} className="text-neutral-600 group-hover:text-neutral-400" />
                                            )}
                                        </div>
                                        <p className="text-[11px] text-neutral-500 leading-relaxed font-light">{ground.description}</p>
                                    </div>
                                ))}
                            </div>

                            <button
                                onClick={generateAIDraft}
                                disabled={isGenerating}
                                className="w-full mt-10 py-5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-black text-xs uppercase tracking-[0.2em] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 shadow-xl"
                            >
                                <Zap size={18} className={isGenerating ? "animate-pulse" : ""} />
                                {isGenerating ? "Synthesizing..." : "Generate AI Draft"}
                            </button>
                        </div>

                        <div className="p-8 rounded-[2rem] bg-amber-500/5 border border-amber-500/10 flex items-start gap-4">
                            <Info className="text-amber-500 shrink-0" size={20} />
                            <div className="space-y-1">
                                <h5 className="text-[10px] font-black text-amber-500 uppercase tracking-widest">Compliance Tip</h5>
                                <p className="text-[11px] text-neutral-400 leading-relaxed font-light">
                                    Ensure that every ground selected above is backed by documentary evidence. False claims in a legal reply can be used as evidence of bad faith.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right - Drafting Editor */}
                    <div className="lg:col-span-12 xl:col-span-8 flex flex-col gap-6 animate-slide-in-right">
                        <div className="relative group min-h-[700px]">
                            {/* Editor UI */}
                            <div className="absolute inset-0 bg-neutral-900 rounded-[3rem] border border-white/10 shadow-2xl flex flex-col overflow-hidden">
                                <div className="p-8 border-b border-white/5 bg-white/5 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                                        <div className="w-2.5 h-2.5 rounded-full bg-amber-500/50" />
                                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/50" />
                                        <span className="text-[10px] font-black text-neutral-500 uppercase tracking-widest ml-4">Reply_Draft_v1.0.docx</span>
                                    </div>
                                    <div className="flex items-center gap-4 text-neutral-500">
                                        <FileText size={16} />
                                        <span className="text-[10px] font-bold">{replyContent.split(' ').length} Words</span>
                                    </div>
                                </div>

                                <textarea
                                    value={replyContent}
                                    onChange={(e) => setReplyContent(e.target.value)}
                                    placeholder="Select defenses on the left and click 'Generate AI Draft' to begin, or type your response manually here..."
                                    className="flex-1 w-full bg-transparent p-12 text-lg font-serif text-neutral-300 leading-relaxed focus:outline-none resize-none placeholder:text-neutral-700 selection:bg-emerald-500/30"
                                />

                                <div className="p-8 bg-black/40 border-t border-white/5 flex items-center justify-between">
                                    <div className="flex gap-3">
                                        <button className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-widest text-neutral-400 hover:text-white transition-colors">Heading</button>
                                        <button className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-widest text-neutral-400 hover:text-white transition-colors">Body</button>
                                        <button className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-widest text-neutral-400 hover:text-white transition-colors">Signature</button>
                                    </div>
                                    <div className="flex items-center gap-2 text-emerald-500">
                                        <Shield size={14} />
                                        <span className="text-[10px] font-black uppercase tracking-widest">Valid Format Detected</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default FileFormalReply;
