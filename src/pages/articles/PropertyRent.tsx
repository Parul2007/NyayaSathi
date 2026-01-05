import React from "react";
import { Gavel } from "lucide-react";
import LegalArticle from "../LegalArticle";

const PropertyRentArticle: React.FC = () => {
    const articleData = {
        title: "Property & Rent",
        category: "Property Law",
        icon: <Gavel size={32} className="text-amber-500" />,
        overview: "Property and rental matters are governed by a mix of central laws, state laws, and judicial precedents. Key areas include property ownership & registration, inheritance & succession, and tenant eviction & rent disputes.",
        sections: [
            {
                title: "Property Ownership & Registration",
                list: [
                    "Governed by Transfer of Property Act, 1882",
                    "Sale deed must be registered under Registration Act, 1908",
                    "Stamp duty varies by state",
                    "Unregistered sale deeds are legally weak"
                ]
            },
            {
                title: "Inheritance Laws",
                content: "Inheritance depends on religion:",
                subsections: [
                    {
                        title: "Hindu Succession Act, 1956",
                        content: "Applies to Hindus, Buddhists, Sikhs, and Jains"
                    },
                    {
                        title: "Indian Succession Act, 1925",
                        content: "Applies to Christians and Parsis"
                    },
                    {
                        title: "Muslim Personal Law",
                        content: "Based on Shariat principles"
                    }
                ]
            },
            {
                title: "Tenant & Rent Laws",
                list: [
                    "Governed by State Rent Control Acts",
                    "New Model Tenancy Act, 2021 adopted by some states",
                    "Eviction requires: Valid grounds (non-payment, misuse, personal need), Legal notice, Court order (self-eviction is illegal)"
                ]
            },
            {
                title: "Remedies Available",
                list: [
                    "Civil court suit",
                    "Rent controller",
                    "Injunction against illegal construction",
                    "Partition suit in ancestral property"
                ]
            }
        ],
        conclusion: "Property law protects ownership rights while ensuring fair treatment of tenants. Always maintain proper documentation and seek legal advice for complex property matters."
    };

    return <LegalArticle {...articleData} />;
};

export default PropertyRentArticle;
