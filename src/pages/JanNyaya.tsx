import React, { useState, useRef } from "react";
import { Upload, FileText, AlertTriangle, CheckCircle, ArrowRight, X, Scan, Zap, Shield, Search, AlertCircle, RefreshCw, FileWarning, Scale, Sparkles } from "lucide-react";
import { db } from "../config/firebase";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
// import { uploadFile } from "../utils/storage"; // Removed for client-side only processing
import { processDocument } from "../utils/localDocumentProcessor";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { aiService } from "../services/ai";

interface AnalysisResult {
    isLegalDocument: boolean;
    documentType?: string;
    summary?: string;
    keyPoints?: string[];
    risks?: string[];
    actions?: string[];
    parties?: string[];
    dates?: string[];
    errorMessage?: string;
}

const JanNyaya: React.FC = () => {
    const { user, updateUser } = useAuth();
    const [isUploading, setIsUploading] = useState(false);
    const [analysisComplete, setAnalysisComplete] = useState(false);
    const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
    const [uploadedFileName, setUploadedFileName] = useState<string>("");
    const [processingStage, setProcessingStage] = useState<string>("");
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file && user) {
            setUploadedFileName(file.name);
            handleUpload(file);
        }
    };

    const triggerFileSelect = () => {
        fileInputRef.current?.click();
    };

    const [customApiKey, setCustomApiKey] = useState("");
    const [keySaved, setKeySaved] = useState(false);

    const saveApiKey = async () => {
        if (!customApiKey.trim()) return;
        try {
            await updateUser({ geminiApiKey: customApiKey.trim() });
            setKeySaved(true);
            setTimeout(() => setKeySaved(false), 3000);
        } catch (error) {
            console.error("Failed to save API key:", error);
            alert("Failed to save API key. Please try again.");
        }
    };

    const resetAnalysis = () => {
        setAnalysisComplete(false);
        setAnalysisResult(null);
        setUploadedFileName("");
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    // Helper to get effective API key
    const getEffectiveApiKey = () => {
        return customApiKey.trim() || (user as any)?.geminiApiKey;
    };

    const handleUpload = async (file: File) => {
        setIsUploading(true);
        setAnalysisComplete(false);
        setAnalysisResult(null);

        try {
            const apiKey = getEffectiveApiKey();
            if (!apiKey) {
                throw new Error("API Key is missing. Please enter your Gemini API Key above.");
            }

            setProcessingStage("Processing document...");

            // 1. Process Document Locally (Client Side Only)
            const processedDoc = await processDocument(file);

            // 2. AI Document Analysis
            setProcessingStage("Analyzing with AI...");

            const analysis = await aiService.analyzeDocument(processedDoc, apiKey);

            // 3. If valid legal document, save METADATA only
            if (analysis.isLegalDocument && user && (user as any).uid) {
                const caseId = `CASE-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

                // Only save if we have a user ID. If using custom key without login, we skip Firestore save or handle gracefully.
                try {
                    await setDoc(doc(db, "legal_cases", caseId), {
                        ...analysis,
                        id: caseId,
                        userId: (user as any).uid,
                        fileName: file.name,
                        fileUrl: "",
                        status: "Pending Review",
                        date: new Date().toISOString().split('T')[0],
                        createdAt: serverTimestamp()
                    });
                } catch (e) {
                    console.warn("Could not save to history (likely auth issue):", e);
                }
            }

            setAnalysisResult(analysis);
            setAnalysisComplete(true);
        } catch (error: any) {
            console.error("Upload/Processing error:", error);
            setAnalysisResult({
                isLegalDocument: false,
                errorMessage: error.message || "Failed to process document. Please try again."
            });
            setAnalysisComplete(true);
        } finally {
            setIsUploading(false);
            setProcessingStage("");
        }
    };

    return (
        <div className="min-h-screen pb-20 relative overflow-x-hidden bg-gradient-to-b from-black via-[#0a0a0f] to-black">
            {/* Hidden File Input */}
            <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept=".pdf,.jpg,.jpeg,.png,.doc,.docx,.txt"
                onChange={handleFileSelect}
            />

            {/* Refined Ambient Background */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-0 left-1/4 w-[60vh] h-[60vh] bg-slate-800/20 rounded-full blur-[140px]" />
                <div className="absolute bottom-0 right-1/4 w-[50vh] h-[50vh] bg-blue-900/10 rounded-full blur-[120px]" />
            </div>

            <div className="max-w-5xl mx-auto px-4 md:px-6 pt-32 relative z-10">

                {/* Elegant Header */}
                <header className="mb-20 text-center animate-fade-in-up">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-md hover:bg-white/8 transition-colors">
                        <Shield size={14} className="text-neutral-400" />
                        <span className="text-xs font-bold text-neutral-400 tracking-widest uppercase">AI Legal Intelligence</span>
                    </div>

                    <h1 className="text-5xl md:text-6xl font-medium text-white mb-6 tracking-tight leading-tight">
                        Transform Legal Documents<br />
                        <span className="font-serif italic text-neutral-400">into Plain English.</span>
                    </h1>



                    {/* API Key Input Section */}
                    <div className="max-w-md mx-auto mb-8 relative group">
                        <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-4 py-2 hover:border-emerald-500/50 transition-colors">
                            <Sparkles size={16} className="text-yellow-500" />
                            <input
                                type="password"
                                value={customApiKey}
                                onChange={(e) => setCustomApiKey(e.target.value)}
                                placeholder="Enter Gemini API Key"
                                className="bg-transparent border-none outline-none text-white text-sm w-full placeholder-neutral-500"
                            />
                            <button
                                onClick={saveApiKey}
                                disabled={!customApiKey.trim()}
                                className="text-xs bg-emerald-600/20 text-emerald-400 hover:bg-emerald-600 hover:text-white px-3 py-1.5 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {keySaved ? "Saved!" : "Save"}
                            </button>
                        </div>
                        <p className="text-[10px] text-neutral-500 mt-2 text-center">
                            Save key for future use across the platform.
                        </p>
                    </div>

                    <p className="text-lg text-neutral-500 max-w-xl mx-auto leading-relaxed">
                        Upload any legal notice, contract, or FIR. Our AI extracts key insights and presents them in clear, actionable language.
                    </p>

                    {/* API Key Warning if NO key is available */}
                    {!getEffectiveApiKey() && (
                        <div className="mt-8 inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-amber-500/10 border border-amber-500/20">
                            <AlertCircle size={18} className="text-amber-400" />
                            <span className="text-sm text-amber-300">
                                API Key missing. Please enter it above or configure in Sahayak Bot.
                            </span>
                        </div>
                    )}
                </header>

                {/* Content */}
                <div className="relative max-w-2xl mx-auto">
                    {/* Upload Area */}
                    {!analysisComplete && (
                        <div
                            className="relative group cursor-pointer animate-fade-in-up"
                            onClick={triggerFileSelect}
                        >
                            <div className="relative bg-white/[0.03] rounded-3xl p-12 md:p-16 text-center border border-white/10 hover:border-white/20 transition-all duration-300 hover:bg-white/[0.05] backdrop-blur-sm">

                                {isUploading ? (
                                    <div className="flex flex-col items-center py-8">
                                        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500/20 to-indigo-500/20 flex items-center justify-center mb-6 border border-blue-500/30">
                                            <Scan size={32} className="text-blue-400 animate-pulse" />
                                        </div>
                                        <div className="w-full max-w-md bg-white/5 h-1.5 rounded-full mb-6 overflow-hidden">
                                            <div className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-500 animate-[shimmer_1.5s_ease-in-out_infinite] rounded-full"
                                                style={{ width: '60%', backgroundSize: '200% 100%' }} />
                                        </div>
                                        <h3 className="text-xl font-medium text-white mb-2">{processingStage || "Processing..."}</h3>
                                        <p className="text-neutral-500 text-sm">AI is analyzing your document for legal insights...</p>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center">
                                        <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-6 border border-white/10 group-hover:scale-105 transition-transform duration-300">
                                            <Upload className="w-7 h-7 text-neutral-400 group-hover:text-white transition-colors" />
                                        </div>
                                        <h3 className="text-2xl font-medium text-white mb-3">Upload Legal Document</h3>
                                        <p className="text-neutral-500 mb-8 text-sm max-w-xs">
                                            PDF, DOCX, TXT, JPG · Up to 25MB
                                        </p>
                                        <button
                                            className="px-8 py-2.5 bg-white text-black rounded-lg font-medium hover:bg-neutral-200 transition-colors text-sm"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                triggerFileSelect();
                                            }}
                                        >
                                            Choose File
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* ... Analysis Results (Rest of the component remains same) ... */}

                    {/* Analysis Results */}
                    {analysisComplete && analysisResult && (
                        <div className="animate-slide-up space-y-6">

                            {/* Header */}
                            <div className="flex items-center justify-between pb-4 border-b border-white/10">
                                <div className="flex items-center gap-3">
                                    {analysisResult.isLegalDocument ? (
                                        <div className="p-2 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
                                            <Scale size={18} className="text-emerald-400" />
                                        </div>
                                    ) : (
                                        <div className="p-2 bg-red-500/10 rounded-lg border border-red-500/20">
                                            <FileWarning size={18} className="text-red-400" />
                                        </div>
                                    )}
                                    <div>
                                        <h2 className="text-xl font-medium text-white">
                                            {analysisResult.isLegalDocument ? "Analysis Complete" : "Invalid Document"}
                                        </h2>
                                        <p className="text-xs text-neutral-500">{uploadedFileName}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={resetAnalysis}
                                    className="text-xs text-neutral-500 hover:text-white transition-colors flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/5"
                                >
                                    <RefreshCw size={14} /> New Analysis
                                </button>
                            </div>

                            {/* Invalid Document Message */}
                            {!analysisResult.isLegalDocument && (
                                <div className="bg-red-950/20 border border-red-900/30 p-8 rounded-2xl text-center">
                                    <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                                        <AlertCircle size={32} className="text-red-400" />
                                    </div>
                                    <h3 className="text-xl font-medium text-red-300 mb-3">Not a Legal Document</h3>
                                    <p className="text-neutral-400 mb-6 max-w-md mx-auto">
                                        {analysisResult.errorMessage || "Please upload a valid legal document such as a court order, legal notice, contract, FIR, or similar legal paperwork."}
                                    </p>
                                    <button
                                        onClick={resetAnalysis}
                                        className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl font-medium transition-all"
                                    >
                                        Upload Different Document
                                    </button>
                                </div>
                            )}

                            {/* Valid Document Results */}
                            {analysisResult.isLegalDocument && (
                                <>
                                    {/* Document Type Badge */}
                                    <div className="flex items-center gap-3">
                                        <span className="px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-sm font-medium text-blue-300">
                                            📄 {analysisResult.documentType}
                                        </span>
                                    </div>

                                    {/* Summary */}
                                    <div className="bg-white/[0.03] border border-white/10 p-8 rounded-2xl hover:border-white/15 transition-colors">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="p-2 bg-blue-500/10 rounded-lg">
                                                <Search size={18} className="text-blue-400" />
                                            </div>
                                            <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">What This Document Says (सारांश)</span>
                                        </div>
                                        <p className="text-lg md:text-xl text-white font-serif leading-relaxed">
                                            "{analysisResult.summary}"
                                        </p>
                                    </div>

                                    {/* Key Points */}
                                    {analysisResult.keyPoints && analysisResult.keyPoints.length > 0 && (
                                        <div className="bg-white/[0.03] border border-white/10 p-6 rounded-2xl">
                                            <h3 className="text-sm font-semibold text-neutral-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                                                <CheckCircle size={16} className="text-emerald-400" /> Key Points (मुख्य बातें)
                                            </h3>
                                            <ul className="space-y-3">
                                                {analysisResult.keyPoints.map((point, idx) => (
                                                    <li key={idx} className="flex items-start gap-3 text-neutral-300">
                                                        <span className="text-emerald-400 mt-1">•</span>
                                                        <span>{point}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    {/* Risk & Action Grid */}
                                    <div className="grid md:grid-cols-2 gap-5">

                                        {/* Risks */}
                                        {analysisResult.risks && analysisResult.risks.length > 0 && (
                                            <div className="p-6 rounded-2xl bg-red-950/20 border border-red-900/20 hover:border-red-900/30 transition-colors">
                                                <div className="flex items-center gap-2 mb-3">
                                                    <AlertTriangle size={16} className="text-red-400/70" />
                                                    <h3 className="text-xs font-semibold uppercase tracking-wider text-red-400/70">Potential Risks (खतरे)</h3>
                                                </div>
                                                <ul className="space-y-2">
                                                    {analysisResult.risks.map((risk, idx) => (
                                                        <li key={idx} className="text-sm text-neutral-300 leading-relaxed flex items-start gap-2">
                                                            <span className="text-red-400">⚠</span>
                                                            {risk}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}

                                        {/* Recommended Actions */}
                                        {analysisResult.actions && analysisResult.actions.length > 0 && (
                                            <div className="p-6 rounded-2xl bg-emerald-950/20 border border-emerald-900/20 hover:border-emerald-900/30 transition-colors">
                                                <div className="flex items-center gap-2 mb-3">
                                                    <Shield size={16} className="text-emerald-400/70" />
                                                    <h3 className="text-xs font-semibold uppercase tracking-wider text-emerald-400/70">Suggested Solutions (सुझाव और समाधान)</h3>
                                                </div>
                                                <ul className="space-y-2">
                                                    {analysisResult.actions.map((action, idx) => (
                                                        <li key={idx} className="text-sm text-neutral-300 leading-relaxed flex items-start gap-2">
                                                            <span className="text-emerald-400">→</span>
                                                            {action}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>

                                    {/* Parties & Dates */}
                                    <div className="grid md:grid-cols-2 gap-5">
                                        {analysisResult.parties && analysisResult.parties.length > 0 && (
                                            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5">
                                                <h3 className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-3">Parties Involved</h3>
                                                <div className="flex flex-wrap gap-2">
                                                    {analysisResult.parties.map((party, idx) => (
                                                        <span key={idx} className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-sm text-neutral-300">
                                                            {party}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {analysisResult.dates && analysisResult.dates.length > 0 && (
                                            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5">
                                                <h3 className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-3">Important Dates</h3>
                                                <div className="flex flex-wrap gap-2">
                                                    {analysisResult.dates.map((date, idx) => (
                                                        <span key={idx} className="px-3 py-1.5 bg-amber-500/10 border border-amber-500/20 rounded-lg text-sm text-amber-300">
                                                            📅 {date}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Next Steps */}
                                    <div className="flex gap-4 pt-4">
                                        <Link
                                            to="/vakeel-connect"
                                            className="flex-1 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-medium rounded-xl text-center transition-all flex items-center justify-center gap-2"
                                        >
                                            Consult a Lawyer <ArrowRight size={18} />
                                        </Link>
                                        <Link
                                            to="/sahayak"
                                            className="flex-1 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium rounded-xl text-center transition-all flex items-center justify-center gap-2"
                                        >
                                            Ask Sahayak AI <Zap size={18} />
                                        </Link>
                                    </div>
                                </>
                            )}

                        </div>
                    )}

                </div>
            </div>
        </div>
    );
};

export default JanNyaya;
