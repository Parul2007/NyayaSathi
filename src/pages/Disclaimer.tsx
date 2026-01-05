import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, AlertTriangle, Scale, ShieldOff, Gavel, Info, ShieldCheck, FileWarning, MapPin } from "lucide-react";

const Disclaimer: React.FC = () => {
    return (
        <div className="min-h-screen bg-black text-white pb-20 pt-32 px-4 relative overflow-hidden">
            {/* Premium Background */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-gradient-to-b from-red-900/20 via-orange-900/10 to-transparent blur-[150px] rounded-full opacity-60" />
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
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 mb-6 backdrop-blur-md">
                        <ShieldCheck size={14} className="text-red-400" />
                        <span className="text-xs font-bold text-red-300 tracking-widest uppercase">Legal Protection</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-bold font-display mb-6 leading-tight">
                        Legal <span className="bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">Disclaimer</span>
                    </h1>
                    <p className="text-xl text-neutral-400 leading-relaxed font-light max-w-3xl">
                        Important legal notices and limitations of liability. Please read carefully before using NyayaSathi services.
                    </p>
                    <div className="mt-6 inline-flex items-center gap-2 text-sm text-neutral-500">
                        <span className="px-3 py-1 bg-white/5 rounded-full border border-white/5 font-mono">Last Updated: January 2026</span>
                    </div>
                </header>

                {/* Critical Notice Banner */}
                <div className="mb-16 group relative rounded-[2.5rem] overflow-hidden animate-slide-up border border-red-500/30 bg-gradient-to-br from-red-500/10 to-orange-500/5 p-10 hover:border-red-500/40 transition-all duration-500 backdrop-blur-xl">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent rounded-[2.5rem]" />
                    <div className="relative flex items-start gap-6">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-500/30 to-orange-500/30 border border-red-500/40 flex items-center justify-center shrink-0 shadow-lg shadow-red-900/30 animate-pulse">
                            <AlertTriangle size={32} className="text-red-400" />
                        </div>
                        <div className="flex-1">
                            <h2 className="text-3xl font-bold text-red-400 mb-4 font-display">Important Notice</h2>
                            <p className="text-neutral-200 leading-relaxed text-lg">
                                By accessing or using NyayaSathi, you acknowledge that you have read, understood, and agree to be bound by this disclaimer. This is a legal agreement between you and NyayaSathi.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Main Content Cards */}
                <div className="space-y-10">

                    {/* No Legal Advice Card */}
                    <div className="group relative p-10 rounded-[2.5rem] bg-[#0a0a0f] border border-amber-500/20 hover:border-amber-500/30 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl cursor-pointer animate-slide-up backdrop-blur-xl" style={{ animationDelay: '100ms' }}>
                        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="relative">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500/20 to-yellow-500/20 border border-amber-500/30 flex items-center justify-center shadow-lg shadow-amber-900/20">
                                    <Scale size={28} className="text-amber-400" />
                                </div>
                                <h2 className="text-3xl font-bold text-white font-display">No Professional Legal Advice</h2>
                            </div>
                            <div className="space-y-4 text-neutral-300 leading-relaxed">
                                <p className="text-lg">
                                    The information provided by <strong className="text-white">NyayaSathi</strong> is for <strong className="text-amber-400">general informational purposes only</strong>. All information on the Site is provided in good faith; however, we make no representation or warranty of any kind regarding the accuracy, adequacy, validity, reliability, or completeness of any information.
                                </p>
                                <div className="p-6 rounded-2xl bg-amber-500/5 border border-amber-500/10">
                                    <p className="text-amber-300 font-bold text-lg">
                                        ⚠️ NyayaSathi is NOT a law firm and does NOT provide legal advice.
                                    </p>
                                    <p className="text-neutral-300 mt-2">
                                        Our AI analysis, case summaries, and document generation features are educational tools. They should NOT replace professional legal counsel from a licensed advocate.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* As-Is Basis Card */}
                    <div className="group relative p-10 rounded-[2.5rem] bg-[#0a0a0f] border border-blue-500/20 hover:border-blue-500/30 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl cursor-pointer animate-slide-up backdrop-blur-xl" style={{ animationDelay: '200ms' }}>
                        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="relative">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30 flex items-center justify-center shadow-lg shadow-blue-900/20">
                                    <Info size={28} className="text-blue-400" />
                                </div>
                                <h2 className="text-3xl font-bold text-white font-display">"As-Is" & "As-Available" Basis</h2>
                            </div>
                            <div className="space-y-4 text-neutral-300 leading-relaxed">
                                <p className="text-lg">
                                    Your use of the Site and reliance on any information is <strong className="text-white">solely at your own risk</strong>. This site and all services are provided on an "AS IS" and "AS AVAILABLE" basis without warranties of any kind.
                                </p>
                                <div className="grid sm:grid-cols-2 gap-4">
                                    {[
                                        "No guarantee of uninterrupted service",
                                        "AI models may produce inaccurate information",
                                        "No warranty of timeliness or security",
                                        "Always verify with qualified professionals"
                                    ].map((item, idx) => (
                                        <div key={idx} className="flex items-start gap-2 p-3 rounded-xl bg-white/5 border border-white/5">
                                            <FileWarning size={16} className="text-blue-400 shrink-0 mt-1" />
                                            <span className="text-sm">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Limitation of Liability Card */}
                    <div className="group relative p-10 rounded-[2.5rem] bg-gradient-to-br from-red-500/10 to-orange-500/5 border border-red-500/30 hover:border-red-500/40 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl cursor-pointer animate-slide-up backdrop-blur-xl" style={{ animationDelay: '300ms' }}>
                        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="relative">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-red-500/30 to-orange-500/30 border border-red-500/40 flex items-center justify-center shadow-lg shadow-red-900/30">
                                    <ShieldOff size={28} className="text-red-400" />
                                </div>
                                <h2 className="text-3xl font-bold text-white font-display">Limitation of Liability</h2>
                            </div>
                            <div className="space-y-4 text-neutral-300 leading-relaxed">
                                <p className="text-lg">
                                    To the maximum extent permitted by law, <strong className="text-white">NyayaSathi</strong> and its affiliates shall NOT be liable for:
                                </p>
                                <div className="space-y-3">
                                    {[
                                        "Indirect, incidental, special, consequential, or punitive damages",
                                        "Loss of profits or revenues, whether direct or indirect",
                                        "Loss of data, use, goodwill, or other intangible losses",
                                        "Damages from your access to/use of our services"
                                    ].map((item, idx) => (
                                        <div key={idx} className="flex items-start gap-3 p-4 rounded-xl bg-red-500/5 border border-red-500/10">
                                            <div className="w-6 h-6 rounded-full bg-red-500/20 border border-red-500/30 flex items-center justify-center shrink-0 mt-0.5">
                                                <span className="text-red-400 text-xs font-bold">{idx + 1}</span>
                                            </div>
                                            <span className="text-neutral-200">{item}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="p-6 rounded-2xl bg-black/40 border border-red-500/20">
                                    <p className="text-red-300 font-bold text-lg">
                                        Under no circumstance shall we have any liability to you for any loss or damage incurred from using this site.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Jurisdictional Clause Card */}
                    <div className="group relative p-10 rounded-[2.5rem] bg-[#0a0a0f] border border-indigo-500/20 hover:border-indigo-500/30 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl cursor-pointer animate-slide-up backdrop-blur-xl" style={{ animationDelay: '400ms' }}>
                        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="relative">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 flex items-center justify-center shadow-lg shadow-indigo-900/20">
                                    <Gavel size={28} className="text-indigo-400" />
                                </div>
                                <h2 className="text-3xl font-bold text-white font-display">Jurisdictional Clause</h2>
                            </div>
                            <div className="flex items-start gap-4">
                                <MapPin size={24} className="text-indigo-400 shrink-0 mt-1" />
                                <p className="text-neutral-300 leading-relaxed text-lg">
                                    Any dispute arising from your use of NyayaSathi shall be subject to the <strong className="text-white">exclusive jurisdiction of the courts in New Delhi, India</strong>. These terms are governed by the laws of India, without regard to conflict of law principles.
                                </p>
                            </div>
                        </div>
                    </div>

                </div>

                {/* CTA Section */}
                <div className="mt-20 p-10 rounded-[2.5rem] bg-gradient-to-br from-emerald-500/10 to-teal-500/5 border border-emerald-500/20 text-center animate-fade-in backdrop-blur-xl" style={{ animationDelay: '500ms' }}>
                    <h2 className="text-3xl font-bold text-white font-display mb-4">Need Professional Legal Advice?</h2>
                    <p className="text-neutral-300 leading-relaxed text-lg mb-6 max-w-2xl mx-auto">
                        We strongly encourage you to seek professional legal counsel for any specific legal matter.
                    </p>
                    <Link
                        to="/vakeel-connect"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black rounded-full font-bold hover:bg-neutral-200 transition-all shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:scale-105 group"
                    >
                        <span>Find Verified Lawyers</span>
                        <ArrowLeft size={18} className="rotate-180 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Disclaimer;
