import React, { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

const ScrollToTop: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        if (window.scrollY > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    useEffect(() => {
        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    return (
        <div className="fixed bottom-8 right-8 z-50">
            {isVisible && (
                <button
                    onClick={scrollToTop}
                    className="p-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full shadow-lg transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-opacity-50 group"
                    aria-label="Scroll to top"
                >
                    <ArrowUp size={24} className="group-hover:-translate-y-1 transition-transform duration-300" />
                </button>
            )}
        </div>
    );
};

export default ScrollToTop;
