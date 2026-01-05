import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
    ArrowLeft,
    Folder,
    FileText,
    Lock,
    Search,
    MoreVertical,
    Upload,
    HardDrive,
    Clock,
    Plus,
    Share2,
    Shield
} from "lucide-react";
import { useFirestore } from "../hooks/useFirestore";
import { useAuth } from "../context/AuthContext";
import { where, setDoc, doc, serverTimestamp } from "firebase/firestore";

import { db } from "../config/firebase";
// import { uploadFile, openDocument } from "../utils/storage"; // Disabled

interface VaultDoc {
    id: string;
    name: string;
    type: string;
    date: string;
    size: string;
    tag: string;
    status: string;
    userId: string;
    fileUrl?: string;
    isImportant?: boolean;
}

const DocVault: React.FC = () => {
    const { user: authUser } = useAuth();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [pin, setPin] = useState("");
    const [error, setError] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedTag, setSelectedTag] = useState("All Files");
    const [isUploading, setIsUploading] = useState(false);

    const queryConstraints = useMemo(() =>
        authUser ? [where('userId', '==', (authUser as any).uid)] : [],
        [authUser]);

    const { data: firestoreDocs, loading } = useFirestore<VaultDoc>('vault_documents',
        isAuthenticated && authUser ? queryConstraints : []
    );

    const MOCK_VAULT_DOCS: VaultDoc[] = [
        { id: "DOC-V001", name: "Property_Deed_Bangalore.pdf", type: "PDF", date: "12 Dec 2023", size: "2.4 MB", tag: "#Property", status: "Encrypted", userId: "demo", isImportant: true },
        { id: "DOC-V002", name: "Vehicle_Insurance_Policy.pdf", type: "PDF", date: "05 Jan 2024", size: "1.2 MB", tag: "#Insurance", status: "Encrypted", userId: "demo" },
        { id: "DOC-V003", name: "Employment_Contract_2024.docx", type: "DOCX", date: "20 Jan 2024", size: "450 KB", tag: "#Identity", status: "Encrypted", userId: "demo", isImportant: true },
        { id: "DOC-V004", name: "GST_Filing_Q3.pdf", type: "PDF", date: "15 Oct 2023", size: "3.1 MB", tag: "#Finance", status: "Encrypted", userId: "demo" },
        { id: "DOC-V005", name: "Passport_Scan_Copy.jpg", type: "JPG", date: "10 May 2023", size: "1.8 MB", tag: "#Identity", status: "Encrypted", userId: "demo" },
        { id: "DOC-V006", name: "Lease_Agreement_Shop.pdf", type: "PDF", date: "28 Nov 2023", size: "2.1 MB", tag: "#Property", status: "Encrypted", userId: "demo" },
        { id: "DOC-V007", name: "Mutual_Fund_Statement.pdf", type: "PDF", date: "01 Jan 2024", size: "980 KB", tag: "#Finance", status: "Encrypted", userId: "demo" },
        { id: "DOC-V008", name: "Legal_Notice_Reply.docx", type: "DOCX", date: "04 Jan 2024", size: "120 KB", tag: "#Drafts", status: "Encrypted", userId: "demo" }
    ];

    const documents = firestoreDocs.length > 0 ? firestoreDocs : MOCK_VAULT_DOCS;

    // Storage Calculation
    const limitMB = 100;
    const calculateTotalKB = () => {
        return documents.reduce((acc, d) => {
            if (d.size.includes("MB")) {
                return acc + parseFloat(d.size) * 1024;
            } else if (d.size.includes("KB")) {
                return acc + parseFloat(d.size);
            }
            return acc;
        }, 0);
    };

    const totalUsedKB = calculateTotalKB();
    const totalUsedMB = (totalUsedKB / 1024).toFixed(2);
    const usedPercentage = (parseFloat(totalUsedMB) / limitMB * 100).toFixed(1);

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file || !authUser) return;

        setIsUploading(true);
        try {
            if (!(authUser as any)?.uid) {
                throw new Error("User not authenticated");
            }
            // const path = `users/${(authUser as any).uid}/uploads/${Date.now()}_${file.name}`;
            // const downloadURL = await uploadFile(path, file);
            await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate upload
            const downloadURL = ""; // No storage in this version

            const fileExtension = file.name.split('.').pop()?.toUpperCase() || 'FILE';
            const fileSize = file.size > 1024 * 1024
                ? (file.size / (1024 * 1024)).toFixed(2) + " MB"
                : (file.size / 1024).toFixed(0) + " KB";

            const docId = `DOC-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
            await setDoc(doc(db, "vault_documents", docId), {
                id: docId,
                name: file.name,
                type: fileExtension,
                date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
                size: fileSize,
                tag: "#Uploaded",
                status: "Encrypted",
                userId: (authUser as any).uid,
                fileUrl: downloadURL,
                createdAt: serverTimestamp(),
                isImportant: true // New uploads marked as important for visibility
            });

        } catch (error) {
            console.error("Upload error:", error);
            alert("Failed to upload document.");
        } finally {
            setIsUploading(false);
        }
    };

    const filteredDocuments = documents.filter(d => {
        const matchesSearch = d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            d.tag.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesTag = selectedTag === "All Files" || d.tag === selectedTag;
        return matchesSearch && matchesTag;
    });

    const importantDocuments = documents.filter(d => d.isImportant);

    const handlePinSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (pin === "2345") {
            setIsAuthenticated(true);
        } else {
            setError("Incorrect PIN");
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen text-white flex flex-col items-center justify-center p-6 relative z-50">
                <div className="w-full max-w-sm bg-neutral-900/95 backdrop-blur-sm border border-neutral-800 rounded-2xl p-8 text-center shadow-2xl relative z-50">
                    <div className="w-16 h-16 bg-neutral-800 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Lock className="text-emerald-500" size={28} />
                    </div>
                    <h2 className="text-2xl font-bold mb-2 text-white">Vault Access</h2>
                    <p className="text-neutral-400 text-sm mb-6">Enter PIN '2345' to unlock documents</p>

                    <form onSubmit={handlePinSubmit} className="space-y-4">
                        <input
                            type="password"
                            value={pin}
                            onChange={(e) => setPin(e.target.value)}
                            placeholder="PIN code"
                            maxLength={4}
                            className="w-full bg-black border border-neutral-700 rounded-xl px-4 py-3 text-center text-xl tracking-widest focus:border-emerald-500 focus:outline-none transition-colors"
                        />
                        {error && <p className="text-red-500 text-xs font-bold">{error}</p>}
                        <button
                            type="submit"
                            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-xl transition-all"
                        >
                            Unlock Vault
                        </button>
                    </form>

                    <Link to="/dashboard" className="inline-block mt-6 text-neutral-500 hover:text-white text-xs font-bold uppercase tracking-widest">
                        Cancel
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen text-white p-6 md:p-12 relative z-50">
            <div className="max-w-7xl mx-auto relative z-50">
                <header className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
                    <div>
                        <Link to="/dashboard" className="inline-flex items-center gap-2 text-neutral-500 hover:text-white mb-6 uppercase text-[10px] font-black tracking-[0.2em] transition-colors">
                            <ArrowLeft size={14} /> Return to Hub
                        </Link>
                        <h1 className="text-5xl font-bold text-white font-serif mb-4">
                            Doc<span className="text-emerald-500">Vault</span>
                        </h1>
                        <p className="text-xl text-neutral-400 max-w-xl font-light">
                            Secure, encrypted storage for your critical legal documents.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="relative">
                            <input
                                type="file"
                                id="vault-upload"
                                className="hidden"
                                onChange={handleUpload}
                                disabled={isUploading}
                            />
                            <label
                                htmlFor="vault-upload"
                                className={`px-8 py-4 bg-white text-black rounded-2xl font-bold hover:bg-neutral-200 transition-all flex items-center justify-center gap-3 shadow-lg cursor-pointer ${isUploading ? 'opacity-50 pointer-events-none' : ''}`}
                            >
                                {isUploading ? (
                                    <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                                ) : (
                                    <Upload size={20} />
                                )}
                                {isUploading ? 'Uploading...' : 'Upload File'}
                            </label>
                        </div>
                    </div>
                </header>

                {/* Important Files Section */}
                {importantDocuments.length > 0 && (
                    <div className="mb-12">
                        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                            Important Files ({importantDocuments.length})
                        </h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {importantDocuments.map(doc => (
                                <div key={doc.id} className="bg-emerald-900/10 border border-emerald-500/20 rounded-2xl p-6 relative group hover:bg-emerald-900/20 transition-all">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-500">
                                            <Shield size={24} />
                                        </div>
                                        {doc.tag === "#Uploaded" && (
                                            <span className="bg-emerald-500 text-black text-[10px] font-bold px-2 py-1 rounded">NEW</span>
                                        )}
                                    </div>
                                    <h3 className="font-bold text-lg mb-1 truncate text-white">{doc.name}</h3>
                                    <p className="text-xs text-neutral-400 mb-4 uppercase tracking-wider">{doc.type} • {doc.size}</p>
                                    <div className="flex items-center justify-between pt-4 border-t border-emerald-500/10">
                                        <span className="text-xs text-emerald-400 font-mono">{doc.date}</span>
                                        <button onClick={() => doc.fileUrl && window.open(doc.fileUrl, '_blank')} className="text-xs font-bold text-white hover:text-emerald-400 transition-colors">VIEW gt; </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Search & Filter */}
                <div className="flex flex-col md:flex-row gap-6 mb-8">
                    <div className="relative flex-1">
                        <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-neutral-500" size={20} />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search documents..."
                            className="w-full bg-neutral-900 border border-neutral-800 rounded-2xl pl-14 pr-4 py-4 text-white focus:outline-none focus:border-emerald-500 transition-colors"
                        />
                    </div>
                    <div className="flex gap-3 overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
                        {["All Files", "#Banking", "#Property", "#Identity", "#Drafts", "#Finance", "#Insurance"].map(tag => (
                            <button
                                key={tag}
                                onClick={() => setSelectedTag(tag)}
                                className={`px-5 py-3 rounded-xl border font-medium transition-all whitespace-nowrap
                                    ${selectedTag === tag
                                        ? 'border-emerald-500 bg-emerald-500/10 text-emerald-500'
                                        : 'border-white/10 bg-white/5 text-neutral-400 hover:text-white hover:bg-white/10'}
                                `}
                            >
                                {tag}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Recent Files Grid */}
                <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                    <Clock size={20} className="text-neutral-400" /> Recent Uploads
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {filteredDocuments.map((doc) => (
                        <div
                            key={doc.id}
                            className="group relative p-6 rounded-2xl bg-[#0a0a0f] border border-white/10 hover:border-emerald-500/30 transition-all duration-300"
                        >
                            <div className="flex justify-between items-start mb-6">
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold
                                    ${doc.type === 'PDF' ? 'bg-red-500/10 text-red-500' :
                                        doc.type === 'DOCX' ? 'bg-blue-500/10 text-blue-500' :
                                            'bg-purple-500/10 text-purple-500'}
                                `}>
                                    {doc.type}
                                </div>
                                <button className="text-neutral-500 hover:text-white">
                                    <MoreVertical size={18} />
                                </button>
                            </div>

                            <h3 className="text-sm font-bold text-white truncate mb-2">{doc.name}</h3>

                            <div className="flex items-center gap-2 mb-4">
                                <span className="text-[10px] uppercase tracking-wider font-bold text-neutral-500 bg-white/5 px-2 py-1 rounded-md">
                                    {doc.tag}
                                </span>
                            </div>

                            <div className="flex items-center justify-between pt-4 border-t border-white/5 text-xs text-neutral-400 font-mono">
                                <span>{doc.size}</span>
                                <span>{doc.date}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DocVault;
