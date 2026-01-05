import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MessageSquare, ThumbsUp, Eye, Share2, Plus, Search, Tag, X, ShieldCheck } from "lucide-react";
import { useFirestore } from "../hooks/useFirestore";

import { MOCK_FORUM, ForumDiscussion } from "../data/mockData";

// Separate component for discussion card to allow hooks
const DiscussionCard: React.FC<{ disc: ForumDiscussion; idx: number }> = ({ disc, idx }) => {
    const [liked, setLiked] = useState(false);
    const [shared, setShared] = useState(false);

    const handleLike = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setLiked(!liked);
    };

    const handleShare = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        const url = `${window.location.origin}/jan-sabha/discussion/${disc.id}`;
        await navigator.clipboard.writeText(url);
        setShared(true);
        setTimeout(() => setShared(false), 2000);
    };

    return (
        <Link
            to={`/jan-sabha/discussion/${disc.id}`}
            className="block group relative p-8 rounded-[2rem] bg-[#0a0a0f] border border-white/10 hover:border-purple-500/30 transition-all cursor-pointer card-3d perspective-1000 animate-slide-up overflow-hidden"
            style={{ animationDelay: `${idx * 100}ms` }}
        >
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-[2rem]" />

            <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3 flex-wrap">
                        <span className="px-3 py-1 bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs rounded-lg font-bold flex items-center gap-1.5 uppercase tracking-wider">
                            <Tag size={10} /> {disc.category}
                        </span>
                        {disc.replies?.some(r => r.verified) && (
                            <span className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs rounded-lg font-bold flex items-center gap-1.5 uppercase tracking-wider">
                                <ShieldCheck size={10} /> Lawyer Answered
                            </span>
                        )}
                        <span className="text-xs font-mono text-neutral-500">{disc.date}</span>
                    </div>
                    <button
                        onClick={handleShare}
                        className={`transition-colors ${shared ? 'text-emerald-400' : 'text-neutral-500 hover:text-white'}`}
                    >
                        {shared ? <span className="text-xs font-bold">Copied!</span> : <Share2 size={18} />}
                    </button>
                </div>

                <h3 className="text-2xl font-bold font-display text-white mb-3 group-hover:text-purple-400 transition-colors leading-tight">
                    {disc.title}
                </h3>
                <p className="text-neutral-400 text-base leading-relaxed mb-6 line-clamp-2 font-light">
                    {disc.content}
                </p>

                <div className="flex items-center justify-between border-t border-white/5 pt-6 mt-6">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-blue-400 flex items-center justify-center text-xs text-black font-bold ring-2 ring-black">
                            {disc.author?.[0] || 'U'}
                        </div>
                        <span className="text-sm font-medium text-neutral-300">{disc.author}</span>
                    </div>

                    <div className="flex items-center gap-6 text-neutral-400 text-sm font-medium">
                        <button
                            onClick={handleLike}
                            className={`flex items-center gap-2 transition-colors px-3 py-1.5 rounded-lg ${liked ? 'text-emerald-400 bg-emerald-400/10' : 'hover:text-emerald-400 hover:bg-emerald-400/10'}`}
                        >
                            <ThumbsUp size={16} className={liked ? 'fill-current' : ''} />
                            <span>{disc.upvotes + (liked ? 1 : 0)}</span>
                        </button>
                        <div className="flex items-center gap-2 hover:text-blue-400 transition-colors hover:bg-blue-400/10 px-3 py-1.5 rounded-lg">
                            <MessageSquare size={16} /> <span>{disc.replies?.length || 0}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Eye size={16} /> <span>{disc.views || 0}</span>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};

