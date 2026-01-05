import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FileText, Activity, Shield, Scale, Mic, Clock,
  Zap, Users, Globe, Award, Bell, ChevronRight,
  BookOpen, Briefcase, Search, MapPin, Phone, Mail,
  User as UserIcon, CreditCard, GraduationCap, Briefcase as WorkIcon,
  Home, Sparkles, Layout, MessageSquare, Bookmark,
  History, Settings, TrendingUp, Gavel, ArrowRight
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useFirestore } from "../hooks/useFirestore";

interface NewsItem {
  id: string | number;
  title: string;
  summary: string;
  category: string;
  image: string;
}

interface UpdateItem {
  id: string;
  title: string;
  date: string;
  type: string;
}

const Dashboard: React.FC = () => {
  const { user: authUser } = useAuth();

  const savedCount = authUser?.savedArticles?.length || 0;

  const { data: latestNews, loading: newsLoading } = useFirestore<NewsItem>('cms_legal_news');
  const { data: recentUpdates, loading: updatesLoading } = useFirestore<UpdateItem>('cms_updates');

  const [randomMemberId] = useState(() => `NS-${Math.random().toString(36).substring(2, 8).toUpperCase()}`);

  const user = {
    name: authUser?.name || "Demo User",
    email: authUser?.email || "demo@nyayasathi.com",
    role: "Demo Account",
    cases: 2,
    memberId: randomMemberId,
    fullName: authUser?.fullName || authUser?.name || "Demo User"
  };


  return (
    <div className="relative min-h-screen bg-[#050505] text-white selection:bg-accent/30 font-sans pb-24 overflow-x-hidden">

      {/* Decorative Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-blue-900/10 rounded-full blur-[120px] animate-pulse-slow" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-emerald-900/10 rounded-full blur-[120px] animate-pulse-slow delay-1000" />
        <div className="absolute top-[30%] left-[20%] w-[30%] h-[30%] bg-indigo-900/10 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32">

        {/* Welcome & Global Stats Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-16 animate-fade-in-up">
          <div className="flex items-center gap-6">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-sky-500 to-legal-blue rounded-3xl blur-xl opacity-40 group-hover:opacity-60 transition-opacity" />
              <div className="relative w-20 h-20 rounded-3xl bg-black border border-white/10 flex items-center justify-center text-4xl font-bold font-serif text-white shadow-2xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
                {user.fullName[0]}
              </div>
            </div>
            <div>
              <p className="text-neutral-500 text-sm font-bold uppercase tracking-[0.2em] mb-2">Member Command Center</p>
              <h1 className="text-4xl md:text-5xl font-bold font-display text-white">
                Namaste, <span className="text-gradient">{user.name}</span>
              </h1>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: "Member ID", val: user.memberId, icon: Award, color: "text-amber-400", link: "/settings" },
              { label: "Active Cases", val: user.cases, icon: History, color: "text-sky-400", link: "/active-cases" },
              { label: "Vault Files", val: "08", icon: Shield, color: "text-emerald-400", link: "/vault" },
              { label: "Saved Articles", val: savedCount, icon: Bookmark, color: "text-purple-400", link: "/saved-articles" }
            ].map((stat, i) => (
              <Link to={stat.link} key={i} className="px-6 py-4 rounded-2xl bg-white/[0.03] border border-white/5 backdrop-blur-md flex flex-col items-center justify-center min-w-[120px] hover:bg-white/5 transition-colors">
                <stat.icon size={16} className={`${stat.color} mb-2`} />
                <span className="text-xl font-bold font-mono">{stat.val}</span>
                <span className="text-[10px] text-neutral-500 font-bold uppercase tracking-wider">{stat.label}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* PRIORITY 1: THE AI COMMAND HUB */}
        <div className="grid lg:grid-cols-12 gap-8 mb-12">

          {/* SAHAYAK AI HERO */}
          <Link to="/sahayak" className="lg:col-span-8 group relative min-h-[400px] rounded-[2.5rem] bg-gradient-to-br from-[#0a0c1a] via-[#050505] to-[#081008] border border-white/10 p-10 md:p-16 overflow-hidden flex flex-col justify-between shadow-3xl hover:border-sky-500/30 transition-all duration-700">
            <div className="absolute inset-0 bg-noise opacity-[0.03]" />
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-sky-600/10 blur-[100px] rounded-full group-hover:bg-sky-600/20 transition-all duration-700" />
            <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-emerald-600/5 blur-[80px] rounded-full" />

            <div className="relative z-10">
              <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 font-bold text-xs uppercase tracking-widest mb-10 animate-pulse">
                <Sparkles size={16} /> 24/7 Legal Advisory Active
              </div>
              <h2 className="text-4xl md:text-6xl font-bold font-serif mb-6 leading-[1.1]">
                Need Legal <br />
                <span className="text-gradient">Clarity Instantly?</span>
              </h2>
              <p className="text-neutral-400 text-lg md:text-xl max-w-xl leading-relaxed">
                Describe your situation in simple words. Sahayak AI will translate it into legal logic, find relevant sections, and predict outcomes.
              </p>
            </div>

            <div className="relative z-10 flex flex-wrap items-center gap-8 px-2">
              <div className="px-10 py-5 rounded-2xl bg-white text-black font-black uppercase text-sm tracking-widest flex items-center gap-3 hover:bg-sky-400 transition-all shadow-2xl transform active:scale-95">
                Launch Sahayak AI <ArrowRight size={20} />
              </div>
              <div className="flex items-center gap-6">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className={`w-10 h-10 rounded-full border-2 border-black bg-neutral-800 flex items-center justify-center text-[10px] font-bold`}>
                      {i === 4 ? "+2k" : "AI"}
                    </div>
                  ))}
                </div>
                <span className="text-sm text-neutral-500 font-medium tracking-wide">Users currently consulting Sahayak AI</span>
              </div>
            </div>

            {/* Decorative AI Pulse Circle */}
            <div className="absolute right-12 bottom-12 w-32 h-32 hidden md:flex items-center justify-center">
              <div className="absolute inset-0 border border-sky-500/20 rounded-full animate-ping" />
              <div className="absolute inset-2 border border-sky-500/30 rounded-full animate-pulse" />
              <Mic size={40} className="text-sky-500 opacity-50" />
            </div>
          </Link>

          {/* JUDICIAL ALERTS (Priority 1B) */}
          <div className="lg:col-span-4 space-y-8">
            <Link to="/active-cases" className="block group relative h-full rounded-[2.5rem] bg-neutral-900/30 border border-white/5 p-8 backdrop-blur-2xl hover:border-red-500/40 transition-all overflow-hidden shadow-2xl">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-bold font-serif">Judicial Alerts</h3>
                <Bell size={20} className="text-red-500 animate-bounce" />
              </div>

              <div className="space-y-6 relative">

                <div className="p-5 rounded-2xl bg-red-500/5 border border-red-500/10 group-hover:bg-red-500/10 transition-colors">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-2 h-2 rounded-full bg-red-500" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-red-500">Critical Deadline</span>
                  </div>
                  <h4 className="text-sm font-bold text-white mb-1">Boundary Mapping Report</h4>
                  <p className="text-neutral-500 text-[11px] leading-relaxed">Submission required by Jan 10, 2026 for Lucknow Court.</p>
                </div>

                <div className="p-5 rounded-2xl bg-sky-500/5 border border-sky-500/10 group-hover:bg-sky-500/10 transition-colors">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-2 h-2 rounded-full bg-sky-500" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-sky-400">Hearing Reminder</span>
                  </div>
                  <h4 className="text-sm font-bold text-white mb-1">Next Hearing: Property Title</h4>
                  <p className="text-neutral-500 text-[11px] leading-relaxed">Jan 15, 2026 • 10:30 AM • District Court</p>
                </div>

                <div className="p-5 rounded-2xl bg-emerald-500/5 border border-emerald-500/10 group-hover:bg-emerald-500/10 transition-colors">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400">System Alert</span>
                  </div>
                  <h4 className="text-sm font-bold text-white mb-1">Vault Sync Complete</h4>
                  <p className="text-neutral-500 text-[11px] leading-relaxed">All 8 documents are now secured with E-Sign.</p>
                </div>

              </div>

              <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between text-neutral-500 hover:text-white transition-colors">
                <span className="text-[10px] font-black uppercase tracking-widest">Open Case Dashboard</span>
                <ChevronRight size={16} />
              </div>
            </Link>
          </div>
        </div>

        {/* PRIORITY 2: POWER WORKSPACES */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20 animate-fade-in delay-200">

          {/* JAN-NYAYA: ANALYSIS */}
          <Link to="/jan-nyaya" className="group relative h-[380px] rounded-[2.5rem] bg-gradient-to-br from-[#12081f] to-black border border-white/10 p-8 flex flex-col justify-between overflow-hidden shadow-2xl hover:translate-y-[-10px] transition-all duration-500">
            <div className="w-16 h-16 rounded-2xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
              <Layout size={32} className="text-purple-400" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="px-3 py-1 bg-purple-500/20 text-purple-400 text-[10px] font-black uppercase tracking-widest rounded-lg">AI Vision</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Jan-Nyaya</h3>
              <p className="text-neutral-400 text-sm leading-relaxed">
                The ultimate document powerhouse. Upload contracts, notices, or FIRs for a 360-degree forensic legal analysis.
              </p>
            </div>
            <div className="flex items-center justify-between text-purple-400 font-bold text-sm">
              <span>Launch Workspace</span>
              <ChevronRight size={20} className="group-hover:translate-x-2 transition-transform" />
            </div>
          </Link>

          {/* NYAYADRAFT: DRAFTING */}
          <Link to="/draft" className="group relative h-[380px] rounded-[2.5rem] bg-gradient-to-br from-[#081a12] to-black border border-white/10 p-8 flex flex-col justify-between overflow-hidden shadow-2xl hover:translate-y-[-10px] transition-all duration-500">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
              <FileText size={32} className="text-emerald-400" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase tracking-widest rounded-lg">Pro Se Tool</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">NyayaDraft</h3>
              <p className="text-neutral-400 text-sm leading-relaxed">
                Generate professional legal drafts, replies, and agreements in seconds. Formatted and ready for official submission.
              </p>
            </div>
            <div className="flex items-center justify-between text-emerald-400 font-bold text-sm">
              <span>Open Drafting Suite</span>
              <ChevronRight size={20} className="group-hover:translate-x-2 transition-transform" />
            </div>
          </Link>

          {/* VAKEEL CONNECT: EXPERT */}
          <Link to="/vakeel-connect" className="group relative h-[380px] rounded-[2.5rem] bg-gradient-to-br from-[#1a1408] to-black border border-white/10 p-8 flex flex-col justify-between overflow-hidden shadow-2xl hover:translate-y-[-10px] transition-all duration-500">
            <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
              <Briefcase size={32} className="text-amber-400" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="px-3 py-1 bg-amber-500/20 text-amber-400 text-[10px] font-black uppercase tracking-widest rounded-lg">Human Consult</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Vakeel Connect</h3>
              <p className="text-neutral-400 text-sm leading-relaxed">
                Connect with verified high-court advocates. Book consultations, share case files securely, and get expert human backup.
              </p>
            </div>
            <div className="flex items-center justify-between text-amber-400 font-bold text-sm">
              <span>Find Your Advocate</span>
              <ChevronRight size={20} className="group-hover:translate-x-2 transition-transform" />
            </div>
          </Link>
        </div>

        {/* PRIORITY 3: RESEARCH & DISCOVERY */}
        <div className="grid lg:grid-cols-12 gap-12 mb-20">

          {/* LATEST LEGAL PULSE */}
          <div className="lg:col-span-8">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-3xl font-bold font-serif">Legal Pulse</h3>
              <Link to="/updates" className="text-neutral-500 hover:text-white transition-colors flex items-center gap-2 text-sm font-bold uppercase tracking-widest">
                Read All <ChevronRight size={16} />
              </Link>
            </div>
            <div className="grid gap-6">
              {newsLoading ? (
                <div className="p-10 text-center text-neutral-600 font-mono text-xs uppercase tracking-widest">
                  Synchronizing Pulse...
                </div>
              ) : latestNews.slice(0, 3).map((news, i) => (
                <Link to={`/news/${news.id}`} key={news.id} className="group flex flex-col sm:flex-row gap-6 p-6 rounded-[2rem] bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] transition-all animate-slide-up" style={{ animationDelay: `${i * 100}ms` }}>
                  <div className="w-full sm:w-48 h-32 rounded-2xl overflow-hidden shrink-0">
                    <img src={news.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={news.title} />
                  </div>
                  <div className="flex-1 py-2">
                    <span className="text-sky-500 text-[10px] font-black uppercase tracking-[0.2em] mb-3 block">{news.category}</span>
                    <h4 className="text-xl font-bold text-white mb-2 group-hover:text-sky-400 transition-colors">{news.title}</h4>
                    <p className="text-neutral-500 text-sm line-clamp-1">{news.summary}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* KNOWLEDGE & TOOLS SIDEBAR */}
          <div className="lg:col-span-4 space-y-8">
            {/* NYAYA GYAN LIBRARY */}
            <Link to="/nyaya-gyan" className="block relative p-8 rounded-[2.5rem] bg-gradient-to-b from-blue-600/20 to-black border border-blue-500/20 overflow-hidden group shadow-xl">
              <div className="relative z-10">
                <BookOpen size={40} className="text-blue-400 mb-6 group-hover:scale-110 transition-transform" />
                <h3 className="text-2xl font-bold text-white mb-2">Nyaya Gyan</h3>
                <p className="text-neutral-400 text-sm mb-8 leading-relaxed">
                  Search over 50,000+ Indian laws, sections, and landmark judgments.
                </p>
                <div className="w-full bg-white/10 rounded-xl p-4 flex items-center justify-between text-blue-300 font-bold text-xs uppercase tracking-widest">
                  Enter Library <Search size={16} />
                </div>
              </div>
            </Link>

            {/* SAVED ARTICLES QUICK ACCESS */}
            <Link to="/saved-articles" className="block relative p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/5 overflow-hidden group hover:border-emerald-500/30 transition-all">
              <div className="flex items-center justify-between mb-4">
                <Bookmark size={24} className="text-emerald-500" />
                <span className="px-2.5 py-1 bg-emerald-500/20 text-emerald-400 text-[10px] font-bold rounded-lg uppercase">Bookmarked</span>
              </div>
              <h4 className="text-lg font-bold text-white">Your Reading List</h4>
              <p className="text-neutral-500 text-sm mt-2">{savedCount} Articles saved for offline review</p>
            </Link>
          </div>
        </div>

        {/* PRIORITY 4: COMMUNITY & UTILITIES */}
        <div className="pt-20 border-t border-white/5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="max-w-xl">
              <h3 className="text-3xl font-bold font-serif mb-6 text-gradient-blue">Join the National Forum</h3>
              <p className="text-neutral-400 text-lg leading-relaxed mb-8">
                Discuss legal reforms, share case experiences, and get community support on Jan Manch—India's first democratic legal forum.
              </p>
              <Link to="/jan-manch" className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold transition-all shadow-[0_0_30px_rgba(37,99,235,0.4)]">
                <Users size={20} /> Enter Jan Manch
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-6 w-full md:w-auto">
              <Link to="/vault" className="p-8 rounded-[2rem] bg-white/[0.02] border border-white/5 flex flex-col items-center gap-4 hover:border-white/20 transition-all">
                <Shield size={32} className="text-neutral-500" />
                <span className="text-sm font-bold uppercase tracking-widest text-neutral-400">DocVault</span>
              </Link>
              <Link to="/settings" className="p-8 rounded-[2rem] bg-white/[0.02] border border-white/5 flex flex-col items-center gap-4 hover:border-white/20 transition-all">
                <Settings size={32} className="text-neutral-500" />
                <span className="text-sm font-bold uppercase tracking-widest text-neutral-400">Settings</span>
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
