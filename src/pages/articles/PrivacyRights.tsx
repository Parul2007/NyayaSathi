import React from "react";
import { Shield } from "lucide-react";
import LegalArticle from "../LegalArticle";

const PrivacyRightsArticle: React.FC = () => {
    const articleData = {
        title: "Right to Privacy: A Fundamental Right?",
        category: "Constitutional Law",
        icon: <Shield size={32} className="text-purple-500" />,
        overview: "In the landmark Justice K.S. Puttaswamy v. Union of India (2017), the Supreme Court of India unanimously declared the Right to Privacy as a fundamental right under Article 21 of the Constitution. This historic judgment has far-reaching implications for data protection, surveillance, and digital rights in India.",
        sections: [
            {
                title: "The Puttaswamy Judgment (2017)",
                content: "The 9-judge bench of the Supreme Court held that privacy is intrinsic to life and liberty under Article 21. Key highlights:",
                list: [
                    "Privacy is a fundamental right inherent in Articles 14, 19, and 21",
                    "It includes informational privacy, bodily privacy, and decisional autonomy",
                    "The right is not absolute and can be restricted by reasonable state action",
                    "Any restriction must pass the test of legality, necessity, and proportionality",
                    "Overruled earlier judgments that denied privacy as a fundamental right"
                ]
            },
            {
                title: "Components of Right to Privacy",
                subsections: [
                    {
                        title: "Informational Privacy",
                        content: [
                            "Control over personal data and information",
                            "Right to decide what information to share",
                            "Protection against unauthorized data collection",
                            "Consent-based data processing"
                        ]
                    },
                    {
                        title: "Bodily Privacy",
                        content: [
                            "Protection of physical integrity",
                            "Right to refuse medical examinations (except in lawful cases)",
                            "Privacy in personal spaces",
                            "Protection against invasive searches"
                        ]
                    },
                    {
                        title: "Decisional Autonomy",
                        content: [
                            "Freedom to make personal choices",
                            "Right to marry, reproduce, and make family decisions",
                            "Sexual orientation and gender identity",
                            "Right to refuse treatment"
                        ]
                    }
                ]
            },
            {
                title: "Digital Privacy & Data Protection",
                list: [
                    "Digital Personal Data Protection Act, 2023 - India's comprehensive data protection law",
                    "Consent required for processing personal data",
                    "Right to access, correct, and erase personal data",
                    "Mandatory data breach notifications",
                    "Penalties for violations up to ₹250 crores",
                    "Data localization requirements for sensitive personal data"
                ]
            },
            {
                title: "Privacy vs. State Surveillance",
                content: "The judgment set limits on government surveillance:",
                list: [
                    "Aadhaar authentication limited to government subsidies and welfare",
                    "Mandatory Aadhaar linking struck down for bank accounts, mobile phones",
                    "Surveillance must be authorized by law and proportionate",
                    "Safeguards required for intercepting communications",
                    "Right to be forgotten - still under judicial consideration"
                ]
            },
            {
                title: "Practical Implications",
                list: [
                    "Companies must obtain explicit consent before collecting data",
                    "Data breaches must be reported to authorities",
                    "Individuals can sue for privacy violations",
                    "Social media platforms accountable for data misuse",
                    "CCTV surveillance must comply with privacy norms",
                    "Medical records and health data enjoy enhanced protection"
                ]
            }
        ],
        conclusion: "The recognition of privacy as a fundamental right marks a significant milestone in India's constitutional jurisprudence. As digital technology advances, the balance between individual privacy and legitimate state interests remains an evolving area of law."
    };

    return <LegalArticle {...articleData} />;
};

export default PrivacyRightsArticle;
