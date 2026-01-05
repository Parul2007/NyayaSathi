import React, { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    ArrowLeft,
    ShieldCheck,
    Lock,
    MapPin,
    User,
    Calendar,
    FileText,
    Download,
    ExternalLink,
    Send
} from "lucide-react";
import { useFirestore } from "../hooks/useFirestore";
import { useAuth } from "../context/AuthContext";
import { where } from "firebase/firestore";

// --- Types ---
interface CaseRecord {
    id: string;
    title: string;
    status: string;
    priority: "High" | "Medium" | "Low";
    court: string;
    judge: string;
    nextHearing: string;
    details: string;
    type: string;
    userId: string;
}

// --- Mock Data ---
const MOCK_ACTIVE_CASES: CaseRecord[] = [
    {
        id: "LC-2024-8891",
        title: "Property Title Verification & Injunction",
        status: "In Progress",
        priority: "High",
        court: "Bangalore District Civil Court",
        judge: "Hon'ble Justice K. Rao",
        nextHearing: "Jan 15, 2026",
        details: "Civil Suit – Declaration of Title and Permanent Injunction regarding ancestral property.",
        type: "Civil Suit",
        userId: "demo"
    },
    {
        id: "LC-2024-4420",
        title: "Consumer Dispute - HDFC Banking",
        status: "Notice Issued",
        priority: "Medium",
        court: "National Consumer Forum",
        judge: "Hon'ble A. Singhania",
        nextHearing: "Feb 05, 2026",
        details: "Unauthorized transactions and service deficiency claim against banking institution.",
        type: "Consumer Protection",
        userId: "demo"
    }
];

