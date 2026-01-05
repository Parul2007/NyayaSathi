import React from 'react';
import { Shield, Lock, Eye, Database, FileText, CheckCircle } from 'lucide-react';

const PrivacyPolicy: React.FC = () => {
    return (
        <div className="min-h-screen bg-black text-neutral-300 font-sans pt-12 pb-24">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="mb-16 border-b border-white/10 pb-10">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                            <Shield className="h-8 w-8 text-emerald-400" />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold font-display text-white tracking-tight">Privacy Policy</h1>
                    </div>
                    <p className="text-lg text-neutral-400 max-w-2xl leading-relaxed">
                        We are committed to transparency. Learn how we handle your data to provide you with seamless government scheme access.
                    </p>
                    <div className="mt-6 flex items-center gap-2 text-sm text-neutral-500 font-mono">
                        <span>Last Updated:</span>
                        <span className="text-emerald-400 px-2 py-1 bg-emerald-500/10 rounded border border-emerald-500/20">January 2025</span>
                    </div>
                </div>

                <div className="grid md:grid-cols-12 gap-12">
                    {/* Sidebar Navigation */}
                    <div className="hidden md:block md:col-span-3">
                        <nav className="sticky top-28 space-y-2">
                            {['Introduction', 'Data We Collect', 'How We Use It', 'Security'].map((item) => (
                                <a
                                    key={item}
                                    href={`#${item.toLowerCase().replace(/ /g, '-')}`}
                                    className="block px-4 py-3 text-sm font-bold text-neutral-500 hover:text-white hover:bg-neutral-900 rounded-lg transition-all border border-transparent hover:border-white/5"
                                >
                                    {item}
                                </a>
                            ))}
                        </nav>
                    </div>

                    {/* Content */}
                    <div className="md:col-span-9 space-y-20">

                        <section id="introduction" className="scroll-mt-32">
                            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-800 text-sm font-mono border border-white/10">01</span>
                                Introduction
                            </h2>
                            <div className="prose prose-invert prose-neutral max-w-none">
                                <p className="text-lg leading-relaxed text-neutral-300 bg-neutral-900/30 p-6 rounded-2xl border border-white/5">
                                    SchemeSense is committed to protecting your personal information. We only collect data necessary to match you with government schemes. We value your trust and adhere to the highest standards of data privacy.
                                </p>
                            </div>
                        </section>

                        <section id="data-we-collect" className="scroll-mt-32">
                            <div className="flex items-center gap-3 mb-6">
                                <Database className="h-6 w-6 text-emerald-400" />
                                <h2 className="text-2xl font-bold text-white">Data We Collect</h2>
                            </div>
                            <p className="mb-6 text-neutral-400 leading-relaxed">
                                To provide accurate eligibility checks and application services, we collect the following minimum necessary data:
                            </p>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {[
                                    { title: "Personal Identity", desc: "Name, Age, Gender" },
                                    { title: "Demographics", desc: "State, District, Caste Category" },
                                    { title: "Financials", desc: "Annual Family Income" },
                                    { title: "Documents", desc: "Uploaded files (Encrypted)" }
                                ].map((item, i) => (
                                    <div key={i} className="p-4 rounded-xl bg-neutral-900 border border-white/5 hover:border-emerald-500/30 transition-colors">
                                        <h3 className="font-bold text-white mb-1">{item.title}</h3>
                                        <p className="text-sm text-neutral-500">{item.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section id="how-we-use-it" className="scroll-mt-32">
                            <div className="flex items-center gap-3 mb-6">
                                <Eye className="h-6 w-6 text-emerald-400" />
                                <h2 className="text-2xl font-bold text-white">How We Use It</h2>
                            </div>
                            <ul className="space-y-4">
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="h-5 w-5 text-emerald-500 mt-1 flex-shrink-0" />
                                    <span className="text-neutral-300 leading-relaxed"><strong>Eligibility Calculation:</strong> Your data is processed by our algorithms to find schemes you qualify for.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="h-5 w-5 text-emerald-500 mt-1 flex-shrink-0" />
                                    <span className="text-neutral-300 leading-relaxed"><strong>Application Pre-filling:</strong> We use your details to auto-fill government forms, saving you time.</span>
                                </li>
                                <li className="flex items-center gap-3 p-4 rounded-xl bg-red-500/5 border border-red-500/10">
                                    <Shield className="h-5 w-5 text-red-400 flex-shrink-0" />
                                    <span className="text-red-200 font-medium">We never sell your data to third parties.</span>
                                </li>
                            </ul>
                        </section>

                        <section id="security" className="scroll-mt-32">
                            <div className="flex items-center gap-3 mb-6">
                                <Lock className="h-6 w-6 text-emerald-400" />
                                <h2 className="text-2xl font-bold text-white">Encryption & Security</h2>
                            </div>
                            <div className="bg-gradient-to-br from-emerald-900/20 to-black p-8 rounded-3xl border border-emerald-500/20 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                                <p className="text-lg text-white font-medium mb-4 relative z-10">
                                    Bank-Grade Security Standards
                                </p>
                                <p className="text-neutral-400 leading-relaxed mb-6 relative z-10">
                                    All data transmitted to and from our servers is secured using <strong>256-bit SSL encryption</strong>, the same standard used by major financial institutions. Your documents are stored in an encrypted vault.
                                </p>
                                <div className="flex gap-4 relative z-10">
                                    <span className="px-3 py-1 rounded bg-black border border-emerald-500/30 text-xs text-emerald-400 font-mono">AES-256</span>
                                    <span className="px-3 py-1 rounded bg-black border border-emerald-500/30 text-xs text-emerald-400 font-mono">TLS 1.3</span>
                                </div>
                            </div>
                        </section>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
