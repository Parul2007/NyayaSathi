import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ShieldCheck, Lock, Mail, Eye, EyeOff, AlertCircle, ArrowRight } from "lucide-react";

const Login: React.FC = () => {
    const navigate = useNavigate();
    const { login, signInWithGoogle, isAuthenticated, isLoading } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false); // For form submission
    const [error, setError] = useState<string | null>(null);

    // Redirect if already authenticated
    useEffect(() => {
        if (!isLoading && isAuthenticated) {
            navigate("/dashboard");
        }
    }, [isAuthenticated, isLoading, navigate]);

    // Show loading state while checking auth
    if (isLoading) {
        return (
            <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 font-sans">
                <div className="w-12 h-12 border-4 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin mb-4" />
                <p className="text-neutral-500 text-sm animate-pulse">Verifying secure access...</p>
            </div>
        );
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            await login(email, password);
            // Navigation handled by useEffect
        } catch (err: any) {
            console.error("Login Error:", err);
            setError(err.message || "Failed to log in. Please check your credentials.");
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignIn = async () => {
        setLoading(true);
        setError(null);
        try {
            await signInWithGoogle();
            // Navigation handled by useEffect
        } catch (err: any) {
            console.error("Google Login Error:", err);
            setError(err.message || "Failed to sign in with Google.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 font-sans relative overflow-hidden">
            {/* Premium Animated Background */}
            <div className="absolute top-[-10%] left-[-10%] w-[40rem] h-[40rem] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none animate-pulse" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40rem] h-[40rem] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none animate-pulse" style={{ animationDelay: '2s' }} />

            <div className="z-10 w-full max-w-md animate-fade-in-up">
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-emerald-500/10 border border-emerald-500/20 mb-6 shadow-2xl backdrop-blur-md">
                        <ShieldCheck className="w-10 h-10 text-emerald-400" />
                    </div>
                    <h1 className="text-4xl font-bold mb-3 tracking-tight font-display">Welcome Back</h1>
                    <p className="text-neutral-400 font-light">Secure access to your legal dashboard</p>
                </div>

                <div className="bg-white/5 border border-white/10 backdrop-blur-2xl rounded-[2.5rem] p-8 md:p-10 shadow-3xl">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error && (
                            <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-2xl flex items-center gap-3 text-red-400 text-sm animate-shake">
                                <AlertCircle size={18} />
                                <span>{error}</span>
                            </div>
                        )}

                        <div className="space-y-2">
                            <label className="text-xs font-black uppercase tracking-widest text-neutral-500 ml-1">Email Address</label>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500 group-focus-within:text-emerald-500 transition-colors" size={20} />
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="name@example.com"
                                    className="w-full bg-black/40 border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-white focus:outline-none focus:border-emerald-500/50 transition-all placeholder:text-neutral-700"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-black uppercase tracking-widest text-neutral-500 ml-1">Password</label>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500 group-focus-within:text-emerald-500 transition-colors" size={20} />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full bg-black/40 border border-white/10 rounded-2xl pl-12 pr-12 py-4 text-white focus:outline-none focus:border-emerald-500/50 transition-all placeholder:text-neutral-700"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white transition-colors"
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-2xl transition-all shadow-[0_4px_20px_rgba(16,185,129,0.3)] hover:shadow-[0_4px_30px_rgba(16,185,129,0.5)] flex items-center justify-center gap-3 group"
                        >
                            {loading ? (
                                <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                            ) : (
                                <>
                                    Sign In <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>

                    </form>

                    <div className="mt-10 pt-8 border-t border-white/5 text-center">
                        <p className="text-neutral-500 text-sm mb-4">
                            New to NyayaSathi?{' '}
                            <Link to="/signup" className="text-emerald-400 font-bold hover:text-emerald-300 transition-colors">
                                Create an Account
                            </Link>
                        </p>

                        {/* Demo Credentials Notice */}
                        <div className="inline-block px-4 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-xs text-neutral-400">
                            <span className="block font-bold text-emerald-400 mb-1 uppercase tracking-wider">Demo Access</span>
                            <div className="space-x-4">
                                <span>Email: <code className="text-white bg-black/30 px-1 py-0.5 rounded">test@example.com</code></span>
                                <span>Pass: <code className="text-white bg-black/30 px-1 py-0.5 rounded">password12900</code></span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-12 text-center">
                    <p className="text-[10px] text-neutral-700 font-bold uppercase tracking-[0.3em]">
                        NyayaSathi Cloud Security Platform
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
