import React, { useState, useMemo } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
    ArrowLeft, Shield, Clock, Gavel, Scale, FileText,
    Share2, Download, ExternalLink, Calendar, MapPin,
    User, AlertTriangle, CheckCircle2, ChevronRight, Lock,
    Briefcase, Info, List, Database, Users, ShieldCheck
} from "lucide-react";

// Types for our detailed case structure
interface CaseContent {
    id: string;
    category: string;
    title: string;
    status: string;
    nextHearing: string;
    court: string;
    judge: string;
    valuation?: string;
    claimAmount?: string;
    lastAction: string;
    subject?: string;
    nature?: string;
    parties: {
        plaintiff: { name: string; resident: string; counsel: string; alias?: string };
        defendant: { name: string; office: string; counsel: string; alias?: string };
    };
    synopsis: {
        main: string;
        claims: { label: string; text: string }[];
        contention: string;
    };
    chronology: { date: string; type: string; detail: string }[];
    technicalData?: {
        title: string;
        description: string;
        formula?: string;
        discrepancy?: string;
        calcDetails?: string;
    };
    evidence: { id: string; detail: string }[];
    nextSteps: {
        urgent?: string;
        focus: string[];
    };
    verifiedBy: string;
}

const CaseDetail: React.FC = () => {
    const params = useParams();
    const id = params["*"];
    const navigate = useNavigate();
    const [pin, setPin] = useState("");
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [error, setError] = useState("");

    const caseDataMap: Record<string, CaseContent> = {
        "CN-88219/2025": {
            id: "CN-88219/2025",
            category: "Civil Suit (Property & Title)",
            title: "Property Title Dispute - Sector 15",
            status: "Ongoing",
            nextHearing: "Jan 15, 2026",
            court: "District Court, Lucknow",
            judge: "Hon. S.P. Vishwakarma",
            valuation: "₹ 1,25,00,000/-",
            lastAction: "Commissioner's Report Filed (Jan 03, 2026)",
            subject: "Plot No. 402-B, Sector 15, Lucknow",
            parties: {
                plaintiff: {
                    name: "Mr. Rajesh Kumar Khanna",
                    resident: "12/A, Gomti Nagar, Lucknow",
                    counsel: "Adv. Amitosh Mishra & Associates",
                    alias: "Plaintiff"
                },
                defendant: {
                    name: "M/s Apex Urban Developers Ltd.",
                    office: "45, Hazratganj, Lucknow",
                    counsel: "Adv. S.N. Singh",
                    alias: "Defendant"
                }
            },
            synopsis: {
                main: "The plaintiff seeks a Declaration of Title and Permanent Injunction against the Defendant. The dispute centers on the overlapping claims over Plot No. 402-B in Sector 15.",
                claims: [
                    { label: "Plaintiff's Claim", text: "Asserts ownership via a Registered Sale Deed dated October 14, 1995, executed by the original leaseholder." },
                    { label: "Defendant's Claim", text: "Asserts ownership via a fresh allotment letter from the local authority dated June 2022, claiming the previous lease had lapsed." }
                ],
                contention: "The authenticity of the 1995 Sale Deed and whether the physical boundaries (Metes and Bounds) of the plot match the revenue records."
            },
            chronology: [
                { date: "Jan 12, 2025", type: "Suit Institution", detail: "Civil Suit filed under Section 34 of the Specific Relief Act." },
                { date: "Feb 05, 2025", type: "Summons Issued", detail: "Summons served to M/s Apex Urban Developers Ltd." },
                { date: "Mar 20, 2025", type: "Written Statement", detail: "Defendant filed a 45-page rebuttal challenging the 1995 deed's validity." },
                { date: "May 15, 2025", type: "Replication", detail: "Plaintiff filed a response to the WS with original tax receipts from 1996–2010." },
                { date: "Aug 10, 2025", type: "Order: Rule 9", detail: "Court appointed a Survey Commissioner for physical boundary mapping." },
                { date: "Nov 12, 2025", type: "Evidence Stage", detail: "Plaintiff's witness (PW-1) cross-examined regarding the signature on the 1995 deed." },
                { date: "Jan 03, 2026", type: "Report Submission", detail: "Survey Commissioner filed the Boundary Mapping Report." }
            ],
            technicalData: {
                title: "Technical Data & Boundary Mapping",
                description: "As per the Commissioner's report, the coordinates and area calculations are as follows:",
                formula: "A = 1/2 |(x1y2 - y1x2) + (x2y3 - y2x3) + (x3y4 - y3x4) + (x4y1 - y4x1)|",
                discrepancy: "Discrepancy of ≈ 145 sq. ft. between the 1995 Deed and the current boundary wall erected by the Defendant."
            },
            evidence: [
                { id: "Ex. P-1", detail: "Original Sale Deed (Registration No. 4419/1995)." },
                { id: "Ex. P-2", detail: "Property Tax Assessment records for the period 1995 ≤ t ≤ 2015." },
                { id: "Ex. D-1", detail: "Allotment Letter No. LDA/S15/402 issued in 2022." },
                { id: "Ex. C-1", detail: "Geo-tagged photographs of the site taken on Oct 10, 2025." }
            ],
            nextSteps: {
                focus: [
                    "Admissibility of the Survey Report under Order XXVI Rule 10 of CPC.",
                    "Verification of the sub-registrar's seal on the 1995 deed.",
                    "Arguments on the application for temporary injunction to halt construction."
                ]
            },
            verifiedBy: "Court Master, Room No. 402 District Court, Lucknow"
        },
        "HDFC-CC-7742/2025": {
            id: "HDFC-CC-7742/2025",
            category: "Consumer Complaint (Banking & Financial Services)",
            title: "Consumer Dispute: HDFC Banking",
            status: "Ongoing",
            nextHearing: "Feb 02, 2026",
            court: "State Consumer Commission",
            judge: "Justice Ananya Roy",
            claimAmount: "₹ 8,45,000/- (Principal + Interest + Damages)",
            lastAction: "Forensic Digital Audit Report Submitted (Jan 01, 2026)",
            nature: "Unauthorized Credit Card Transactions & Service Negligence",
            parties: {
                plaintiff: {
                    name: "Ms. Sneha Kapoor",
                    resident: "Flat 405, Skyline Towers, Sector 62, Noida",
                    counsel: "Adv. Rohan Taneja",
                    alias: "Complainant"
                },
                defendant: {
                    name: "HDFC Bank Ltd.",
                    office: "K.G. Marg, New Delhi",
                    counsel: "Adv. Megha Kulkarni (Legal Cell, HDFC)",
                    alias: "Opposite Party (OP)"
                }
            },
            synopsis: {
                main: "The Complainant alleges gross negligence and deficiency in service by the Opposite Party regarding three unauthorized international transactions on her Credit Card totaling ₹ 5,20,000/-.",
                claims: [
                    { label: "Complainant's Stand", text: "The transactions occurred while card was in possession. Bank failed to reverse charges within 'Zero Liability' window." },
                    { label: "Bank's Stand", text: "OP contends transactions were authenticated via 3D Secure/OTP, suggesting 'compromise of credentials'." }
                ],
                contention: "Whether there was a technical breach in the bank's security gateway and if mandatory dispute resolution protocols were followed."
            },
            chronology: [
                { date: "May 10, 2025", type: "Complaint Filing", detail: "Admission of complaint under Section 35 of the CPA 2019." },
                { date: "June 12, 2025", type: "Interim Order", detail: "Commission directed OP to freeze interest accrual on the disputed amount." },
                { date: "July 28, 2025", type: "Version of OP", detail: "HDFC Bank filed a 30-page response citing 'Customer Induced Fraud'." },
                { date: "Sept 15, 2025", type: "Evidence Affidavit", detail: "Complainant filed mobile logs and 'DND' registry proof." },
                { date: "Nov 05, 2025", type: "Technical Audit", detail: "Commission ordered an independent forensic audit of the SMS Gateway." },
                { date: "Jan 01, 2026", type: "Audit Report", detail: "Forensic report indicates SMS delivery delay of 480 seconds on the night of fraud." }
            ],
            technicalData: {
                title: "Financial Analysis & Interest Calculation",
                description: "The total claim includes the disputed principal (P), compounded monthly interest (r), and mental agony compensation (C):",
                calcDetails: "P = ₹ 5,20,000/- | r = 18% (Penal interest sought) | C = ₹ 2,00,000/-",
                formula: "Total = P (1 + r/12)^n + C"
            },
            evidence: [
                { id: "Ex. C-1", detail: "Copy of the Credit Card Statement for May 2025." },
                { id: "Ex. C-2", detail: "Screenshots of the immediate 'Fraud Alert' email sent to the Bank." },
                { id: "Ex. OP-1", detail: "System-generated 'Successful Authentication' logs from the Merchant Server." },
                { id: "Ex. F-1", detail: "Independent Forensic Audit Report (Ref: IT/HDFC/2026/01)." }
            ],
            nextSteps: {
                urgent: "The Commission has noted the discrepancy in boundary mapping reports from a related ancillary property attachment (Ref: CN-88219/2025). Verification required before Jan 10, 2026.",
                focus: [
                    "Final Arguments on 'Service Deficiency' vs 'Customer Negligence'.",
                    "Examination of the Forensic Auditor regarding SMS Gateway latency.",
                    "Decision on the waiver of late payment penalties accrued during trial."
                ]
            },
            verifiedBy: "Registrar, State Consumer Commission"
        }
    };

    const currentCase = useMemo(() => {
        return caseDataMap[id || ""] || caseDataMap["CN-88219/2025"];
    }, [id]);

    const handlePinSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (pin === "2345") {
            setIsAuthenticated(true);
            setError("");
        } else {
            setError("Access Denied. Incorrect PIN.");
            setPin("");
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-sky-900/10 blur-[100px] rounded-full" />
                <div className="w-full max-w-md z-10 animate-fade-in-up">
                    <div className="text-center mb-10">
                        <div className="inline-flex items-center justify-center w-20 h-20 rounded-[2rem] bg-white/5 border border-white/10 mb-6 shadow-2xl backdrop-blur-md">
                            <Lock size={32} className="text-sky-500" />
                        </div>
                        <h1 className="text-3xl font-bold text-white mb-2 font-serif">Secure Encryption</h1>
                        <p className="text-neutral-500">Decrypting Legal Vault for Identity <span className="text-white font-mono">#{id?.split('/')[0]}</span></p>
                    </div>

                    <div className="bg-white/5 border border-white/10 backdrop-blur-2xl rounded-3xl p-8 shadow-3xl">
                        <form onSubmit={handlePinSubmit} className="space-y-6">
                            <input
                                type="password"
                                maxLength={4}
                                value={pin}
                                onChange={(e) => setPin(e.target.value)}
                                placeholder="• • • •"
                                className="w-full bg-black/40 border border-white/10 rounded-2xl py-5 text-center text-3xl tracking-[1em] text-white focus:outline-none focus:border-sky-500/50 transition-all font-mono"
                                autoFocus
                            />
                            {error && <p className="text-red-500 text-xs text-center font-bold">{error}</p>}
                            <button
                                type="submit"
                                className="w-full bg-white text-black py-4 rounded-xl font-black uppercase text-sm tracking-widest hover:bg-sky-400 transition-all shadow-lg active:scale-95 transform"
                            >
                                Authorize Access
                            </button>
                            <div className="mt-4 px-4 py-2 rounded-xl bg-sky-500/10 border border-sky-500/20 text-center">
                                <p className="text-[10px] text-sky-400 font-black uppercase tracking-[0.2em]">
                                    Prototype Access • PIN: 2345
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#050505] text-white selection:bg-accent/30 font-sans pb-24">
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-sky-900/5 blur-[150px]" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-indigo-900/5 blur-[120px]" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32">
                {/* Navigation & Actions */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-16 animate-fade-in-up">
                    <div>
                        <Link to="/active-cases" className="inline-flex items-center gap-2 text-neutral-500 hover:text-white mb-6 uppercase text-[10px] font-black tracking-[0.2em] transition-colors">
                            <ArrowLeft size={14} /> Active Management
                        </Link>
                        <div className="flex items-center gap-4 mb-4">
                            <div className="px-3 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 text-[10px] font-black uppercase tracking-widest border border-emerald-500/20">
                                {currentCase.status}
                            </div>
                            <span className="text-neutral-500 font-mono text-xs">REF: {currentCase.id}</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold font-serif mb-4 leading-tight">
                            Legal Intelligence <span className="text-gradient">Deep Dive</span>
                        </h1>
                        <p className="text-neutral-400 text-lg max-w-2xl leading-relaxed">
                            {currentCase.category}
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <button
                            onClick={() => navigate(`/share-case/${currentCase.id}`)}
                            className="px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white hover:bg-white/10 transition-all flex items-center justify-center gap-3 font-bold uppercase text-xs tracking-widest group"
                        >
                            <Share2 size={18} className="group-hover:text-sky-400 transition-colors" /> Share Access
                        </button>
                        <button className="px-8 py-4 bg-white text-black rounded-2xl font-bold uppercase text-xs tracking-widest hover:bg-sky-400 transition-all flex items-center justify-center gap-3 shadow-2xl hover:scale-105 transform">
                            <Download size={18} /> Download Dossier
                        </button>
                    </div>
                </div>

                <div className="grid lg:grid-cols-12 gap-8">
                    {/* Main Content Area */}
                    <div className="lg:col-span-8 space-y-8">

                        {/* Summary Header Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="p-8 rounded-[2rem] bg-[#0a0a0f] border border-white/10">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-10 h-10 rounded-xl bg-sky-500/10 flex items-center justify-center text-sky-400">
                                        <Briefcase size={20} />
                                    </div>
                                    <h3 className="font-black uppercase text-xs tracking-widest text-neutral-400">Case Dashboard</h3>
                                </div>
                                <div className="space-y-4">
                                    <div className="flex justify-between border-b border-white/5 pb-2">
                                        <span className="text-xs text-neutral-500">Category</span>
                                        <span className="text-xs font-bold">{currentCase.category}</span>
                                    </div>
                                    <div className="flex justify-between border-b border-white/5 pb-2">
                                        <span className="text-xs text-neutral-500">Valuation</span>
                                        <span className="text-xs font-bold text-sky-400">{currentCase.valuation || currentCase.claimAmount}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-xs text-neutral-500">Next Hearing</span>
                                        <span className="text-xs font-bold text-amber-400">{currentCase.nextHearing}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="p-8 rounded-[2rem] bg-[#0a0a0f] border border-white/10">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                                        <Info size={20} />
                                    </div>
                                    <h3 className="font-black uppercase text-xs tracking-widest text-neutral-400">Last Action</h3>
                                </div>
                                <p className="text-sm font-bold leading-relaxed">{currentCase.lastAction}</p>
                                <div className="mt-4 p-3 rounded-xl bg-emerald-500/5 text-emerald-400 text-[10px] uppercase font-black tracking-widest">
                                    Status: {currentCase.status}
                                </div>
                            </div>
                        </div>

                        {/* Synopsis & Parties */}
                        <div className="p-10 rounded-[2.5rem] bg-[#0a0a0f] border border-white/10">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                                    <FileText size={24} className="text-indigo-400" />
                                </div>
                                <h2 className="text-2xl font-bold font-serif">Case Synopsis</h2>
                            </div>

                            <p className="text-neutral-400 leading-relaxed mb-10 text-lg italic">
                                "{currentCase.synopsis.main}"
                            </p>

                            <div className="grid md:grid-cols-2 gap-6 mb-10">
                                {currentCase.synopsis.claims.map((claim, idx) => (
                                    <div key={idx} className="p-6 rounded-3xl bg-white/[0.02] border border-white/5">
                                        <h4 className="text-xs font-black uppercase tracking-widest text-sky-400 mb-2">{claim.label}</h4>
                                        <p className="text-sm text-neutral-400 leading-relaxed">{claim.text}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="p-6 rounded-3xl bg-red-500/5 border border-red-500/10">
                                <h4 className="text-xs font-black uppercase tracking-widest text-red-400 mb-2">Core Contention</h4>
                                <p className="text-sm font-bold text-white">{currentCase.synopsis.contention}</p>
                            </div>
                        </div>

                        {/* Chronology */}
                        <div className="p-10 rounded-[2.5rem] bg-[#0a0a0f] border border-white/10">
                            <div className="flex items-center gap-3 mb-10">
                                <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                                    <Clock size={24} className="text-amber-400" />
                                </div>
                                <h2 className="text-2xl font-bold font-serif">Procedural Chronology</h2>
                            </div>

                            <div className="space-y-0 relative">
                                <div className="absolute left-[11px] top-6 bottom-6 w-px bg-white/10" />
                                {currentCase.chronology.map((item, idx) => (
                                    <div key={idx} className="relative pl-10 pb-10">
                                        <div className="absolute left-0 top-1 w-[22px] h-[22px] rounded-full bg-black border-4 border-amber-500/40" />
                                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                                            <span className="text-[10px] font-black font-mono text-neutral-500 uppercase tracking-widest">{item.date}</span>
                                            <span className="text-[10px] px-2 py-1 rounded bg-white/5 text-neutral-400 font-bold border border-white/5">{item.type}</span>
                                        </div>
                                        <p className="mt-2 text-sm text-white font-medium leading-relaxed">{item.detail}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Technical Analysis (Formula) */}
                        {currentCase.technicalData && (
                            <div className="p-10 rounded-[2.5rem] bg-gradient-to-br from-[#0a0a0f] to-indigo-950/20 border border-indigo-500/20 shadow-2xl overflow-hidden relative">
                                <div className="absolute -top-10 -right-10 w-40 h-40 bg-indigo-500/10 blur-[80px]" />
                                <div className="flex items-center gap-3 mb-8">
                                    <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center">
                                        <Database size={24} className="text-sky-400" />
                                    </div>
                                    <h2 className="text-2xl font-bold font-serif">{currentCase.technicalData.title}</h2>
                                </div>

                                <p className="text-neutral-400 text-sm mb-6 leading-relaxed">{currentCase.technicalData.description}</p>

                                {currentCase.technicalData.calcDetails && (
                                    <div className="mb-6 p-4 rounded-xl bg-black/40 border border-white/5 font-mono text-xs text-sky-300">
                                        {currentCase.technicalData.calcDetails}
                                    </div>
                                )}

                                <div className="p-8 rounded-3xl bg-black/60 border border-white/10 flex flex-col items-center justify-center text-center group">
                                    <p className="text-[10px] font-black text-neutral-500 uppercase tracking-[0.3em] mb-4">Calculated Algorithm</p>
                                    <div className="text-lg md:text-2xl font-serif text-white group-hover:scale-105 transition-transform duration-500">
                                        {currentCase.technicalData.formula}
                                    </div>
                                </div>

                                {currentCase.technicalData.discrepancy && (
                                    <div className="mt-8 flex items-start gap-4 p-5 rounded-2xl bg-red-500/10 border border-red-500/20">
                                        <AlertTriangle size={20} className="text-red-500 shrink-0" />
                                        <p className="text-sm font-bold text-red-200">{currentCase.technicalData.discrepancy}</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-4 space-y-8">

                        {/* Parties Involved */}
                        <div className="p-8 rounded-[2rem] bg-[#0a0a0f] border border-white/10 shadow-2xl">
                            <div className="flex items-center gap-3 mb-8">
                                <Users size={20} className="text-neutral-500" />
                                <h3 className="text-sm font-black uppercase tracking-widest text-neutral-500">Parties Involved</h3>
                            </div>

                            <div className="space-y-10">
                                <div>
                                    <div className="flex items-center gap-2 mb-3">
                                        <span className="w-2 h-2 rounded-full bg-sky-500" />
                                        <h4 className="text-xs font-black text-neutral-300 uppercase tracking-widest">{currentCase.parties.plaintiff.alias}</h4>
                                    </div>
                                    <p className="font-bold text-lg mb-1">{currentCase.parties.plaintiff.name}</p>
                                    <p className="text-[11px] text-neutral-500 mb-3">{currentCase.parties.plaintiff.resident}</p>
                                    <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                                        <p className="text-[10px] text-neutral-600 font-bold uppercase mb-1">Counsel</p>
                                        <p className="text-xs font-bold text-sky-400">{currentCase.parties.plaintiff.counsel}</p>
                                    </div>
                                </div>

                                <div className="relative pt-4 text-center">
                                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                                    <span className="text-[10px] font-black text-neutral-700 bg-[#0a0a0f] px-4 relative -top-3">CONTRA</span>
                                </div>

                                <div>
                                    <div className="flex items-center gap-2 mb-3">
                                        <span className="w-2 h-2 rounded-full bg-red-500" />
                                        <h4 className="text-xs font-black text-neutral-300 uppercase tracking-widest">{currentCase.parties.defendant.alias}</h4>
                                    </div>
                                    <p className="font-bold text-lg mb-1">{currentCase.parties.defendant.name}</p>
                                    <p className="text-[11px] text-neutral-500 mb-3">{currentCase.parties.defendant.office}</p>
                                    <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                                        <p className="text-[10px] text-neutral-600 font-bold uppercase mb-1">Counsel</p>
                                        <p className="text-xs font-bold text-red-400">{currentCase.parties.defendant.counsel}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Evidence Repository */}
                        <div className="p-8 rounded-[2rem] bg-[#0a0a0f] border border-white/10">
                            <div className="flex items-center gap-3 mb-6">
                                <Database size={18} className="text-neutral-500" />
                                <h3 className="text-sm font-black uppercase tracking-widest text-neutral-500">Evidence Log</h3>
                            </div>
                            <div className="space-y-3">
                                {currentCase.evidence.map((ex, idx) => (
                                    <div key={idx} className="p-4 rounded-xl bg-white/[0.03] border border-white/5 hover:border-sky-500/30 transition-all group">
                                        <div className="flex items-center justify-between mb-1">
                                            <span className="text-[10px] font-black text-sky-500 font-mono">{ex.id}</span>
                                            <ExternalLink size={10} className="text-neutral-600 group-hover:text-white transition-colors cursor-pointer" />
                                        </div>
                                        <p className="text-xs text-neutral-400 leading-normal">{ex.detail}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Next Steps / Urgent Action */}
                        <div className="p-8 rounded-[2rem] bg-gradient-to-br from-amber-600/10 to-orange-900/10 border border-amber-500/20 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-2 h-full bg-amber-500" />
                            <div className="flex items-center gap-3 mb-6">
                                <Gavel size={20} className="text-amber-500" />
                                <h3 className="text-sm font-black uppercase tracking-widest text-amber-500">Judicial Intent</h3>
                            </div>

                            {currentCase.nextSteps.urgent && (
                                <div className="mb-6 pb-6 border-b border-amber-500/10">
                                    <p className="text-[10px] font-black text-amber-500 uppercase tracking-widest mb-2">URGENT ACTION</p>
                                    <p className="text-sm font-bold text-white leading-relaxed">{currentCase.nextSteps.urgent}</p>
                                </div>
                            )}

                            <div className="space-y-4">
                                <p className="text-[10px] font-black text-neutral-500 uppercase tracking-widest">Hearing Focus ({currentCase.nextHearing})</p>
                                {currentCase.nextSteps.focus.map((step, idx) => (
                                    <div key={idx} className="flex gap-3 items-start">
                                        <div className="w-4 h-4 rounded-full bg-amber-500/20 flex items-center justify-center shrink-0 mt-0.5">
                                            <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                                        </div>
                                        <p className="text-xs text-neutral-300 font-medium leading-relaxed">{step}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Verification Footer */}
                        <div className="p-6 text-center">
                            <ShieldCheck size={24} className="text-white/10 mx-auto mb-4" />
                            <p className="text-[10px] text-neutral-600 font-bold uppercase tracking-[0.2em] mb-1">Verified Authenticated Data</p>
                            <p className="text-[10px] text-neutral-400 font-mono">{currentCase.verifiedBy}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CaseDetail;
