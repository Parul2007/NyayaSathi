/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          light: "#ffffff",
          dark: "#121212" // Slightly lighter black for cards
        },
        primary: {
          DEFAULT: "#ffffff",
          foreground: "#000000"
        },
        secondary: {
          DEFAULT: "#1e1e1e", // Dark grey
          foreground: "#ffffff"
        },
        accent: {
          DEFAULT: "#d4af37", // Justice Gold
          foreground: "#000000"
        },
        legal: {
          black: "#050505",
          blue: "#1a237e", // Deep Navy (Legal/Court like)
          gold: "#c5a017", // Gold accent
        },
        muted: {
          DEFAULT: "#525252",
          foreground: "#a3a3a3"
        }
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        serif: ["Playfair Display", "Merriweather", "serif"], // For legal headers
        mono: ["JetBrains Mono", "monospace"] // For document IDs
      },
      boxShadow: {
        card: "0 8px 32px rgba(0, 0, 0, 0.4)",
        glow: "0 0 24px rgba(212, 175, 55, 0.15)", // Gold glow
        glass: "0 8px 32px 0 rgba(31, 38, 135, 0.37)"
      },
      backgroundImage: {
        'gradient-legal': 'linear-gradient(to bottom right, #050505, #0a0a0a, #121212)',
        'glass-dark': 'linear-gradient(135deg, rgba(255, 255, 255, 0.03), rgba(255, 255, 255, 0.01))'
      },
      animation: {
        'fade-in': 'fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-up': 'slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    }
  },
  plugins: []
};
