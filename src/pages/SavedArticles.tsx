import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { Bookmark, ChevronRight, Calendar, ArrowLeft, Trash2 } from "lucide-react";
import { useFirestore } from "../hooks/useFirestore";
import { useAuth } from "../context/AuthContext";

interface Article {
    id: string;
    title: string;
    summary: string;
    image: string;
    category: string;
    date: string;
}

const SavedArticles: React.FC = () => {
    const { user, updateUser } = useAuth();
    const { data: allNews, loading } = useFirestore<Article>('cms_legal_news');

    const savedIds = useMemo(() => user?.savedArticles || [], [user]);

    const savedArticles = useMemo(() => {
        return allNews.filter(article => savedIds.includes(article.id));
    }, [allNews, savedIds]);

    const removeArticle = (id: string) => {
        const updated = savedIds.filter((savedId: string) => savedId !== id);
        updateUser({ savedArticles: updated });
    };

    return (
        <div className="min-h-screen bg-black text-white selection:bg-accent/30 font-sans pb-20">
            <section className="pt-32 pb-16 px-6">
                <div className="max-w-5xl mx-auto">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-12">
                        <div>
                            <Link to="/updates" className="inline-flex items-center gap-2 text-neutral-400 hover:text-white mb-4 transition-colors group">
                                <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> Back to Updates
                            </Link>
                            <h1 className="text-4xl md:text-5xl font-bold font-serif flex items-center gap-4">
                                <Bookmark className="text-emerald-500" size={40} />
                                Saved Articles
                            </h1>
                        </div>
                    </div>

                    {/* Articles List */}
                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-20 text-sky-500/50 gap-4">
                            <div className="w-10 h-10 border-4 border-sky-500/20 border-t-sky-500 rounded-full animate-spin" />
                            <p className="font-mono text-sm uppercase tracking-widest text-sky-400">Loading your collection...</p>
                        </div>
                    ) : savedArticles.length > 0 ? (
                        <div className="space-y-6">
                            {savedArticles.map((article, idx) => (
                                <div
                                    key={article.id}
                                    className="group flex gap-6 bg-neutral-900/50 border border-white/5 rounded-2xl p-6 hover:border-emerald-500/30 transition-all animate-fade-in"
                                    style={{ animationDelay: `${idx * 100}ms` }}
                                >
                                    <Link to={`/news/${article.id}`} className="w-32 h-32 rounded-xl overflow-hidden flex-shrink-0 border border-white/10">
                                        <img src={article.image} alt={article.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                    </Link>
                                    <div className="flex-1 flex flex-col justify-center">
                                        <div className="flex items-center gap-3 mb-2">
                                            <span className="px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 text-xs font-medium uppercase tracking-wider">
                                                {article.category}
                                            </span>
                                            <span className="text-neutral-500 text-sm flex items-center gap-1">
                                                <Calendar size={12} /> {article.date}
                                            </span>
                                        </div>
                                        <Link to={`/news/${article.id}`}>
                                            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors line-clamp-2">
                                                {article.title}
                                            </h3>
                                        </Link>
                                        <p className="text-neutral-400 text-sm line-clamp-2">{article.summary}</p>
                                    </div>
                                    <div className="flex flex-col items-end justify-between">
                                        <button
                                            onClick={() => removeArticle(article.id)}
                                            className="p-3 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 transition-colors border border-red-500/20"
                                            title="Remove from saved"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                        <Link to={`/news/${article.id}`} className="text-emerald-500 text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all">
                                            Read <ChevronRight size={14} />
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 border border-dashed border-white/10 rounded-3xl">
                            <Bookmark size={60} className="mx-auto text-neutral-700 mb-6" />
                            <h2 className="text-2xl font-bold text-neutral-400 mb-4">No Saved Articles Yet</h2>
                            <p className="text-neutral-500 mb-8">Articles you save will appear here for quick access.</p>
                            <Link to="/updates" className="px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-full transition-colors">
                                Browse Legal Updates
                            </Link>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default SavedArticles;
