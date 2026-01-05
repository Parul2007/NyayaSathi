import React, { useState, useRef, useEffect } from "react";
import { Send, User, Bot, Languages, Sparkles, Brain, AlertCircle, Lock } from "lucide-react";
import { aiService, AIMessage } from "../services/ai";
import { useAuth } from "../context/AuthContext";

interface Message {
    id: number;
    type: "bot" | "user";
    text: React.ReactNode; // Changed to ReactNode to support Markdown rendering
    rawText?: string; // Store raw text for API history
}

const SahayakBot: React.FC = () => {
    const { user, updateUser } = useAuth();
    const [language, setLanguage] = useState<"english" | "hindi" | null>(null);
    const [inputValue, setInputValue] = useState("");
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    // API Key State
    const [apiKey, setApiKey] = useState(user?.geminiApiKey || "");
    const [showApiSetup, setShowApiSetup] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    // Initial Greeting based on Language
    useEffect(() => {
        if (language && messages.length === 0) {
            const greetingText = language === "english"
                ? "Hello! I am **Sahayak**, your AI legal assistant. How can I help you today?"
                : "नमस्ते! मैं **सहायक** हूँ, आपका एआई कानूनी सहायक। आज मैं आपकी कैसे सहायता कर सकता हूँ?";
            setMessages([
                {
                    id: 1,
                    type: "bot",
                    text: greetingText,
                    rawText: greetingText
                }
            ]);
        }
    }, [language]);

    // Update local API key state when user profile loads
    useEffect(() => {
        if (user?.geminiApiKey) {
            setApiKey(user.geminiApiKey);
        }
    }, [user]);

    // Scroll to bottom
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
        }
    }, [messages]);

    const saveApiKey = async () => {
        if (apiKey.trim()) {
            try {
                await updateUser({ geminiApiKey: apiKey.trim() });
                setShowApiSetup(false);
                const successMsg = language === "english" ? "✅ API Key saved!" : "✅ एपीआई कुंजी सहेजी गई!";
                addBotMessage(successMsg, successMsg);
            } catch (error) {
                console.error("Failed to save API key:", error);
                setShowApiSetup(false);
            }
        }
    };

    const addBotMessage = (text: React.ReactNode, rawText?: string) => {
        setMessages(prev => [...prev, { 
            id: Date.now(), 
            type: "bot", 
            text,
            rawText: rawText || (typeof text === 'string' ? text : '')
        }]);
    };

    const formatMarkdown = (text: string) => {
        return text.split('\n').map((line, idx) => {
            line = line.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-bold">$1</strong>');
            line = line.replace(/`(.*?)`/g, '<code class="bg-white/10 px-1 py-0.5 rounded text-xs font-mono">$1</code>');

            if (line.trim().startsWith('•') || line.trim().startsWith('-')) {
                return <li key={idx} className="ml-4" dangerouslySetInnerHTML={{ __html: line.replace(/^[•-]\s*/, '') }} />;
            }
            if (line.trim()) {
                return <p key={idx} className="mb-2" dangerouslySetInnerHTML={{ __html: line }} />;
            }
            return null;
        });
    };

    const handleSend = async () => {
        if (!inputValue.trim()) return;

        const userQuery = inputValue.trim();
        const newMessage: Message = { 
            id: Date.now(), 
            type: "user", 
            text: userQuery,
            rawText: userQuery
        };

        setMessages(prev => [...prev, newMessage]);
        setInputValue("");
        setIsLoading(true);

        const storedKey = user?.geminiApiKey || apiKey;

        // Check if API key is missing
        if (!storedKey || storedKey.trim() === '') {
            setIsLoading(false);
            setShowApiSetup(true);
            addBotMessage(
                <div className="space-y-2 bg-amber-500/10 p-3 rounded-xl border border-amber-500/30">
                    <p className="text-amber-400 font-semibold text-sm flex items-center gap-2">
                        <AlertCircle size={16} /> {language === "english" ? "API Key Required" : "एपीआई कुंजी आवश्यक"}
                    </p>
                    <p className="text-xs text-amber-300">
                        {language === "english" 
                            ? "Please configure your Gemini API Key to start chatting with Sahayak AI." 
                            : "कृपया सहायक AI के साथ चैट शुरू करने के लिए अपनी Gemini API Key कॉन्फ़िगर करें।"}
                    </p>
                </div>,
                language === "english" ? "API Key Required. Please configure your Gemini API Key." : "एपीआई कुंजी आवश्यक है। कृपया अपनी Gemini API कुंजी कॉन्फ़िगर करें।"
            );
            return;
        }

        try {
            // Context-aware query construction
            const languageContext = language === "hindi"
                ? " (Please reply in Hindi)"
                : " (Please reply in English)";

            const aiQuery = userQuery + languageContext;

            // Extract text properly from messages - prefer rawText, fallback to extracting from ReactNode
            const history: AIMessage[] = messages.map(m => {
                let textToUse = '';
                
                if (m.rawText) {
                    textToUse = m.rawText;
                } else if (typeof m.text === 'string') {
                    textToUse = m.text;
                } else if (React.isValidElement(m.text)) {
                    // Try to extract text from React elements
                    const extractText = (node: React.ReactNode): string => {
                        if (typeof node === 'string') return node;
                        if (typeof node === 'number') return String(node);
                        if (Array.isArray(node)) return node.map(extractText).join('');
                        if (React.isValidElement(node) && node.props.children) {
                            return extractText(node.props.children);
                        }
                        return '';
                    };
                    textToUse = extractText(m.text);
                }
                
                return {
                    role: (m.type === 'bot' ? 'model' : 'user') as 'user' | 'model',
                    text: textToUse
                };
            }).filter(m => m.text.trim() !== '');

            const responseText = await aiService.sendMessage(history, aiQuery, storedKey);

            setIsLoading(false);
            addBotMessage(
                <div className="prose prose-invert prose-sm max-w-none">{formatMarkdown(responseText)}</div>,
                responseText
            );

        } catch (error: any) {
            setIsLoading(false);
            addBotMessage(
                <div className="space-y-2 bg-red-500/10 p-3 rounded-xl border border-red-500/30">
                    <p className="text-red-400 font-semibold text-sm flex items-center gap-2">
                        <AlertCircle size={16} /> {language === "english" ? "Error" : "त्रुटि"}
                    </p>
                    <p className="text-xs text-red-300">{error.message}</p>

                    <button onClick={() => setShowApiSetup(true)} className="text-xs bg-white/10 px-2 py-1 rounded hover:bg-white/20 mt-2 text-white">
                        {language === "english" ? "Update API Key" : "एपीआई कुंजी अपडेट करें"}
                    </button>
                </div>
            );
        }
    };

    // Splash Screen (Language Selection)
    if (!language) {
        return (
            <main className="flex min-h-screen items-center justify-center px-4 bg-black relative overflow-hidden">
                {/* Background Effects */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-900/20 via-black to-black" />
                </div>

                <div className="w-full max-w-md text-center space-y-8 animate-fade-in relative z-10">
                    <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-emerald-600 to-emerald-800 shadow-[0_0_50px_rgba(16,185,129,0.3)] border border-white/10">
                        <Brain className="h-12 w-12 text-white" />
                    </div>
                    <div>
                        <h1 className="text-4xl font-bold text-white font-display mb-2">
                            Sahayak AI
                        </h1>
                        <p className="text-neutral-400">
                            Your Personal Legal Assistant<br />
                            <span className="text-xs opacity-70">आपका व्यक्तिगत कानूनी सहायक</span>
                        </p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <button
                            onClick={() => setLanguage("english")}
                            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 transition-all hover:bg-white/10 hover:border-emerald-500/50 hover:shadow-[0_0_30px_rgba(16,185,129,0.2)]"
                        >
                            <div className="mb-2 text-3xl">Aa</div>
                            <div className="font-semibold text-white">English</div>
                        </button>
                        <button
                            onClick={() => setLanguage("hindi")}
                            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 transition-all hover:bg-white/10 hover:border-emerald-500/50 hover:shadow-[0_0_30px_rgba(16,185,129,0.2)]"
                        >
                            <div className="mb-2 text-3xl">अ</div>
                            <div className="font-semibold text-white">Hindi</div>
                        </button>
                    </div>
                </div>
            </main>
        );
    }

    // Chat Interface
    return (
        <main className="mx-auto flex h-screen max-w-5xl flex-col p-4 pt-24 bg-black">
            <div className="flex-1 overflow-y-auto rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md p-6 shadow-2xl space-y-6 custom-scrollbar" ref={scrollRef}>
                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}
                    >
                        <div className={`flex max-w-[85%] gap-3 ${msg.type === "user" ? "flex-row-reverse" : "flex-row"}`}>
                            {/* Avatar */}
                            <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border shadow-lg ${msg.type === "user"
                                    ? "bg-white border-white text-black"
                                    : "bg-gradient-to-br from-emerald-600 to-emerald-800 border-emerald-400/30 text-white"
                                }`}>
                                {msg.type === "user" ? <User size={16} /> : <Bot size={16} />}
                            </div>

                            {/* Bubble */}
                            <div className={`rounded-2xl px-5 py-3 text-sm leading-relaxed ${msg.type === "user"
                                    ? "bg-white text-black font-medium shadow-lg"
                                    : "bg-neutral-800/80 text-neutral-200 border border-white/10"
                                }`}>
                                {msg.text}
                            </div>
                        </div>
                    </div>
                ))}

                {isLoading && (
                    <div className="flex justify-start gap-3">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border bg-gradient-to-br from-emerald-600 to-emerald-800 border-emerald-400/30 text-white">
                            <Bot size={16} />
                        </div>
                        <div className="rounded-2xl px-5 py-3 bg-neutral-800/80 border border-white/10 flex items-center gap-2">
                            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" />
                            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce [animation-delay:0.2s]" />
                            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce [animation-delay:0.4s]" />
                        </div>
                    </div>
                )}
            </div>

            {/* API Setup Modal (Overlay) */}
            {showApiSetup && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fade-in">
                    <div className="bg-neutral-900 border border-white/20 rounded-2xl p-6 w-full max-w-md space-y-4 shadow-2xl">
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg font-bold text-white flex items-center gap-2">
                                <Sparkles size={18} className="text-yellow-400" /> API Settings
                            </h3>
                            <button onClick={() => setShowApiSetup(false)} className="text-neutral-400 hover:text-white">✕</button>
                        </div>
                        <p className="text-sm text-neutral-400">
                            Enter your Gemini API Key to enable intelligence.
                            <br /><a href="https://makersuite.google.com/app/apikey" target="_blank" className="text-emerald-400 underline">Get one here</a>.
                        </p>
                        <input
                            type="password"
                            value={apiKey}
                            onChange={(e) => setApiKey(e.target.value)}
                            className="w-full bg-black border border-white/20 rounded-xl px-4 py-3 text-white focus:border-emerald-500 focus:outline-none"
                            placeholder="AIza..."
                        />
                        <button onClick={saveApiKey} className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-xl transition-colors">
                            Save & Activate
                        </button>
                    </div>
                </div>
            )}

            {/* Input Area */}
            <div className="mt-4">
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleSend();
                    }}
                    className="relative flex items-center gap-2 rounded-2xl border border-white/10 bg-neutral-900/80 p-2 backdrop-blur-xl"
                >
                    <button
                        type="button"
                        onClick={() => setLanguage(null)}
                        className="rounded-xl p-3 text-neutral-400 hover:bg-white/10 hover:text-white transition-colors"
                        title="Change Language"
                    >
                        <Languages size={20} />
                    </button>

                    {/* Discrete API Config Button */}
                    <button
                        type="button"
                        onClick={() => setShowApiSetup(prev => !prev)}
                        className={`rounded-xl p-3 transition-colors ${!user?.geminiApiKey ? 'text-yellow-500 animate-pulse' : 'text-neutral-500 hover:text-white'}`}
                        title="API Settings"
                    >
                        <Lock size={18} />
                    </button>

                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder={language === "english" ? "Type your legal query..." : "अपना कानूनी सवाल लिखें..."}
                        className="flex-1 bg-transparent px-2 py-2 text-white placeholder-neutral-500 focus:outline-none"
                        disabled={isLoading}
                    />
                    <button
                        type="submit"
                        disabled={isLoading || !inputValue.trim()}
                        className="rounded-xl bg-white p-3 text-black transition-transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <Send size={20} />
                    </button>
                </form>
            </div>
        </main>
    );
};

export default SahayakBot;
