import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { UserPlus, Lock, Mail, User, Eye, EyeOff, AlertCircle, ArrowRight } from "lucide-react";

const Signup: React.FC = () => {
    const navigate = useNavigate();
    const { signup, signInWithGoogle } = useAuth();

    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            await signup(email, password, fullName);
            navigate("/dashboard");
        } catch (err: any) {
            console.error("Signup Error:", err);
            setError(err.message || "Failed to create account. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignIn = async () => {
        setLoading(true);
        setError(null);
        try {
            await signInWithGoogle();
            navigate("/dashboard");
        } catch (err: any) {
            console.error("Google Signup Error:", err);
            setError(err.message || "Failed to sign up with Google.");
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
                        <UserPlus className="w-10 h-10 text-emerald-400" />
                    </div>
                    <h1 className="text-4xl font-bold mb-3 tracking-tight font-display">Create Account</h1>
                    <p className="text-neutral-400 font-light">Join NyayaSathi for secure legal management</p>
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
                            <label className="text-xs font-black uppercase tracking-widest text-neutral-500 ml-1">Full Name</label>
                            <div className="relative group">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500 group-focus-within:text-emerald-500 transition-colors" size={20} />
                                <input
                                    type="text"
                                    required
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    placeholder="John Doe"
                                    className="w-full bg-black/40 border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-white focus:outline-none focus:border-emerald-500/50 transition-all placeholder:text-neutral-700"
                                />
                            </div>
                        </div>

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
                                    minLength={6}
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
                                    Create Account <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>

                        <div className="relative py-4">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-white/5"></div>
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-[#0a0a0a] px-2 text-neutral-500 font-bold tracking-widest">Or continue with</span>
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={handleGoogleSignIn}
                            disabled={loading}
                            className="w-full py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold rounded-2xl transition-all flex items-center justify-center gap-3 group"
                        >
                            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-5 h-5" alt="Google" />
                            Continue with Google
                        </button>
                    </form>

                    <div className="mt-10 pt-8 border-t border-white/5 text-center">
                        <p className="text-neutral-500 text-sm">
                            Already have an account?{' '}
                            <Link to="/login" className="text-emerald-400 font-bold hover:text-emerald-300 transition-colors">
                                Sign In
                            </Link>
                        </p>
                    </div>
                </div>

                <div className="mt-12 text-center text-neutral-700 text-[10px] font-bold uppercase tracking-[0.3em]">
                    NyayaSathi Cloud Security Platform
                </div>
            </div>
        </div>
    );
};

export default Signup;
