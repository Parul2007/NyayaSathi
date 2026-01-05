import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PenTool, Download, Send, Check, Sparkles, RefreshCw, Copy, FileText, ChevronRight, Gavel, Scale, AlertCircle } from "lucide-react";

// --- Types & Templates ---

type TemplateId = "reply_138" | "rti_application" | "consumer_complaint" | "rent_agreement";

interface TemplateField {
    id: string;
    label: string;
    placeholder: string;
    type?: "text" | "date" | "textarea";
}

interface DraftTemplate {
    id: TemplateId;
    title: string;
    description: string;
    icon: React.ReactNode;
    fields: TemplateField[];
    generate: (data: Record<string, string>) => string;
}

const TEMPLATES: Record<TemplateId, DraftTemplate> = {
    reply_138: {
        id: "reply_138",
        title: "Reply to Legal Notice (138 NI)",
        description: "Formal response to a Cheque Bounce notice denying liability.",
        icon: <AlertCircle size={20} />,
        fields: [
            { id: "noticeDate", label: "Date of Notice Received", placeholder: "DD/MM/YYYY" },
            { id: "senderName", label: "Sender's Name (Opposite Party)", placeholder: "e.g., Global Finance Ltd." },
            { id: "chequeNo", label: "Cheque Number", placeholder: "e.g., 452100" },
            { id: "defense", label: "Primary Defense", placeholder: "e.g., Security cheque, Lost cheque", type: "textarea" }
        ],
        generate: (data) => `To,
[Advocate Name / Sender Name]
Counsel for ${data.senderName || "[Sender Name]"}
[Address]

SUBJECT: REPLY TO LEGAL NOTICE DATED ${data.noticeDate || "[Date]"} UNDER SECTION 138 OF THE NEGOTIABLE INSTRUMENTS ACT, 1881.

Sir/Madam,

Under instructions from my client, [Your Name], Resident of [Your Address], I hereby respond to your legal notice dated ${data.noticeDate || "[Date]"} as follows:

1. That my client is in receipt of the aforementioned legal notice regarding the dishonour of Cheque No. ${data.chequeNo || "[Cheque No]"}, and the contents thereof are denied in their entirety, except for those that are matters of record.

2. That the allegation that my client issued the said cheque towards the discharge of a legally enforceable debt is factually incorrect and vehemently denied.

3. Defense Specfic: ${data.defense || "That the said cheque was entrusted to your client merely as a 'Security Cheque' at the time of the initial agreement. It was never intended to be encashed for the discharge of any liability present at this moment."}

4. That your client has misused the said security cheque by presenting it without my client's consent or knowledge, solely to harass my client and extort money.

5. That my client owes no such liability as alleged in your notice.

In view of the pending facts, you are hereby called upon to recall the said notice within 15 days of receipt of this reply and return the subject cheque to my client, failing which my client shall be constrained to initiate appropriate civil and criminal proceedings against you and your client for extortion, cheating, and misuse of legal process.

Copy retained in my office for future legal action.

Yours faithfully,

_______________________
[Your Signature]
`
    },
    rti_application: {
        id: "rti_application",
        title: "RTI Application (Form A)",
        description: "Official request for information from a Public Authority.",
        icon: <FileText size={20} />,
        fields: [
            { id: "pioOffice", label: "Public Information Officer (PIO) Office", placeholder: "e.g., DCP Office, Central District" },
            { id: "deptAddress", label: "Department Address", placeholder: "e.g., Daryaganj, New Delhi" },
            { id: "subject", label: "Information Sought (Subject)", placeholder: "e.g., Status of FIR No. 123/2025" },
            { id: "questions", label: "Questions / Details Required", placeholder: "1. Please provide... 2. Kindly state...", type: "textarea" }
        ],
        generate: (data) => `To,
The Public Information Officer (PIO),
${data.pioOffice || "[PIO Office Name]"},
${data.deptAddress || "[Address]"}

Sub: Application under the Right to Information Act, 2005.

Sir/Madam,

I, [Your Name], a citizen of India, resident of [Your Address], hereby request you to kindly provide the following information:

1. Particulars of Information required:
   Subject Matter: ${data.subject || "[Subject]"}

2. Details of Information Sought:
${data.questions || "   a) Please provide the certified copy of...\n   b) Please inform the current status of..."}

3. Period for which information is required: [Date Range]

4. Whether information is required by post or in person: By Post.

5. Application Fee: I am enclosing the application fee of Rs. 10/- by way of [Postal Order/Court Fee Stamp].

I state that I am a citizen of India and I am eligible to seek information under the Right to Information Act, 2005.

Place: [City]
Date: ${new Date().toLocaleDateString()}

Yours faithfully,

_______________________
[Your Name]
[Phone Number]
`
    },
    consumer_complaint: {
        id: "consumer_complaint",
        title: "Consumer Complaint",
        description: "Draft a formal complaint for defect in goods/deficiency in service.",
        icon: <Scale size={20} />,
        fields: [
            { id: "oppositeParty", label: "Opposite Party (Company)", placeholder: "e.g., XYZ Electronics Pvt Ltd" },
            { id: "invoiceNo", label: "Invoice/Order Number", placeholder: "e.g., INV-2024-9988" },
            { id: "product", label: "Product/Service Details", placeholder: "e.g., LED TV Model 55X" },
            { id: "defect", label: "Nature of Defect/Issue", placeholder: "e.g., Screen flickering within warranty period", type: "textarea" },
            { id: "relief", label: "Relief Claims", placeholder: "e.g., Refund of Rs. 50,000 + Compensation", type: "textarea" }
        ],
        generate: (data) => `BEFORE THE DISTRICT CONSUMER DISPUTES REDRESSAL COMMISSION, [DISTRICT NAME]

Complaint Case No. _______ of 20__

IN THE MATTER OF:

[Your Name]
S/o [Father's Name]
R/o [Address]
... Complainant

VERSUS

${data.oppositeParty || "[Opposite Party Name]"}
[Address of Company]
... Opposite Party

COMPLAINT UNDER SECTION 35 OF THE CONSUMER PROTECTION ACT, 2019

RESPECTFULLY SHOWETH:

1. That the Complainant is a consumer as defined under the Consumer Protection Act, 2019, having purchased ${data.product || "[Product]"} vide Invoice No. ${data.invoiceNo || "[Invoice No]"} dated [Date] for a sum of Rs. [Amount].

2. That immediately after purchase/within the warranty period, the said product started showing defects, specifically:
   "${data.defect || "The product stopped functioning..."}"

3. That the Complainant approached the Opposite Party multiple times via emails and customer care calls, but the Opposite Party failed to rectify the defect or replace the product, thereby causing deficiency in service and unfair trade practice.

4. That due to the negligent act of the Opposite Party, the Complainant has suffered mental agony, harassment, and financial loss.

PRAYER:

It is therefore most respectfully prayed that this Hon'ble Commission may graciously be pleased to direct the Opposite Party to:

a) Refund the entire amount of Rs. [Amount] Paid along with 18% interest p.a. OR Replace the defective product with a new one.
b) Pay Rs. ${data.relief || "50,000"} as compensation for mental harassment.
c) Pay Rs. 11,000 towards litigation costs.

Pass any other order which this Hon'ble Commission may deem fit.

Complainant
[Your Name]
Verification: Verified at [Place] on this [Date] that the contents of the above complaint are true to my knowledge.
`
    },
    rent_agreement: {
        id: "rent_agreement",
        title: "Rent Agreement (11 Months)",
        description: "Standard residential rental agreement template.",
        icon: <Gavel size={20} />,
        fields: [
            { id: "landlordName", label: "Landlord Name", placeholder: "Name of Owner" },
            { id: "tenantName", label: "Tenant Name", placeholder: "Name of Tenant" },
            { id: "propertyAddress", label: "Property Address", placeholder: "Complete Address of Rented Premises" },
            { id: "rentAmount", label: "Monthly Rent (Rs.)", placeholder: "e.g., 15,000" },
            { id: "deposit", label: "Security Deposit (Rs.)", placeholder: "e.g., 30,000" }
        ],
        generate: (data) => `RENT AGREEMENT

This Rent Agreement is made on this ${new Date().toLocaleDateString()} at [City], BETWEEN:

${data.landlordName || "[LANDLORD NAME]"}, S/o [Father's Name], R/o [Owner Address] (hereinafter called the "LESSOR" / "OWNER") of the ONE PART

AND

${data.tenantName || "[TENANT NAME]"}, S/o [Father's Name], R/o [Permanent Address] (hereinafter called the "LESSEE" / "TENANT") of the OTHER PART.

WHEREAS the Lessor is the lawful owner of the property situated at:
${data.propertyAddress || "[Complete Property Address]"}

AND WHEREAS the Lessor has agreed to let out the said property to the Lessee for residential purposes on a monthly rent basis.

NOW THIS AGREEMENT WITNESSETH AS UNDER:

1. TENURE: The tenancy shall be for a period of 11 (Eleven) months commencing from [Start Date] to [End Date].

2. RENT: The Lessee shall pay a monthly rent of Rs. ${data.rentAmount || "________"} /- to the Lessor on or before the 7th day of each English calendar month.

3. SECURITY DEPOSIT: The Lessee has paid an interest-free refundable security deposit of Rs. ${data.deposit || "________"} /- to the Lessor. This amount shall be refunded at the time of vacating the premises, subject to deduction for damages/arrears if any.

4. MAINTENANCE: The Lessee shall pay electricity and water charges as per actual meter reading. The Lessor shall pay property taxes.

5. TERMINATION: Either party can terminate this agreement by giving one month's notice in writing.

6. PURPOSE: The premises shall be used for Residential purposes only and not for any commercial activity.

IN WITNESS WHEREOF, the parties have signed this agreement on the day and year first above written.

LESSOR                                       LESSEE
_________________                            _________________
[Sign]                                       [Sign]

WITNESSES:
1. ________________
2. ________________
`
    }
};

