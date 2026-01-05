import React, { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import ScrollToTop from '../common/ScrollToTop';

interface MainLayoutProps {
    children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    return (
        <div className="flex min-h-screen flex-col font-sans text-neutral-200 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-900 via-gray-950 to-black relative transition-colors duration-500">

            {/* Global Background Effects for Inner Pages */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 right-0 w-[50rem] h-[50rem] rounded-full bg-indigo-500/10 blur-[100px] animate-pulse-slow" />
                <div className="absolute bottom-0 left-0 w-[50rem] h-[50rem] rounded-full bg-emerald-500/5 blur-[100px] animate-pulse-slow delay-1000" />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
            </div>

            <Header />
            <main className="flex-1 pt-24 relative z-10">
                <div className="pt-16">
                    {children}
                </div>
                <Footer />
            </main>
            <ScrollToTop />
        </div>
    );
};


export default MainLayout;
