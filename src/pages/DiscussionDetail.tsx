import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ShieldCheck, MessageSquare, Share2, ThumbsUp, ArrowLeft, Send, Award, Clock, X, Check, User } from "lucide-react";
import { useFirestore } from "../hooks/useFirestore";
import { MOCK_FORUM, MOCK_LAWYERS, ForumDiscussion as IForumDiscussion, Lawyer as ILawyer } from "../data/mockData";

interface Reply {
    id: string;
    author: string;
    content: string;
    date: string;
    upvotes: number;
    verified?: boolean;
    lawyerId?: string;
}

interface ForumDiscussion {
    id: string;
    title: string;
    content: string;
    category: string;
    date: string;
    author: string;
    upvotes: number;
    views: number;
    replies: Reply[];
}

const DiscussionDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { data: firestoreDiscussions, loading: loadingForum } = useFirestore<IForumDiscussion>('public_forum');
    const { data: firestoreLawyers } = useFirestore<ILawyer>('directory_lawyers');
    const [replyText, setReplyText] = useState("");

    // Functional states
    const [likedDiscussion, setLikedDiscussion] = useState(false);
    const [likedReplies, setLikedReplies] = useState<Set<string>>(new Set());
    const [shareSuccess, setShareSuccess] = useState(false);
    const [showConsultModal, setShowConsultModal] = useState(false);
    const [selectedLawyer, setSelectedLawyer] = useState<string | null>(null);
    const [consultMessage, setConsultMessage] = useState("");

    // Fallback logic
    const discussions = firestoreDiscussions.length > 0 ? firestoreDiscussions : MOCK_FORUM;
    const lawyers = firestoreLawyers.length > 0 ? firestoreLawyers : MOCK_LAWYERS;
    const discussion = discussions.find(d => d.id === id);

    // Like discussion handler
    const handleLikeDiscussion = (e: React.MouseEvent) => {
        e.preventDefault();
        setLikedDiscussion(!likedDiscussion);
    };

    // Like reply handler
    const handleLikeReply = (replyId: string, e: React.MouseEvent) => {
        e.preventDefault();
        const newLikedReplies = new Set(likedReplies);
        if (newLikedReplies.has(replyId)) {
            newLikedReplies.delete(replyId);
        } else {
            newLikedReplies.add(replyId);
        }
        setLikedReplies(newLikedReplies);
    };

    // Share handler
    const handleShare = async (e: React.MouseEvent) => {
        e.preventDefault();
        const url = window.location.href;

        if (navigator.share) {
            try {
                await navigator.share({
                    title: discussion?.title || "Forum Discussion",
                    text: discussion?.content?.substring(0, 100) + "...",
                    url: url
                });
            } catch (err) {
                // Fallback to clipboard
                await navigator.clipboard.writeText(url);
                setShareSuccess(true);
                setTimeout(() => setShareSuccess(false), 2000);
            }
        } else {
            await navigator.clipboard.writeText(url);
            setShareSuccess(true);
            setTimeout(() => setShareSuccess(false), 2000);
        }
    };

    // Consult lawyer handler
    const handleConsultLawyer = () => {
        if (selectedLawyer && consultMessage.trim()) {
            // Navigate to messages with the selected lawyer and message
            navigate('/messages', {
                state: {
                    consultRequest: {
                        lawyerId: selectedLawyer,
                        message: consultMessage,
                        fromDiscussion: discussion?.title
                    }
                }
            });
        }
    };

    if (loadingForum && firestoreDiscussions.length === 0) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="w-10 h-10 border-4 border-purple-500/20 border-t-purple-500 rounded-full animate-spin" />
            </div>
        );
    }

    if (!discussion) {
        return (
            <div className="min-h-screen bg-black text-white flex items-center justify-center">
                <div className="text-center p-8 glass-premium rounded-3xl border border-white/10 max-w-md">
                    <h2 className="text-3xl font-bold mb-4 font-display">Discussion Not Found</h2>
                    <p className="text-neutral-400 mb-8 leading-relaxed">The perspective you're looking for might have moved or been archived.</p>
                    <Link to="/jan-manch" className="px-8 py-3 bg-white text-black font-bold rounded-xl hover:bg-neutral-200 transition-all inline-block">
                        Back to Forum
                    </Link>
                </div>
            </div>
        );
    }

    const verifiedReply = discussion.replies?.find(r => r.verified);
    const otherReplies = discussion.replies?.filter(r => !r.verified) || [];
    const verifiedLawyer = verifiedReply?.lawyerId ? lawyers.find(l => l.id === verifiedReply.lawyerId) : null;

    return (
        <div className="min-h-screen bg-black text-white pb-20 pt-32 px-4 md:px-0">
            <div className="max-w-4xl mx-auto relative z-10">

                {/* Back Button */}
                <Link to="/jan-manch" className="inline-flex items-center gap-2 text-neutral-400 hover:text-white transition-colors mb-8">
                    <ArrowLeft size={20} /> Back to Discussions
                </Link>

                {/* Main Question */}
                <div className="mb-10 animate-fade-in-up">
                    <div className="flex items-center gap-3 mb-4">
                        <span className="px-3 py-1 rounded-full bg-white/10 text-xs font-bold text-sky-300 border border-sky-500/20">
                            {discussion.category}
                        </span>
                        <span className="text-neutral-500 text-sm flex items-center gap-1">
                            <Clock size={14} /> {discussion.date}
                        </span>
                    </div>

                    <h1 className="text-3xl md:text-5xl font-bold font-display mb-6 leading-tight">
                        {discussion.title}
                    </h1>

                    <div className="glass-panel p-6 md:p-8 rounded-3xl border border-white/10 mb-8">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-xl font-bold">
                                {discussion.author?.[0] || 'U'}
                            </div>
                            <div>
                                <h3 className="font-bold text-lg">{discussion.author}</h3>
                                <p className="text-neutral-500 text-sm">Citizen</p>
                            </div>
                        </div>
                        <p className="text-lg text-neutral-300 leading-relaxed whitespace-pre-line">
                            {discussion.content}
                        </p>

                        <div className="flex gap-6 mt-8 pt-6 border-t border-white/5">
                            <button
                                onClick={handleLikeDiscussion}
                                className={`flex items-center gap-2 transition-colors ${likedDiscussion ? 'text-emerald-400' : 'text-neutral-400 hover:text-white'}`}
                            >
                                <ThumbsUp size={18} className={likedDiscussion ? 'fill-current' : ''} />
                                {discussion.upvotes + (likedDiscussion ? 1 : 0)}
                            </button>
                            <button className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors">
                                <MessageSquare size={18} /> {discussion.replies?.length || 0} Replies
                            </button>
                            <button
                                onClick={handleShare}
                                className={`flex items-center gap-2 transition-colors ml-auto ${shareSuccess ? 'text-emerald-400' : 'text-neutral-400 hover:text-white'}`}
                            >
                                {shareSuccess ? <Check size={18} /> : <Share2 size={18} />}
                                {shareSuccess ? 'Copied!' : 'Share'}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Verified Lawyer Response */}
                {verifiedReply && (
                    <div className="mb-12 animate-slide-up" style={{ animationDelay: '100ms' }}>
                        <div className="relative overflow-hidden rounded-3xl p-[1px] bg-gradient-to-r from-emerald-500 via-sky-500 to-emerald-500 background-animate">
                            <div className="bg-[#0a0f0d] rounded-[23px] p-6 md:p-8 relative overflow-hidden">
                                {/* Badge */}
                                <div className="absolute top-0 right-0 p-4">
                                    <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-4 py-2 rounded-full flex items-center gap-2 font-bold text-sm backdrop-blur-md">
                                        <ShieldCheck size={16} /> Verified Legal Opinion
                                    </div>
                                </div>

                                {/* Lawyer Info */}
                                <div className="flex items-center gap-4 mb-6 relative z-10">
                                    <div className="relative">
                                        <div className="absolute -inset-1 bg-gradient-to-br from-emerald-400 to-sky-400 rounded-full opacity-70 blur-sm" />
                                        <img
                                            src={verifiedLawyer?.image || "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80"}
                                            alt={verifiedReply.author}
                                            className="w-16 h-16 rounded-full object-cover border-2 border-black relative z-10"
                                        />
                                        <div className="absolute bottom-0 right-0 z-20 bg-sky-500 text-white p-1 rounded-full border-2 border-black">
                                            <Award size={12} />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <h3 className="font-bold text-xl">{verifiedReply.author}</h3>
                                            <ShieldCheck size={16} className="text-sky-400" />
                                        </div>
                                        <p className="text-emerald-400 text-sm font-medium">{verifiedLawyer?.specialty || "Legal Expert"}</p>
                                        <p className="text-neutral-500 text-xs mt-1">{verifiedLawyer?.experienceYears || "10"}+ Years Experience</p>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="prose prose-invert max-w-none">
                                    <div className="text-neutral-300 leading-relaxed whitespace-pre-wrap font-light text-lg">
                                        {verifiedReply.content.split('\n').map((line: string, i: number) => (
                                            <React.Fragment key={i}>
                                                {line.startsWith('**') ?
                                                    <strong className="text-white block mt-4 mb-2 text-xl font-display">{line.replace(/\*\*/g, '')}</strong> :
                                                    line.startsWith('*') ?
                                                        <em className="text-neutral-400 block mt-4 border-l-2 border-emerald-500/30 pl-4 italic">{line.replace(/\*/g, '')}</em> :
                                                        <span className="block mb-2">{line}</span>
                                                }
                                            </React.Fragment>
                                        ))}
                                    </div>
                                </div>

                                <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between flex-wrap gap-4">
                                    <div className="flex gap-4">
                                        <button
                                            onClick={(e) => handleLikeReply(verifiedReply.id, e)}
                                            className={`flex items-center gap-2 font-bold px-4 py-2 rounded-xl transition-colors ${likedReplies.has(verifiedReply.id)
                                                    ? 'text-emerald-400 bg-emerald-500/20'
                                                    : 'text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20'
                                                }`}
                                        >
                                            <ThumbsUp size={18} className={likedReplies.has(verifiedReply.id) ? 'fill-current' : ''} />
                                            Helpful ({verifiedReply.upvotes + (likedReplies.has(verifiedReply.id) ? 1 : 0)})
                                        </button>
                                        <button
                                            onClick={() => setShowConsultModal(true)}
                                            className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white text-sm font-bold transition-colors"
                                        >
                                            Consult a Lawyer
                                        </button>
                                    </div>
                                    <span className="text-neutral-500 text-sm">
                                        Answered {verifiedReply.date}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Other Replies */}
                <div className="space-y-6">
                    <h3 className="text-2xl font-bold font-display mb-6">Community Discussion ({otherReplies.length})</h3>
                    {otherReplies.map(reply => (
                        <div key={reply.id} className="glass-panel p-6 rounded-2xl border border-white/5">
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center font-bold text-neutral-400">
                                        {reply.author?.[0] || 'U'}
                                    </div>
                                    <span className="font-bold text-neutral-300">{reply.author}</span>
                                </div>
                                <span className="text-sm text-neutral-500">{reply.date}</span>
                            </div>
                            <p className="text-neutral-400 leading-relaxed">{reply.content}</p>
                            <div className="mt-4 flex items-center gap-4">
                                <button
                                    onClick={(e) => handleLikeReply(reply.id, e)}
                                    className={`text-sm flex items-center gap-1 transition-colors ${likedReplies.has(reply.id) ? 'text-emerald-400' : 'text-neutral-500 hover:text-white'
                                        }`}
                                >
                                    <ThumbsUp size={14} className={likedReplies.has(reply.id) ? 'fill-current' : ''} />
                                    {reply.upvotes + (likedReplies.has(reply.id) ? 1 : 0)}
                                </button>
                                <button className="text-neutral-500 hover:text-white text-sm">Reply</button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Reply Input */}
                <div className="sticky bottom-6 mt-12">
                    <div className="glass-premium p-4 rounded-2xl flex gap-4 items-end shadow-2xl border border-white/10 bg-black/80 backdrop-blur-xl">
                        <div className="flex-1">
                            <textarea
                                value={replyText}
                                onChange={(e) => setReplyText(e.target.value)}
                                placeholder="Add to the discussion..."
                                className="w-full bg-transparent border-none text-white placeholder:text-neutral-500 focus:ring-0 resize-none min-h-[60px]"
                            />
                        </div>
                        <button className="p-3 bg-sky-600 hover:bg-sky-500 text-white rounded-xl transition-colors shadow-lg shadow-sky-900/20">
                            <Send size={20} />
                        </button>
                    </div>
                </div>

            </div>

            {/* Consult Lawyer Modal */}
            {showConsultModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
                    <div className="bg-[#1a1a20] w-full max-w-2xl rounded-3xl border border-white/10 p-8 relative animate-scale-in shadow-2xl max-h-[90vh] overflow-y-auto">
                        <button
                            onClick={() => setShowConsultModal(false)}
                            className="absolute top-4 right-4 text-neutral-500 hover:text-white transition-colors"
                        >
                            <X size={24} />
                        </button>

                        <h2 className="text-2xl font-bold font-display mb-2">Consult a Lawyer</h2>
                        <p className="text-neutral-400 mb-6">Select a lawyer and send them your consultation request</p>

                        {/* Lawyer Selection */}
                        <div className="space-y-3 mb-6">
                            <label className="block text-sm font-bold text-neutral-400 uppercase tracking-wider">Choose a Lawyer</label>
                            <div className="grid gap-3 max-h-[300px] overflow-y-auto pr-2">
                                {lawyers.map(lawyer => (
                                    <button
                                        key={lawyer.id}
                                        onClick={() => setSelectedLawyer(lawyer.id)}
                                        className={`flex items-center gap-4 p-4 rounded-2xl border transition-all text-left ${selectedLawyer === lawyer.id
                                                ? 'bg-indigo-500/10 border-indigo-500/40'
                                                : 'bg-white/5 border-white/10 hover:border-white/20'
                                            }`}
                                    >
                                        <img
                                            src={lawyer.image}
                                            alt={lawyer.name}
                                            className="w-14 h-14 rounded-xl object-cover"
                                        />
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2">
                                                <h3 className="font-bold text-white">{lawyer.name}</h3>
                                                {lawyer.verified && <ShieldCheck size={14} className="text-sky-400" />}
                                            </div>
                                            <p className="text-sm text-neutral-400">{lawyer.specialty}</p>
                                            <p className="text-xs text-neutral-500">{lawyer.experienceYears} years exp • ⭐ {lawyer.rating}</p>
                                        </div>
                                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedLawyer === lawyer.id
                                                ? 'border-indigo-500 bg-indigo-500'
                                                : 'border-white/20'
                                            }`}>
                                            {selectedLawyer === lawyer.id && <Check size={12} className="text-white" />}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Message Input */}
                        <div className="mb-6">
                            <label className="block text-sm font-bold text-neutral-400 uppercase tracking-wider mb-2">Your Message</label>
                            <textarea
                                value={consultMessage}
                                onChange={(e) => setConsultMessage(e.target.value)}
                                placeholder={`Regarding: ${discussion?.title}\n\nDescribe your legal query...`}
                                rows={4}
                                className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-indigo-500/50 focus:outline-none resize-none"
                            />
                        </div>

                        {/* Actions */}
                        <div className="flex gap-4">
                            <button
                                onClick={() => setShowConsultModal(false)}
                                className="flex-1 py-4 bg-white/5 hover:bg-white/10 text-white font-bold rounded-xl transition-all"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleConsultLawyer}
                                disabled={!selectedLawyer || !consultMessage.trim()}
                                className="flex-1 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold rounded-xl shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Send Consultation Request
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DiscussionDetail;
