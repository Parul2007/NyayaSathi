import React from "react";
import { Shield } from "lucide-react";
import LegalArticle from "../LegalArticle";

const WomensSafetyArticle: React.FC = () => {
    const articleData = {
        title: "Women's Safety",
        category: "Women Protection Laws",
        icon: <Shield size={32} className="text-pink-500" />,
        overview: "Women's safety laws in India are comprehensive and victim-centric, designed to protect women from domestic violence, workplace harassment, and criminal offences.",
        sections: [
            {
                title: "Key Laws",
                list: [
                    "Protection of Women from Domestic Violence Act, 2005",
                    "Sexual Harassment of Women at Workplace Act, 2013 (POSH)",
                    "IPC / BNS Sections 354, 376, 509",
                    "Dowry Prohibition Act, 1961"
                ]
            },
            {
                title: "Zero FIR",
                content: "Police must register FIR regardless of jurisdiction. Especially applicable in:",
                list: [
                    "Rape",
                    "Domestic violence",
                    "Sexual assault"
                ]
            },
            {
                title: "Workplace Harassment (POSH)",
                list: [
                    "Mandatory Internal Complaints Committee (ICC)",
                    "Complaint within 3 months",
                    "Employer liability for non-compliance"
                ]
            },
            {
                title: "Immediate Help",
                content: "Women Helpline: 181 / 112",
                list: [
                    "Emergency medical & legal aid guaranteed",
                    "24/7 support available",
                    "Free legal assistance provided"
                ]
            }
        ],
        conclusion: "These laws empower women to seek justice and protection. Remember, help is always available, and reporting incidents promptly ensures better outcomes."
    };

    return <LegalArticle {...articleData} />;
};

export default WomensSafetyArticle;
