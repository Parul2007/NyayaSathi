import React, { useEffect, useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, Share2, Bookmark, BookmarkCheck, Clock } from "lucide-react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../config/firebase";
import { useFirestore } from "../hooks/useFirestore";
import { useAuth } from "../context/AuthContext";
import { MOCK_NEWS, LegalNewsItem } from "../data/mockData";

interface Article {
    id: string;
    title: string;
    content: string;
    image: string;
    category: string;
    date: string;
    readTime: string;
}

const LegalUpdateDetail: React.FC = () => {
    const { id } = useParams();
    const { user, updateUser } = useAuth();
    const [article, setArticle] = useState<Article | null>(null);
    const [loading, setLoading] = useState(true);
    const [scrollProgress, setScrollProgress] = useState(0);

    const isSaved = useMemo(() => {
        return id ? (user?.savedArticles || []).includes(id) : false;
    }, [user, id]);

    const { data: allNews } = useFirestore<Article>('cms_legal_news');

    useEffect(() => {
        if (!id) return;

        window.scrollTo(0, 0);

        // Fallback to MOCK_NEWS if Firestore isn't synced yet or ID is a slug
        const mockArticle = MOCK_NEWS.find((n: LegalNewsItem) => n.id === id);
        if (mockArticle) {
            setArticle(mockArticle as Article);
            setLoading(false);
            return;
        }

        setLoading(true);
        const docRef = doc(db, 'cms_legal_news', id);
        const unsubscribe = onSnapshot(docRef, (docSnap) => {
            if (docSnap.exists()) {
                setArticle({ id: docSnap.id, ...docSnap.data() } as Article);
            } else {
                setArticle(null);
            }
            setLoading(false);
        }, (err) => {
            console.error("Error fetching article:", err);
            setLoading(false);
        });

        return () => unsubscribe ? unsubscribe() : undefined;
    }, [id]);

    useEffect(() => {
        const updateScrollProgress = () => {
            const currentScroll = window.scrollY;
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
            if (scrollHeight) {
                setScrollProgress((currentScroll / scrollHeight) * 100);
            }
        };

        window.addEventListener("scroll", updateScrollProgress);
        return () => window.removeEventListener("scroll", updateScrollProgress);
    }, []);

    const toggleSave = () => {
        if (!id || !user) return;
        const savedIds = user.savedArticles || [];

        if (savedIds.includes(id)) {
            const updated = savedIds.filter((savedId: string) => savedId !== id);
            updateUser({ savedArticles: updated });
        } else {
            updateUser({ savedArticles: [...savedIds, id] });
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-black flex flex-col items-center justify-center gap-4">
                <div className="w-10 h-10 border-4 border-white/5 border-t-sky-500 rounded-full animate-spin shadow-[0_0_15px_rgba(14,165,233,0.3)]" />
                <p className="font-sans text-xs font-black uppercase tracking-widest text-neutral-500 animate-pulse">Decrypting Insight...</p>
            </div>
        );
    }

    if (!article) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center font-sans">
                <div className="text-center max-w-md px-6">
                    <h2 className="text-4xl font-display italic text-white mb-4">Insight Lost.</h2>
                    <p className="text-neutral-500 text-sm mb-10 leading-relaxed font-bold uppercase tracking-widest">The perspective you seek has shifted or been archived.</p>
                    <Link to="/updates" className="inline-flex items-center gap-3 px-8 py-4 bg-white/5 border border-white/10 text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-white/10 transition-all hover:gap-4">
                        <ArrowLeft size={16} className="text-sky-500" /> Back to Intelligence
                    </Link>
                </div>
            </div>
        );
    }

    const relatedArticles = (allNews.length > 0 ? allNews : MOCK_NEWS)
        .filter((a: Article | LegalNewsItem) => a.category === article.category && a.id !== article.id)
        .slice(0, 3);

    return (
        <div className="min-h-screen bg-black text-white selection:bg-sky-500/30 font-sans pb-32 overflow-hidden">
            {/* Immersive Reading Progress Bar */}
            <div className="fixed top-0 left-0 w-full h-1 z-[100] bg-white/5">
                <div
                    className="h-full bg-sky-500 shadow-[0_0_15px_rgba(14,165,233,0.6)] transition-all duration-300 ease-out"
                    style={{ width: `${scrollProgress}%` }}
                />
            </div>

            {/* Premium Navigation Bar */}
            <nav className="sticky top-0 z-50 bg-black/40 backdrop-blur-xl border-b border-white/5 px-6 py-4">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <Link to="/updates" className="flex items-center gap-2 text-neutral-400 hover:text-sky-400 transition-all font-bold uppercase text-[10px] tracking-[0.2em] group">
                        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                        <span className="hidden sm:inline">Back to Insights</span>
                    </Link>
                    <div className="flex items-center gap-4">
                        <button onClick={toggleSave} className={`p-2.5 rounded-xl transition-all border ${isSaved ? 'text-sky-400 bg-sky-500/10 border-sky-500/30' : 'text-neutral-500 bg-white/5 border-white/10 hover:bg-white/10'}`}>
                            {isSaved ? <BookmarkCheck size={20} /> : <Bookmark size={20} />}
                        </button>
                        <button className="p-2.5 text-neutral-500 bg-white/5 border border-white/10 rounded-xl transition-all hover:text-white hover:bg-white/10">
                            <Share2 size={20} />
                        </button>
                    </div>
                </div>
            </nav>

            {/* Immersive Hero Section */}
            <header className="relative h-[65vh] min-h-[550px] w-full overflow-hidden flex flex-col justify-end border-b border-white/10">
                <div className="absolute inset-0">
                    <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover scale-105 animate-slow-zoom opacity-50 grayscale-[20%]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                </div>

                <div className="relative max-w-4xl mx-auto w-full px-6 pb-20 animate-fade-in-up">
                    <div className="flex items-center gap-4 mb-8">
                        <span className="px-3 py-1 bg-sky-500 text-black text-[10px] font-black rounded-sm uppercase tracking-widest shadow-[0_0_20px_rgba(14,165,233,0.3)]">
                            {article.category}
                        </span>
                        <span className="text-neutral-400 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
                            <Clock size={14} className="text-sky-500" /> {article.readTime}
                        </span>
                    </div>

                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-medium leading-[1.1] text-white italic mb-10 [text-shadow:_0_10px_30px_rgb(0_0_0_/_80%)]">
                        {article.title}
                    </h1>

                    <div className="flex items-center gap-4 pt-10 border-t border-white/10">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-sky-500 to-indigo-600 p-[2px]">
                            <div className="w-full h-full rounded-full bg-black overflow-hidden flex items-center justify-center">
                                <span className="text-xs font-black italic text-sky-400">NS</span>
                            </div>
                        </div>
                        <div>
                            <p className="text-xs font-black uppercase tracking-[0.2em] text-white">NyayaSathi Legal Desk</p>
                            <p className="text-[10px] text-neutral-500 font-bold uppercase tracking-[0.2em] mt-1">{article.date}</p>
                        </div>
                    </div>
                </div>
            </header>

            {/* Modern Glassmorphic Article Container */}
            <main className="max-w-4xl mx-auto px-6 -mt-16 relative z-10">
                <div className="bg-neutral-900/60 backdrop-blur-3xl border border-white/5 rounded-[3rem] p-8 md:p-20 shadow-2xl overflow-hidden relative group">
                    {/* Artistic Gloom Accent */}
                    <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/5 blur-[120px] pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500/5 blur-[120px] pointer-events-none" />

                    <article
                        className="article-section text-neutral-300 leading-relaxed text-lg prose prose-invert max-w-none"
                        dangerouslySetInnerHTML={{ __html: article.content }}
                    />

                    {/* Interaction Bar - Internal */}
                    <div className="mt-24 pt-12 border-t border-white/5 flex flex-wrap gap-8 items-center justify-between">
                        <div className="flex gap-3">
                            {["Analytical", "Policy", article.category].map(tag => (
                                <span key={tag} className="px-5 py-2 bg-white/5 text-neutral-400 text-[10px] font-black uppercase tracking-widest rounded-xl border border-white/5 hover:border-sky-500/30 transition-all cursor-default">
                                    #{tag.replace(/\s+/g, '')}
                                </span>
                            ))}
                        </div>
                        <div className="flex gap-6">
                            <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-neutral-500 hover:text-white transition-colors group">
                                <ArrowLeft size={16} className="text-sky-500 group-hover:-translate-x-1 transition-transform" /> Prev Study
                            </button>
                            <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-neutral-500 hover:text-white transition-colors group">
                                Next Analysis <ArrowRight size={16} className="text-sky-500 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Newsletter / Professional CTA - Super Cool Look */}
                <div className="mt-16 p-1 bg-gradient-to-br from-sky-500/20 via-white/5 to-indigo-500/20 rounded-[3rem] group">
                    <div className="bg-black/80 backdrop-blur-3xl rounded-[2.9rem] p-12 md:p-16 relative overflow-hidden">
                        <div className="relative z-10">
                            <h3 className="text-4xl font-display text-white mb-6 italic">The Future of <span className="text-gradient-blue underline decoration-sky-500/30 underline-offset-8">Insight</span>.</h3>
                            <p className="text-neutral-400 text-sm mb-12 max-w-md leading-relaxed">Join 50,000+ legal professionals getting our proprietary case breakdowns and policy analysis.</p>
                            <div className="flex flex-col sm:flex-row gap-4 max-w-xl">
                                <input
                                    type="email"
                                    placeholder="professional@law.io"
                                    className="bg-white/5 border border-white/10 rounded-2xl px-8 py-5 text-sm focus:outline-none focus:border-sky-500/50 flex-1 text-white placeholder:text-neutral-700 focus:bg-white/10 transition-all"
                                />
                                <button className="px-10 py-5 bg-sky-500 text-black rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-sky-400 transition-all shadow-[0_0_30px_rgba(14,165,233,0.4)] hover:scale-105 active:scale-95">
                                    Subscribe
                                </button>
                            </div>
                        </div>
                        {/* Decorative background element */}
                        <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/3 w-80 h-80 bg-sky-500/10 blur-[100px] rounded-full pointer-events-none group-hover:bg-sky-500/20 transition-all duration-1000" />
                    </div>
                </div>
            </main>

            {/* Related Insights Grid */}
            <section className="mt-40 max-w-6xl mx-auto px-6 pb-20">
                <div className="flex items-end justify-between mb-20 px-4">
                    <div>
                        <h2 className="text-5xl font-display text-white italic">Further <span className="text-gradient-blue underline decoration-sky-500/30 underline-offset-8">Perspectives</span></h2>
                        <p className="text-neutral-500 text-[10px] mt-6 font-black uppercase tracking-[0.3em]">Deep dives in {article.category}</p>
                    </div>
                    <Link to="/updates" className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400 hover:text-sky-400 transition-all flex items-center gap-3 group pb-2 border-b border-white/5 hover:border-sky-500/30">
                        All Intelligence <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                <div className="grid md:grid-cols-3 gap-10">
                    {relatedArticles.map((rel: any) => (
                        <Link
                            to={`/article/${rel.id}`}
                            key={rel.id}
                            className="group relative flex flex-col bg-neutral-900/40 border border-white/5 rounded-[2.5rem] overflow-hidden hover:border-sky-500/30 transition-all duration-700 hover:-translate-y-3 hover:shadow-2xl hover:shadow-sky-500/5"
                        >
                            <div className="aspect-[16/10] overflow-hidden bg-neutral-800">
                                <img src={rel.image} alt={rel.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 opacity-50 group-hover:opacity-100" />
                                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent opacity-80" />
                            </div>
                            <div className="p-10 flex-1 flex flex-col relative">
                                <div className="flex items-center gap-3 mb-6">
                                    <span className="text-[9px] font-black tracking-[0.2em] text-sky-500 uppercase">{rel.category}</span>
                                    <div className="w-1 h-1 rounded-full bg-white/20" />
                                    <span className="text-[9px] font-bold text-neutral-500 uppercase tracking-[0.2em]">{rel.readTime}</span>
                                </div>
                                <h4 className="text-2xl font-display text-white mb-10 group-hover:text-sky-400 transition-colors leading-tight italic">
                                    {rel.title}
                                </h4>
                                <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between text-neutral-500 group-hover:text-white transition-colors">
                                    <span className="text-[9px] font-black uppercase tracking-[0.2em]">Examine Case</span>
                                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default LegalUpdateDetail;
