import React from "react";
import { Link } from "react-router-dom";
import { Home, Compass } from "lucide-react";

const NotFound: React.FC = () => {
    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center px-4">
            <div className="text-center relative">
                {/* Background Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-emerald-500/20 rounded-full blur-[100px] animate-pulse-slow" />

                <div className="relative z-10 space-y-6">
                    <div className="flex justify-center mb-6">
                        <div className="relative">
                            <Compass size={80} className="text-emerald-400 animate-spin-slow" />
                            <div className="absolute inset-0 bg-emerald-400/30 blur-xl rounded-full" />
                        </div>
                    </div>

                    <h1 className="text-8xl font-bold font-display bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                        404
                    </h1>

                    <h2 className="text-2xl text-white font-medium">Page Not Found</h2>

                    <p className="text-neutral-400 max-w-md mx-auto">
                        Looks like you've ventured into uncharted territory. This scheme doesn't exist or has been moved.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
                        <Link
                            to="/"
                            className="flex items-center justify-center gap-2 px-6 py-3 bg-emerald-500 text-black font-semibold rounded-xl hover:bg-emerald-400 transition-all duration-300 transform hover:scale-105"
                        >
                            <Home size={20} />
                            Back to Home
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
