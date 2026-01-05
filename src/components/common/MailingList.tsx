import React, { useState } from 'react';
import { Mail, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { db } from '../../config/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const MailingList: React.FC = () => {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setStatus('loading');
        try {
            await addDoc(collection(db, 'mailing_list'), {
                email,
                subscribedAt: serverTimestamp(),
                source: 'footer'
            });
            setStatus('success');
            setMessage('Thank you for joining our legal update list!');
            setEmail('');
        } catch (error: any) {
            console.error('Mailing list error:', error);
            setStatus('error');
            setMessage('Something went wrong. Please try again.');
        }
    };

    return (
        <div className="w-full max-w-md">
            <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                <Mail size={18} className="text-accent" /> Join our Mailing List
            </h4>
            <p className="text-neutral-400 text-sm mb-6 leading-relaxed">
                Get the latest legal updates, case analyses, and news delivered straight to your inbox.
            </p>

            <form onSubmit={handleSubmit} className="relative group">
                <div className="absolute inset-0 bg-accent/20 blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity rounded-full pointer-events-none" />
                <div className="relative flex items-center bg-white/5 border border-white/10 rounded-2xl overflow-hidden focus-within:border-accent/50 transition-all p-1">
                    <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        className="flex-1 bg-transparent border-none px-4 py-3 text-white placeholder:text-neutral-500 focus:ring-0 text-sm"
                        disabled={status === 'loading' || status === 'success'}
                    />
                    <button
                        type="submit"
                        disabled={status === 'loading' || status === 'success'}
                        className="bg-accent hover:bg-white text-black p-3 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed group/btn"
                    >
                        {status === 'loading' ? (
                            <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                        ) : status === 'success' ? (
                            <CheckCircle2 size={20} />
                        ) : (
                            <Send size={20} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                        )}
                    </button>
                </div>
            </form>

            {message && (
                <div className={`mt-4 flex items-center gap-2 text-sm animate-fade-in ${status === 'success' ? 'text-emerald-400' : 'text-red-400'}`}>
                    {status === 'success' ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
                    <span>{message}</span>
                </div>
            )}
        </div>
    );
};

export default MailingList;
