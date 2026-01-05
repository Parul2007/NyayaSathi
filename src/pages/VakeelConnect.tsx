import React, { useState, useMemo } from "react";
import { Search, Star, ShieldCheck, Calendar, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useFirestore } from "../hooks/useFirestore";


import { MOCK_LAWYERS, Lawyer } from "../data/mockData";

const VakeelConnect: React.FC = () => {
    const [filterSpecialty, setFilterSpecialty] = useState("All");
    const [searchTerm, setSearchTerm] = useState("");

    const { data: firestoreLawyers, loading } = useFirestore<Lawyer>('directory_lawyers');

    const specialties = ["All", "Criminal Law", "Family Law", "Corporate Law", "Cyber Law", "Property Law", "Constitutional Law", "Human Rights"];

    // Filter Logic
    const filteredLawyers = useMemo(() => {
        // Use Mock data if Firestore is empty (Hybrid Approach)
        const sourceData = firestoreLawyers.length > 0 ? firestoreLawyers : MOCK_LAWYERS;

        return sourceData.filter(l => {
            // Step 1: Filter by Category Tag (Specialty)
            if (filterSpecialty !== "All" && l.specialty !== filterSpecialty) {
                return false;
            }

            // Step 2: Search Term Filter
            if (searchTerm) {
                const term = searchTerm.toLowerCase();
                const matchesName = l.name.toLowerCase().includes(term);
                const matchesSpecialty = (l.specialty || "").toLowerCase().includes(term);
                const matchesTags = (l.tags || []).some(tag => tag.toLowerCase().includes(term));

                return matchesName || matchesSpecialty || matchesTags;
            }

            return true;
        });
    }, [firestoreLawyers, filterSpecialty, searchTerm]);

    return (
        <div className="min-h-screen pb-20 relative overflow-x-hidden bg-black text-white">
            {/* Ambient Lighting */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-sky-900/10 blur-[150px] rounded-full opacity-60" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-indigo-900/10 blur-[150px] rounded-full opacity-40" />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay" />
            </div>

            <div className="max-w-7xl mx-auto px-4 md:px-6 pt-32 relative z-10">

                {/* Hero Header */}
                <header className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8 animate-fade-in-up">
                    <div className="max-w-2xl">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/20 mb-6 backdrop-blur-md">
                            <ShieldCheck size={14} className="text-sky-400" />
                            <span className="text-xs font-bold text-sky-300 tracking-widest uppercase">Verified Legal Network</span>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-bold font-display mb-6 leading-tight">
                            Vakeel <span className="text-gradient-blue">Connect</span>
                        </h1>
                        <p className="text-xl text-neutral-400 leading-relaxed font-light">
                            Connect with India's top legal minds. Verified credentials, transparent track records, and instant consultations.
                        </p>
                    </div>

                    <div className="flex gap-4">
                        <div className="text-right hidden md:block">
                            <p className="text-3xl font-bold text-white font-mono">15,000+</p>
                            <p className="text-sm text-neutral-500 uppercase tracking-widest">Active Lawyers</p>
                        </div>
                    </div>
                </header>

                {/* Search & Filter Bar */}
                <div className="sticky top-24 z-30 mb-12 animate-fade-in delay-100">
                    <div className="glass-premium p-4 md:p-6 rounded-3xl flex flex-col md:flex-row gap-6 items-center shadow-2xl">

                        {/* Search Input */}
                        <div className="relative w-full md:w-96 group">
                            <div className="absolute inset-0 bg-sky-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="relative flex items-center">
                                <Search className="absolute left-4 text-neutral-400 group-focus-within:text-sky-400 transition-colors" size={20} />
                                <input
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    placeholder="Search by name, expertise, or city..."
                                    className="w-full bg-black/50 border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-white placeholder:text-neutral-500 focus:outline-none focus:border-sky-500/50 focus:bg-black/80 transition-all font-medium"
                                />
                            </div>
                        </div>

                        <div className="w-px h-10 bg-white/10 hidden md:block" />

                        {/* Filter Tags */}
                        <div className="flex items-center gap-3 overflow-x-auto w-full pb-2 md:pb-0 hide-scrollbar">
                            <span className="text-neutral-500 text-sm font-bold uppercase tracking-wider whitespace-nowrap mr-2">
                                Expertise:
                            </span>
                            {specialties.map(spec => (
                                <button
                                    key={spec}
                                    onClick={() => setFilterSpecialty(spec)}
                                    className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all whitespace-nowrap border
                                        ${filterSpecialty === spec
                                            ? 'bg-sky-600 border-sky-500 text-white shadow-[0_0_20px_rgba(2,132,199,0.4)]'
                                            : 'bg-white/5 border-white/10 text-neutral-400 hover:text-white hover:bg-white/10'}
                                    `}
                                >
                                    {spec}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Lawyers Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {loading ? (
                        <div className="col-span-full flex flex-col items-center justify-center py-20 text-sky-500/50 gap-4">
                            <div className="w-10 h-10 border-4 border-sky-500/20 border-t-sky-500 rounded-full animate-spin" />
                            <p className="font-mono text-sm uppercase tracking-widest text-sky-400">Summoning Counsel...</p>
                        </div>
                    ) : filteredLawyers.length === 0 ? (
                        <div className="col-span-full text-center py-20 bg-white/5 rounded-[2rem] border border-white/5">
                            <p className="text-neutral-500 font-mono">No lawyers found matching your criteria.</p>
                        </div>
                    ) : (
                        filteredLawyers.map((lawyer, idx) => (
                            <div
                                key={lawyer.id}
                                className="group relative perspective-1000 animate-slide-up"
                                style={{ animationDelay: `${idx * 100}ms` }}
                            >
                                <div className="relative h-full bg-[#0a0a0f] border border-white/10 rounded-[2rem] overflow-hidden transition-all duration-500 preserve-3d group-hover:rotate-x-[2deg] group-hover:-translate-y-2 group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.5)]">

                                    {/* Image Section */}
                                    <div className="h-64 relative overflow-hidden">
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-transparent to-transparent z-10 opacity-90" />
                                        <img
                                            src={lawyer.image}
                                            alt={lawyer.name}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />

                                        {/* Availability Badge */}
                                        <div className={`absolute top-4 right-4 z-20 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border backdrop-blur-md flex items-center gap-1.5
                                        ${lawyer.status === 'Available'
                                                ? 'bg-emerald-500/20 border-emerald-500/30 text-emerald-400'
                                                : 'bg-amber-500/20 border-amber-500/30 text-amber-400'}
                                    `}>
                                            <div className={`w-1.5 h-1.5 rounded-full ${lawyer.status === 'Available' ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
                                            {lawyer.status}
                                        </div>

                                        {/* Basic Info Overlay */}
                                        <div className="absolute bottom-4 left-6 z-20 transform transition-transform duration-300 group-hover:-translate-y-2">
                                            <h3 className="text-2xl font-bold font-display text-white mb-1 flex items-center gap-2">
                                                {lawyer.name}
                                                {lawyer.verified && <ShieldCheck size={18} className="text-sky-400" />}
                                            </h3>
                                            <p className="text-sky-400 font-medium">{lawyer.specialty}</p>
                                        </div>
                                    </div>

                                    {/* Details Body */}
                                    <div className="p-6 relative z-10 bg-[#0a0a0f]">
                                        {/* Stats Row */}
                                        <div className="flex items-center justify-between mb-6 pb-6 border-b border-white/5">
                                            <div>
                                                <p className="text-[10px] text-neutral-500 uppercase tracking-widest font-bold mb-1">Experience</p>
                                                <p className="text-lg font-mono text-white">{lawyer.experienceYears} Years</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-[10px] text-neutral-500 uppercase tracking-widest font-bold mb-1">Rating</p>
                                                <div className="flex items-center justify-end gap-1 text-white font-bold">
                                                    <Star size={14} className="text-yellow-400 fill-yellow-400" />
                                                    {lawyer.rating}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Tags */}
                                        <div className="flex flex-wrap gap-2 mb-6">
                                            {(lawyer.tags || []).map(tag => (
                                                <span key={tag} className="px-2 py-1 rounded-md bg-white/5 border border-white/10 text-[10px] text-neutral-400 font-medium">
                                                    #{tag}
                                                </span>
                                            ))}
                                        </div>

                                        {/* Actions */}
                                        <div className="grid grid-cols-2 gap-3">
                                            <Link
                                                to={`/vakeel/${lawyer.id}/book`}
                                                className="py-3 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-sky-900/20"
                                            >
                                                <Calendar size={14} /> Book Appointment
                                            </Link>
                                            <Link
                                                to={`/vakeel/${lawyer.id}`}
                                                className="py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold text-sm transition-all flex items-center justify-center gap-2 group/btn"
                                            >
                                                Profile <ChevronRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

            </div>
        </div>
    );
};

export default VakeelConnect;