const ActiveCases: React.FC = () => {
    const { user: authUser } = useAuth();
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [pin, setPin] = useState("");
    const [error, setError] = useState("");

    // --- Data Fetching ---
    const queryConstraints = useMemo(() =>
        authUser ? [where('userId', '==', authUser.uid)] : [],
        [authUser]);

    // Only fetch if authenticated (to avoid errors)
    const { data: firestoreCases, loading, error: firestoreError } = useFirestore<CaseRecord>(
        'legal_cases',
        isAuthenticated && authUser ? queryConstraints : []
    );

    const cases = firestoreCases.length > 0 ? firestoreCases : MOCK_ACTIVE_CASES;

    // --- Auth Handlers ---
    const handlePinSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (pin === "2345") {
            setIsAuthenticated(true);
        } else {
            setError("Incorrect PIN");
        }
    };

    // --- Render: Auth Screen ---
    if (!isAuthenticated) {
        return (
            <div className="min-h-screen text-white flex flex-col items-center justify-center p-6 relative z-50" style={{ backgroundColor: 'transparent' }}>
                <div className="w-full max-w-sm bg-neutral-900/95 backdrop-blur-sm border border-neutral-800 rounded-2xl p-8 text-center shadow-2xl relative z-50">
                    <div className="w-16 h-16 bg-neutral-800 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Lock className="text-emerald-500" size={28} />
                    </div>
                    <h2 className="text-2xl font-bold mb-2 text-white">Secure Access</h2>
                    <p className="text-neutral-400 text-sm mb-6">Enter PIN '2345' to view cases</p>

                    <form onSubmit={handlePinSubmit} className="space-y-4">
                        <input
                            type="password"
                            value={pin}
                            onChange={(e) => setPin(e.target.value)}
                            placeholder="PIN code"
                            maxLength={4}
                            className="w-full bg-black border border-neutral-700 rounded-xl px-4 py-3 text-center text-xl tracking-widest focus:border-emerald-500 focus:outline-none transition-colors"
                        />
                        {error && <p className="text-red-500 text-xs font-bold">{error}</p>}
                        <button
                            type="submit"
                            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-xl transition-all"
                        >
                            Unlock Cases
                        </button>
                    </form>

                    <Link to="/dashboard" className="inline-block mt-6 text-neutral-500 hover:text-white text-xs font-bold uppercase tracking-widest">
                        Cancel
                    </Link>
                </div>
            </div>
        );
    }

    // --- Render: Cases List ---
    return (
        <div className="min-h-screen text-white p-6 md:p-12 relative z-50" style={{ backgroundColor: 'transparent' }}>
            <div className="max-w-5xl mx-auto relative z-50">
                {/* Header */}
                <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <Link to="/dashboard" className="text-neutral-500 hover:text-white flex items-center gap-2 mb-4 text-sm font-bold transition-colors">
                            <ArrowLeft size={16} /> Back to Dashboard
                        </Link>
                        <h1 className="text-4xl font-bold text-white mb-2">Active Cases</h1>
                        <p className="text-neutral-400">Manage your ongoing judicial proceedings.</p>
                    </div>

                    <button className="bg-white text-black px-6 py-3 rounded-xl font-bold text-sm hover:bg-neutral-200 transition-colors flex items-center gap-2">
                        <Download size={18} /> Export Report
                    </button>
                </header>

                {/* Error Display */}
                {firestoreError && (
                    <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
                        Error loading cases. Showing mock data.
                    </div>
                )}

                {/* Case Grid */}
                {loading ? (
                    <div className="text-center py-20 text-neutral-500">Loading cases...</div>
                ) : (
                    <div className="space-y-6">
                        {cases.map((c) => (
                            <div key={c.id} className="bg-neutral-900/50 border border-neutral-800 rounded-3xl p-8 hover:border-neutral-700 transition-all">
                                <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                                    <div>
                                        <div className="flex items-center gap-3 mb-3">
                                            <span className="px-3 py-1 bg-emerald-500/10 text-emerald-500 text-xs font-bold rounded-full uppercase tracking-wider">{c.status}</span>
                                            <span className="text-neutral-500 text-xs font-mono">{c.id}</span>
                                        </div>
                                        <h3 className="text-2xl font-bold text-white mb-2">{c.title}</h3>
                                        <p className="text-neutral-400 max-w-2xl">{c.details}</p>
                                    </div>
                                    <div className="text-right hidden md:block">
                                        <p className="text-xs text-neutral-500 uppercase tracking-widest mb-1">Priority</p>
                                        <p className={`font-bold ${c.priority === 'High' ? 'text-red-500' : 'text-amber-500'}`}>{c.priority}</p>
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-3 gap-6 pt-6 border-t border-white/5 mb-6">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-neutral-500">
                                            <MapPin size={18} />
                                        </div>
                                        <div>
                                            <p className="text-xs text-neutral-500 uppercase font-bold">Court</p>
                                            <p className="text-sm font-medium">{c.court}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-neutral-500">
                                            <User size={18} />
                                        </div>
                                        <div>
                                            <p className="text-xs text-neutral-500 uppercase font-bold">Judge</p>
                                            <p className="text-sm font-medium">{c.judge}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-500">
                                            <Calendar size={18} />
                                        </div>
                                        <div>
                                            <p className="text-xs text-indigo-500 uppercase font-bold">Next Hearing</p>
                                            <p className="text-sm font-bold text-white">{c.nextHearing}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex gap-3 pt-4 border-t border-white/5">
                                    <Link
                                        to={`/case/${c.id}`}
                                        className="flex-1 py-3 rounded-xl bg-white text-black font-bold text-sm hover:bg-neutral-200 transition-all flex items-center justify-center gap-2"
                                    >
                                        <ExternalLink size={16} /> View Full Report
                                    </Link>
                                    <button
                                        onClick={() => navigate(`/share-case/${c.id}`)}
                                        className="px-6 py-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold text-sm hover:bg-emerald-500/20 transition-all flex items-center justify-center gap-2"
                                    >
                                        <ShieldCheck size={16} /> Share with Lawyer
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {cases.length === 0 && !loading && (
                    <div className="text-center py-20 bg-neutral-900/30 rounded-3xl border border-white/5">
                        <FileText className="mx-auto text-neutral-700 mb-4" size={48} />
                        <h3 className="text-xl font-bold text-white mb-2">No Active Cases</h3>
                        <p className="text-neutral-500">Your legal portfolio is currently empty.</p>
                    </div>
                )}

                {/* Send to Lawyer Button */}
                {cases.length > 0 && (
                    <div className="mt-12 p-8 bg-gradient-to-r from-emerald-500/10 to-sky-500/10 border border-emerald-500/20 rounded-3xl backdrop-blur-sm">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                            <div>
                                <h3 className="text-2xl font-bold text-white mb-2">Need Legal Assistance?</h3>
                                <p className="text-neutral-400">Share your cases with verified lawyers for expert review and guidance.</p>
                            </div>
                            <button
                                onClick={() => navigate('/share-case/all')}
                                className="px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-black font-bold rounded-xl transition-all flex items-center gap-3 shadow-lg shadow-emerald-900/20 hover:scale-105 active:scale-95"
                            >
                                <Send size={20} /> Send to Lawyer for Review
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ActiveCases;
