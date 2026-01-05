import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Shield, User, Phone, Mail, MapPin, CheckCircle, Save } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { maskPhoneNumber } from "../utils/masking";

const Settings: React.FC = () => {
    const { user, updateUser } = useAuth();

    const [profileData, setProfileData] = useState({
        fullName: user?.fullName || "",
        phone: user?.phone ? maskPhoneNumber(user.phone) : "+91 98765 432xx",
        address: user?.address || "",
        city: user?.city || "",
        state: user?.state || "",
        pincode: user?.pincode || "",
    });

    const [isSaving, setIsSaving] = useState(false);
    const [saveStatus, setSaveStatus] = useState<"idle" | "success" | "error">("idle");

    useEffect(() => {
        if (user) {
            setProfileData({
                fullName: user.fullName || "",
                phone: user.phone ? maskPhoneNumber(user.phone) : "+91 98765 432xx",
                address: user.address || "",
                city: user.city || "",
                state: user.state || "",
                pincode: user.pincode || "",
            });
        }
    }, [user]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setProfileData(prev => ({ ...prev, [name]: value }));
    };

    const handleProfileUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        setSaveStatus("idle");

        try {
            await updateUser(profileData);
            setSaveStatus("success");
            setTimeout(() => setSaveStatus("idle"), 3000);
        } catch (error) {
            console.error("Profile update failed:", error);
            setSaveStatus("error");
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="min-h-screen bg-black text-white pb-20 pt-32 px-4 relative overflow-hidden">
            {/* Premium Background */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-gradient-to-b from-indigo-900/20 via-purple-900/10 to-transparent blur-[150px] rounded-full opacity-60" />
                <div className="absolute bottom-0 right-0 w-[700px] h-[700px] bg-emerald-900/20 blur-[150px] rounded-full" />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 mix-blend-overlay" />
            </div>

            <div className="relative z-10 max-w-4xl mx-auto">
                {/* Back Button */}
                <Link
                    to="/dashboard"
                    className="inline-flex items-center gap-2 mb-8 text-neutral-400 hover:text-white transition-colors group animate-fade-in"
                >
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-white/20 transition-all">
                        <ArrowLeft size={18} />
                    </div>
                    <span className="text-sm font-bold uppercase tracking-widest">Back to Dashboard</span>
                </Link>

                {/* Header */}
                <header className="mb-16 animate-fade-in-up">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 mb-6 backdrop-blur-md">
                        <Shield size={14} className="text-indigo-400" />
                        <span className="text-xs font-bold text-indigo-300 tracking-widest uppercase">System Settings</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-bold font-display mb-6 leading-tight">
                        Settings <span className="text-gradient-gold">.</span>
                    </h1>
                    <p className="text-xl text-neutral-400 leading-relaxed font-light max-w-3xl">
                        Customize your experience and manage your secure profile.
                    </p>
                </header>

                {/* Settings Sections */}
                <div className="space-y-12">

                    {/* Profile Section */}
                    <div className="group relative p-8 md:p-12 rounded-[2.5rem] bg-white/5 border border-white/10 hover:border-emerald-500/20 transition-all duration-500 backdrop-blur-xl animate-slide-up">
                        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/[0.02] to-transparent rounded-[2.5rem]" />
                        <div className="relative">
                            <div className="flex items-center justify-between mb-10">
                                <div className="flex items-center gap-4">
                                    <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shadow-lg shadow-emerald-900/20">
                                        <User size={28} className="text-emerald-400" />
                                    </div>
                                    <h2 className="text-3xl font-bold text-white font-display">Profile Details</h2>
                                </div>
                                {saveStatus === "success" && (
                                    <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm animate-fade-in">
                                        <CheckCircle size={16} /> Updated Successfully
                                    </div>
                                )}
                            </div>

                            <form onSubmit={handleProfileUpdate} className="grid md:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <label className="text-xs font-black uppercase tracking-widest text-neutral-500 ml-1">Full Name</label>
                                    <div className="relative group/input">
                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500 group-focus-within/input:text-emerald-500 transition-colors" size={18} />
                                        <input
                                            type="text"
                                            name="fullName"
                                            value={profileData.fullName}
                                            onChange={handleInputChange}
                                            placeholder="Enter full name"
                                            className="w-full bg-black/40 border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-white focus:outline-none focus:border-emerald-500/50 transition-all"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-black uppercase tracking-widest text-neutral-500 ml-1">Phone Number</label>
                                    <div className="relative group/input">
                                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500 group-focus-within/input:text-emerald-500 transition-colors" size={18} />
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={profileData.phone}
                                            onChange={handleInputChange}
                                            placeholder="+91 98765 432xx"
                                            className="w-full bg-black/40 border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-white focus:outline-none focus:border-emerald-500/50 transition-all"
                                        />
                                    </div>
                                </div>

                                <div className="md:col-span-2 space-y-2">
                                    <label className="text-xs font-black uppercase tracking-widest text-neutral-500 ml-1">Full Address</label>
                                    <div className="relative group/input">
                                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500 group-focus-within/input:text-emerald-500 transition-colors" size={18} />
                                        <input
                                            type="text"
                                            name="address"
                                            value={profileData.address}
                                            onChange={handleInputChange}
                                            placeholder="Room/Flat, Building, Area"
                                            className="w-full bg-black/40 border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-white focus:outline-none focus:border-emerald-500/50 transition-all"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-black uppercase tracking-widest text-neutral-500 ml-1">City</label>
                                    <input
                                        type="text"
                                        name="city"
                                        value={profileData.city}
                                        onChange={handleInputChange}
                                        className="w-full bg-black/40 border border-white/10 rounded-2xl px-4 py-4 text-white focus:outline-none focus:border-emerald-500/50 transition-all"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-xs font-black uppercase tracking-widest text-neutral-500 ml-1">State</label>
                                        <input
                                            type="text"
                                            name="state"
                                            value={profileData.state}
                                            onChange={handleInputChange}
                                            className="w-full bg-black/40 border border-white/10 rounded-2xl px-4 py-4 text-white focus:outline-none focus:border-emerald-500/50 transition-all"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-black uppercase tracking-widest text-neutral-500 ml-1">Pincode</label>
                                        <input
                                            type="text"
                                            name="pincode"
                                            value={profileData.pincode}
                                            onChange={handleInputChange}
                                            maxLength={6}
                                            className="w-full bg-black/40 border border-white/10 rounded-2xl px-4 py-4 text-white focus:outline-none focus:border-emerald-500/50 transition-all"
                                        />
                                    </div>
                                </div>

                                <div className="md:col-span-2 pt-4 flex justify-end">
                                    <button
                                        type="submit"
                                        disabled={isSaving}
                                        className="flex items-center gap-3 px-10 py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl font-bold transition-all shadow-lg shadow-emerald-900/20 active:scale-95 disabled:opacity-50"
                                    >
                                        {isSaving ? (
                                            <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                                        ) : (
                                            <Save size={20} />
                                        )}
                                        {isSaving ? "Saving..." : "Save Profile"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>



                </div>
            </div>
        </div>
    );
};

export default Settings;
