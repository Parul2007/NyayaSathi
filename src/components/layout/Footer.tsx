import React from "react";
import { Link } from "react-router-dom";
import { Scale, Twitter, Linkedin, Facebook, Mail, MapPin, Phone, ArrowRight, Github, Instagram } from "lucide-react";
import MailingList from "../common/MailingList";

const Footer: React.FC = () => {
  return (
    <footer className="relative bg-[#020202] pt-32 pb-10 overflow-hidden border-t border-white/5">
      {/* Ambient Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-indigo-900/10 to-transparent pointer-events-none" />
      <div className="absolute -top-40 right-0 w-96 h-96 bg-accent/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Top Section: Brand & Newsletter */}
        <div className="grid lg:grid-cols-2 gap-20 mb-24 items-start">
          <div>
            <Link to="/" className="flex items-center gap-3 mb-8 group">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-white/10 to-transparent border border-white/10 shadow-[0_0_20px_rgba(255,255,255,0.05)] group-hover:scale-110 transition-transform duration-500">
                <Scale className="text-accent h-6 w-6" />
              </div>
              <span className="text-3xl font-bold text-white font-display tracking-tight">
                Nyaya<span className="text-accent">Sathi</span>
              </span>
            </Link>
            <p className="text-neutral-400 leading-relaxed text-lg max-w-md font-light">
              Democratizing justice with AI. We bridge the gap between complex laws and Indian citizens through technology, clarity, and instant access.
            </p>
          </div>

          <div className="lg:pl-12">
            <MailingList />
          </div>
        </div>

        {/* Middle Section: Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-24 border-y border-white/5 py-16">
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-8 text-neutral-500">Platform</h4>
            <ul className="space-y-4">
              <li><Link to="/" className="text-neutral-400 hover:text-white hover:translate-x-1 transition-all duration-300 block">Home</Link></li>
              <li><Link to="/dashboard" className="text-neutral-400 hover:text-white hover:translate-x-1 transition-all duration-300 block">Dashboard</Link></li>
              <li><Link to="/about-us" className="text-neutral-400 hover:text-white hover:translate-x-1 transition-all duration-300 block">About Us</Link></li>
              <li><Link to="/stories" className="text-neutral-400 hover:text-white hover:translate-x-1 transition-all duration-300 block">Success Stories</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-8 text-neutral-500">Resources</h4>
            <ul className="space-y-4">
              <li><Link to="/nyaya-gyan" className="text-neutral-400 hover:text-white hover:translate-x-1 transition-all duration-300 block">NyayaGyan</Link></li>
              <li><Link to="/updates" className="text-neutral-400 hover:text-white hover:translate-x-1 transition-all duration-300 block">Legal Pulse</Link></li>
              <li><Link to="/vakeel-connect" className="text-neutral-400 hover:text-white hover:translate-x-1 transition-all duration-300 block">Find Lawyer</Link></li>
              <li><Link to="/jan-manch" className="text-neutral-400 hover:text-white hover:translate-x-1 transition-all duration-300 block">Forums</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-8 text-neutral-500">Legal</h4>
            <ul className="space-y-4">
              <li><Link to="/privacy-policy" className="text-neutral-400 hover:text-white hover:translate-x-1 transition-all duration-300 block">Privacy Policy</Link></li>
              <li><Link to="/terms-of-service" className="text-neutral-400 hover:text-white hover:translate-x-1 transition-all duration-300 block">Terms of Service</Link></li>
              <li><Link to="/cookie-policy" className="text-neutral-400 hover:text-white hover:translate-x-1 transition-all duration-300 block">Cookie Policy</Link></li>
              <li><Link to="/disclaimer" className="text-neutral-400 hover:text-white hover:translate-x-1 transition-all duration-300 block">Disclaimer</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-8 text-neutral-500">Connect</h4>
            <ul className="space-y-6">
              <li className="flex items-center gap-4 text-neutral-400 group cursor-pointer hover:text-white transition-colors">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-accent group-hover:text-black transition-all duration-300">
                  <MapPin size={18} />
                </div>
                <span>New Delhi, India</span>
              </li>
              <li className="flex items-center gap-4 text-neutral-400 group cursor-pointer hover:text-white transition-colors">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-accent group-hover:text-black transition-all duration-300">
                  <Mail size={18} />
                </div>
                <span>contact@nyayasathi.in</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-neutral-600 text-sm font-light">
            © 2024 NyayaSathi. All rights reserved. Built for India 🇮🇳
          </p>

          <div className="flex gap-4">
            {[Twitter, Linkedin, Instagram, Github].map((Icon, i) => (
              <a key={i} href="#" className="w-10 h-10 rounded-full border border-white/5 flex items-center justify-center text-neutral-500 hover:text-white hover:border-white/20 hover:bg-white/5 transition-all duration-300 group">
                <Icon size={18} className="group-hover:scale-110 transition-transform" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
