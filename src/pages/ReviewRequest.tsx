import React, { useState } from "react";
import { ArrowLeft, Search, Star, MessageSquare, Send, ShieldCheck, User } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { MOCK_LAWYERS, Lawyer } from "../data/mockData";

const ReviewRequest: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [searchTerm, setSearchTerm] = useState("");
    const [sendingId, setSendingId] = useState<string | null>(null);

    // In a real app, this would come from the previous page or context
    const draftTitle = location.state?.draftTitle || "Draft Legal Document";
    const draftContent = location.state?.draftContent || "";

    const handleSendRequest = (lawyerId: string) => {
        setSendingId(lawyerId);

        // Simulate API call
        setTimeout(() => {
            // In a real app, we would save this request to DB.
            // For prototype, we will navigate to messages with a success state/param
            // Or store in localStorage to simulate "new message"
            const successMsg = `Review request sent to lawyer ID ${lawyerId}`;
            console.log(successMsg);

            // Navigate to messages
            navigate('/messages', {
                state: {
                    newConversation: {
                        lawyerId,
                        message: `I have shared a draft "${draftTitle}" for your legal review. Please check it.`,
                        isDraft: true,
                        draftData: draftContent
                    }
                }
            });
        }, 1500);
    };

    const filteredLawyers = MOCK_LAWYERS.filter(l =>
        l.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        l.specialty.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-black text-white pt-32 pb-20 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <header className="mb-10">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 text-neutral-500 hover:text-white mb-6 uppercase text-[10px] font-black tracking-[0.2em] transition-colors"
                    >
                        <ArrowLeft size={14} /> Back to Editor
                    </button>
                    <h1 className="text-4xl font-bold font-serif mb-4 flex items-center gap-3">
                        Select Legal Expert <ShieldCheck className="text-emerald-500" />
                    </h1>
                    <p className="text-neutral-400 text-lg">
                        Choose a verified lawyer to review your <b>{draftTitle}</b>.
                    </p>
                </header>

                {/* Search */}
                <div className="relative mb-10 group">
                    <div className="absolute inset-0 bg-emerald-500/20 blur-xl rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="relative flex items-center bg-neutral-900 border border-white/10 rounded-2xl p-2 focus-within:border-emerald-500/50 transition-colors">
                        <Search className="text-neutral-500 ml-4" size={20} />
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search by name or specialty..."
                            className="w-full bg-transparent p-4 text-white placeholder:text-neutral-600 focus:outline-none"
                        />
                    </div>
                </div>

                {/* Lawyers Grid */}
                <div className="grid md:grid-cols-2 gap-6">
                    {filteredLawyers.map(lawyer => (
                        <div key={lawyer.id} className="bg-neutral-900/50 border border-white/10 rounded-3xl p-6 backdrop-blur-sm hover:border-emerald-500/30 transition-all group relative overflow-hidden">
                            {/* Hover Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                            <div className="relative z-10 flex gap-4">
                                <img src={lawyer.image} alt={lawyer.name} className="w-16 h-16 rounded-2xl object-cover border border-white/10" />
                                <div>
                                    <h3 className="font-bold text-lg text-white mb-1 group-hover:text-emerald-400 transition-colors">{lawyer.name}</h3>
                                    <p className="text-xs text-neutral-400 font-mono uppercase tracking-wider mb-2">{lawyer.specialty}</p>
                                    <div className="flex items-center gap-3 text-xs mb-1">
                                        <span className="flex items-center gap-1 text-amber-400"><Star size={12} fill="currentColor" /> {lawyer.rating}</span>
                                        <span className="text-neutral-500">•</span>
                                        <span className="text-neutral-400">{lawyer.experienceYears} Years Exp.</span>
                                    </div>
                                    <p className="text-sm font-bold text-white mt-1">₹{lawyer.experienceYears > 15 ? '2500' : lawyer.experienceYears > 10 ? '2000' : '1500'}/review</p>
                                </div>
                            </div>

                            <div className="mt-6 flex gap-3 relative z-10">
                                <Link to={`/vakeel/${lawyer.id}`} className="flex-1 py-3 rounded-xl border border-white/10 text-neutral-400 text-xs font-bold uppercase tracking-wider text-center hover:bg-white/5 transition-colors flex items-center justify-center">
                                    <User size={14} className="mr-2" /> Profile
                                </Link>
                                <button
                                    onClick={() => handleSendRequest(lawyer.id)}
                                    disabled={sendingId === lawyer.id || lawyer.status === 'Busy'}
                                    className={`flex-1 py-3 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-lg
                                        ${lawyer.status === 'Busy'
                                            ? 'bg-neutral-800 text-neutral-500 cursor-not-allowed'
                                            : sendingId === lawyer.id
                                                ? 'bg-emerald-600 text-white cursor-wait'
                                                : 'bg-emerald-500 text-black hover:bg-emerald-400 hover:scale-105 active:scale-95'
                                        }`}
                                >
                                    {sendingId === lawyer.id ? (
                                        <>Sending...</>
                                    ) : (
                                        <><Send size={14} /> Send Draft</>
                                    )}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ReviewRequest;
