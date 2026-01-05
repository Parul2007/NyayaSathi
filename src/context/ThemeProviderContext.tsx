import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

import { useAuth } from "./AuthContext";

type Theme = "light" | "dark";

interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const { user, updateUser, isAuthenticated } = useAuth();

    // Default to 'dark' for public, or user preference if logged in
    const [localTheme, setLocalTheme] = useState<Theme>("dark");

    useEffect(() => {
        if (isAuthenticated && user?.theme) {
            setLocalTheme(user.theme);
        }
    }, [user, isAuthenticated]);

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", localTheme);
    }, [localTheme]);

    const toggleTheme = () => {
        const nextTheme = localTheme === "dark" ? "light" : "dark";
        setLocalTheme(nextTheme);
        if (isAuthenticated) {
            updateUser({ theme: nextTheme });
        }
    };

    return (
        <ThemeContext.Provider value={{ theme: localTheme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useTheme must be used within ThemeProvider");
    }
    return context;
};
