import React, { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
    ChevronLeft, Star, ShieldCheck, MapPin, Award,
    Gavel, Briefcase, Calendar, MessageSquare, ArrowRight,
    TrendingUp, Shield, Users
} from "lucide-react";
import { useFirestore } from "../hooks/useFirestore";

import { MOCK_LAWYERS, Lawyer } from "../data/mockData";

const LawyerProfile: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { data: firestoreLawyers, loading } = useFirestore<Lawyer>('directory_lawyers');

    // Hybrid Lookup: Check Firestore first, then Mock Data
    const lawyer = firestoreLawyers.find(l => l.id === id) || MOCK_LAWYERS.find(l => l.id === id);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center text-sky-500">
                <div className="w-10 h-10 border-4 border-sky-500/20 border-t-sky-500 rounded-full animate-spin" />
            </div>
        );
    }

    if (!lawyer) {
        return (
            <div className="min-h-screen pt-32 text-center bg-black">
                <h1 className="text-4xl text-white font-display mb-8">Lawyer Not Found</h1>
                <Link to="/vakeel-connect" className="text-sky-400 font-bold hover:underline">
                    Back to Directory
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen pb-32 bg-black text-white relative overflow-hidden">
            {/* Ambient Lighting */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-sky-900/10 blur-[150px] rounded-full opacity-60" />
                <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-indigo-900/10 blur-[150px] rounded-full opacity-40" />
                <div className="absolute inset-0 bg-grid-white/[0.02]" />
            </div>

            <div className="max-w-7xl mx-auto px-6 pt-32 relative z-10">
                {/* Back Link */}
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-neutral-500 hover:text-white transition-colors mb-12 group"
                >
                    <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                    <span className="text-sm font-bold uppercase tracking-widest">Back to Network</span>
                </button>

                <div className="grid lg:grid-cols-12 gap-16">
                    {/* Left Column: Visual & Stats */}
                    <div className="lg:col-span-5 space-y-12">
                        <div className="relative group perspective-1000">
                            <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl transition-all duration-700 group-hover:rotate-y-2 group-hover:scale-[1.02]">
                                <img
                                    src={lawyer.image}
                                    alt={lawyer.name}
                                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />

                                <div className="absolute bottom-10 left-10 p-2">
                                    <div className={`px-4 py-2 rounded-full border backdrop-blur-xl flex items-center gap-2 mb-4
                                        ${lawyer.status === 'Available' ? 'bg-emerald-500/20 border-emerald-500/30 text-emerald-400' : 'bg-amber-500/20 border-amber-500/30 text-amber-400'}`}>
                                        <div className={`w-2 h-2 rounded-full ${lawyer.status === 'Available' ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
                                        <span className="text-xs font-black uppercase tracking-widest">{lawyer.status}</span>
                                    </div>
                                    <h1 className="text-4xl md:text-5xl font-display font-medium text-white mb-2">{lawyer.name}</h1>
                                    <div className="flex items-center gap-2 text-sky-400 font-bold tracking-tight">
                                        <ShieldCheck size={20} />
                                        <span>Verified Senior Counsel</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Impact Stats Grid */}
                        <div className="grid grid-cols-3 gap-6">
                            {[
                                { label: "Win Rate", val: lawyer.stats?.successRate || "95%", icon: <TrendingUp size={20} className="text-emerald-400" /> },
                                { label: "Experience", val: lawyer.stats?.yearsInPractice || `${lawyer.experienceYears}yr`, icon: <Briefcase size={20} className="text-sky-400" /> },
                                { label: "Cases Won", val: lawyer.casesWon || "450+", icon: <Gavel size={20} className="text-amber-400" /> }
                            ].map((stat, i) => (
                                <div key={i} className="p-6 rounded-3xl bg-neutral-900 shadow-xl border border-white/5 flex flex-col items-center text-center">
                                    <div className="mb-4 p-3 rounded-2xl bg-white/5 border border-white/5 text-neutral-400">
                                        {stat.icon}
                                    </div>
                                    <p className="text-2xl font-display text-white mb-1">{stat.val}</p>
                                    <p className="text-[10px] text-neutral-500 uppercase font-black tracking-widest">{stat.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Column: Narrative & CTA */}
                    <div className="lg:col-span-7 space-y-16">
                        {/* Bio Section */}
                        <section className="space-y-8">
                            <h2 className="text-4xl font-display tracking-tight">The Professional Narrative</h2>
                            <div className="space-y-6 text-xl text-neutral-400 font-light leading-relaxed">
                                <p>{lawyer.bio || "Leading legal expert dedicated to providing exceptional counsel and strategic representation. With extensive experience across complex jurisdictions, this counsel has consistently delivered favorable outcomes for high-stakes cases."}</p>
                            </div>

                            <div className="flex flex-wrap gap-3 pt-4">
                                {lawyer.tags.map(tag => (
                                    <span key={tag} className="px-5 py-2.5 rounded-2xl bg-sky-500/5 border border-sky-500/20 text-sky-400 text-sm font-bold">
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        </section>

                        {/* Achievements Section */}
                        <section className="space-y-8">
                            <h2 className="text-4xl font-display tracking-tight flex items-center gap-3">
                                <Award className="text-amber-500" /> Major Achievements
                            </h2>
                            <div className="grid gap-6">
                                {(lawyer.achievements || [
                                    "Successfully litigated over 500+ commercial cases.",
                                    "Lead counsel for Fortune 500 legal strategy audits.",
                                    "Awarded 'Legal Excellence' by the National Bar Association."
                                ]).map((item, i) => (
                                    <div key={i} className="flex gap-6 p-8 rounded-[2.5rem] bg-neutral-900/40 border border-white/5 backdrop-blur-3xl hover:border-white/20 transition-all">
                                        <div className="shrink-0 w-14 h-14 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-500">
                                            <Shield size={24} />
                                        </div>
                                        <p className="text-lg text-neutral-300 font-light py-2">{item}</p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* CTA Section */}
                        <section className="p-12 rounded-[3.5rem] bg-gradient-to-br from-neutral-900 to-black border border-sky-500/20 shadow-[0_0_50px_rgba(2,132,199,0.1)] relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500/5 blur-[80px] rounded-full" />
                            <div className="relative z-10 space-y-8">
                                <div className="space-y-2">
                                    <h3 className="text-3xl font-display text-white">Secure a Consultation</h3>
                                    <p className="text-neutral-500 text-lg font-light">Direct legal advisory and case evaluation sessions.</p>
                                </div>

                                <div className="grid sm:grid-cols-2 gap-6">
                                    <Link
                                        to={`/vakeel/${lawyer.id}/book`}
                                        className="py-5 rounded-full bg-white text-black font-black text-sm uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-sky-400 transition-all shadow-2xl"
                                    >
                                        Book Appointment <ArrowRight size={20} />
                                    </Link>
                                    <div className="flex items-center gap-4 px-8 border border-white/10 rounded-full text-neutral-400">
                                        <Users size={20} className="text-sky-400" />
                                        <span className="text-sm font-bold">Highly Recommended</span>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LawyerProfile;
