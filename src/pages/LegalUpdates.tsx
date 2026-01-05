import React, { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, ChevronRight, AlertCircle, Calendar, Bookmark, ArrowRight } from "lucide-react";
import { useFirestore } from "../hooks/useFirestore";
import { useAuth } from "../context/AuthContext";


import { MOCK_NEWS, LegalNewsItem } from "../data/mockData";
import { TOPIC_GUIDES } from "../data/topicArticles";

const LegalUpdates: React.FC = () => {
    const { user } = useAuth();
    const [filter, setFilter] = useState("All");
    const [searchTerm, setSearchTerm] = useState("");

    const savedCount = user?.savedArticles?.length || 0;
    const { data: legalNews, loading } = useFirestore<LegalNewsItem>('cms_legal_news');
    const categories = ["All", "Criminal Law", "Constitutional", "Corporate", "Environment", "Politics", "Consumer Rights", "Technology"];

    const selectedGuide = filter !== "All" ? TOPIC_GUIDES[filter as keyof typeof TOPIC_GUIDES] : null;

    // Featured Article (Hardcoded mock for now)
    const featuredArticle = MOCK_NEWS[0];


    // Filter Logic
    const filteredUpdates = useMemo(() => {
        // Use Mock data if Firestore is empty
        const sourceData = legalNews.length > 0 ? legalNews : MOCK_NEWS;

        return sourceData.filter(news => {
            // 1. Category Filter
            if (filter !== "All" && news.category !== filter) return false;

            // 2. Search Filter
            if (searchTerm) {
                const term = searchTerm.toLowerCase();
                const matchesTitle = news.title.toLowerCase().includes(term);
                const matchesSummary = news.summary.toLowerCase().includes(term);
                // Also optionally search by category name
                const matchesCategory = news.category.toLowerCase().includes(term);

                return matchesTitle || matchesSummary || matchesCategory;
            }

            return true;
        });
    }, [legalNews, filter, searchTerm]);

    return (
        <div className="min-h-screen bg-black text-white selection:bg-accent/30 font-sans pb-20">

            {/* Hero Section: Important Decision */}
            <section className="pt-32 pb-16 px-6">
                <div className="max-w-7xl mx-auto">
                    {/* Header with Title and Saved Button */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                        <h1 className="text-4xl md:text-5xl font-bold font-serif animate-fade-in-up">Legal Pulse & Updates</h1>
                        <Link
                            to="/saved-articles"
                            className="inline-flex items-center gap-3 px-6 py-3 bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/30 hover:border-emerald-500/50 rounded-full text-emerald-400 font-medium transition-all group"
                        >
                            <Bookmark size={20} className="group-hover:scale-110 transition-transform" />
                            <span>Saved Articles</span>
                            {savedCount > 0 && (
                                <span className="px-2.5 py-0.5 bg-emerald-500 text-black text-xs font-bold rounded-full">
                                    {savedCount}
                                </span>
                            )}
                        </Link>
                    </div>

                    {/* Featured / Important Card */}
                    {featuredArticle && (
                        <Link to={`/article/${featuredArticle.id}`} className="block relative rounded-3xl overflow-hidden border border-white/10 group cursor-pointer animate-fade-in">
                            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent z-10" />
                            <img
                                src={featuredArticle.image}
                                alt={featuredArticle.title}
                                className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
                            />

                            <div className="relative z-20 p-8 md:p-16 max-w-3xl">
                                <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/20 border border-emerald-500/30 rounded-full text-emerald-500 font-bold text-xs uppercase tracking-wider mb-6 animate-pulse">
                                    <AlertCircle size={14} /> Critical Update
                                </div>
                                <h2 className="text-3xl md:text-5xl font-bold font-serif mb-6 leading-tight">
                                    {featuredArticle.title}
                                </h2>
                                <p className="text-lg text-neutral-300 mb-8 leading-relaxed line-clamp-2">
                                    {featuredArticle.summary}
                                </p>
                                <div className="flex items-center gap-4">
                                    <span className="px-8 py-3 bg-white text-black font-bold rounded-full group-hover:bg-neutral-200 transition-colors flex items-center gap-2">
                                        Read Full Analysis <ChevronRight size={18} />
                                    </span>
                                    <span className="text-sm text-neutral-500">{featuredArticle.readTime}</span>
                                </div>
                            </div>
                        </Link>
                    )}
                </div>
            </section>

            {/* Filters & Grid */}
            <section className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 sticky top-20 z-30 bg-black/90 backdrop-blur-xl p-4 rounded-xl border border-white/5 shadow-2xl animate-slide-up">

                    {/* Categories */}
                    <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 hide-scrollbar w-full md:w-auto">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setFilter(cat)}
                                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all border ${filter === cat
                                    ? "bg-sky-600 text-white border-sky-500 shadow-[0_0_15px_rgba(2,132,199,0.3)]"
                                    : "bg-white/5 border-white/10 text-neutral-400 hover:bg-white/10 hover:text-white"
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* Search Bar */}
                    <div className="relative w-full md:w-80 group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500 group-focus-within:text-sky-400 transition-colors" size={18} />
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search updates, laws, news..."
                            className="w-full bg-black/50 border border-white/10 rounded-full py-3 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-sky-500 focus:bg-black transition-all placeholder:text-neutral-600"
                        />
                    </div>
                </div>

                {/* Topical Guide Section */}
                {selectedGuide && (
                    <div className="mb-16 animate-fade-in">
                        <div className="relative rounded-[2.5rem] overflow-hidden border border-white/10 bg-[#0a0a0f] group">
                            <div className="flex flex-col lg:flex-row">
                                {/* Image / Visual Part */}
                                <div className="lg:w-1/3 relative min-h-[300px]">
                                    <img
                                        src={selectedGuide.image}
                                        alt={selectedGuide.title}
                                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent lg:bg-gradient-to-b lg:from-transparent lg:to-black/80" />

                                    <div className="absolute bottom-6 left-6 right-6">
                                        <div className="flex flex-wrap gap-2">
                                            {selectedGuide.keyPoints.map((point, i) => (
                                                <span key={i} className="px-3 py-1 bg-white/10 backdrop-blur-md border border-white/10 rounded-lg text-[10px] font-bold uppercase tracking-wider text-sky-400">
                                                    {point}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Content Part */}
                                <div className="lg:w-2/3 p-8 lg:p-12">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-500">
                                            <AlertCircle size={20} />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-sky-500/80 mb-0.5">Authoritative Guide</p>
                                            <h4 className="text-white font-serif italic">{filter} Essentials</h4>
                                        </div>
                                        <div className="ml-auto text-xs font-mono text-neutral-500 bg-white/5 px-3 py-1.5 rounded-full border border-white/5">
                                            {selectedGuide.readTime}
                                        </div>
                                    </div>

                                    <h3 className="text-3xl lg:text-4xl font-bold font-serif mb-6 leading-tight text-gradient-sky">
                                        {selectedGuide.title}
                                    </h3>

                                    <p className="text-lg text-neutral-300 mb-8 leading-relaxed font-light italic border-l-2 border-sky-500/30 pl-6">
                                        {selectedGuide.summary}
                                    </p>

                                    <div
                                        className="prose prose-invert max-w-none text-neutral-400 leading-relaxed space-y-4"
                                        dangerouslySetInnerHTML={{ __html: selectedGuide.content }}
                                    />

                                    <div className="mt-10 pt-8 border-t border-white/5 flex items-center justify-between">
                                        <p className="text-xs text-neutral-500 uppercase tracking-widest font-mono">End of Overview • Scroll for latest updates</p>
                                        <div className="flex gap-2">
                                            <div className="w-2 h-2 rounded-full bg-sky-500 animate-pulse" />
                                            <div className="w-2 h-2 rounded-full bg-sky-500/40" />
                                            <div className="w-2 h-2 rounded-full bg-sky-500/20" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 pb-12">
                    {loading ? (
                        <div className="col-span-full flex flex-col items-center justify-center py-20 text-neutral-500 gap-4">
                            <div className="w-10 h-10 border-4 border-sky-500/20 border-t-sky-500 rounded-full animate-spin" />
                            <p className="font-mono text-sm uppercase tracking-widest">Updating Legal Pulse...</p>
                        </div>
                    ) : filteredUpdates.length > 0 ? (
                        filteredUpdates.map((update, idx) => (
                            <Link
                                to={`/article/${update.id}`}
                                key={update.id}
                                className="group flex flex-col bg-neutral-900/30 border border-white/5 rounded-3xl overflow-hidden hover:border-sky-500/30 transition-all hover:-translate-y-2 duration-300 shadow-lg hover:shadow-sky-500/10 animate-fade-in"
                                style={{ animationDelay: `${idx * 50}ms` }}
                            >
                                <div className="h-56 overflow-hidden relative">
                                    <img
                                        src={update.image}
                                        alt={update.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                                    <div className="absolute top-4 left-4 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full text-[10px] font-bold border border-white/10 flex items-center gap-1.5 uppercase tracking-wider text-white">
                                        <div className="w-1.5 h-1.5 rounded-full bg-sky-500" /> {update.category}
                                    </div>
                                </div>
                                <div className="p-8 flex-1 flex flex-col relative">
                                    <h3 className="text-2xl font-bold font-serif mb-4 group-hover:text-sky-400 transition-colors leading-tight">
                                        {update.title}
                                    </h3>
                                    <p className="text-neutral-400 text-sm line-clamp-3 mb-8 bg-transparent leading-relaxed font-normal">
                                        {update.summary}
                                    </p>
                                    <div className="mt-auto pt-6 border-t border-white/5">
                                        <span className="inline-flex items-center gap-2 text-sky-400 text-sm font-bold uppercase tracking-wider group-hover:gap-3 transition-all">
                                            Read Full Article <ArrowRight size={16} />
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <div className="col-span-full text-center py-20 text-neutral-500">
                            <p className="text-xl">No updates found matching "{searchTerm}"</p>
                            <button onClick={() => setSearchTerm("")} className="mt-4 text-sky-400 hover:underline">Clear Search</button>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default LegalUpdates;