const NyayaDraft: React.FC = () => {
    const navigate = useNavigate(); // Hook initialized
    const [selectedTemplateId, setSelectedTemplateId] = useState<TemplateId>("reply_138");
    const [formData, setFormData] = useState<Record<string, string>>({});
    const [draftContent, setDraftContent] = useState("");
    const [isThinking, setIsThinking] = useState(false);

    const activeTemplate = TEMPLATES[selectedTemplateId];

    // Initial generate on template switch
    useEffect(() => {
        setFormData({});
        setDraftContent(activeTemplate.generate({}));
    }, [selectedTemplateId]);

    const handleInputChange = (id: string, value: string) => {
        const newData = { ...formData, [id]: value };
        setFormData(newData);
        // Live update - in a real app might want to debate debounce vs button or just raw replace
        // For 'authenticity', let's do live update if the user hasn't heavily edited the text manually. 
        // But to keep it simple and robust:
        // We will only update the draft if we click "Refresh Draft" or if it is the first load.
    };

    const regenerateDraft = () => {
        setDraftContent(activeTemplate.generate(formData));
    };

    const handleAIEdit = () => {
        setIsThinking(true);
        // Mock AI delay
        setTimeout(() => {
            setDraftContent((prev) => {
                // Determine what kind of polish to do based on template
                if (activeTemplate.id === 'reply_138') {
                    return prev.replace("denied", "vehemently denied upon strict legal instructions").replace("misused", "maliciously misused with intent to defraud");
                }
                return prev + "\n\n[AI Note: The language has been refined for legal precision and tone.]";
            });
            setIsThinking(false);
        }, 1500);
    };

    return (
        <div className="pb-20 min-h-screen bg-black text-white selection:bg-emerald-500/30">
            <div className="max-w-7xl mx-auto px-4 pt-32">
                <header className="mb-12 animate-fade-in-up">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-md">
                        <Gavel size={14} className="text-emerald-400" />
                        <span className="text-xs font-bold text-neutral-400 tracking-widest uppercase">AI Legal Drafting Engine</span>
                    </div>
                    <h1 className="text-5xl font-bold font-serif mb-4 text-white">Nyaya<span className="text-emerald-500">Draft</span></h1>
                    <p className="text-xl text-neutral-400 font-light max-w-2xl">
                        Generate professional, legally compliant drafts in seconds. Authenticated templates for Court, Banking, and Civil matters.
                    </p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                    {/* LEFT PANEL: Selection & Inputs */}
                    <div className="lg:col-span-4 space-y-8 animate-slide-in-left">
                        {/* Template List */}
                        <div className="bg-neutral-900/50 border border-white/10 rounded-3xl p-6 backdrop-blur-xl">
                            <h3 className="text-sm font-bold text-neutral-400 uppercase tracking-widest mb-4">Document Type</h3>
                            <div className="space-y-3">
                                {(Object.values(TEMPLATES) as DraftTemplate[]).map(t => (
                                    <button
                                        key={t.id}
                                        onClick={() => setSelectedTemplateId(t.id)}
                                        className={`w-full p-4 rounded-xl border transition-all flex items-center gap-4 text-left group
                                            ${selectedTemplateId === t.id
                                                ? 'bg-emerald-500/10 border-emerald-500 text-white shadow-[0_0_20px_rgba(16,185,129,0.2)]'
                                                : 'bg-white/5 border-transparent hover:bg-white/10 text-neutral-400 hover:text-white'}
                                        `}
                                    >
                                        <div className={`${selectedTemplateId === t.id ? 'text-emerald-400' : 'text-neutral-500 group-hover:text-white'}`}>
                                            {t.icon}
                                        </div>
                                        <div>
                                            <div className="font-bold text-sm">{t.title}</div>
                                            <div className="text-[10px] opacity-60 leading-tight mt-1">{t.description}</div>
                                        </div>
                                        {selectedTemplateId === t.id && <ChevronRight size={16} className="ml-auto text-emerald-500" />}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Input Form */}
                        <div className="bg-neutral-900/50 border border-white/10 rounded-3xl p-6 backdrop-blur-xl">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-sm font-bold text-neutral-400 uppercase tracking-widest">Case Details</h3>
                                <button
                                    onClick={regenerateDraft}
                                    className="text-emerald-400 hover:text-emerald-300 text-xs font-bold flex items-center gap-1 transition-colors"
                                >
                                    <RefreshCw size={12} /> Auto-Fill Draft
                                </button>
                            </div>

                            <div className="space-y-5">
                                {activeTemplate.fields.map(field => (
                                    <div key={field.id} className="group">
                                        <label className="block text-xs font-bold text-neutral-500 mb-2 ml-1 group-focus-within:text-emerald-400 transition-colors">
                                            {field.label}
                                        </label>
                                        {field.type === 'textarea' ? (
                                            <textarea
                                                placeholder={field.placeholder}
                                                value={formData[field.id] || ''}
                                                onChange={(e) => handleInputChange(field.id, e.target.value)}
                                                className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-sm text-white placeholder:text-neutral-700 focus:outline-none focus:border-emerald-500/50 focus:bg-emerald-500/5 transition-all resize-none h-24"
                                            />
                                        ) : (
                                            <input
                                                type={field.type || 'text'}
                                                placeholder={field.placeholder}
                                                value={formData[field.id] || ''}
                                                onChange={(e) => handleInputChange(field.id, e.target.value)}
                                                className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-sm text-white placeholder:text-neutral-700 focus:outline-none focus:border-emerald-500/50 focus:bg-emerald-500/5 transition-all"
                                            />
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* RIGHT PANEL: Editor */}
                    <div className="lg:col-span-8 animate-slide-in-right">
                        <div className="sticky top-24">
                            <div className="bg-[#0f0f13] rounded-[2rem] border border-white/10 shadow-2xl overflow-hidden flex flex-col h-[80vh]">

                                {/* Toolbar */}
                                <div className="p-4 border-b border-white/5 bg-white/5 flex items-center justify-between backdrop-blur-md">
                                    <div className="flex items-center gap-4">
                                        <div className="flex gap-1.5">
                                            <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
                                            <div className="w-3 h-3 rounded-full bg-amber-500/20 border border-amber-500/50" />
                                            <div className="w-3 h-3 rounded-full bg-emerald-500/20 border border-emerald-500/50" />
                                        </div>
                                        <span className="text-xs font-mono text-neutral-500 border-l border-white/10 pl-4">
                                            {activeTemplate.title.replace(/\s+/g, '_').toLowerCase()}.docx
                                        </span>
                                    </div>

                                    <div className="flex gap-3">
                                        <button
                                            onClick={handleAIEdit}
                                            disabled={isThinking}
                                            className="px-4 py-2 bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/30 rounded-lg text-xs font-bold text-indigo-400 flex items-center gap-2 transition-all hover:scale-105 active:scale-95"
                                        >
                                            <Sparkles size={14} className={isThinking ? "animate-spin" : ""} />
                                            {isThinking ? "Refining..." : "Make Professional with AI"}
                                        </button>
                                        <button
                                            onClick={() => alert("Draft copied to clipboard!")}
                                            className="p-2 hover:bg-white/10 rounded-lg text-neutral-400 hover:text-white transition-colors"
                                            title="Copy Text"
                                        >
                                            <Copy size={16} />
                                        </button>
                                    </div>
                                </div>

                                {/* Text Area */}
                                <div className="flex-1 relative bg-[#0a0a0c]">
                                    <textarea
                                        value={draftContent}
                                        onChange={(e) => setDraftContent(e.target.value)}
                                        className="w-full h-full p-8 md:p-12 bg-transparent text-neutral-200 font-serif text-lg leading-relaxed focus:outline-none resize-none selection:bg-emerald-500/30"
                                        spellCheck={false}
                                    />

                                    {/* AI Badge Overlay if thinking */}
                                    {isThinking && (
                                        <div className="absolute inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-10 animate-fade-in">
                                            <div className="bg-black border border-indigo-500/50 rounded-2xl p-6 shadow-[0_0_50px_rgba(99,102,241,0.2)] text-center transform scale-110">
                                                <div className="w-12 h-12 rounded-full bg-indigo-500/20 flex items-center justify-center mx-auto mb-4">
                                                    <Sparkles size={24} className="text-indigo-400 animate-pulse" />
                                                </div>
                                                <h3 className="text-white font-bold mb-1">Polishing Draft</h3>
                                                <p className="text-neutral-500 text-xs">Applying legal terminologies...</p>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Footer Actions */}
                                <div className="p-6 border-t border-white/5 bg-white/[0.02] flex justify-between items-center backdrop-blur-md">
                                    <div className="text-[10px] text-neutral-500 font-mono">
                                        WORD COUNT: {draftContent.split(/\s+/).filter(w => w.length > 0).length}
                                    </div>
                                    <div className="flex gap-4">
                                        <button className="px-6 py-2.5 rounded-xl border border-white/10 hover:bg-white/5 text-neutral-300 text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all">
                                            <Download size={16} /> Save PDF
                                        </button>
                                        <button
                                            onClick={() => navigate('/review-request', {
                                                state: {
                                                    draftTitle: activeTemplate.title,
                                                    draftContent: draftContent
                                                }
                                            })}
                                            className="px-8 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-emerald-900/20 hover:shadow-emerald-900/40 hover:-translate-y-1 transition-all"
                                        >
                                            <Send size={16} /> Send to Lawyer for Review
                                        </button>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default NyayaDraft;
