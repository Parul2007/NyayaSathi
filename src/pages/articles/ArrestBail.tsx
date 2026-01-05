import React from "react";
import { Shield } from "lucide-react";
import LegalArticle from "../LegalArticle";

const ArrestBailArticle: React.FC = () => {
    const articleData = {
        title: "Arrest & Bail",
        category: "Criminal Procedure",
        icon: <Shield size={32} className="text-red-500" />,
        overview: "Arrest procedures and bail are guided by the Criminal Procedure Code (CrPC) and Bharatiya Nagarik Suraksha Sanhita (BNSS). Understanding your rights during arrest is crucial for protecting yourself from illegal detention.",
        sections: [
            {
                title: "DK Basu Guidelines (Supreme Court)",
                content: "Police must follow these mandatory guidelines:",
                list: [
                    "Inform grounds of arrest",
                    "Allow lawyer access",
                    "Inform a friend/relative",
                    "Conduct medical examination",
                    "Produce accused before magistrate within 24 hours"
                ]
            },
            {
                title: "Bail Provisions",
                subsections: [
                    {
                        title: "Bailable Offences",
                        content: "Bail is a right (e.g., simple assault, petty theft)"
                    },
                    {
                        title: "Non-bailable Offences",
                        content: "Bail is discretionary (e.g., murder, rape)"
                    },
                    {
                        title: "Anticipatory Bail",
                        content: "Protection from arrest under Section 438 CrPC (filed before arrest)"
                    }
                ]
            },
            {
                title: "Illegal Detention",
                list: [
                    "Detention beyond 24 hours without magistrate approval is illegal",
                    "Compensation can be claimed for unlawful detention",
                    "Habeas Corpus petition can be filed in High Court"
                ]
            }
        ],
        conclusion: "Know your rights during arrest. If you or someone you know is arrested, ensure compliance with DK Basu guidelines and seek legal counsel immediately."
    };

    return <LegalArticle {...articleData} />;
};

export default ArrestBailArticle;
