import React from "react";
import { Activity } from "lucide-react";
import LegalArticle from "../LegalArticle";

const CyberCrimeArticle: React.FC = () => {
    const articleData = {
        title: "Cyber Crime",
        category: "Information Technology Law",
        icon: <Activity size={32} className="text-purple-500" />,
        overview: "Cyber crimes are regulated primarily under the Information Technology Act, 2000 and the Indian Penal Code / Bharatiya Nyaya Sanhita (BNS). With the rise of digital transactions and online activity, cyber crime awareness has become essential.",
        sections: [
            {
                title: "Common Cyber Offences",
                list: [
                    "Online fraud & phishing",
                    "Identity theft",
                    "OTP & UPI fraud",
                    "Social media harassment",
                    "Impersonation & fake profiles"
                ]
            },
            {
                title: "Relevant Legal Provisions",
                list: [
                    "Section 43 IT Act – Unauthorized access",
                    "Section 66C – Identity theft",
                    "Section 66D – Cheating by personation online",
                    "Section 67 – Obscene content",
                    "Section 354D IPC / BNS – Cyber stalking"
                ]
            },
            {
                title: "How to Report Cyber Crime",
                steps: [
                    "Visit cybercrime.gov.in",
                    "Select 'Financial Fraud' or 'Other Cyber Crime'",
                    "Upload evidence (screenshots, transaction IDs)",
                    "FIR may be registered automatically"
                ],
                content: "⚠️ Golden Rule: Report within 24 hours for financial fraud."
            },
            {
                title: "Punishments",
                list: [
                    "Imprisonment up to 3–7 years",
                    "Heavy fines",
                    "Account freezing and recovery orders"
                ]
            }
        ],
        conclusion: "Cyber crime is a growing threat, but the law provides strong protection. Always be vigilant online and report suspicious activity immediately to maximize chances of recovery."
    };

    return <LegalArticle {...articleData} />;
};

export default CyberCrimeArticle;