const JanManch: React.FC = () => {
    const [activeTab, setActiveTab] = useState("popular");
    const [searchTerm, setSearchTerm] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { data: firestoreDiscussions, loading } = useFirestore<ForumDiscussion>('public_forum');

    const categories = ["Family Law", "Criminal Law", "Property Law", "Consumer Rights", "Cyber Law", "Labor Law", "Tax Law", "Evidence Law"];

    // Sorting Logic
    const sourceData = firestoreDiscussions.length > 0 ? firestoreDiscussions : MOCK_FORUM;

    const sortedDiscussions = [...sourceData]
        .filter(d =>
            d.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            d.content.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .sort((a, b) => {
            if (activeTab === "popular") return b.upvotes - a.upvotes;
            if (activeTab === "newest") return new Date(b.date) > new Date(a.date) ? -1 : 1;
            if (activeTab === "unanswered") return (a.replies?.length || 0) - (b.replies?.length || 0);
            return 0;
        });

    return (
        <div className="min-h-screen pb-20 pt-32 px-4 relative overflow-hidden bg-black text-white">
            {/* Ambient Background */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-900/10 blur-[150px] rounded-full opacity-60" />
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-900/10 blur-[150px] rounded-full opacity-40" />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 mix-blend-overlay" />
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                <header className="mb-16 text-center animate-fade-in-up">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-md">
                        <MessageSquare size={14} className="text-purple-400" />
                        <span className="text-xs font-bold text-neutral-300 uppercase tracking-widest">Citizen's Forum</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-bold font-display text-white mb-6 leading-tight">
                        Nyaya<span className="text-gradient-gold">Sathi</span>
                    </h1>
                    <p className="text-xl text-neutral-400 max-w-2xl mx-auto leading-relaxed font-light">
                        A safe space for citizens to discuss legal issues, share experiences, and get community support.
                        <span className="text-accent italic block mt-3 text-sm font-medium">*Note: Community advice is not a substitute for professional legal counsel.*</span>
                    </p>
                </header>

                <div className="flex flex-col lg:flex-row gap-10">
                    {/* Left Sidebar (Topics & Stats) */}
                    <div className="lg:w-1/4 space-y-8 animate-slide-in-left">
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="w-full py-5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold rounded-2xl shadow-[0_0_30px_rgba(147,51,234,0.3)] transition-all transform hover:scale-105 flex items-center justify-center gap-3"
                        >
                            <Plus size={22} /> Ask a Question
                        </button>

                        {/* Community Stats */}
                        <div className="glass-card p-6 rounded-3xl border border-white/10 text-center">
                            <h3 className="text-white font-bold mb-6 font-display text-xl">Community Pulse</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-3 rounded-xl bg-white/5">
                                    <p className="text-2xl font-bold text-white font-mono">1.2k</p>
                                    <p className="text-xs text-neutral-500 uppercase tracking-wider">Online</p>
                                </div>
                                <div className="p-3 rounded-xl bg-white/5">
                                    <p className="text-2xl font-bold text-white font-mono">450</p>
                                    <p className="text-xs text-neutral-500 uppercase tracking-wider">Solved</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Main Content (Feed) */}
                    <div className="lg:w-3/4 animate-slide-up" style={{ animationDelay: '200ms' }}>
                        {/* Tabs & Search */}
                        <div className="flex flex-col md:flex-row gap-6 mb-8 items-center bg-[#0a0a0f]/50 p-2 rounded-[2rem] border border-white/5 backdrop-blur-md">
                            <div className="flex bg-black/40 p-1.5 rounded-3xl w-full md:w-auto">
                                {["Popular", "Newest", "Unanswered"].map(tab => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab.toLowerCase())}
                                        className={`px-6 py-3 rounded-2xl text-sm font-bold transition-all flex-1 md:flex-none
                                            ${activeTab === tab.toLowerCase()
                                                ? 'bg-white text-black shadow-lg'
                                                : 'text-neutral-400 hover:text-white hover:bg-white/5'}`
                                        }
                                    >
                                        {tab}
                                    </button>
                                ))}
                            </div>
                            <div className="flex-1 relative w-full">
                                <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-neutral-500" size={18} />
                                <input
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    placeholder="Search discussions..."
                                    className="w-full bg-black/40 border border-white/5 rounded-3xl pl-14 pr-6 py-4 text-white focus:outline-none focus:border-purple-500/30 transition-all placeholder:text-neutral-600"
                                />
                            </div>
                        </div>

                        {/* Discussion Cards */}
                        <div className="space-y-6">
                            {loading ? (
                                <div className="flex flex-col items-center justify-center py-20 text-neutral-500 gap-4">
                                    <div className="w-10 h-10 border-4 border-purple-500/20 border-t-purple-500 rounded-full animate-spin" />
                                    <p className="font-mono text-sm uppercase tracking-widest">Fetching discussions...</p>
                                </div>
                            ) : sortedDiscussions.length === 0 ? (
                                <div className="text-center py-20 bg-white/5 rounded-3xl border border-white/5 backdrop-blur-sm">
                                    <p className="text-neutral-500 font-mono">No discussions found matching your criteria.</p>
                                </div>
                            ) : sortedDiscussions.map((disc, idx) => (
                                <DiscussionCard key={disc.id} disc={disc} idx={idx} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* New Discussion Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
                    <div className="bg-[#1a1a20] w-full max-w-lg rounded-3xl border border-white/10 p-8 relative animate-scale-in shadow-2xl">
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="absolute top-4 right-4 text-neutral-500 hover:text-white transition-colors"
                        >
                            <X size={24} />
                        </button>

                        <h2 className="text-2xl font-bold font-display mb-6">Start a Discussion</h2>

                        <form className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-neutral-400 mb-2">Title</label>
                                <input
                                    type="text"
                                    placeholder="What's your legal question?"
                                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-purple-500/50 focus:outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-neutral-400 mb-2">Category</label>
                                <select className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-purple-500/50 focus:outline-none appearance-none">
                                    <option>Select a category</option>
                                    {categories.map(c => <option key={c} value={c}>{c}</option>)}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-neutral-400 mb-2">Details</label>
                                <textarea
                                    rows={4}
                                    placeholder="Describe your situation..."
                                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-purple-500/50 focus:outline-none resize-none"
                                />
                            </div>

                            <button
                                type="button"
                                onClick={() => setIsModalOpen(false)}
                                className="w-full py-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold rounded-xl shadow-lg transition-all mt-4"
                            >
                                Post Discussion
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default JanManch;
