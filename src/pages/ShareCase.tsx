import React, { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Search, ShieldCheck, Star, Send, Shield, CheckCircle2, Lock } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useFirestore } from "../hooks/useFirestore";
import { MOCK_LAWYERS } from "../data/mockData";

interface Lawyer {
    id: string;
    name: string;
    specialty: string;
    image: string;
    rating: number;
    experienceYears: number;
    status: 'Available' | 'Busy';
    verified: boolean;
    tags: string[];
}

const ShareCase: React.FC = () => {
    const params = useParams();
    const id = params["*"];
    const navigate = useNavigate();
    const { user, updateUser, isAuthenticated } = useAuth();
    const { data: firestoreLawyers, loading } = useFirestore<Lawyer>('directory_lawyers');

    // Use Firestore lawyers if available, otherwise use MOCK_LAWYERS
    const lawyers = firestoreLawyers.length > 0 ? firestoreLawyers : MOCK_LAWYERS;

    const [searchQuery, setSearchQuery] = useState("");
    const [selectedLawyer, setSelectedLawyer] = useState<string | null>(null);
    const [isSharing, setIsSharing] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const filteredLawyers = lawyers.filter(l =>
        l.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        l.specialty.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleShare = async () => {
        if (!selectedLawyer || !isAuthenticated || !id) return;

        setIsSharing(true);
        try {
            // Simulate encryption/delay
            await new Promise(resolve => setTimeout(resolve, 1500));

            const selectedLawyerData = lawyers.find(l => l.id === selectedLawyer);

            setIsSharing(false);
            setIsSuccess(true);

            setTimeout(() => {
                navigate("/messages", {
                    state: {
                        sharedCase: {
                            caseId: id,
                            lawyerId: selectedLawyer,
                            lawyerName: selectedLawyerData?.name,
                            lawyerImage: selectedLawyerData?.image,
                            timestamp: new Date().toISOString()
                        }
                    }
                });
            }, 2000);
        } catch (error) {
            console.error("Share error:", error);
            setIsSharing(false);
        }
    };

    if (isSuccess) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center p-6">
                <div className="text-center animate-fade-in">
                    <div className="w-24 h-24 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-8 border-2 border-emerald-500/40">
                        <CheckCircle2 size={48} className="text-emerald-500" />
                    </div>
                    <h2 className="text-4xl font-bold text-white mb-4 font-serif">Access Shared!</h2>
                    <p className="text-neutral-500 text-lg mb-8 max-w-sm mx-auto">
                        Legal intelligence report for {id} has been shared with encryption keys. Redirecting to chat...
                    </p>
                    <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500 animate-loading" />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#050505] text-white selection:bg-accent/30 font-sans pb-24">
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-sky-900/10 blur-[130px]" />
                <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-900/10 blur-[120px]" />
            </div>

            <div className="relative z-10 max-w-4xl mx-auto px-6 pt-32">
                <div className="flex items-center justify-between mb-12">
                    <Link to={`/case/${id}`} className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-neutral-400 hover:text-white transition-all">
                        <ArrowLeft size={20} />
                    </Link>
                    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
                        <Shield size={14} className="text-sky-400" />
                        <span className="text-xs font-bold uppercase tracking-widest text-neutral-400">Secure Dispatch</span>
                    </div>
                </div>

                <div className="text-center mb-16 animate-fade-in-up">
                    <h1 className="text-4xl md:text-5xl font-bold font-serif mb-6">
                        Share Intelligence <br />
                        <span className="text-gradient">With Counsel</span>
                    </h1>
                    <p className="text-neutral-500 text-lg max-w-xl mx-auto leading-relaxed">
                        Choose a verified lawyer to grant temporary read-access to your Case Report. Access can be revoked anytime.
                    </p>
                </div>

                <div className="relative mb-12 group">
                    <div className="absolute inset-0 bg-sky-500/20 blur-2xl rounded-[2rem] opacity-0 group-hover:opacity-60 transition-opacity" />
                    <div className="relative flex items-center bg-white/5 border border-white/10 rounded-[2rem] backdrop-blur-2xl">
                        <Search className="absolute left-6 text-neutral-500" size={20} />
                        <input
                            type="text"
                            placeholder="Search by name or legal specialty..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-transparent pl-16 pr-6 py-6 text-white text-lg focus:outline-none placeholder:text-neutral-500"
                        />
                    </div>
                </div>

                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="w-10 h-10 border-4 border-sky-500/20 border-t-sky-500 rounded-full animate-spin" />
                    </div>
                ) : (
                    <div className="grid gap-4 mb-16 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                        {filteredLawyers.map(lawyer => (
                            <button
                                key={lawyer.id}
                                onClick={() => setSelectedLawyer(lawyer.id)}
                                className={`flex items-center gap-6 p-6 rounded-3xl border transition-all text-left group
                                    ${selectedLawyer === lawyer.id
                                        ? 'bg-sky-500/10 border-sky-500 shadow-[0_0_30px_rgba(14,165,233,0.1)]'
                                        : 'bg-white/5 border-white/10 hover:border-white/20'}
                                `}
                            >
                                <div className="relative">
                                    <img src={lawyer.image} alt={lawyer.name} className="w-16 h-16 rounded-2xl object-cover border border-white/10" />
                                    {selectedLawyer === lawyer.id && (
                                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-sky-500 border-2 border-black rounded-full flex items-center justify-center">
                                            <ShieldCheck size={14} className="text-black" />
                                        </div>
                                    )}
                                </div>

                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <h3 className="text-xl font-bold text-white">{lawyer.name}</h3>
                                        {lawyer.verified && <ShieldCheck size={16} className="text-sky-400" />}
                                    </div>
                                    <p className="text-neutral-500 text-sm mb-2">{lawyer.specialty} • {lawyer.experienceYears} Years Exp.</p>
                                    <div className="flex items-center gap-3">
                                        <div className="flex items-center gap-1 text-xs text-yellow-400 font-bold">
                                            <Star size={12} className="fill-yellow-400" /> {lawyer.rating}
                                        </div>
                                        <span className="text-[10px] text-neutral-600 font-black uppercase tracking-widest">{lawyer.status}</span>
                                    </div>
                                </div>

                                <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center transition-all
                                    ${selectedLawyer === lawyer.id ? 'bg-sky-500 border-sky-400 text-black' : 'bg-white/5 border-white/10 text-neutral-500 group-hover:text-white'}
                                `}>
                                    <div className={`w-4 h-4 rounded-full border-2 ${selectedLawyer === lawyer.id ? 'border-black bg-white' : 'border-neutral-700'}`} />
                                </div>
                            </button>
                        ))}
                    </div>
                )}

                <div className="sticky bottom-10 animate-fade-in">
                    <button
                        onClick={handleShare}
                        disabled={!selectedLawyer || isSharing}
                        className={`w-full py-6 rounded-[2rem] font-black uppercase tracking-[0.2em] text-sm flex items-center justify-center gap-4 transition-all shadow-3xl transform active:scale-95
                            ${selectedLawyer && !isSharing
                                ? 'bg-white text-black hover:bg-sky-400'
                                : 'bg-white/5 border border-white/10 text-neutral-600 cursor-not-allowed'}
                        `}
                    >
                        {isSharing ? (
                            <>Encrypting File <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" /></>
                        ) : (
                            <>Confirm & Send Access <Send size={20} /></>
                        )}
                    </button>
                    {selectedLawyer && (
                        <div className="mt-4 flex items-center justify-center gap-2 text-neutral-500 text-[10px] font-bold uppercase tracking-widest">
                            <Lock size={12} /> Recipients will require PIN: 2345 to open
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ShareCase;
