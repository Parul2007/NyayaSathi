import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
    ArrowLeft, Shield, User, Phone, Mail, MapPin, Lock, Eye, EyeOff,
    Save, CheckCircle, Edit3, X, Briefcase, Building, IndianRupee,
    Calendar, Heart, AlertCircle, FileText, Scale, Clock, Users
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

const CORRECT_PIN = "2345";

interface ProfileData {
    // Personal Information
    fullName: string;
    email: string;
    phone: string;
    dateOfBirth: string;
    gender: string;
    aadhaarLast4: string;

    // Address
    address: string;
    city: string;
    state: string;
    pincode: string;

    // Professional Information
    occupation: string;
    company: string;
    annualIncome: string;

    // Emergency Contact
    emergencyName: string;
    emergencyRelation: string;
    emergencyPhone: string;

    // Legal Information
    totalCases: number;
    activeCases: number;
    documentsUploaded: number;

    // Preferences
    preferredLanguage: string;
    notificationsEnabled: boolean;
    twoFactorEnabled: boolean;
}

import { maskPhoneNumber } from "../utils/masking";

const Profile: React.FC = () => {
    const { user } = useAuth();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [pin, setPin] = useState(["", "", "", ""]);
    const [pinError, setPinError] = useState("");
    const [showPin, setShowPin] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [saveSuccess, setSaveSuccess] = useState(false);

    const [profileData, setProfileData] = useState<ProfileData>({
        // Personal Information
        fullName: user?.name || "Demo User",
        email: user?.email || "demo@nyayasathi.com",
        phone: user?.phone ? maskPhoneNumber(user.phone) : "+91 98765 432xx",
        dateOfBirth: "1990-05-15",
        gender: "Male",
        aadhaarLast4: "7890",

        // Address
        address: user?.address || "123, Legal Tower, Sector 15",
        city: user?.city || "New Delhi",
        state: user?.state || "Delhi",
        pincode: user?.pincode || "110001",

        // Professional Information
        occupation: "Business Owner",
        company: "ABC Enterprises Pvt. Ltd.",
        annualIncome: "10-25 Lakhs",

        // Emergency Contact
        emergencyName: "Priya Sharma",
        emergencyRelation: "Spouse",
        emergencyPhone: "+91 98765 123xx",

        // Legal Information
        totalCases: 5,
        activeCases: 2,
        documentsUploaded: 12,

        // Preferences
        preferredLanguage: "English",
        notificationsEnabled: true,
        twoFactorEnabled: false
    });

    const [editableData, setEditableData] = useState<ProfileData>(profileData);

    const handlePinChange = (index: number, value: string) => {
        if (value.length > 1) return;
        if (value && !/^\d$/.test(value)) return;

        const newPin = [...pin];
        newPin[index] = value;
        setPin(newPin);
        setPinError("");

        // Auto-focus next input
        if (value && index < 3) {
            const nextInput = document.getElementById(`pin-${index + 1}`);
            nextInput?.focus();
        }

        // Auto-submit when all digits entered
        if (index === 3 && value) {
            const fullPin = newPin.join("");
            if (fullPin === CORRECT_PIN) {
                setIsAuthenticated(true);
            } else {
                setPinError("Incorrect PIN. Please try again.");
                setPin(["", "", "", ""]);
                document.getElementById("pin-0")?.focus();
            }
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
        if (e.key === "Backspace" && !pin[index] && index > 0) {
            const prevInput = document.getElementById(`pin-${index - 1}`);
            prevInput?.focus();
        }
    };

    const handleInputChange = (field: keyof ProfileData, value: string | boolean) => {
        setEditableData(prev => ({ ...prev, [field]: value }));
    };

    const handleSave = async () => {
        setIsSaving(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        setProfileData(editableData);
        setIsSaving(false);
        setSaveSuccess(true);
        setIsEditing(false);
        setTimeout(() => setSaveSuccess(false), 3000);
    };

    const handleCancel = () => {
        setEditableData(profileData);
        setIsEditing(false);
    };

    // PIN Authentication Screen
    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-black text-white flex items-center justify-center px-4 relative overflow-hidden">
                {/* Background Effects */}
                <div className="fixed inset-0 pointer-events-none z-0">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-indigo-900/30 via-purple-900/20 to-pink-900/30 blur-[150px] rounded-full" />
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5" />
                </div>

                <div className="relative z-10 w-full max-w-md">
                    <Link
                        to="/dashboard"
                        className="inline-flex items-center gap-2 mb-8 text-neutral-400 hover:text-white transition-colors group"
                    >
                        <ArrowLeft size={18} />
                        <span className="text-sm font-bold uppercase tracking-widest">Back</span>
                    </Link>

                    <div className="p-10 rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-xl">
                        <div className="text-center mb-10">
                            <div className="w-20 h-20 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 flex items-center justify-center">
                                <Lock size={40} className="text-indigo-400" />
                            </div>
                            <h1 className="text-3xl font-bold font-display mb-2">Secure Access</h1>
                            <p className="text-neutral-400">Enter your 4-digit PIN to view profile</p>
                        </div>

                        <div className="flex justify-center gap-4 mb-8">
                            {pin.map((digit, index) => (
                                <input
                                    key={index}
                                    id={`pin-${index}`}
                                    type={showPin ? "text" : "password"}
                                    value={digit}
                                    onChange={(e) => handlePinChange(index, e.target.value)}
                                    onKeyDown={(e) => handleKeyDown(index, e)}
                                    className={`w-16 h-16 text-center text-2xl font-bold rounded-2xl bg-black/40 border-2 
                                        ${pinError ? 'border-red-500/50' : digit ? 'border-indigo-500/50' : 'border-white/10'} 
                                        focus:outline-none focus:border-indigo-500 transition-all`}
                                    maxLength={1}
                                    autoFocus={index === 0}
                                />
                            ))}
                        </div>

                        {pinError && (
                            <div className="flex items-center justify-center gap-2 text-red-400 text-sm mb-6 animate-shake">
                                <AlertCircle size={16} />
                                {pinError}
                            </div>
                        )}

                        <button
                            onClick={() => setShowPin(!showPin)}
                            className="w-full flex items-center justify-center gap-2 text-neutral-400 hover:text-white transition-colors text-sm"
                        >
                            {showPin ? <EyeOff size={16} /> : <Eye size={16} />}
                            {showPin ? "Hide PIN" : "Show PIN"}
                        </button>

                        <p className="text-center text-neutral-500 text-xs mt-8">
                            Demo PIN: <span className="text-indigo-400 font-bold">2345</span>
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    // Profile View/Edit Screen
    return (
        <div className="min-h-screen bg-black text-white pb-20 pt-32 px-4 relative overflow-hidden">
            {/* Premium Background */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-gradient-to-b from-indigo-900/20 via-purple-900/10 to-transparent blur-[150px] rounded-full opacity-60" />
                <div className="absolute bottom-0 right-0 w-[700px] h-[700px] bg-emerald-900/20 blur-[150px] rounded-full" />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 mix-blend-overlay" />
            </div>

            <div className="relative z-10 max-w-5xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-12">
                    <Link
                        to="/dashboard"
                        className="inline-flex items-center gap-2 text-neutral-400 hover:text-white transition-colors group"
                    >
                        <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                            <ArrowLeft size={18} />
                        </div>
                        <span className="text-sm font-bold uppercase tracking-widest">Dashboard</span>
                    </Link>

                    <div className="flex items-center gap-3">
                        {saveSuccess && (
                            <div className="flex items-center gap-2 text-emerald-400 text-sm font-bold animate-fade-in">
                                <CheckCircle size={16} /> Saved Successfully
                            </div>
                        )}

                        {!isEditing ? (
                            <button
                                onClick={() => setIsEditing(true)}
                                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition-all"
                            >
                                <Edit3 size={18} /> Edit Profile
                            </button>
                        ) : (
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={handleCancel}
                                    className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white font-bold transition-all"
                                >
                                    <X size={18} /> Cancel
                                </button>
                                <button
                                    onClick={handleSave}
                                    disabled={isSaving}
                                    className="flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition-all disabled:opacity-50"
                                >
                                    {isSaving ? (
                                        <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                                    ) : (
                                        <Save size={18} />
                                    )}
                                    {isSaving ? "Saving..." : "Save Changes"}
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Profile Header Card */}
                <div className="p-8 rounded-[2rem] bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 border border-white/10 mb-8">
                    <div className="flex flex-col md:flex-row items-center gap-6">
                        <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-4xl font-bold shadow-lg shadow-indigo-900/30">
                            {profileData.fullName[0]}
                        </div>
                        <div className="text-center md:text-left">
                            <h1 className="text-4xl font-bold font-display mb-2">{profileData.fullName}</h1>
                            <p className="text-neutral-400">{profileData.email}</p>
                            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mt-4">
                                <span className="px-3 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold">
                                    Verified User
                                </span>
                                <span className="px-3 py-1 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold">
                                    Premium Member
                                </span>
                            </div>
                        </div>
                        <div className="md:ml-auto grid grid-cols-3 gap-6 text-center">
                            <div>
                                <p className="text-3xl font-bold text-white">{profileData.totalCases}</p>
                                <p className="text-xs text-neutral-500 uppercase tracking-wider">Total Cases</p>
                            </div>
                            <div>
                                <p className="text-3xl font-bold text-emerald-400">{profileData.activeCases}</p>
                                <p className="text-xs text-neutral-500 uppercase tracking-wider">Active</p>
                            </div>
                            <div>
                                <p className="text-3xl font-bold text-indigo-400">{profileData.documentsUploaded}</p>
                                <p className="text-xs text-neutral-500 uppercase tracking-wider">Documents</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Profile Sections Grid */}
                <div className="grid md:grid-cols-2 gap-8">

                    {/* Personal Information */}
                    <div className="p-8 rounded-[2rem] bg-white/5 border border-white/10 backdrop-blur-xl">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                                <User size={24} className="text-blue-400" />
                            </div>
                            <h2 className="text-xl font-bold">Personal Information</h2>
                        </div>

                        <div className="space-y-4">
                            <ProfileField
                                label="Full Name"
                                value={editableData.fullName}
                                isEditing={isEditing}
                                onChange={(v) => handleInputChange("fullName", v)}
                            />
                            <ProfileField
                                label="Email"
                                value={editableData.email}
                                isEditing={isEditing}
                                onChange={(v) => handleInputChange("email", v)}
                                type="email"
                            />
                            <ProfileField
                                label="Phone"
                                value={editableData.phone}
                                isEditing={isEditing}
                                onChange={(v) => handleInputChange("phone", v)}
                                type="tel"
                            />
                            <ProfileField
                                label="Date of Birth"
                                value={editableData.dateOfBirth}
                                isEditing={isEditing}
                                onChange={(v) => handleInputChange("dateOfBirth", v)}
                                type="date"
                            />
                            <ProfileField
                                label="Gender"
                                value={editableData.gender}
                                isEditing={isEditing}
                                onChange={(v) => handleInputChange("gender", v)}
                                options={["Male", "Female", "Other"]}
                            />
                            <ProfileField
                                label="Aadhaar (Last 4)"
                                value={editableData.aadhaarLast4}
                                isEditing={isEditing}
                                onChange={(v) => handleInputChange("aadhaarLast4", v)}
                                masked
                            />
                        </div>
                    </div>

                    {/* Address Information */}
                    <div className="p-8 rounded-[2rem] bg-white/5 border border-white/10 backdrop-blur-xl">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                                <MapPin size={24} className="text-emerald-400" />
                            </div>
                            <h2 className="text-xl font-bold">Address</h2>
                        </div>

                        <div className="space-y-4">
                            <ProfileField
                                label="Full Address"
                                value={editableData.address}
                                isEditing={isEditing}
                                onChange={(v) => handleInputChange("address", v)}
                            />
                            <ProfileField
                                label="City"
                                value={editableData.city}
                                isEditing={isEditing}
                                onChange={(v) => handleInputChange("city", v)}
                            />
                            <ProfileField
                                label="State"
                                value={editableData.state}
                                isEditing={isEditing}
                                onChange={(v) => handleInputChange("state", v)}
                            />
                            <ProfileField
                                label="Pincode"
                                value={editableData.pincode}
                                isEditing={isEditing}
                                onChange={(v) => handleInputChange("pincode", v)}
                            />
                        </div>
                    </div>

                    {/* Professional Information */}
                    <div className="p-8 rounded-[2rem] bg-white/5 border border-white/10 backdrop-blur-xl">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
                                <Briefcase size={24} className="text-purple-400" />
                            </div>
                            <h2 className="text-xl font-bold">Professional Details</h2>
                        </div>

                        <div className="space-y-4">
                            <ProfileField
                                label="Occupation"
                                value={editableData.occupation}
                                isEditing={isEditing}
                                onChange={(v) => handleInputChange("occupation", v)}
                            />
                            <ProfileField
                                label="Company/Organization"
                                value={editableData.company}
                                isEditing={isEditing}
                                onChange={(v) => handleInputChange("company", v)}
                            />
                            <ProfileField
                                label="Annual Income"
                                value={editableData.annualIncome}
                                isEditing={isEditing}
                                onChange={(v) => handleInputChange("annualIncome", v)}
                                options={["Below 5 Lakhs", "5-10 Lakhs", "10-25 Lakhs", "25-50 Lakhs", "Above 50 Lakhs"]}
                            />
                        </div>
                    </div>

                    {/* Emergency Contact */}
                    <div className="p-8 rounded-[2rem] bg-white/5 border border-white/10 backdrop-blur-xl">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                                <Heart size={24} className="text-red-400" />
                            </div>
                            <h2 className="text-xl font-bold">Emergency Contact</h2>
                        </div>

                        <div className="space-y-4">
                            <ProfileField
                                label="Contact Name"
                                value={editableData.emergencyName}
                                isEditing={isEditing}
                                onChange={(v) => handleInputChange("emergencyName", v)}
                            />
                            <ProfileField
                                label="Relationship"
                                value={editableData.emergencyRelation}
                                isEditing={isEditing}
                                onChange={(v) => handleInputChange("emergencyRelation", v)}
                                options={["Spouse", "Parent", "Sibling", "Child", "Friend", "Other"]}
                            />
                            <ProfileField
                                label="Contact Phone"
                                value={editableData.emergencyPhone}
                                isEditing={isEditing}
                                onChange={(v) => handleInputChange("emergencyPhone", v)}
                                type="tel"
                            />
                        </div>
                    </div>

                    {/* Preferences */}
                    <div className="md:col-span-2 p-8 rounded-[2rem] bg-white/5 border border-white/10 backdrop-blur-xl">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                                <Shield size={24} className="text-amber-400" />
                            </div>
                            <h2 className="text-xl font-bold">Preferences & Security</h2>
                        </div>

                        <div className="grid md:grid-cols-3 gap-6">
                            <ProfileField
                                label="Preferred Language"
                                value={editableData.preferredLanguage}
                                isEditing={isEditing}
                                onChange={(v) => handleInputChange("preferredLanguage", v)}
                                options={["English", "Hindi", "Both"]}
                            />
                            <div className="flex items-center justify-between p-4 rounded-xl bg-black/20 border border-white/5">
                                <span className="text-sm text-neutral-400">Email Notifications</span>
                                <button
                                    onClick={() => isEditing && handleInputChange("notificationsEnabled", !editableData.notificationsEnabled)}
                                    className={`w-12 h-6 rounded-full transition-all ${editableData.notificationsEnabled ? 'bg-emerald-500' : 'bg-neutral-700'} ${!isEditing && 'opacity-50 cursor-not-allowed'}`}
                                >
                                    <div className={`w-5 h-5 rounded-full bg-white transition-all ${editableData.notificationsEnabled ? 'translate-x-6' : 'translate-x-0.5'}`} />
                                </button>
                            </div>
                            <div className="flex items-center justify-between p-4 rounded-xl bg-black/20 border border-white/5">
                                <span className="text-sm text-neutral-400">Two-Factor Auth</span>
                                <button
                                    onClick={() => isEditing && handleInputChange("twoFactorEnabled", !editableData.twoFactorEnabled)}
                                    className={`w-12 h-6 rounded-full transition-all ${editableData.twoFactorEnabled ? 'bg-emerald-500' : 'bg-neutral-700'} ${!isEditing && 'opacity-50 cursor-not-allowed'}`}
                                >
                                    <div className={`w-5 h-5 rounded-full bg-white transition-all ${editableData.twoFactorEnabled ? 'translate-x-6' : 'translate-x-0.5'}`} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Reusable Profile Field Component
interface ProfileFieldProps {
    label: string;
    value: string;
    isEditing: boolean;
    onChange: (value: string) => void;
    type?: string;
    options?: string[];
    masked?: boolean;
}

const ProfileField: React.FC<ProfileFieldProps> = ({
    label, value, isEditing, onChange, type = "text", options, masked
}) => {
    if (isEditing) {
        if (options) {
            return (
                <div className="space-y-1">
                    <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">{label}</label>
                    <select
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-all"
                    >
                        {options.map(opt => (
                            <option key={opt} value={opt}>{opt}</option>
                        ))}
                    </select>
                </div>
            );
        }
        return (
            <div className="space-y-1">
                <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider">{label}</label>
                <input
                    type={type}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-all"
                />
            </div>
        );
    }

    return (
        <div className="flex justify-between items-center py-2 border-b border-white/5">
            <span className="text-sm text-neutral-400">{label}</span>
            <span className="text-sm font-medium text-white">{masked ? `XXXX ${value}` : value}</span>
        </div>
    );
};

export default Profile;
