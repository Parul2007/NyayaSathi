import React from "react";
import { Scale } from "lucide-react";
import LegalArticle from "../LegalArticle";

const ConsumerRightsArticle: React.FC = () => {
    const articleData = {
        title: "Consumer Rights",
        category: "Consumer Protection Law",
        icon: <Scale size={32} className="text-emerald-500" />,
        overview: "Consumer rights in India are protected under the Consumer Protection Act, 2019, which replaced the 1986 Act to address modern issues such as e-commerce, misleading advertisements, and unfair trade practices. A consumer is any person who buys goods or avails services for consideration (online or offline), excluding resale or commercial use.",
        sections: [
            {
                title: "Common Consumer Issues",
                list: [
                    "Defective or substandard products",
                    "Non-refund or delayed refund",
                    "Misleading advertisements",
                    "Overcharging (MRP violations)",
                    "Deficiency in services (banking, telecom, insurance, hospitals, e-commerce)"
                ]
            },
            {
                title: "Legal Rights of Consumers",
                content: "Under Section 2(9) of the Consumer Protection Act, 2019, consumers have the following rights:",
                list: [
                    "Right to Safety – Protection against hazardous goods/services",
                    "Right to Information – Correct details about quality, quantity, price, and risks",
                    "Right to Choice – Access to a variety of goods at competitive prices",
                    "Right to Be Heard – Consumer interests must be considered",
                    "Right to Redressal – Compensation for loss or injury",
                    "Right to Consumer Education"
                ]
            },
            {
                title: "How to File a Consumer Complaint",
                content: "Follow these steps to file a consumer complaint:",
                steps: [
                    "Send a legal notice to the seller/service provider",
                    "File complaint online at e-Daakhil portal",
                    "Attach invoices, communication proof, screenshots",
                    "Choose appropriate forum: District Commission (up to ₹50 lakh), State Commission (₹50 lakh – ₹2 crore), National Commission (above ₹2 crore)"
                ]
            },
            {
                title: "E-Commerce Consumer Protection Rules, 2020",
                list: [
                    "Mandatory grievance officer",
                    "No fake reviews",
                    "Clear refund & return policies",
                    "Disclosure of seller details",
                    "Liability for misleading ads"
                ]
            },
            {
                title: "Possible Reliefs by Consumer Forum",
                list: [
                    "Refund or replacement",
                    "Compensation for mental agony",
                    "Penalty on seller/platform",
                    "Discontinuation of unfair practices"
                ]
            }
        ],
        conclusion: "These laws ensure access to justice, protection of fundamental rights, and accountability of authorities. NyayaSathi acts as a legal awareness and guidance platform, not a substitute for professional legal advice."
    };

    return <LegalArticle {...articleData} />;
};

export default ConsumerRightsArticle;
