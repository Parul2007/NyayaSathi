import React from "react";
import { FileText } from "lucide-react";
import LegalArticle from "../LegalArticle";

const FIRArticle: React.FC = () => {
    const articleData = {
        title: "FIR & Complaints",
        category: "Criminal Procedure",
        icon: <FileText size={32} className="text-blue-500" />,
        overview: "First Information Report (FIR) under Section 154 CrPC / BNSS is the first step in criminal law. It is a crucial document that sets the legal process in motion and protects victims' rights.",
        sections: [
            {
                title: "What is an FIR?",
                content: "An FIR is the written document prepared by police when they receive information about a cognizable offence (serious crimes like theft, assault, murder). It is the starting point of criminal investigation."
            },
            {
                title: "How to File FIR",
                list: [
                    "Oral or written complaint at police station",
                    "Police must register if cognizable offence",
                    "Copy must be provided free of cost",
                    "FIR can be filed by anyone (not just victim)",
                    "Online FIR facility available in many states"
                ]
            },
            {
                title: "If Police Refuse FIR",
                steps: [
                    "Send complaint to SP / DCP in writing",
                    "Approach Magistrate under Section 156(3) for direction to police",
                    "File complaint online (where available)",
                    "File private complaint directly before Magistrate"
                ]
            },
            {
                title: "False FIR Protection",
                list: [
                    "Courts can quash FIR under Section 482 CrPC if found malicious",
                    "Compensation claims possible for malicious prosecution",
                    "Filing false FIR is punishable under law"
                ]
            }
        ],
        conclusion: "Filing an FIR is your fundamental right. Police cannot refuse to register an FIR for cognizable offences. If you face resistance, escalate immediately to higher authorities or the magistrate."
    };

    return <LegalArticle {...articleData} />;
};

export default FIRArticle;
