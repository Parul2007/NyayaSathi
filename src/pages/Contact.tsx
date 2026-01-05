import React, { useState } from "react";
import { Mail, MapPin, Phone, Send, Clock, Globe } from "lucide-react";

const Contact: React.FC = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // In production: Send to backend API
        console.log("Contact form submitted:", formData);
        alert("Thank you for reaching out! We'll get back to you within 24 hours.");
        setFormData({ name: "", email: "", subject: "", message: "" });
    };

    return (
        <div className="min-h-screen bg-black text-white py-20">
            <div className="max-w-7xl mx-auto px-6">

                {/* Header */}
                <div className="text-center mb-16 animate-fade-in">
                    <h1 className="text-5xl md:text-7xl font-bold font-display mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-neutral-600">
                        Get in Touch
                    </h1>
                    <p className="text-xl text-neutral-400 max-w-2xl mx-auto font-light">
                        Have questions about NyayaSathi? Need legal support? Our team is here to help you navigate the system.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12">

                    {/* Contact Form - Glass Card */}
                    <div className="relative group">
                        <div className="absolute inset-0 bg-gradient-to-r from-accent/20 to-indigo-500/20 blur-3xl opacity-30 group-hover:opacity-50 transition-opacity duration-500" />

                        <div className="relative bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-10 shadow-2xl">
                            <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
                                <Send className="text-accent" size={32} />
                                Send Us a Message
                            </h2>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label className="block text-sm font-bold mb-2 text-neutral-400 uppercase tracking-wider">Your Name</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full bg-black/40 border border-white/10 rounded-xl px-6 py-4 text-white placeholder:text-neutral-600 focus:outline-none focus:border-accent/50 focus:bg-black/60 transition-all"
                                        placeholder="Rajesh Kumar"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-bold mb-2 text-neutral-400 uppercase tracking-wider">Email Address</label>
                                    <input
                                        type="email"
                                        required
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full bg-black/40 border border-white/10 rounded-xl px-6 py-4 text-white placeholder:text-neutral-600 focus:outline-none focus:border-accent/50 focus:bg-black/60 transition-all"
                                        placeholder="rajesh@example.com"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-bold mb-2 text-neutral-400 uppercase tracking-wider">Subject</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.subject}
                                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                        className="w-full bg-black/40 border border-white/10 rounded-xl px-6 py-4 text-white placeholder:text-neutral-600 focus:outline-none focus:border-accent/50 focus:bg-black/60 transition-all"
                                        placeholder="Need help with consumer dispute"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-bold mb-2 text-neutral-400 uppercase tracking-wider">Message</label>
                                    <textarea
                                        required
                                        rows={6}
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        className="w-full bg-black/40 border border-white/10 rounded-xl px-6 py-4 text-white placeholder:text-neutral-600 focus:outline-none focus:border-accent/50 focus:bg-black/60 transition-all resize-none"
                                        placeholder="Describe your query or issue in detail..."
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-white text-black px-8 py-5 rounded-full font-bold text-lg hover:bg-accent transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:shadow-[0_0_50px_rgba(212,175,55,0.6)] hover:scale-105 flex items-center justify-center gap-3"
                                >
                                    <Send size={20} /> Send Message
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Contact Info - Multiple Glass Cards */}
                    <div className="space-y-6">

                        {/* Office Address */}
                        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-all duration-300 group">
                            <div className="flex items-start gap-4">
                                <div className="w-14 h-14 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                                    <MapPin className="text-accent" size={28} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold mb-2">Our Office</h3>
                                    <p className="text-neutral-400 leading-relaxed">
                                        Supreme Court Complex<br />
                                        Tilak Marg, New Delhi<br />
                                        Delhi 110001, India
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Email */}
                        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-all duration-300 group">
                            <div className="flex items-start gap-4">
                                <div className="w-14 h-14 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                                    <Mail className="text-accent" size={28} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold mb-2">Email Us</h3>
                                    <p className="text-neutral-400">
                                        <a href="mailto:support@nyayasathi.in" className="hover:text-accent transition-colors">
                                            support@nyayasathi.in
                                        </a>
                                    </p>
                                    <p className="text-neutral-400 mt-1">
                                        <a href="mailto:legal@nyayasathi.in" className="hover:text-accent transition-colors">
                                            legal@nyayasathi.in
                                        </a>
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Phone */}
                        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-all duration-300 group">
                            <div className="flex items-start gap-4">
                                <div className="w-14 h-14 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                                    <Phone className="text-accent" size={28} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold mb-2">Call Us</h3>
                                    <p className="text-neutral-400">
                                        Helpline: <a href="tel:18002684357" className="hover:text-accent transition-colors">1800-NYAYA-HELP</a>
                                    </p>
                                    <p className="text-neutral-400 mt-1">
                                        Office: <a href="tel:+9111412345xx" className="hover:text-accent transition-colors">+91 11 4123 45xx</a>
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Business Hours */}
                        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-all duration-300 group">
                            <div className="flex items-start gap-4">
                                <div className="w-14 h-14 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                                    <Clock className="text-accent" size={28} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold mb-2">Business Hours</h3>
                                    <p className="text-neutral-400">
                                        Monday - Friday: 9:00 AM - 6:00 PM<br />
                                        Saturday: 10:00 AM - 4:00 PM<br />
                                        Sunday: Closed<br />
                                        <span className="text-accent font-semibold mt-2 block">24/7 Member AI Support via SahayakBot</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Map Embed (Optional - Premium Glass Card) */}
                <div className="mt-16 relative group">
                    <div className="absolute inset-0 bg-accent/10 blur-3xl opacity-20" />
                    <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-4 overflow-hidden">
                        <div className="aspect-[21/9] bg-neutral-900/50 rounded-2xl flex items-center justify-center border border-white/5">
                            {/* Placeholder for Google Maps Embed */}
                            <div className="text-center">
                                <Globe className="text-accent mx-auto mb-4" size={48} />
                                <p className="text-neutral-400">Google Maps Integration</p>
                                <p className="text-sm text-neutral-600 mt-2">Supreme Court Complex, New Delhi</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
