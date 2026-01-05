import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, BookOpen, Scale, Shield, AlertCircle } from "lucide-react";

interface ArticleSection {
    title: string;
    content?: string | string[];
    subsections?: { title: string; content: string | string[]; }[];
    list?: string[];
    steps?: string[];
}

interface LegalArticleProps {
    title: string;
    category: string;
    icon: React.ReactNode;
    overview: string;
    sections: ArticleSection[];
    conclusion?: string;
}

const LegalArticle: React.FC<LegalArticleProps> = ({
    title,
    category,
    icon,
    overview,
    sections,
    conclusion
}) => {
    return (
        <div className="min-h-screen bg-black text-white pb-20 relative overflow-hidden">
            {/* Ambient Background */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-sky-900/10 blur-[150px] rounded-full" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-indigo-900/10 blur-[120px] rounded-full" />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 mix-blend-overlay" />
            </div>

            <div className="relative z-10 max-w-4xl mx-auto px-6 pt-32">
                {/* Header */}
                <Link
                    to="/nyaya-gyan"
                    className="inline-flex items-center gap-2 text-neutral-500 hover:text-white mb-8 transition-colors uppercase text-[10px] font-black tracking-[0.2em]"
                >
                    <ArrowLeft size={14} /> Back to Nyaya Gyan
                </Link>

                <div className="mb-12 animate-fade-in-up">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-sky-500/20 border border-emerald-500/30 flex items-center justify-center backdrop-blur-sm">
                            {icon}
                        </div>
                        <div>
                            <p className="text-xs font-black uppercase tracking-widest text-emerald-400 mb-1">{category}</p>
                            <h1 className="text-4xl md:text-5xl font-bold font-serif text-white">{title}</h1>
                        </div>
                    </div>

                    <div className="p-8 rounded-3xl bg-gradient-to-br from-sky-500/10 to-purple-500/10 border border-sky-500/20 backdrop-blur-sm">
                        <div className="flex items-start gap-4">
                            <BookOpen className="text-sky-400 shrink-0 mt-1" size={24} />
                            <div>
                                <h2 className="text-2xl font-bold text-white mb-3 font-serif">Overview</h2>
                                <p className="text-neutral-300 text-lg leading-relaxed">{overview}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Article Content */}
                <div className="space-y-12">
                    {sections.map((section, idx) => (
                        <div key={idx} className="animate-slide-up" style={{ animationDelay: `${idx * 100}ms` }}>
                            <div className="p-8 rounded-3xl bg-[#0a0a0f] border border-white/10 hover:border-white/20 transition-all">
                                <h3 className="text-2xl font-bold text-white mb-6 font-serif flex items-center gap-3">
                                    <span className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400 text-sm font-mono">
                                        {idx + 1}
                                    </span>
                                    {section.title}
                                </h3>

                                {typeof section.content === 'string' ? (
                                    <p className="text-neutral-300 leading-relaxed mb-6 text-lg">{section.content}</p>
                                ) : section.content && Array.isArray(section.content) ? (
                                    section.content.map((para, i) => (
                                        <p key={i} className="text-neutral-300 leading-relaxed mb-4 text-lg">{para}</p>
                                    ))
                                ) : null}

                                {section.list && (
                                    <ul className="space-y-3 mb-6">
                                        {section.list.map((item, i) => (
                                            <li key={i} className="flex items-start gap-3 text-neutral-300">
                                                <span className="w-6 h-6 rounded-full bg-sky-500/20 flex items-center justify-center text-sky-400 text-xs font-bold shrink-0 mt-0.5">•</span>
                                                <span className="text-lg leading-relaxed">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                )}

                                {section.steps && (
                                    <div className="space-y-4 mb-6">
                                        {section.steps.map((step, i) => (
                                            <div key={i} className="flex gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                                                <span className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-black text-sm font-bold shrink-0">
                                                    {i + 1}
                                                </span>
                                                <p className="text-neutral-200 text-lg leading-relaxed">{step}</p>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {section.subsections && (
                                    <div className="space-y-6 mt-6">
                                        {section.subsections.map((sub, i) => (
                                            <div key={i} className="pl-6 border-l-2 border-emerald-500/30">
                                                <h4 className="text-xl font-bold text-emerald-400 mb-3">{sub.title}</h4>
                                                {typeof sub.content === 'string' ? (
                                                    <p className="text-neutral-300 leading-relaxed text-lg">{sub.content}</p>
                                                ) : Array.isArray(sub.content) ? (
                                                    <ul className="space-y-2">
                                                        {sub.content.map((item, j) => (
                                                            <li key={j} className="text-neutral-300 text-lg flex items-start gap-2">
                                                                <span className="text-emerald-400 shrink-0">→</span>
                                                                <span>{item}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                ) : null}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Conclusion */}
                {conclusion && (
                    <div className="mt-12 p-8 rounded-3xl bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/20 backdrop-blur-sm">
                        <div className="flex items-start gap-4">
                            <AlertCircle className="text-amber-400 shrink-0 mt-1" size={24} />
                            <div>
                                <h3 className="text-xl font-bold text-amber-400 mb-3 uppercase tracking-wider">Conclusion</h3>
                                <p className="text-neutral-200 text-lg leading-relaxed">{conclusion}</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Disclaimer */}
                <div className="mt-12 p-6 rounded-2xl bg-neutral-900/50 border border-white/10 text-center">
                    <p className="text-xs text-neutral-500 uppercase tracking-widest font-bold mb-2">Legal Disclaimer</p>
                    <p className="text-sm text-neutral-400">
                        This article is for educational purposes only and does not constitute legal advice.
                        Consult a qualified lawyer for specific legal matters.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LegalArticle;
