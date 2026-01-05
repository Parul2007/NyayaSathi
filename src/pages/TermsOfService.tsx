import React from 'react';
import { FileWarning, CheckCircle, ExternalLink, ShieldCheck, Scale, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const TermsOfService: React.FC = () => {
    return (
        <div className="min-h-screen bg-black text-neutral-300 font-sans pt-12 pb-24">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="mb-12 border-b border-white/10 pb-8 text-center">
                    <div className="w-16 h-16 rounded-2xl bg-neutral-900 border border-white/10 flex items-center justify-center mx-auto mb-6">
                        <Scale className="h-8 w-8 text-white" />
                    </div>
                    <h1 className="text-4xl font-bold font-display text-white mb-4 tracking-tight">Terms of Service</h1>
                    <div className="flex items-center justify-center gap-2 text-sm text-neutral-500">
                        <span className="px-3 py-1 bg-white/5 rounded-full border border-white/5">Version 1.2</span>
                        <span>•</span>
                        <span>Last Updated: January 2025</span>
                    </div>
                </div>

                <div className="space-y-16">

                    {/* Section 1: Nature of Service */}
                    <section className="relative pl-6 border-l-2 border-emerald-500/20 hover:border-emerald-500 transition-colors">
                        <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-3">
                            <span className="text-emerald-500">01.</span>
                            Nature of Service
                        </h2>
                        <p className="text-neutral-400 leading-relaxed">
                            SchemeSense is an information aggregator and assistance platform. We do not guarantee the approval of any government scheme application. Our role is to bridge the gap between you and official government services by simplifying information and application procedures.
                        </p>
                    </section>

                    {/* Section 2: User Responsibility */}
                    <section className="relative pl-6 border-l-2 border-emerald-500/20 hover:border-emerald-500 transition-colors">
                        <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-3">
                            <span className="text-emerald-500">02.</span>
                            User Responsibility
                        </h2>
                        <p className="text-neutral-400 leading-relaxed mb-4">
                            You are responsible for the accuracy of information provided. Providing false information (income, caste, residence) in government applications may lead to rejection and legal consequences as per government norms.
                        </p>
                        <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/10 flex gap-3">
                            <FileWarning className="w-5 h-5 text-amber-500 flex-shrink-0" />
                            <p className="text-sm text-amber-200/80">We are not liable for rejections due to incorrect data entry by the user.</p>
                        </div>
                    </section>

                    {/* Section 3: External Links */}
                    <section className="relative pl-6 border-l-2 border-emerald-500/20 hover:border-emerald-500 transition-colors">
                        <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-3">
                            <span className="text-emerald-500">03.</span>
                            External Links
                        </h2>
                        <p className="text-neutral-400 leading-relaxed">
                            We provide direct links to official service portals (e.g., uidai.gov.in). We are not responsible for the uptime, content, or privacy practices of these external websites. SchemeSense has no affiliation with government bodies beyond acting as a facilitator.
                        </p>
                    </section>

                    {/* Section 4: Privacy */}
                    <section className="relative pl-6 border-l-2 border-emerald-500/20 hover:border-emerald-500 transition-colors">
                        <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-3">
                            <span className="text-emerald-500">04.</span>
                            Privacy
                        </h2>
                        <p className="text-neutral-400 leading-relaxed">
                            By using this platform, you explicitly agree to our <Link to="/privacy" className="text-emerald-400 hover:underline">Privacy Policy</Link> concerning the collection, encryption, and usage of your data for the purpose of benefit delivery.
                        </p>
                    </section>

                </div>

                <div className="mt-20 flex flex-col items-center gap-4">
                    <Link to="/" className="group relative inline-flex items-center justify-center gap-2 px-8 py-3 bg-white text-black font-bold rounded-full transition-all hover:bg-neutral-200 hover:scale-105 shadow-lg shadow-white/10">
                        <span>Accept & Close</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <p className="text-xs text-neutral-600">
                        By clicking above, you agree to all terms outlined on this page.
                    </p>
                </div>

            </div>
        </div>
    );
};

export default TermsOfService;
