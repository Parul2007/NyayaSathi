import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowLeft, Send, Phone, Video, ShieldCheck, Star, Clock, Paperclip, FileText, Lock, Download, Image as ImageIcon, File } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useFirestore } from "../hooks/useFirestore";
import { MOCK_LAWYERS as FALLBACK_LAWYERS, Lawyer as LawyerType } from "../data/mockData";

interface FileAttachment {
    id: string;
    name: string;
    type: string;
    size: number;
    url: string;
    uploadedAt: string;
}

interface Message {
    id: number;
    senderId: "user" | "lawyer";
    text: string;
    time: string;
    isCaseLink?: boolean;
    caseId?: string;
    attachment?: FileAttachment;
}

interface Conversation {
    lawyerId: string;
    messages: Message[];
    caseTitle: string;
}

interface Lawyer {
    id: string;
    name: string;
    specialty: string;
    image: string;
    rating: number;
    experienceYears: number;
    status: 'Available' | 'Busy';
    verified: boolean;
    tags: string[];
}

const LawyerMessages: React.FC = () => {
    const { user } = useAuth();
    const { data: firestoreLawyers } = useFirestore<Lawyer>('directory_lawyers');

    // Use Firestore lawyers if available, otherwise use FALLBACK_LAWYERS
    const lawyers = firestoreLawyers.length > 0 ? firestoreLawyers : FALLBACK_LAWYERS;

    const [selectedLawyerId, setSelectedLawyerId] = useState<string>("");
    const [newMessage, setNewMessage] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [uploadingFile, setUploadingFile] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const [conversations, setConversations] = useState<Conversation[]>([
        {
            lawyerId: "L-101",
            caseTitle: "Property Dispute - Sector 15",
            messages: [
                { id: 1, senderId: "lawyer", text: "Good morning! I've reviewed the documents you shared regarding the land registry dispute.", time: "10:30 AM" },
                { id: 2, senderId: "user", text: "Thank you for looking into it. What are our options?", time: "10:35 AM" },
                { id: 3, senderId: "lawyer", text: "Based on my analysis, we have a strong case. The possession records from 1987 clearly establish your family's claim.", time: "10:42 AM" },
            ]
        },
        {
            lawyerId: "L-102",
            caseTitle: "Consumer Dispute: HDFC",
            messages: [
                { id: 1, senderId: "lawyer", text: "I've started drafting the consumer complaint. I need the last 3 month's statements.", time: "Yesterday" },
                { id: 2, senderId: "user", text: "I'll upload them to the vault today.", time: "Yesterday" },
            ]
        }
    ]);

    // Set initial selected lawyer when data loads
    useEffect(() => {
        if (!selectedLawyerId && conversations.length > 0) {
            setSelectedLawyerId(conversations[0].lawyerId);
        }
    }, [conversations, selectedLawyerId]);

    useEffect(() => {
        // Load shared cases from user profile
        if (user?.sharedCases) {
            setConversations(prev => prev.map(conv => {
                const match = user.sharedCases?.find((s: any) => s.lawyerId === conv.lawyerId);
                if (match && !conv.messages.some(m => m.caseId === match.caseId)) {
                    return {
                        ...conv,
                        messages: [
                            ...conv.messages,
                            {
                                id: Date.now(),
                                senderId: "user",
                                text: `Shared Case Access: ${match.caseId}`,
                                time: "Just Now",
                                isCaseLink: true,
                                caseId: match.caseId
                            }
                        ]
                    };
                }
                return conv;
            }));
        }
    }, [user, lawyers]);

    const currentConversation = conversations.find(c => c.lawyerId === selectedLawyerId);
    const currentLawyer = lawyers.find(l => l.id === selectedLawyerId);

    const location = useLocation();

    // Check for incoming draft review requests
    useEffect(() => {
        const state = location.state as { newConversation?: any };
        if (state?.newConversation) {
            const { lawyerId, message, isDraft, draftData } = state.newConversation;

            setConversations(prev => {
                const existingConv = prev.find(c => c.lawyerId === lawyerId);

                const newMessage: Message = {
                    id: Date.now(),
                    senderId: "user",
                    text: message,
                    time: "Just Now",
                    isCaseLink: isDraft, // Reusing existing prop for special display
                    caseId: draftData ? "DRAFT-PREVIEW" : undefined // Hack to flag it
                };

                if (existingConv) {
                    // Update existing
                    if (!existingConv.messages.some(m => m.text === message && m.time === "Just Now")) {
                        return prev.map(c => c.lawyerId === lawyerId ? { ...c, messages: [...c.messages, newMessage] } : c);
                    }
                    return prev;
                } else {
                    // Create new conversation (Mock)
                    const lawyer = lawyers.find(l => l.id === lawyerId) || FALLBACK_LAWYERS.find((l: LawyerType) => l.id === lawyerId);
                    return [...prev, {
                        lawyerId,
                        caseTitle: "Draft Review Request",
                        messages: [newMessage]
                    }];
                }
            });

            setSelectedLawyerId(lawyerId);

            // Clear state to prevent duplicate adds on refresh (React Router state persists)
            window.history.replaceState({}, document.title);
        }
    }, [location.state, lawyers]);

    // Handle shared case files from ShareCase page
    useEffect(() => {
        const state = location.state as { sharedCase?: any };
        if (state?.sharedCase) {
            const { lawyerId, caseId, lawyerName, timestamp } = state.sharedCase;

            setConversations(prev => {
                const existingConv = prev.find(c => c.lawyerId === lawyerId);

                const caseMessage: Message = {
                    id: Date.now(),
                    senderId: "user",
                    text: `📁 Shared Legal Case: ${caseId}`,
                    time: "Just Now",
                    isCaseLink: true,
                    caseId: caseId
                };

                if (existingConv) {
                    // Add to existing conversation if not already shared
                    if (!existingConv.messages.some(m => m.caseId === caseId)) {
                        return prev.map(c =>
                            c.lawyerId === lawyerId
                                ? { ...c, messages: [...c.messages, caseMessage] }
                                : c
                        );
                    }
                    return prev;
                } else {
                    // Create new conversation
                    const lawyer = lawyers.find(l => l.id === lawyerId) ||
                        FALLBACK_LAWYERS.find((l: LawyerType) => l.id === lawyerId);

                    return [...prev, {
                        lawyerId,
                        caseTitle: `Case Review: ${caseId}`,
                        messages: [
                            {
                                id: Date.now() - 1,
                                senderId: "lawyer",
                                text: `Hello! I'm ready to review your legal case ${caseId}. Let me analyze the documents.`,
                                time: "Just Now"
                            },
                            caseMessage
                        ]
                    }];
                }
            });

            setSelectedLawyerId(lawyerId);

            // Clear state to prevent duplicate adds
            window.history.replaceState({}, document.title);
        }
    }, [location.state, lawyers]);

    // Auto-scroll to bottom when messages change
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [conversations, selectedLawyerId]);

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        // Validate file size (max 10MB)
        if (file.size > 10 * 1024 * 1024) {
            alert("File size must be less than 10MB");
            return;
        }

        setUploadingFile(true);

        // Simulate file upload
        setTimeout(() => {
            const fileUrl = URL.createObjectURL(file);
            const attachment: FileAttachment = {
                id: Date.now().toString(),
                name: file.name,
                type: file.type,
                size: file.size,
                url: fileUrl,
                uploadedAt: new Date().toISOString()
            };

            const fileMessage: Message = {
                id: Date.now(),
                senderId: "user",
                text: `Shared document: ${file.name}`,
                time: "Just Now",
                attachment
            };

            setConversations(prev => prev.map(c =>
                c.lawyerId === selectedLawyerId
                    ? { ...c, messages: [...c.messages, fileMessage] }
                    : c
            ));

            setUploadingFile(false);

            // Simulate lawyer typing response
            setTimeout(() => {
                setIsTyping(true);
                setTimeout(() => {
                    const lawyerResponse: Message = {
                        id: Date.now(),
                        senderId: "lawyer",
                        text: "Thank you for sharing the document. I'll review it and get back to you shortly.",
                        time: "Just Now"
                    };
                    setConversations(prev => prev.map(c =>
                        c.lawyerId === selectedLawyerId
                            ? { ...c, messages: [...c.messages, lawyerResponse] }
                            : c
                    ));
                    setIsTyping(false);
                }, 2000);
            }, 1000);
        }, 1500);

        // Reset file input
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const handleSendMessage = () => {
        if (newMessage.trim() && currentConversation) {
            const newMsg: Message = {
                id: Date.now(),
                senderId: "user",
                text: newMessage,
                time: "Just Now"
            };

            setConversations(prev => prev.map(c =>
                c.lawyerId === selectedLawyerId
                    ? { ...c, messages: [...c.messages, newMsg] }
                    : c
            ));
            setNewMessage("");

            // Simulate lawyer typing and response
            setTimeout(() => {
                setIsTyping(true);
                setTimeout(() => {
                    const lawyerResponse: Message = {
                        id: Date.now(),
                        senderId: "lawyer",
                        text: "I understand. Let me look into this and provide you with a detailed response.",
                        time: "Just Now"
                    };
                    setConversations(prev => prev.map(c =>
                        c.lawyerId === selectedLawyerId
                            ? { ...c, messages: [...c.messages, lawyerResponse] }
                            : c
                    ));
                    setIsTyping(false);
                }, 2000);
            }, 1000);
        }
    };

    const formatFileSize = (bytes: number): string => {
        if (bytes < 1024) return bytes + ' B';
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
        return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
    };

    const getFileIcon = (type: string) => {
        if (type.startsWith('image/')) return <ImageIcon size={20} />;
        if (type === 'application/pdf') return <FileText size={20} />;
        return <File size={20} />;
    };

    return (
        <div className="min-h-screen bg-black text-white pb-10">
            {/* Ambient Background */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-sky-900/10 blur-[150px] rounded-full" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-900/10 blur-[120px] rounded-full" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 pt-28">
                {/* Header */}
                <div className="flex items-center gap-4 mb-8">
                    <Link
                        to="/dashboard"
                        className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-neutral-400 hover:text-white transition-colors"
                    >
                        <ArrowLeft size={18} />
                    </Link>
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold font-display">Messages</h1>
                        <p className="text-sm text-neutral-500">Secure Consultation Port</p>
                    </div>
                </div>

                <div className="grid lg:grid-cols-[320px_1fr] gap-6 h-[calc(100vh-220px)]">
                    {/* Lawyer List */}
                    <div className="bg-white/5 border border-white/10 rounded-3xl backdrop-blur-xl overflow-hidden flex flex-col">
                        <div className="p-5 border-b border-white/5">
                            <h2 className="text-xs font-black text-neutral-500 uppercase tracking-widest">Active Counsel</h2>
                        </div>
                        <div className="flex-1 overflow-y-auto">
                            {conversations.map(conv => {
                                const lawyer = lawyers.find(l => l.id === conv.lawyerId);
                                if (!lawyer) return null;
                                const isActive = selectedLawyerId === conv.lawyerId;
                                const lastMessage = conv.messages[conv.messages.length - 1];

                                return (
                                    <button
                                        key={conv.lawyerId}
                                        onClick={() => setSelectedLawyerId(conv.lawyerId)}
                                        className={`w-full p-5 flex gap-4 text-left transition-all border-b border-white/5 ${isActive ? 'bg-sky-500/10 border-l-4 border-l-sky-500' : 'hover:bg-white/5'}`}
                                    >
                                        <img src={lawyer.image} className="w-12 h-12 rounded-xl object-cover border border-white/10 shrink-0" alt="" />
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-bold text-white text-sm truncate">{lawyer.name}</h3>
                                            <p className="text-[10px] text-sky-400 font-bold uppercase truncate mb-1">{conv.caseTitle}</p>
                                            <p className="text-xs text-neutral-500 truncate">{lastMessage?.text}</p>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Chat Area */}
                    <div className="bg-white/5 border border-white/10 rounded-3xl backdrop-blur-xl flex flex-col overflow-hidden">
                        {currentLawyer ? (
                            <>
                                <div className="p-4 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
                                    <div className="flex items-center gap-4">
                                        <img src={currentLawyer.image} className="w-10 h-10 rounded-lg object-cover" alt="" />
                                        <div>
                                            <h3 className="font-bold text-white text-sm">{currentLawyer.name}</h3>
                                            <p className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest">Encrypted Line</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <button className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-neutral-400"><Phone size={14} /></button>
                                        <button className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-neutral-400"><Video size={14} /></button>
                                    </div>
                                </div>

                                <div className="flex-1 overflow-y-auto p-6 space-y-6 flex flex-col">
                                    {currentConversation?.messages.map(msg => (
                                        <div key={msg.id} className={`flex ${msg.senderId === 'user' ? 'justify-end' : 'justify-start'}`}>
                                            {msg.isCaseLink ? (
                                                <Link
                                                    to={`/case/${msg.caseId}`}
                                                    className="w-full max-w-sm p-4 rounded-2xl bg-gradient-to-br from-sky-600 to-indigo-700 text-white shadow-xl hover:scale-[1.02] transition-transform active:scale-95 group"
                                                >
                                                    <div className="flex items-center gap-3 mb-3">
                                                        <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                                                            <FileText size={20} />
                                                        </div>
                                                        <div>
                                                            <p className="text-[10px] font-black uppercase tracking-widest opacity-70">Shared Legal Report</p>
                                                            <h4 className="font-bold text-sm tracking-tight">{msg.text}</h4>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center justify-between text-[10px] bg-black/20 p-2 rounded-lg border border-white/10">
                                                        <span className="flex items-center gap-1"><Lock size={10} /> Requires PIN: 2345</span>
                                                        <span className="font-bold">CLICK TO OPEN</span>
                                                    </div>
                                                </Link>
                                            ) : msg.attachment ? (
                                                <div className={`max-w-sm ${msg.senderId === 'user' ? '' : 'self-start'}`}>
                                                    <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 border border-emerald-500/20 backdrop-blur-sm">
                                                        <div className="flex items-center gap-3 mb-3">
                                                            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                                                                {getFileIcon(msg.attachment.type)}
                                                            </div>
                                                            <div className="flex-1 min-w-0">
                                                                <p className="text-sm font-bold text-white truncate">{msg.attachment.name}</p>
                                                                <p className="text-xs text-neutral-400">{formatFileSize(msg.attachment.size)}</p>
                                                            </div>
                                                        </div>
                                                        <div className="flex gap-2">
                                                            <a
                                                                href={msg.attachment.url}
                                                                download={msg.attachment.name}
                                                                className="flex-1 py-2 px-4 bg-emerald-500 hover:bg-emerald-400 text-black rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all"
                                                            >
                                                                <Download size={14} /> Download
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <p className="text-[9px] mt-2 opacity-30 text-right">{msg.time}</p>
                                                </div>
                                            ) : (
                                                <div className={`max-w-[70%] p-4 rounded-2xl ${msg.senderId === 'user' ? 'bg-white/10 text-white rounded-br-none' : 'bg-sky-500/10 text-sky-100 rounded-bl-none border border-sky-500/10'}`}>
                                                    <p className="text-sm leading-relaxed">{msg.text}</p>
                                                    <p className="text-[9px] mt-2 opacity-30 text-right">{msg.time}</p>
                                                </div>
                                            )}
                                        </div>
                                    ))}

                                    {/* Typing Indicator */}
                                    {isTyping && (
                                        <div className="flex justify-start">
                                            <div className="bg-sky-500/10 border border-sky-500/10 rounded-2xl rounded-bl-none p-4 flex items-center gap-2">
                                                <div className="flex gap-1">
                                                    <div className="w-2 h-2 bg-sky-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                                                    <div className="w-2 h-2 bg-sky-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                                                    <div className="w-2 h-2 bg-sky-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                                                </div>
                                                <span className="text-xs text-sky-400">Lawyer is typing...</span>
                                            </div>
                                        </div>
                                    )}

                                    <div ref={messagesEndRef} />
                                </div>

                                <div className="p-6 border-t border-white/5 bg-white/[0.01]">
                                    <div className="flex gap-4">
                                        <input
                                            type="file"
                                            ref={fileInputRef}
                                            onChange={handleFileUpload}
                                            className="hidden"
                                            accept="image/*,.pdf,.doc,.docx"
                                        />
                                        <button
                                            onClick={() => fileInputRef.current?.click()}
                                            disabled={uploadingFile}
                                            className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-neutral-500 hover:text-white hover:bg-white/10 transition-all disabled:opacity-50"
                                        >
                                            {uploadingFile ? (
                                                <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                                            ) : (
                                                <Paperclip size={20} />
                                            )}
                                        </button>
                                        <input
                                            type="text"
                                            value={newMessage}
                                            onChange={(e) => setNewMessage(e.target.value)}
                                            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                                            placeholder="Type a secure message..."
                                            className="flex-1 bg-black/40 border border-white/10 rounded-2xl px-6 py-3 text-white focus:outline-none focus:border-sky-500 transition-colors"
                                        />
                                        <button
                                            onClick={handleSendMessage}
                                            className="w-12 h-12 rounded-2xl bg-white text-black flex items-center justify-center hover:bg-sky-400 transition-colors shadow-xl"
                                        >
                                            <Send size={20} />
                                        </button>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="flex-1 flex items-center justify-center text-neutral-600">
                                {lawyers.length === 0 ? "Loading Consultaions..." : "Select a consultation"}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LawyerMessages;
