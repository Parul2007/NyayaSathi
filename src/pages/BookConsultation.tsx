import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
    ChevronLeft, Calendar, Clock, MessageSquare,
    Send, CheckCircle, ShieldCheck,
    AlertCircle, Watch
} from "lucide-react";
import { useFirestore } from "../hooks/useFirestore";

import { MOCK_LAWYERS, Lawyer } from "../data/mockData";

const BookConsultation: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { data: firestoreLawyers, loading } = useFirestore<Lawyer>('directory_lawyers');

    // Hybrid Lookup
    const lawyer = firestoreLawyers.find(l => l.id === id) || MOCK_LAWYERS.find(l => l.id === id);

    const [isSubmitted, setIsSubmitted] = useState(false);
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedSlot, setSelectedSlot] = useState("");
    const [caseDetails, setCaseDetails] = useState("");
    const [urgency, setUrgency] = useState("Normal");

    const timeSlots = [
        "10:00 AM", "11:30 AM", "02:00 PM",
        "03:45 PM", "05:15 PM", "07:00 PM"
    ];

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedDate || !selectedSlot) return;
        setIsSubmitted(true);
        setTimeout(() => {
            navigate("/vakeel-connect");
        }, 5000);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center text-sky-500">
                <div className="w-10 h-10 border-4 border-sky-500/20 border-t-sky-500 rounded-full animate-spin" />
            </div>
        );
    }

    if (!lawyer) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center text-neutral-500">
                Lawyer not found
            </div>
        );
    }

    if (isSubmitted) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-black px-6">
                <div className="max-w-xl w-full p-16 rounded-[4rem] bg-neutral-900/50 border border-emerald-500/30 text-center backdrop-blur-3xl animate-fade-in shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 blur-[80px] rounded-full" />
                    <div className="relative z-10 flex flex-col items-center">
                        <div className="w-24 h-24 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500 mb-8 border border-emerald-500/20 shadow-[0_0_50px_rgba(16,185,129,0.2)]">
                            <CheckCircle size={48} />
                        </div>
                        <h2 className="text-4xl font-display text-white mb-6">Request Sent</h2>
                        <p className="text-neutral-400 text-lg font-light leading-relaxed mb-6">
                            Your appointment with <span className="text-white font-medium">{lawyer.name}</span> is confirmed.
                        </p>
                        <div className="mb-12 flex flex-col items-center gap-2">
                            <div className="px-6 py-2 rounded-full bg-white/5 border border-white/10 flex items-center gap-3 text-neutral-300">
                                <Calendar size={16} /> <span>{selectedDate}</span>
                                <div className="w-1 h-1 rounded-full bg-neutral-600" />
                                <Clock size={16} /> <span>{selectedSlot}</span>
                            </div>
                        </div>
                        <Link to="/vakeel-connect" className="text-emerald-500 font-black uppercase tracking-[0.2em] text-xs hover:text-white transition-colors">
                            Back to Directory
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pb-32 bg-black text-white relative overflow-hidden">
            {/* Ambient Lighting */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-sky-900/10 blur-[150px] rounded-full opacity-60" />
                <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-indigo-900/10 blur-[150px] rounded-full opacity-40" />
                <div className="absolute inset-0 bg-grid-white/[0.01]" />
            </div>

            <div className="max-w-5xl mx-auto px-6 pt-32 relative z-10">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-neutral-500 hover:text-white transition-colors mb-12 group"
                >
                    <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                    <span className="text-sm font-bold uppercase tracking-widest">Back to Profile</span>
                </button>

                <div className="grid lg:grid-cols-12 gap-12 items-start">
                    {/* Progress Helper */}
                    <div className="lg:col-span-4 space-y-8">
                        <div className="p-8 rounded-[2.5rem] bg-neutral-900/50 border border-white/5 backdrop-blur-xl">
                            <div className="flex items-center gap-4 mb-8">
                                <img src={lawyer.image} className="w-16 h-16 rounded-2xl object-cover border border-white/10" alt="" />
                                <div>
                                    <h4 className="text-white font-bold tracking-tight">{lawyer.name}</h4>
                                    <p className="text-[10px] text-sky-400 uppercase tracking-widest font-black">{lawyer.specialty}</p>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div className="flex items-center gap-4 text-sm text-neutral-400">
                                    <ShieldCheck size={18} className="text-emerald-400" />
                                    <span>Verified Consultation</span>
                                </div>
                                <div className="flex items-center gap-4 text-sm text-neutral-400">
                                    <Clock size={18} className="text-sky-400" />
                                    <span>30 Minute Session</span>
                                </div>
                            </div>
                        </div>

                        <div className="p-8 rounded-[2.5rem] bg-amber-500/5 border border-amber-500/20 text-xs text-amber-500/80 leading-relaxed font-medium">
                            <div className="flex items-center gap-2 mb-3">
                                <AlertCircle size={14} />
                                <span className="font-black uppercase tracking-widest">Legal Notice</span>
                            </div>
                            Booking a consultation does not establish an attorney-client relationship. All data is encrypted with 256-bit security.
                        </div>
                    </div>

                    {/* Form Panel */}
                    <div className="lg:col-span-8 p-12 rounded-[3.5rem] bg-neutral-900/40 border border-white/5 backdrop-blur-3xl shadow-2xl">
                        <h1 className="text-4xl font-display mb-10 tracking-tight">Select a Time</h1>

                        <form onSubmit={handleSubmit} className="space-y-10">
                            {/* Date & Slots Grid */}
                            <div className="space-y-6">
                                <div className="space-y-3">
                                    <label className="text-[10px] text-neutral-500 uppercase font-black tracking-widest px-1">Select Date</label>
                                    <div className="relative group">
                                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500 group-focus-within:text-sky-400 transition-colors" size={20} />
                                        <input
                                            required
                                            type="date"
                                            className="w-full bg-black/50 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-sky-500/50 transition-all font-medium"
                                            value={selectedDate}
                                            onChange={(e) => setSelectedDate(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className={`space-y-4 transition-all duration-500 ${!selectedDate ? 'opacity-50 pointer-events-none grayscale' : 'opacity-100'}`}>
                                    <div className="flex items-center justify-between px-1">
                                        <label className="text-[10px] text-neutral-500 uppercase font-black tracking-widest">Available Slots</label>
                                        <span className="text-[10px] text-emerald-500 font-bold flex items-center gap-1">
                                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                            Live Availability
                                        </span>
                                    </div>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                        {timeSlots.map(slot => (
                                            <button
                                                key={slot}
                                                type="button"
                                                disabled={!selectedDate}
                                                onClick={() => setSelectedSlot(slot)}
                                                className={`py-3 px-4 rounded-xl border flex items-center justify-center gap-2 font-medium transition-all
                                                    ${selectedSlot === slot
                                                        ? 'bg-sky-500 border-sky-500 text-white shadow-lg shadow-sky-500/25 scale-[1.02]'
                                                        : 'bg-black/40 border-white/5 text-neutral-400 hover:bg-white/5 hover:border-white/10 hover:text-white'
                                                    }`}
                                            >
                                                <Watch size={14} />
                                                {slot}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <label className="text-[10px] text-neutral-500 uppercase font-black tracking-widest px-1">Case Brief</label>
                                <div className="relative group">
                                    <MessageSquare className="absolute left-4 top-6 text-neutral-500 group-focus-within:text-sky-400 transition-colors" size={20} />
                                    <textarea
                                        required
                                        rows={4}
                                        placeholder="Briefly describe your legal requirement..."
                                        className="w-full bg-black/50 border border-white/10 rounded-3xl py-6 pl-12 pr-6 text-white focus:outline-none focus:border-sky-500/50 transition-all font-medium resize-none"
                                        value={caseDetails}
                                        onChange={(e) => setCaseDetails(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="p-8 rounded-3xl bg-white/5 border border-white/5 flex items-center justify-between">
                                <div className="space-y-1">
                                    <h4 className="text-white font-bold">Priority Status</h4>
                                    <p className="text-[10px] text-neutral-500 uppercase tracking-widest">Urgent matters prioritize fast scheduling</p>
                                </div>
                                <select
                                    className="bg-black border border-white/10 rounded-xl px-4 py-2 text-sm font-bold text-sky-400 focus:outline-none focus:border-sky-500"
                                    value={urgency}
                                    onChange={(e) => setUrgency(e.target.value)}
                                >
                                    <option>Normal</option>
                                    <option>Urgent</option>
                                    <option>High Priority</option>
                                </select>
                            </div>

                            <button
                                type="submit"
                                disabled={!selectedDate || !selectedSlot}
                                className={`w-full py-6 rounded-full font-black text-sm uppercase tracking-widest flex items-center justify-center gap-3 transition-all
                                    ${(!selectedDate || !selectedSlot)
                                        ? 'bg-neutral-800 text-neutral-500 cursor-not-allowed'
                                        : 'bg-white text-black hover:bg-sky-400 shadow-[0_20px_40px_rgba(0,0,0,0.5)] active:scale-[0.98]'
                                    }`}
                            >
                                Confirm Appointment <Send size={20} />
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookConsultation;
