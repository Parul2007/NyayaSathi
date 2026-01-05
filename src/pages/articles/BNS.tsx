import React from "react";
import { Scale } from "lucide-react";
import LegalArticle from "../LegalArticle";

const BNSArticle: React.FC = () => {
    const articleData = {
        title: "New Criminal Laws 2024: Bharatiya Nyaya Sanhita",
        category: "Criminal Law Reform",
        icon: <Scale size={32} className="text-red-500" />,
        overview: "The Bharatiya Nyaya Sanhita (BNS), 2023, replaces the Indian Penal Code (IPC), 1860, marking a historic transformation in India's criminal justice system. Effective from July 1, 2024, the BNS introduces new definitions, updated punishments, and addresses modern crimes while removing colonial-era provisions.",
        sections: [
            {
                title: "Key Changes from IPC to BNS",
                list: [
                    "Removal of sedition law (Section 124A IPC) - Now replaced with Section 152 BNS addressing acts endangering sovereignty",
                    "Community service as a new form of punishment for certain offenses",
                    "Enhanced punishment for crimes against women and children",
                    "New provisions for organized crime and terrorism",
                    "Stricter penalties for mob lynching and hate crimes",
                    "Updated definitions for criminal conspiracy and culpable homicide"
                ]
            },
            {
                title: "New Offenses Introduced",
                list: [
                    "Organized Crime (Sections 109-111) - Targets criminal syndicates and mafias",
                    "Terrorism (Sections 113-116) - Comprehensive anti-terror provisions",
                    "Mob Lynching - Specific punishment up to life imprisonment",
                    "Sexual offenses against children under POCSO alignment",
                    "Fraudulent activities through digital means",
                    "Hit-and-run cases with mandatory reporting requirements"
                ]
            },
            {
                title: "Major Structural Changes",
                subsections: [
                    {
                        title: "Renumbering of Sections",
                        content: "All IPC sections have been renumbered in BNS. For example, IPC Section 302 (Murder) is now BNS Section 103."
                    },
                    {
                        title: "Gender-Neutral Language",
                        content: "Many provisions have been updated to use gender-neutral language, making laws more inclusive."
                    },
                    {
                        title: "Time-bound Trials",
                        content: "New provisions mandate completion of investigations and trials within specified timeframes to ensure speedy justice."
                    }
                ]
            },
            {
                title: "Impact on Common Crimes",
                list: [
                    "Murder (now Section 103) - Punishment remains death or life imprisonment",
                    "Theft (now Section 303) - Enhanced punishment for organized theft",
                    "Rape (now Section 63-66) - Stricter penalties and victim protection measures",
                    "Defamation (now Section 356) - Provisions largely retained with procedural updates",
                    "Cheating (now Section 316) - Extended to cover digital fraud and cyber crimes"
                ]
            },
            {
                title: "What This Means for You",
                list: [
                    "Legal professionals must update their knowledge of new section numbers",
                    "Citizens filing FIRs should cite BNS sections instead of IPC",
                    "Pending cases filed under IPC will continue under old provisions",
                    "New cases from July 1, 2024 onwards fall under BNS",
                    "Police and judicial procedures are being updated nationwide"
                ]
            }
        ],
        conclusion: "The Bharatiya Nyaya Sanhita represents India's move towards a modernized, indigenous criminal justice system. While it retains many core principles of the IPC, it addresses contemporary challenges like cybercrime, terrorism, and organized crime with updated legal frameworks."
    };

    return <LegalArticle {...articleData} />;
};

export default BNSArticle;
