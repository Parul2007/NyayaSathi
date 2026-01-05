export interface Lawyer {
    id: string;
    name: string;
    specialty: string;
    image: string;
    rating: number;
    experienceYears: number;
    status: 'Available' | 'Busy';
    verified: boolean;
    tags: string[];
    bio?: string;
    achievements?: string[];
    casesWon?: number;
    stats?: {
        successRate: string;
        yearsInPractice: string;
    };
}

export interface LegalNewsItem {
    id: string | number;
    title: string;
    summary: string;
    content: string;
    category: string;
    date: string;
    image: string;
    readTime: string;
}



export interface ForumDiscussion {
    id: string;
    title: string;
    content: string;
    category: string;
    date: string;
    author: string;
    upvotes: number;
    views: number;
    replies: any[];
}

export const MOCK_FORUM: ForumDiscussion[] = [
    {
        id: "forum-1",
        title: "Is it legal to record phone calls without consent in India?",
        content: "I'm currently embroiled in a property dispute and I have several phone recordings where the other party admits to certain facts they are now denying in court. I recorded these on my smartphone without telling them. Are these recordings admissible as evidence under the new BNS/BNSS? Does the right to privacy (Puttaswamy judgment) override evidence collection?",
        category: "Evidence Law",
        date: "2h ago",
        author: "Rahul Sathe",
        upvotes: 42,
        views: 1205,
        replies: [
            {
                id: "rep-1-1",
                author: "Adv. Rajesh Kumar",
                content: "**Legal Position on Call Recordings as Evidence**\n\nIn India, the admissibility of tape-recorded conversations is well-settled through several Supreme Court judgments, most notably *R.M. Malkani v. State of Maharashtra*. \n\n1. **Admissibility:** Recording a call without consent is generally admissible in court provided:\n   - The voice is clearly identifiable.\n   - The accuracy of the recording is proved by the maker.\n   - The recording is relevant to the matter in issue.\n   - The recording has not been tampered with or edited.\n\n2. **Right to Privacy:** While the *Puttaswamy* judgment established privacy as a fundamental right, courts have often held that in legal disputes, the search for truth can outweigh individual privacy if the evidence is crucial. However, the court has the discretion to exclude it if it was obtained through illegal means that 'shocks the conscience'.\n\n3. **Certificate Requirement:** Under Section 63 of the Bharatiya Sakshya Adhiniyam (formerly Section 65B of the Evidence Act), you MUST provide a companion certificate to prove the digital authenticity of the recording.",
                date: "1h ago",
                upvotes: 85,
                verified: true,
                lawyerId: "L-101"
            },
            {
                id: "rep-1-2",
                author: "Suresh Menon",
                content: "I used a call recording in my labor court case last year. The judge allowed it but my lawyer had to spend hours explaining how the file was transferred from the phone to the CD. Make sure you don't delete the original file from the phone!",
                date: "45m ago",
                upvotes: 12,
                verified: false
            },
            {
                id: "rep-1-3",
                author: "Anita Desai",
                content: "Does this apply to WhatsApp calls too? I heard WhatsApp calls are encrypted and harder to prove in court.",
                date: "30m ago",
                upvotes: 5,
                verified: false
            }
        ]
    },
    {
        id: "forum-2",
        title: "Employer not releasing F&F settlement after 3 months",
        content: "I resigned from a mid-sized IT firm in Bangalore 90 days ago. I served my full notice period and completed all handover tasks. However, the HR keeps saying 'funds are stuck' and hasn't released my Full & Final settlement or my relieving letter. What are my legal options? Can I send a legal notice myself?",
        category: "Labor Law",
        date: "5h ago",
        author: "Priya K.",
        upvotes: 28,
        views: 890,
        replies: [
            {
                id: "rep-2-1",
                author: "Adv. Sneha Kulkarni",
                content: "**Steps to Recover your F&F Settlement**\n\n90 days is a significant delay and constitutes a breach of the employment contract. Most company policies mandate F&F within 30-45 days.\n\n1. **Formal Demand Letter:** Before going to court, send a formal 'Demand Notice' via Registered Post (AD) or Email. State the clear breakdown of your dues and give them a 7-day deadline.\n2. **Labor Commissioner:** You can file a complaint with the Dept. of Labor in Bangalore. They have 'Conciliation Officers' who summon the employer to resolve such wage disputes.\n3. **Legal Notice:** If the demand letter fails, have a lawyer send a formal legal notice. Often, the threat of legal action is enough to move the HR department.\n4. **Documents Needed:** Keep your resignation acceptance email, your last 3 payslips, and the handover completion certificate ready.",
                date: "3h ago",
                upvotes: 56,
                verified: true,
                lawyerId: "L-103"
            },
            {
                id: "rep-2-2",
                author: "Vikram Singh",
                content: "The same thing happened to me. I tagged their CEO on LinkedIn with the screenshots of my follow-up emails. I got my money in 48 hours. Sometimes social pressure works faster than legal pressure!",
                date: "2h ago",
                upvotes: 124,
                verified: false
            },
            {
                id: "rep-2-3",
                author: "Amit Verma",
                content: "Wait, check if your contract has an 'Arbitration Clause'. If it does, you might have to go through an arbitrator instead of a regular labor court.",
                date: "1h ago",
                upvotes: 15,
                verified: false
            }
        ]
    },
    {
        id: "forum-3",
        title: "Builder added 2 extra floors without RERA approval",
        content: "Our housing society in Noida was approved for 12 floors. However, the builder has surreptitiously added 13th and 14th floors and is selling them. We are worried this will compromise the structural integrity and also lead to water/electricity shortages. We checked the RERA portal and the approved plan only shows 12 floors. What should we do as a resident group?",
        category: "Property Law",
        date: "10h ago",
        author: "Society Secretary",
        upvotes: 156,
        views: 4500,
        replies: [
            {
                id: "rep-3-1",
                author: "Adv. Rajesh Kumar",
                content: "**Legal Action Against Unauthorized Construction**\n\nThis is a classic case of 'Deviation from Sanctioned Plan' and is a serious violation of the RERA Act and local building bye-laws.\n\n1. **Stop Work Order:** File an immediate complaint with the RERA Authority (UP-RERA). They have the power to issue a 'Cease and Desist' order of the additional construction.\n2. **Injunction:** You should approach the local civil court for a 'Temporary Injunction' to stop third-party interests (sales) being created in those extra floors.\n3. **Local Authority:** Simultaneously, file a complaint with the NOIDA Authority. They can issue a demolition notice for unauthorized portions.\n4. **Audit:** I strongly suggest getting a private structural audit done. If the foundation was designed for 12 floors, 14 floors are a safety hazard.",
                date: "8h ago",
                upvotes: 92,
                verified: true,
                lawyerId: "L-101"
            },
            {
                id: "rep-3-2",
                author: "Manoj Tiwari",
                content: "Bro, builders in Noida are very powerful. Make sure your RWA is united. If even 2-3 people take money from the builder and back out, the case will weaken.",
                date: "6h ago",
                upvotes: 45,
                verified: false
            }
        ]
    },
    {
        id: "forum-4",
        title: "Cyber Fraud: ₹2 Lakhs gone through screen sharing app",
        content: "A person claiming to be from my bank's KYC department asked me to download 'AnyDesk' to help me update my PAN. He then asked me to perform a small transaction of ₹1. While I was doing it, my screen went blank and 2 lakhs were debited from my account in 3 transactions. I've blocked the card. What are the chances of recovery?",
        category: "Cyber Law",
        date: "1d ago",
        author: "Senior Citizen User",
        upvotes: 210,
        views: 6700,
        replies: [
            {
                id: "rep-4-1",
                author: "Adv. Priya Sharma",
                content: "**Immediate Steps for Cyber Recovery**\n\nTime is of the essence in 'Social Engineering' frauds like this. \n\n1. **Golden Hour:** If you report within 2 hours to the National Cyber Crime Helpline (1930), the police can often 'freeze' the amount in the destination bank account.\n2. **Zero Liability:** Under RBI circulars, if you report the fraud within 3 days, and it's proved to be a security breach (even if induced by trickery), your liability can be limited or zero. \n3. **Formal Complaint:** File a report on cybercrime.gov.in and take the ACK copy to your bank. Do NOT let the bank branch manager tell you 'it's your fault'. Demand a formal dispute resolution tracking number.\n4. **AnyDesk Logs:** Do not uninstall the app yet. Digital forensics can use the connection logs as evidence to trace the hacker's IP.",
                date: "20h ago",
                upvotes: 115,
                verified: true,
                lawyerId: "L-102"
            }
        ]
    },
    {
        id: "forum-5",
        title: "DV Case: Can my husband force me to stay with in-laws?",
        content: "I've been married for 4 years. My husband works in Bangalore but insists I stay with his parents in a village in Bihar. His parents are verbally abusive and restrict my movement. I want to move to Bangalore with him, but he says he 'cannot leave his parents alone'. Am I legally required to stay where he says? Can this be considered mental cruelty?",
        category: "Family Law",
        date: "2d ago",
        author: "Concerned Wife",
        upvotes: 89,
        views: 3200,
        replies: [
            {
                id: "rep-5-1",
                author: "Adv. Priya Sharma",
                content: "**Marital Rights and Residency**\n\nA wife has a legal right to the 'Matrimonial Home'. In various judgments, high courts have held that forcing a wife to stay with in-laws against her wishes while the husband stays elsewhere can constitute **Constructive Desertion** and **Mental Cruelty**.\n\n1. **Right to Cohabitation:** Marriage implies the right to live together. Unless there is a valid reason (like your job), you cannot be forced to live separately from your husband.\n2. **DV Act Protections:** Restricting your movement and verbal abuse are covered under the Protection of Women from Domestic Violence Act, 2005. You can seek a 'Residency Order' that allows you to live with your husband in Bangalore.\n3. **Counselling First:** I suggest professional marital counselling before legal action, but know that law does not mandate your 'service' to in-laws at the cost of your mental health.",
                date: "1d ago",
                upvotes: 74,
                verified: true,
                lawyerId: "L-102"
            }
        ]
    },
    {
        id: "forum-6",
        title: "Received fake iPhone from E-commerce giant, return rejected",
        content: "I ordered an iPhone 15 during the Big Billion sale. Upon opening, I found a refined soap bar inside instead of the phone. I have an unboxing video. However, the e-commerce company has rejected my return request saying the package was delivered in 'perfect condition' and the weight matches. My ₹70,000 is stuck. What is my next move?",
        category: "Consumer Rights",
        date: "3d ago",
        author: "Frustrated Buyer",
        upvotes: 340,
        views: 12000,
        replies: [
            {
                id: "rep-6-1",
                author: "Adv. Rajesh Kumar",
                content: "**Legal Strategy for E-Commerce Fraud**\n\nThis is a clear case of 'Deficiency in Service' and 'Unfair Trade Practice' under the Consumer Protection Act, 2019.\n\n1. **Consumer Helpline:** Immediately call 1915 (National Consumer Helpline) and lodge a formal grievance. Banks often take these ID numbers seriously.\n2. **Chargeback:** Since you used a credit card, contact your bank and initiate a 'Chargeback Request' citing 'Product not as described'. Provide your unboxing video as proof.\n3. **Consumer Court (e-Daakhil):** You don't need a lawyer to file a case in the District Consumer Forum. Use the e-Daakhil portal. Since you have the unboxing video, you have a 95% chance of winning with 12% interest + compensation for mental agony.\n4. **Legal Notice:** Sometimes, a formal legal notice sent to their registered office in Bangalore/Gurgaon makes them 'find' your refund instantly.",
                date: "2d ago",
                upvotes: 180,
                verified: true,
                lawyerId: "L-101"
            },
            {
                id: "rep-6-2",
                author: "Techie_Rahul",
                content: "Did you check the IMEI on the box? Sometimes these scammers replace the phone but keep the original box. Check if the seal was tampered with in your video.",
                date: "2d ago",
                upvotes: 45,
                verified: false
            }
        ]
    },
    {
        id: "forum-7",
        title: "Succession: Grandpa died without a will, 2 sons and 1 daughter",
        content: "My grandfather passed away recently. He owned a house in Pune and some ancestral land in Satara. He has two sons and one daughter (my aunt). My father and uncle say the daughter has no right because she was married in 1995 with a heavy dowry. My aunt is now claiming 1/3rd share. What does the Hindu Succession Act say about this?",
        category: "Property Law",
        date: "4d ago",
        author: "Confused Grandson",
        upvotes: 112,
        views: 5400,
        replies: [
            {
                id: "rep-7-1",
                author: "Adv. Rajesh Kumar",
                content: "**Daughter's Right to Ancestral Property**\n\nThe law on this was revolutionized by the 2005 Amendment to the Hindu Succession Act and further clarified in the *Vineeta Sharma v. Rakesh Sharma* (2020) judgment.\n\n1. **Equal Coparcener:** Your aunt is an equal coparcener by birth, just like your father and uncle. It does NOT matter if she was married before 2005 or if your grandfather was alive in 2005.\n2. **Dowry is irrelevant:** The law does not recognize dowry as a substitute for an inheritance share. Even if she received gifts at her wedding, her legal right to the 1/3rd share remains intact.\n3. **Ancestral vs Self-Acquired:** For ancestral property, her right is absolute. For self-acquired property, if your grandpa died intestate (without a will), she still gets an equal share as a Class I heir.\n4. **Advice:** Tell your father and uncle that contesting this will only lead to 10+ years of litigation which they will eventually lose. A family settlement deed is the best way forward.",
                date: "3d ago",
                upvotes: 156,
                verified: true,
                lawyerId: "L-101"
            }
        ]
    },
    {
        id: "forum-8",
        title: "Can I be sued for a negative Google review of a hospital?",
        content: "I posted a 1-star review of a private hospital in Delhi because the doctors were negligent and the billing was opaque. The hospital has now sent me a legal notice for 'Defamation' demanding ₹50 lakhs in damages and removal of the review. I have the medical records to prove their negligence. Should I be scared?",
        category: "Consumer Rights",
        date: "5d ago",
        author: "Brave Reviewer",
        upvotes: 280,
        views: 9000,
        replies: [
            {
                id: "rep-8-1",
                author: "Adv. Sneha Kulkarni",
                content: "**Defamation vs. Truthful Disclosure**\n\nIn India, 'Truth' is an absolute defense against civil defamation. If your review is based on facts and you have records to back it up, the hospital's notice is likely a 'SLAPP' tactic (Strategic Lawsuit Against Public Participation) intended to silence you.\n\n1. **Do Not Panic:** Most of these notices are empty threats to scare you into deleting the review.\n2. **Reply to Notice:** You must reply to the legal notice through a lawyer. State that the review represents your 'Honest Opinion' on a matter of public interest (healthcare) and that you have evidence of the facts stated.\n3. **Consumer Court:** Actually, you should consider filing a case against THEM in the Consumer Court for medical negligence, rather than just worrying about the review.\n4. **Google Policy:** Google generally doesn't remove reviews unless they contain profanity or are proved to be fake by a court order.",
                date: "4d ago",
                upvotes: 210,
                verified: true,
                lawyerId: "L-103"
            }
        ]
    },
    {
        id: "forum-9",
        title: "Motor Accident: Third party insurance claim process",
        content: "My car was hit by a speeding truck from behind. The truck driver was caught and an FIR has been filed. My car is totaled. Can I claim the repair costs from the truck's insurance company instead of using my own (to save my NCB)? What is the MACT process?",
        category: "Insurance Law",
        date: "1w ago",
        author: "Car Owner",
        upvotes: 65,
        views: 2800,
        replies: [
            {
                id: "rep-9-1",
                author: "Adv. Rajesh Kumar",
                content: "**Third Party Liability Claims**\n\nYes, you can claim from the truck's insurance, but the process is through the **Motor Accident Claims Tribunal (MACT)**, not a simple cashless garage repair.\n\n1. **MACT Petition:** You'll need to file a claim in the MACT court where the accident happened or where you reside. The FIR is a crucial document here.\n2. **Property Damage Limit:** Note that for 'Property Damage', Third Party insurance is often capped at ₹7.5 Lakhs by default unless the policy has higher limits. If your car is worth more, you might have to sue the truck owner personally for the balance.\n3. **Timeframe:** MACT cases can take 1-3 years. If you need your car fixed immediately, it's usually better to use your own 'Comprehensive Insurance' and let your insurance company 'Subrogate' (sue the truck's insurance to recover the money). You will lose your No Claim Bonus (NCB), but you get your car back in weeks, not years.",
                date: "5d ago",
                upvotes: 42,
                verified: true,
                lawyerId: "L-101"
            }
        ]
    },
    {
        id: "forum-10",
        title: "Online Harassment: Ex-partner leaking private photos",
        content: "My ex-boyfriend is threatening to leak our private photos on Instagram and WhatsApp if I don't get back with him. He has already sent them to one of my friends. I am terrified. What is the fastest way to stop this? Can the police help without making it a huge public scandal?",
        category: "Cyber Law",
        date: "2w ago",
        author: "Anonymous victim",
        upvotes: 450,
        views: 15000,
        replies: [
            {
                id: "rep-10-1",
                author: "Adv. Priya Sharma",
                content: "**Legal Emergency: Revenge Porn and Extortion**\n\nThis is a serious criminal offense under Section 66E (Privacy Violation) and Section 67/67A (Obscene content) of the IT Act, and various sections of the BNS for criminal intimidation.\n\n1. **Zero FIR:** Go to any Women's Police Station or Cyber Cell. You can file a 'Zero FIR' which doesn't require you to go to a specific station. \n2. **Confidentiality:** Ask the officer to register the case under 'Section 228A' (privacy of the victim). The law forbids the media or police from naming you or sharing details that identify you.\n3. **Content Removal:** Once you have the FIR, you can use the **NCMEC** or **StopNCII.org** platforms (which work with Instagram/FB) to hash your photos. This prevents them from being uploaded even if he tries from different accounts.\n4. **DO NOT DELETE CHATS:** Keep all his threats as evidence. Take screenshots immediately.",
                date: "1w ago",
                upvotes: 320,
                verified: true,
                lawyerId: "L-102"
            }
        ]
    },
    {
        id: "forum-11",
        title: "Digital Inheritance: What happens to my crypto and social media?",
        content: "I've built a significant portfolio of crypto assets and a large following on multiple social platforms. I'm worried about what happens to these digital assets if I pass away. Can I mention these in a regular will in India? Do platforms like Meta or Binance recognize Indian probate?",
        category: "Cyber Law",
        date: "3w ago",
        author: "Digital Nomad",
        upvotes: 145,
        views: 4500,
        replies: [
            {
                id: "rep-11-1",
                author: "Adv. Sneha Kulkarni",
                content: "**Legal Framework for Digital Assets**\n\nDigital inheritance is a rapidly evolving field in India. Currently, the Indian Succession Act and the IT Act are used to interpret these cases.\n\n1. **Digital Will:** Yes, you can and should include digital assets in your will. Specify the platform, the nature of the asset, and the 'Digital Executor' who should handle them.\n2. **Private Keys:** Do NOT put private keys or passwords in the will itself (as a will becomes a public document after probate). Instead, use a 'Letter of Instruction' or a hardware-based 'Dead Man's Switch'.\n3. **Platform Policies:** Platforms like Google have an 'Inactive Account Manager'. Use it to designate a legacy contact. For crypto, Indian courts are yet to establish a clear precedent on 'Probate for Private Keys', so technical solutions are often more reliable than legal ones currently.",
                date: "2w ago",
                upvotes: 89,
                verified: true,
                lawyerId: "L-103"
            }
        ]
    },
    {
        id: "forum-12",
        title: "Is 'No Refund' policy legal for coaching classes?",
        content: "I joined a famous UPSC coaching center in Delhi and paid ₹1.5 Lakhs. After 2 classes, I realized the quality is poor and the faculty is different from what was advertised. The contract says 'Fees once paid will not be refunded under any circumstances'. Is this contract binding? Can I approach the consumer court?",
        category: "Consumer Rights",
        date: "3w ago",
        author: "Aspiring Scholar",
        upvotes: 310,
        views: 11000,
        replies: [
            {
                id: "rep-12-1",
                author: "Adv. Rajesh Kumar",
                content: "**Educational Services and Refund Rights**\n\nThe Supreme Court and various Consumer Commissions have held that 'Education is not a commodity' and 'No Refund' clauses are often unconscionable and void.\n\n1. **Pro-rata Refund:** If you leave within a reasonable time, the institute is legally bound to refund the fee after deducting a small processing charge. They cannot 'enrich' themselves for services not rendered.\n2. **Misrepresentation:** Since the faculty provided is different from the advertisement, it's a clear case of 'Misleading Advertisement' under the Consumer Protection Act.\n3. **Action:** Send a formal letter citing the *Buddhist Mission v. State of Maharashtra* case where such practices were condemned. If they don't budge, file a case in the District Consumer Forum.",
                date: "2w ago",
                upvotes: 167,
                verified: true,
                lawyerId: "L-101"
            }
        ]
    },
    {
        id: "forum-13",
        title: "GST on Housing Society Maintenance: Myths vs Reality",
        content: "Our RWA is charging 18% GST on maintenance of ₹6,000 per month. Some members say GST is only applicable if maintenance is above ₹7,500. Others say it depends on the total turnover of the society. What is the correct legal position for a society in Mumbai?",
        category: "Tax Law",
        date: "1m ago",
        author: "RWA Member",
        upvotes: 54,
        views: 2100,
        replies: [
            {
                id: "rep-13-1",
                author: "Adv. Sneha Kulkarni",
                content: "**GST Rules for RWAs**\n\nThe GST rules for Housing Societies have been clarified through several circulars:\n\n1. **The ₹7,500 Limit:** GST is applicable only if the monthly maintenance per flat exceeds ₹7,500. If it's ₹7,500 or less, it's EXEMPT.\n2. **Turnover Limit:** Additionally, GST is only applicable if the society's total annual turnover (including interest income, etc.) exceeds ₹20 Lakhs.\n3. **Calculation:** If the maintenance is ₹8,000, GST is calculated on the FULL amount, not just the excess ₹500.\n4. **Your Case:** If your maintenance is ₹6,000, and there are no other major commercial incomes, you should NOT be paying GST. Your RWA needs a better auditor!",
                date: "3w ago",
                upvotes: 45,
                verified: true,
                lawyerId: "L-103"
            }
        ]
    },
    {
        id: "forum-14",
        title: "Can I use my flat for a small home-office (IT)?",
        content: "I live in a residential society in Gurgaon. I want to start a small software consulting firm from my home with 2 employees. The RWA is objectify, stating it's a 'Commercial activity'. Do I need to convert my flat to commercial? Are there any exemptions for IT/Consulting?",
        category: "Property Law",
        date: "1m ago",
        author: "Startup Founder",
        upvotes: 78,
        views: 3500,
        replies: [
            {
                id: "rep-14-1",
                author: "Adv. Rajesh Kumar",
                content: "**Home Offices and Residential Bylaws**\n\nMost state municipal laws (including Haryana) allow 'Professional Activities' in residential premises with certain restrictions.\n\n1. **Professional Exemption:** Activities like Lawyers, Doctors, and IT/Software Consultants are often categorized as 'Professional' rather than 'Commercial'. You are usually allowed to use up to 25% of the area (max 500 sq ft) for this.\n2. **No Nuisance:** The RWA cannot block you if: \n   - You don't have large signboards.\n   - There is no increase in public traffic/noise.\n   - You don't use high-powered industrial machines.\n3. **Employees:** Having 2 employees is generally acceptable, but don't turn it into a walk-in office for clients. Keep the residential character of the building intact.",
                date: "3w ago",
                upvotes: 62,
                verified: true,
                lawyerId: "L-101"
            }
        ]
    },
    {
        id: "forum-15",
        title: "Tenant refusing to vacate after lease expiry",
        content: "My tenant's 11-month lease expired in December. He has stopped paying rent and refuses to leave, saying he has 'no other place to go'. He has also blocked my number. The local police say it's a civil matter and won't help. What is the fastest way to get possession of my own house?",
        category: "Property Law",
        date: "2m ago",
        author: "Old Landlord",
        upvotes: 198,
        views: 8200,
        replies: [
            {
                id: "rep-15-1",
                author: "Adv. Rajesh Kumar",
                content: "**Eviction Process for Holdover Tenants**\n\nUnfortunately, 'Self-help' (cutting electricity/changing locks) is illegal in India and can lead to criminal charges against you. You must follow the 'Due Process of Law'.\n\n1. **Eviction Notice:** Send a formal legal notice for eviction and demand for 'Mesne Profits' (double or triple rent for unauthorized stay).\n2. **Rent Control vs Model Tenancy:** Check if your state has adopted the Model Tenancy Act. If yes, there are 'Rent Tribunals' that resolve these in 60-90 days. If not, you've to file an 'Eviction Suit' in the Civil Court.\n3. **Electricity Bills:** While you cannot cut electricity, you are not bound to PAY it if the tenant isn't. But usually, the fastest way is a 'Negotiated Exit'—sometimes forgiving the pending rent in exchange for an immediate vacating of the property is cheaper than 3 years of legal fees.",
                date: "1m ago",
                upvotes: 142,
                verified: true,
                lawyerId: "L-101"
            },
            {
                id: "rep-15-2",
                author: "PropertyWatcher",
                content: "This is why I always use 11-month Leave & License agreements and never let them stay for the 12th month without a new registered agreement. Hope you get your house back soon!",
                date: "1m ago",
                upvotes: 34,
                verified: false
            }
        ]
    }
];

export const MOCK_LAWYERS: Lawyer[] = [
    {
        id: "L-101",
        name: "Adv. Rajesh Kumar",
        specialty: "Criminal Law",
        image: "/lawyers/rajesh.png",
        rating: 4.9,
        experienceYears: 15,
        status: 'Available',
        verified: true,
        tags: ["Bail Specialist", "High Court"],
        bio: "Adv. Rajesh Kumar is a distinguished criminal defense attorney with over 15 years of experience in the High Court. Known for his strategic approach to complex bail matters and criminal trials, he has a reputation for securing favorable outcomes in high-stakes cases.",
        achievements: [
            "Secured acquittal in high-profile 2022 fraud case.",
            "Published author on 'Modern Criminal Jurisprudence'.",
            "Served as amicus curiae in 3 landmark Supreme Court hearings."
        ],
        casesWon: 320,
        stats: {
            successRate: "92%",
            yearsInPractice: "15+"
        }
    },
    {
        id: "L-102",
        name: "Adv. Priya Sharma",
        specialty: "Family Law",
        image: "/lawyers/priya.png",
        rating: 4.8,
        experienceYears: 12,
        status: 'Busy',
        verified: true,
        tags: ["Divorce", "Custody"],
        bio: "Adv. Priya Sharma specializes in sensitive family law matters, including divorce, child custody, and domestic disputes. She combines legal expertise with a compassionate approach to guide families through difficult legal transitions.",
        achievements: [
            "Best Family Lawyer 2023 - Legal India Awards.",
            "Mediated over 500 successful settlements.",
            "Speaker at National Conference on Women's Rights."
        ],
        casesWon: 450,
        stats: {
            successRate: "95%",
            yearsInPractice: "12"
        }
    },
    {
        id: "L-103",
        name: "Adv. Suresh Menon", // Mapped to Anil (Corporate look)
        specialty: "Corporate Law",
        image: "/lawyers/anil.png",
        rating: 4.7,
        experienceYears: 20,
        status: 'Available',
        verified: true,
        tags: ["Mergers", "Startups"],
        bio: "With two decades of experience, Adv. Suresh Menon acts as a strategic legal advisor to startups and Fortune 500 companies alike. His expertise covers M&A, intellectual property rights, and corporate governance.",
        achievements: [
            "Lead counsel for $50M tech merger.",
            "Advisor to 15+ Y-Combinator startups.",
            "Board member of the Corporate Law Association."
        ],
        casesWon: 180,
        stats: {
            successRate: "98%",
            yearsInPractice: "20+"
        }
    },
    {
        id: "L-104",
        name: "Adv. Anjali Desai",
        specialty: "Property Law",
        image: "/lawyers/anjali.png",
        rating: 4.6,
        experienceYears: 8,
        status: 'Available',
        verified: false,
        tags: ["Real Estate", "Tenant Disputes"],
        bio: "Adv. Anjali Desai is an expert in real estate and property law. She assists clients with property registration, dispute resolution, and tenant-landlord conflicts, ensuring their assets are legally protected.",
        achievements: [
            "Resolved 50+ complex land dispute cases.",
            "Legal consultant for top Real Estate developers.",
            "Featured in 'Law & Property' magazine."
        ],
        casesWon: 120,
        stats: {
            successRate: "89%",
            yearsInPractice: "8"
        }
    },
    {
        id: "L-105",
        name: "Adv. Vikram Singh",
        specialty: "Constitutional Law",
        image: "/lawyers/vikram.png",
        rating: 5.0,
        experienceYears: 22,
        status: 'Busy',
        verified: true,
        tags: ["Supreme Court", "PIL"],
        bio: "A senior advocate at the Supreme Court, Adv. Vikram Singh champions constitutional rights and public interest litigations. His work has influenced policy changes and protected fundamental rights.",
        achievements: [
            "Argued 3 landmark constitutional bench cases.",
            "Recipient of 'Justice for All' Lifetime Award.",
            "Mentor to 100+ young lawyers."
        ],
        casesWon: 85,
        stats: {
            successRate: "96%",
            yearsInPractice: "22"
        }
    },
    {
        id: "L-106",
        name: "Adv. Meera Reddy", // Mapped to Sunita 
        specialty: "Cyber Law",
        image: "/lawyers/sunita.png",
        rating: 4.8,
        experienceYears: 6,
        status: 'Available',
        verified: true,
        tags: ["Data Privacy", "Fraud"],
        bio: "Adv. Meera Reddy stays ahead of the curve in the evolving field of Cyber Law. She specializes in data privacy compliance, cybercrime defense, and digital fraud investigations.",
        achievements: [
            "Certified Information Privacy Professional (CIPP/E).",
            "Consultant for Cyber Cell, Bangalore.",
            "Helped recover ₹5Cr in cyber fraud cases."
        ],
        casesWon: 60,
        stats: {
            successRate: "91%",
            yearsInPractice: "6"
        }
    },
    {
        id: "L-107",
        name: "Adv. Arjun Kapoor", // Mapped to Amit
        specialty: "Criminal Law",
        image: "/lawyers/amit.png",
        rating: 4.5,
        experienceYears: 10,
        status: 'Available',
        verified: true,
        tags: ["Defense", "Trial"],
        bio: "Adv. Arjun Kapoor is a tenacious criminal defense lawyer known for his courtroom presence. He handles a wide range of criminal cases, from white-collar crimes to assault charges.",
        achievements: [
            "Named 'Rising Star' in Criminal Defense 2021.",
            "Pro-bono counsel for under-trial prisoners.",
            "Expertise in forensic evidence cross-examination."
        ],
        casesWon: 200,
        stats: {
            successRate: "88%",
            yearsInPractice: "10"
        }
    },
    {
        id: "L-108",
        name: "Adv. Neha Gupta", // Mapped to Sneha
        specialty: "Human Rights",
        image: "/lawyers/sneha.png",
        rating: 4.9,
        experienceYears: 18,
        status: 'Busy',
        verified: true,
        tags: ["Social Justice", "NGO"],
        bio: "Adv. Neha Gupta has dedicated her career to human rights and social justice. She represents marginalized communities and works closely with NGOs to ensure equal access to justice.",
        achievements: [
            "UN Human Rights Fellow 2018.",
            "Founded 'Nyaya for Her' legal aid clinic.",
            "Successfully litigated against bonded labor practices."
        ],
        casesWon: 150,
        stats: {
            successRate: "94%",
            yearsInPractice: "18"
        }
    }
];

export const MOCK_NEWS: LegalNewsItem[] = [
    {
        id: "bns-decolonization",
        title: "BNS: The Decolonization of Indian Penal Jurisprudence",
        summary: "A deep dive into the Bharatiya Nyaya Sanhita (BNS), detailing the shift from retributive to rehabilitative justice, new definitions of terrorism, and the transition protocol for ongoing cases.",
        content: `
            <div class="article-section">
                <h2>The Paradigm Shift: From IPC to BNS</h2>
                <p>The implementation of the <strong>Bharatiya Nyaya Sanhita (BNS), 2023</strong>, marks a watershed moment in India's legal history. By repealing the 163-year-old Indian Penal Code (IPC), the Indian legislature has attempted to remove the colonial 'soul' of our criminal laws. This is not merely a change in nomenclature; it is a fundamental shift in how the State perceives crime and punishment.</p>

                <h2>1. New Philosophy of Punishment: Community Service</h2>
                <p>One of the most radical introductions is <strong>Community Service</strong> as a recognized form of punishment (Section 4). Previously, Indian law relied heavily on fines or imprisonment. Now, for petty offenses like public intoxication, defamation, or minor theft (under ₹5,000 where restoration is made), the court can mandate community service. This reflects a shift towards <em>rehabilitative justice</em>, acknowledging that jail time for minor errors often creates hardened criminals instead of reformed citizens.</p>

                <h2>2. Redefining Modern Crimes: Terrorism and Organized Crime</h2>
                <p>The BNS formally brings <strong>Terrorism</strong> (Section 113) and <strong>Organized Crime</strong> (Section 111) within the general criminal law, which were previously handled primarily under special statutes like UAPA or MCOCA.
                <ul>
                    <li><strong>Terrorism:</strong> Now includes acts intended to threaten the 'economic security' of India, such as large-scale counterfeiting or cyber-attacks on critical infrastructure.</li>
                    <li><strong>Organized Crime:</strong> Defines 'Syndicates' and 'Kidnapping for Ransom' as specific categories with severe penalties, including death or life imprisonment without parole in certain cases.</li>
                </ul>
                </p>

                <h2>3. Special Provisions for Crimes Against Women & Children</h2>
                <p>The BNS has reorganized chapters to prioritize crimes against women and children. Under Section 69, <strong>sexual intercourse on the false promise of marriage</strong> or through deceitful means (deceitful promise of promotion/employment) is now a specific, non-bailable offense punishable by up to 10 years in prison.</p>

                <blockquote>"The BNS aims to ensure that the primary focus of justice is to protect the rights of the victim and the integrity of the society, rather than just punishing the offender." <cite>— Justice D.Y. Chandrachud (Contextual Analysis)</cite></blockquote>

                <h2>4. Transition Protocol: What happens to old IPC cases?</h2>
                <p>A critical question for litigants is the fate of cases filed before July 1, 2024. Legally, the <strong>General Clauses Act</strong> ensures that crimes committed under the IPC will continue to be tried under the IPC. However, the procedural changes (BNSS) will apply broadly to all ongoing investigations where feasible, streamlining the trial process via mandatory digital evidence collection.</p>
            </div>
        `,
        category: "Criminal Law",
        date: "July 1, 2024",
        image: "/images/bns_news.png",
        readTime: "12 min read"
    },
    {
        id: "dpdp-privacy-frontier",
        title: "DPDP Act: The New Constitutional Frontier of Privacy",
        summary: "Exhaustive analysis of the Digital Personal Data Protection Act, user rights, fiduciary obligations, and the multi-crore penalty structure for cloud service providers.",
        content: `
            <div class="article-section">
                <h2>Privacy as a Fundamental Right: The DPDP Era</h2>
                <p>Following the landmark <em>Puttaswamy</em> judgment, the <strong>Digital Personal Data Protection (DPDP) Act, 2023</strong>, has finally given teeth to the 'Right to Privacy' in the digital realm. It establishes a fiduciary relationship between the 'Data Principal' (you) and the 'Data Fiduciary' (companies like Google, Facebook, or local apps).</p>

                <h2>1. The Four Pillars of Consent</h2>
                <p>Consent is no longer a hidden checkbox in a 50-page Terms of Service. It must be:
                <ul>
                    <li><strong>Free:</strong> Not coerced or tied to unnecessary services.</li>
                    <li><strong>Specific:</strong> Precisely stating what data is collected.</li>
                    <li><strong>Informed:</strong> The user must know exactly who will see the data.</li>
                    <li><strong>Unconditional:</strong> Clear and easy to understand.</li>
                </ul>
                </p>

                <h2>2. Rights of the Data Principal</h2>
                <p>You now possess a 'Digital Bill of Rights':
                <ul>
                    <li><strong>Right to Correction:</strong> You can demand that inaccurate data be fixed immediately.</li>
                    <li><strong>Right to Erasure:</strong> The 'Right to be Forgotten' allows you to request total deletion once the purpose of collection is served.</li>
                    <li><strong>Right to Grievance Redressal:</strong> Every company must provide an easy way to complain before you go to the Data Protection Board.</li>
                </ul>
                </p>

                <h2>3. The Architecture of Penalties</h2>
                <p>Unlike previous laws, the DPDP Act introduces staggering financial consequences. A significant data breach can result in a fine of up to <strong>₹250 Crore per instance</strong>. The law also introduces the concept of 'Significant Data Fiduciaries'—large entities that handle sensitive data at scale—who must appoint an independent Data Auditor and a resident Data Protection Officer (DPO) in India.</p>

                <blockquote>"Data is the new oil, but without a refinery of regulation, it is merely a pollutant to privacy." <cite>— Cyber Law Experts Panel</cite></blockquote>

                <h2>4. Exemptions and Concerns</h2>
                <p>Critics point out that Section 17 provides broad exemptions for government agencies in the interest of 'State Security' and 'Public Order'. Lawyers are closely watching how the courts will balance these exemptions against individual rights in upcoming PILs.</p>
            </div>
        `,
        category: "Technology",
        date: "June 15, 2024",
        image: "/images/privacy_v2.png",
        readTime: "10 min read"
    },
    {
        id: "deepfake-menace-synthetic-reality",
        title: "The Deepfake Menace: Navigating the Synthetic Reality",
        summary: "Understanding the IT Rules (2023) amendments targeting AI-generated content, the concept of 'Safe Harbour' immunity, and legal remedies for victims of non-consensual synthetic media.",
        content: `
            <div class="article-section">
                <h2>The AI Crisis: When Seeing is No Longer Believing</h2>
                <p>As Generative AI matures, <strong>Deepfakes</strong> have transitioned from a technical novelty to a major legal threat. The Ministry of Electronics and Information Technology (MeitY) has issued stern advisories and amendments to the <strong>IT Rules, 2021</strong>, to hold platforms accountable for the unchecked spread of AI-generated misinformation.</p>

                <h2>1. The Loss of Safe Harbour</h2>
                <p>Under Section 79 of the IT Act, platforms (Social Media Intermediaries) enjoy 'Safe Harbour'—meaning they aren't liable for what users post. However, the new rules mandate that if a platform fails to remove a reported Deepfake within <strong>24 hours</strong>, they lose this immunity and can be sued directly alongside the creator of the content.</p>

                <h2>2. Identifying the Originator: The Traceability Clause</h2>
                <p>For messages containing harmful AI content that spreads virally, the government can demand the 'First Originator' of the information. While this creates a tension with end-to-end encryption (E2EE), recent court orders suggest that for serious crimes (morphing, child safety), platforms must find technical workarounds to identify the source.</p>

                <h2>3. Victim Remedies: What to do if you are targeted?</h2>
                <ul>
                    <li><strong>Immediate Reporting:</strong> Use the dedicated portals (national cybercrime reporting portal) and the platform's internal tools.</li>
                    <li><strong>Civil Suit for Defamation:</strong> You can seek an injunction and damages in civil court.</li>
                    <li><strong>Section 66E of IT Act:</strong> Punishes the intentional capturing/publishing of private area images without consent, applicable to morphed deepfakes.</li>
                </ul>

                <p>The future of this law includes mandatory <strong>Watermarking</strong> for any AI-generated content, allowing users to distinguish between reality and synthesis instantly.</p>
            </div>
        `,
        category: "Technology",
        date: "May 20, 2024",
        image: "/images/deepfake_news.png",
        readTime: "8 min read"
    },
    {
        id: "sebi-fpi-transparency",
        title: "SEBI FPI Norms: Transparency in Global Capital",
        summary: "Detailed review of the SEBI circular regarding additional disclosure requirements for high-risk Foreign Portfolio Investors and the drive to identify Ultimate Beneficial Owners (UBO).",
        content: `
            <div class="article-section">
                <h2>Securing the Market: The War on Anonymity</h2>
                <p>The <strong>Securities and Exchange Board of India (SEBI)</strong> has intensified its scrutiny of Foreign Portfolio Investors (FPIs). The new mandate aims to prevent the circumvention of Minimum Public Shareholding (MPS) rules through opaque offshore structures, a concern that came to the forefront during recent high-profile corporate investigations.</p>

                <h2>1. The 50% Asset Threshold</h2>
                <p>The new disclosure norms apply primarily to FPIs that hold more than <strong>50% of their India Equity AUM</strong> within a single corporate group. Such investors are now considered 'high-risk' and must reveal every single entity that has any economic interest, ownership, or control, no matter how remote their jurisdiction.</p>

                <h2>2. The Concept of 'Ultimate Beneficial Owner' (UBO)</h2>
                <p>Previously, entities could hide behind layers of shell companies in Mauritius, Cayman Islands, or Dubai. SEBI's 'Look-Through' approach mandates identifying the natural person at the end of the chain. "Anonymity is no longer a luxury for those managing large sums in Indian markets," SEBI stated in its consultation paper.</p>

                <h2>3. Institutional Impact and FPI Inflows</h2>
                <p>While some analysts feared an exodus of capital, the market has seen the move as a sign of maturity. It provides a level playing field and ensures that 'Promoter' capital isn't being round-tripped as 'Foreign' capital. This aligns India with global standards set by the FATF (Financial Action Task Force).</p>

                <blockquote>"Transparency is the soul of a healthy capital market. These norms are not hurdles, but the foundation of trust for long-term investors." <cite>— SEBI Chairperson</cite></blockquote>
            </div>
        `,
        category: "Finance Law",
        date: "May 10, 2024",
        image: "/images/sebi_news.png",
        readTime: "9 min read"
    },
    {
        id: "electoral-bonds-verdict",
        title: "Democracy's Guardian: The Electoral Bonds Verdict",
        summary: "A comprehensive constitutional analysis of the Supreme Court's ruling on Electoral Bonds, the right to information, and the future of political funding in India.",
        content: `
            <div class="article-section">
                <h2>The Verdict that Shook political funding</h2>
                <p>In the case of <em>Association for Democratic Reforms v. Union of India</em>, a five-judge Constitution Bench of the Supreme Court struck down the <strong>Electoral Bonds Scheme</strong> as unconstitutional. The judgment is a resounding reaffirmation of the principle that transparency is vital for the survival of a representative democracy.</p>

                <h2>1. Right to Information vs. Donor Anonymity</h2>
                <p>The government argued that anonymity protected donors from retribution by political parties. However, the Court held that the <strong>Right to Information (Article 19(1)(a))</strong> regarding the funding of political parties outweighs the concern for donor privacy. Voters have a right to know if a policy decision was influenced by a large corporate donation.</p>

                <h2>2. The Quid Pro Quo Concern</h2>
                <p>The Court observed that the scheme allowed for a potential 'quid pro quo' (this for that) relationship between corporations and the ruling government. Since 94% of bonds were donated in the ₹1 Crore denomination, it was clear that the scheme was being used by large entities rather than small, individual citizens.</p>

                <h2>3. Directive to SBI and Election Commission</h2>
                <p>The landmark directives issued were:
                <ul>
                    <li>Stop issuing new bonds immediately.</li>
                    <li>SBI must disclose all details (buyer name, amount, date) to the Election Commission.</li>
                    <li>ECI must publish these details on their website for public scrutiny.</li>
                </ul>
                </p>

                <p>This ruling sets the stage for a new debate on <strong>State Funding of Elections</strong> or a more transparent 'National Election Fund' to ensure money doesn't drown out the voice of the common man.</p>
            </div>
        `,
        category: "Constitutional Law",
        date: "April 25, 2024",
        image: "/images/election_news.png",
        readTime: "15 min read"
    },
    {
        id: "yamuna-floodplain-mandate",
        title: "Ecological Integrity: The Yamuna Floodplain Mandate",
        summary: "Analyzing the NGT's reinforcement of the construction ban on the Yamuna banks, the concept of 'Environmental Compensation,' and the roadmap for river restoration.",
        content: `
            <div class="article-section">
                <h2>The River is Breathing: NGT's Stern Warning</h2>
                <p>The <strong>National Green Tribunal (NGT)</strong> has issued one of its most expansive orders yet regarding the conservation of the Yamuna River. Recognizing that the river's floodplains are its 'lungs,' the Tribunal has prohibited any and all construction—permanent or temporary—within the demarcated active floodplain zone.</p>

                <h2>1. The Science of the Floodplain</h2>
                <p>When we build on floodplains, we destroy the river's natural ability to recharge groundwater and absorb excess monsoonal flow. The 2023 Delhi floods proved that the river will eventually reclaim its space. "Concrete is the enemy of the river's rhythm," the NGT bench noted while reviewing satellite imagery of illegal colonies.</p>

                <h2>2. The 'Polluter Pays' Principle</h2>
                <p>The NGT has ordered several commercial projects and banquet halls on the banks to pay <strong>Environmental Compensation (EC)</strong> amounting to crores. This money is ring-fenced for the 'Yamuna Rejuvenation Fund,' to be spent on planting native 'Ghat' vegetation and creating biodiversity parks like the *Asita East* project.</p>

                <h2>3. The Responsibility of DDA and MCD</h2>
                <p>The order places the onus directly on the Delhi Development Authority (DDA) and Municipal Corporation of Delhi (MCD). Any official failing to prevent encroachment will now face personal liability and disciplinary action. The court has also called for a real-time 'Drone Surveillance' system to monitor the 22-km stretch of the river in Delhi.</p>

                <blockquote>"Nature does not recognize titles or deeds. If we do not respect the river's path, the river will make its own path through our living rooms." <cite>— Environmental Law Bulletin</cite></blockquote>
            </div>
        `,
        category: "Environmental Law",
        date: "April 15, 2024",
        image: "/images/yamuna_news.png",
        readTime: "7 min read"
    },
    {
        id: "ucc-common-civil-identity",
        title: "UCC: The Quest for a Common Civil Identity",
        summary: "Tracing the legal evolution of the Uniform Civil Code, from Article 44 of the Constitution to the Uttarakhand UCC Bill, including its provisions on live-in relationships and inheritance.",
        content: `
            <div class="article-section">
                <h2>Article 44: From Directive to Reality</h2>
                <p>The debate over a <strong>Uniform Civil Code (UCC)</strong> has moved from intellectual seminars to legislative drafting. With Uttarakhand becoming the first state to pass a comprehensive UCC Bill, India is at a crossroads regarding its diverse personal laws. The UCC aims to standardize laws for marriage, divorce, succession, and adoption, which currently vary by religion.</p>

                <h2>1. Key Inclusions in the New Draft</h2>
                <ul>
                    <li><strong>Prohibition of Bigamy:</strong> Regardless of religious customs, a second marriage while the first is subsisting is now illegal.</li>
                    <li><strong>Standardized Marriage Age:</strong> Uniform ages (18 for women, 21 for men) across all communities.</li>
                    <li><strong>Equal Inheritance:</strong> Daughters are guaranteed equal shares in ancestral property, a major step for gender equality.</li>
                </ul>

                <h2>2. The 'Live-In Relationship' Controversy</h2>
                <p>A unique and controversial feature of the proposed code is the <strong>Mandatory Registration of Live-in Relationships</strong>. Failure to register within a month can result in imprisonment or fines. While the government cites 'safety of women' and 'legitimacy of children' as reasons, civil liberties groups argue this violates the 'Right to Liberty' and 'Privacy' under Article 21.</p>

                <h2>3. The Tribal Exemption</h2>
                <p>A critical legal boundary in the UCC is the exemption of <strong>Scheduled Tribes</strong>. Recognizing the unique customary protections afforded by the Sixth Schedule and Article 371 of the Constitution, the code does not apply to tribal populations to preserve their cultural autonomy.</p>

                <p>The Supreme Court has repeatedly observed (in *Shah Bano* and *Sarla Mudgal* cases) that a UCC is necessary for national integration, but the challenge remains in formulating a draft that respects India's pluralistic fabric.</p>
            </div>
        `,
        category: "Constitutional Law",
        date: "March 10, 2024",
        image: "/images/ucc_news.png",
        readTime: "12 min read"
    },
    {
        id: "right-to-repair-planned-obsolescence",
        title: "Right to Repair: Ending Planned Obsolescence",
        summary: "A deep dive into the new Consumer Rights framework that forces tech giants to share schematics, parts, and tools with independent repair shops and users.",
        content: `
            <div class="article-section">
                <h2>The Death of 'Disposable Culture'</h2>
                <p>For decades, electronic manufacturers have used 'Planned Obsolescence'—designing products to fail so you buy new ones. The <strong>Right to Repair</strong> movement, recently formalized by the Ministry of Consumer Affairs, is a legal strike against this monopoly. It empowers you to fix your own devices or take them to a local technician without voiding warranties or facing 'software locks'.</p>

                <h2>1. The Four Targeted Sectors</h2>
                <p>The framework initially focuses on:
                <ul>
                    <li><strong>Consumer Durables:</strong> ACs, Fridges, Washing Machines.</li>
                    <li><strong>Mobile/Laptops:</strong> Forcing disclosure of battery and screen schematics.</li>
                    <li><strong>Automobiles:</strong> Access to ECU (Engine Control Unit) data for independent mechanics.</li>
                    <li><strong>Farming Equipment:</strong> Ensuring farmers can fix their tractors during critical harvest seasons.</li>
                </ul>
                </p>

                <h2>2. The 'Software Lock' Challenge</h2>
                <p>Manufacturers often use proprietary software to 'pair' components. If you replace a screen, the phone might disable FaceID. The new guidelines aim to ban these restrictive practices, requiring manufacturers to provide the same diagnostic software to third-party shops that they use in authorized centers.</p>

                <h2>3. Environmental and Economic Impact</h2>
                <p>By extending the life of a single smartphone from 2 years to 4, we reduce its environmental footprint by 40%. Economically, this supports millions of small independent repair businesses across 'Mobile Markets' in India, shifting the power from global OEMs to local talent.</p>

                <blockquote>"Your property rights don't end at the software layer. If you bought it, you should be able to fix it." <cite>— Consumer Rights Portal</cite></blockquote>
            </div>
        `,
        category: "Consumer Rights",
        date: "February 28, 2024",
        image: "/images/repair_news.png",
        readTime: "6 min read"
    },
    {
        id: "right-to-disconnect-mental-health",
        title: "Right to Disconnect: Protecting the Mental Frontier",
        summary: "Analyzing the landmark private member's bill targeting 'Work-from-Home' burnout, employee mental health, and the legal definition of 'Negotiated Personal Time'.",
        content: `
            <div class="article-section">
                <h2>The 24/7 Trap: Why Disconnecting is a Legal Necessity</h2>
                <p>In a world of WhatsApp groups and 'Always-On' notifications, the boundary between the boardroom and the bedroom has vanished. The <strong>Right to Disconnect Bill</strong>, recently discussed in Parliament, aims to establish a legal 'firewall' for employees. Inspired by similar laws in France and Australia, it argues that rest is not just a perk, but a fundamental labor right.</p>

                <h2>1. The Rights of the Modern Worker</h2>
                <p>The bill proposes that an employee has the right to:
                <ul>
                    <li>Refuse to answer calls or emails after 7:00 PM (or their standard shift end).</li>
                    <li>Be free from disciplinary action or 'bad appraisals' for prioritizing personal time.</li>
                    <li>Have an 11-hour 'uninterrupted rest period' between workdays.</li>
                </ul>
                </p>

                <h2>2. Employer Obligations</h2>
                <p>If passed, companies with more than 10 employees would need to draft 'Charter of Digital Wellness'. This isn't a one-size-fits-all law; it allows for <strong>Negotiated Charters</strong> where the nature of the industry (like emergency services or global IT support) is taken into account while still providing compensation or extra time off for after-hours work.</p>

                <h2>3. The Productivity Paradox</h2>
                <p>Industry bodies like NASSCOM have expressed concerns about global competitiveness. However, mental health experts cite that 43% of Indian employees suffer from burnout. "A tired brain is an error-prone brain," says the bill's preamble. The legal goal is to transition from a culture of 'Visibility' to a culture of 'Output'.</p>

                <p>This law is a critical step towards <strong>Substantive Equality</strong> in the workplace, ensuring that caregivers (primarily women) aren't penalized for the unavoidable demands of their domestic lives.</p>
            </div>
        `,
        category: "Labor Law",
        date: "February 15, 2024",
        image: "/images/disconnect_news.png",
        readTime: "5 min read"
    },
    {
        id: "ev-revolution-liability",
        title: "The EV Revolution: Liability and Infrastructure",
        summary: "A critical look at the legal hurdles in the Electric Vehicle transition, focusing on battery safety standards, charging point easements, and AI driver liability.",
        content: `
            <div class="article-section">
                <h2>Charging into the Future: The Legal Backbone of EVs</h2>
                <p>India's push for <strong>Electric Vehicles (EVs)</strong> under the FAME-II scheme and the vision for 2030 is currently meeting its most significant challenge: a legal vacuum regarding liability and infrastructure. As we move away from ICE engines, our tort laws must evolve to handle the unique complexities of battery-operated transit.</p>

                <h2>1. Battery Safety and Quality Control Standards</h2>
                <p>Following recent incidents of spontaneous combustion in e-scooters, the Bureau of Indian Standards (BIS) and the Ministry of Road Transport and Highways (MoRTH) have introduced <strong>AIS-156</strong>. These are stringent 'thermal propagation' tests. Legally, the <strong>Product Liability</strong> under the Consumer Protection Act, 2019, now extends to software glitches and thermal runaway events, making manufacturers liable even if the fire occurred due to subtle cell-level imbalances.</p>

                <h2>2. The 'Charging Right': Easements and Urban Planning</h2>
                <p>A major legal bottleneck is the installation of charging points in high-rise apartments. Section 16 of the model building bye-laws is being amended to mandate that 'Charging is a Right'. Resident Welfare Associations (RWAs) can no longer arbitrarily block a resident from installing a home charger, provided safety standards are met. This is a new form of <strong>Legal Easement</strong> for the digital age.</p>

                <h2>3. Autonomous Driving: Who is at fault?</h2>
                <p>As Level 2 ADAS (Advanced Driver Assistance Systems) becomes common, the question of <em>re ipsa loquitur</em> (the thing speaks for itself) changes. If an EV on autopilot hits a pedestrian, is the driver, the software developer, or the sensor manufacturer liable? Current Indian motor vehicle laws don't recognize 'AI' as a driver. There is an urgent need for an <strong>Algorithm Liability Framework</strong> to protect both owners and manufacturers.</p>

                <blockquote>"The car of the future is a smartphone on wheels. We need laws that understand software as much as they understand steel." <cite>— Automotive Legal Forum</cite></blockquote>
            </div>
        `,
        category: "Technology",
        date: "January 20, 2024",
        image: "/images/ev_news_gen.png",
        readTime: "8 min read"
    },
    {
        id: "agriculture-modernization-digital-land",
        title: "Agriculture Modernization: Digital Land and AI Crops",
        summary: "Analyzing the impact of the Digital India Land Records Modernization Programme (DILRMP) and the legal framework for AI-driven precision farming.",
        content: `
            <div class="article-section">
                <h2>The Digital Field: Modernizing the Heart of India</h2>
                <p>Agriculture remains the primary livelihood for 58% of India's population. The <strong>Agriculture Modernization Initiative</strong> is a massive legal and technical effort to solve the biggest hurdle in rural growth: fragmented and disputed land records.</p>

                <h2>1. Digital Land Records: Ending Decades of Litigation</h2>
                <p>The <strong>DILRMP</strong> is creating <strong>ULPIN</strong> (Unique Land Parcel Identification Number), essentially an 'Aadhaar for Land'. By digitizing <em>khasras</em> and <em>registry</em> documents and linking them with Aadhaar, the government aims to reduce 'title disputes' which currently clog 60% of our lower courts. The legal transition from 'Presumptive Title' to 'Conclusive Title' (where the state guarantees the ownership) is the ultimate goal.</p>

                <h2>2. Precision Farming and Data Sovereignty</h2>
                <p>AI-driven crop advisory services rely on massive soil and weather data. The legal question is: <strong>Who owns the farmer's data?</strong> The newly introduced <em>Agristack</em> framework must balance corporate access to data for innovation against the farmer's right to digital privacy. We are seeing the emergence of 'Data Cooperatives' as a legal vehicle for groups of farmers to collectively negotiate with tech giants.</p>

                <h2>3. The Drone Revolution (Kisan Drones)</h2>
                <p>The <strong>Drone Rules, 2021</strong> have been specifically simplified for agriculture. Farmers can now use drones for pesticide spraying and crop monitoring without a remote pilot certificate for micro-drones. However, the legal liability for 'drift' (where chemicals fly onto a neighbor's organic field) is a new area of <strong>Agro-Tort Law</strong> currently being debated in agrarian tribunals.</p>
            </div>
        `,
        category: "Agriculture Law",
        date: "January 15, 2024",
        image: "/images/agri_news_gen.png",
        readTime: "10 min read"
    },
    {
        id: "smart-cities-urban-governance",
        title: "Smart Cities: Urban Governance and Surveillance",
        summary: "Reviewing the Smart Cities Mission and the legal implications of Integrated Command and Control Centres (ICCC) on citizen privacy and urban policy.",
        content: `
            <div class="article-section">
                <h2>The Algorithmic City: Governance at the Speed of Light</h2>
                <p>The <strong>Smart Cities Mission</strong> is not just about Wi-Fi in parks; it's about the <strong>ICCC (Integrated Command and Control Centre)</strong>—the 'brain' of the city. While this improves traffic flow and waste management, it creates unprecedented legal challenges regarding the 'Right to the City'.</p>

                <h2>1. Surveillance vs. Safety: The CCTV Mandate</h2>
                <p>Smart cities rely on pervasive AI-linked cameras. The legal concern is <strong>Facial Recognition Technology (FRT)</strong>. Without a specific FRT regulation, the use of these systems for policing falls into a gray area. Court rulings like *Puttaswamy* necessitate that state surveillance must be 'Proportional' and 'Necessary'.</p>

                <h2>2. Algorithmic Governance: Can an AI set Policy?</h2>
                <p>When an AI algorithm decides the routing of buses or the allocation of water resources based on 'efficiency' metrics, it might unintentionally discriminate against lower-income neighborhoods. The legal field of <strong>Urban Administrative Law</strong> is now focusing on 'Algorithmic Audits' to ensure that public service delivery remains equitable and non-discriminatory.</p>

                <h2>3. Sustainable Urbanism: The Green Building Code</h2>
                <p>Transitioning to Smart Cities involves a mandatory shift to the <strong>Energy Conservation Building Code (ECBC)</strong>. New commercial developments must now prove net-zero compliance to get their Occupation Certificate (OC). Failure to do so leads to heavy 'Carbon Fines', creating a new market for 'Environmental Law' specialists who handle green-permitting.</p>
            </div>
        `,
        category: "Constitutional Law",
        date: "January 05, 2024",
        image: "/images/smart_city_gen.png",
        readTime: "9 min read"
    },
    {
        id: "space-law-commercial-frontier",
        title: "Space Law: India's New Commercial Frontier",
        summary: "Deep dive into the Indian Space Policy (2023) and the IN-SPACe framework, detailing the transition from ISRO's monopoly to a vibrant private space ecosystem.",
        content: `
            <div class="article-section">
                <h2>To the Stars: Privatizing the Heavens</h2>
                <p>The <strong>Indian Space Policy, 2023</strong> has broken the 50-year-old monopoly of ISRO. India is now open for 'Space Business'. Private companies (Non-Governmental Entities or NGEs) can now own satellites, build rockets, and even carry out sub-orbital space tourism.</p>

                <h2>1. The Role of IN-SPACe</h2>
                <p>The <strong>Indian National Space Promotion and Authorization Centre (IN-SPACe)</strong> acts as the single-window regulator for all private space activity. Legally, the policy clarifies that the Government of India remains liable for any damage caused in space or on Earth by a private Indian rocket, as per the UN Liability Convention. This means the state must now implement a mandatory <strong>Space Insurance Framework</strong> for private players.</p>

                <h2>2. Orbital Debris and 'Space Sustainability'</h2>
                <p>With thousands of small satellites (Starlink-like constellations) planned, 'Space Junk' is a major legal risk. India's new norms require all satellite operators to have a 'De-orbiting Plan'. The concept of <strong>Sustainable Space Operations</strong> is being codified to ensure that our orbits don't become an unusable graveyard for future generations.</p>

                <h2>3. Space Resources and Deep-Space Mining</h2>
                <p>While the UN Outer Space Treaty says 'No nation can claim sovereignty over the Moon,' the legal debate is shifting towards <strong>Resource Extraction</strong>. US and Luxembourg have laws allowing companies to own minerals they mine from asteroids. India is currently drafting its stance on this, balancing international 'Common Heritage of Mankind' principles with the economic interests of its 'New Space' startups.</p>

                <blockquote>"Space is no longer a strategic hobby of the state; it is a multi-billion dollar commercial ecosystem." <cite>— Space Policy Review</cite></blockquote>
            </div>
        `,
        category: "Technology",
        date: "December 28, 2023",
        image: "/images/space_news_gen.png",
        readTime: "11 min read"
    },
    {
        id: "healthtech-telemedicine-evolution",
        title: "HealthTech: The Legal Pulse of Telemedicine",
        summary: "Examining the Telemedicine Practice Guidelines and the ABDM framework, focusing on doctor-patient confidentiality and AI diagnostics liability.",
        content: `
            <div class="article-section">
                <h2>Healing at a Distance: The Telemedicine Evolution</h2>
                <p>The COVID-19 pandemic accelerated the adoption of <strong>Telemedicine</strong> by a decade. The Ministry of Health thereafter released the <strong>Telemedicine Practice Guidelines</strong>, providing a much-needed legal structure to remote consultations.</p>

                <h2>1. Professional Liability and Distance</h2>
                <p>If a doctor in Mumbai misdiagnoses a patient in a village via Zoom, which court has jurisdiction? The guidelines clarify that the <strong>Standard of Care</strong> expected in telemedicine is identical to an in-person visit. If a physical examination is necessary for a diagnosis, the doctor <em>must</em> refer the patient to a local clinic; failing to do so is considered medical negligence.</p>

                <h2>2. The Ayushman Bharat Digital Mission (ABDM)</h2>
                <p>ABDM is creating a <strong>Unified Health Interface (UHI)</strong>. Legally, the 'Health ID' (ABHA) is the key to your historical medical records. The <strong>Data Consent Manager</strong> framework ensures that a doctor can only see your reports for a limited time (say 24 hours) and only after you provide an OTP. This is the gold standard of data privacy in health law.</p>

                <h2>3. AI Diagnostics: The 'Black Box' Problem</h2>
                <p>Many HealthTech startups use AI to read X-rays or ECGs. If the AI misses a tumor, is the company or the signing doctor liable? The legal consensus is that AI is an 'Assistant'. The <strong>Final Responsibility</strong> always lies with the human practitioner. However, we are seeing the rise of 'AI Malpractice Insurance' specifically designed for developers of high-risk medical algorithms.</p>
            </div>
        `,
        category: "Technology",
        date: "December 15, 2023",
        image: "/images/health_news_gen.png",
        readTime: "7 min read"
    },
    {
        id: "blue-economy-marine-jurisprudence",
        title: "The Blue Economy: Laws for a Sustainable Ocean",
        summary: "Analyzing the Marine Spatial Planning (MSP) framework and the legal fight against 'Ghost Fishing' and seabed pollution in Indian territorial waters.",
        content: `
            <div class="article-section">
                <h2>Protecting the Deep Blue: Marine Jurisprudence</h2>
                <p>India has a coastline of over 7,500 km. The <strong>Blue Economy</strong> policy aims to contribute 10% to India's GDP, but not at the cost of marine life. The <strong>Marine Spatial Planning (MSP)</strong> framework is the ocean equivalent of urban zoning.</p>

                <h2>1. Zoning the Sea: MSP Implementation</h2>
                <p>MSP identifies areas for 'Conservation', 'Tourism', 'Shipping', and 'Offshore Wind Energy'. Legally, this prevents the 'Tragedy of the Commons' where over-fishing in one zone destroys the nursery for other species. The <strong>Coast Guard</strong> is now empowered to arrest 'Intrusive Trawlers' using real-time satellite AIS mapping.</p>

                <h2>2. Ghost Fishing and Plastic Treaties</h2>
                <p>Thousands of tons of 'Ghost Nets' (abandoned fishing gear) kill millions of sea creatures. New draft regulations propose a <strong>Deposit-Refund System</strong> for fishing nets, where nets are micro-chipped and linked to the owner's license. This is a pioneering move in <strong>Marine Tort Liability</strong>.</p>

                <h2>3. Deep Sea Mining and the 'Samudrayaan'</h2>
                <p>As India prepares to explore 'Polymetallic Nodules' (rich in Cobalt/Nickel) at 6,000 meters depth, the legal battle is at the <strong>International Seabed Authority (ISA)</strong>. India is pushing for a 'Benefit-Sharing' model that ensures the fruits of the deep sea are distributed to developing nations, not just those with the best technology.</p>
            </div>
        `,
        category: "Environmental Law",
        date: "December 05, 2023",
        image: "/images/ocean_news_gen.png",
        readTime: "9 min read"
    },
    {
        id: "education-nep-2020-impact",
        title: "Education 2.0: The Legal Impact of NEP 2020",
        summary: "Tracing the legislative shifts required to implement the National Education Policy, including the 4-year degree transition and international campus regulations.",
        content: `
            <div class="article-section">
                <h2>Redesigning Knowledge: The NEP Legal Roadmap</h2>
                <p>The <strong>National Education Policy (NEP) 2020</strong> is the most ambitious reform in Indian education history. However, its implementation requires repealing and amending hundreds of state and central laws, including the UGC Act and the AICTE Act.</p>

                <h2>1. The 'Single Regulator': HECI</h2>
                <p>NEP proposes the <strong>Higher Education Commission of India (HECI)</strong> as a single overarching body, replacing the fragmented regulatory landscape. This simplifies the <strong>Accreditation Process</strong> but creates a debate over the autonomy of elite institutions versus the need for standardized quality across rural colleges.</p>

                <h2>2. Internationalization: Foreign Universities on Indian Soil</h2>
                <p>The <strong>UGC (Setting up and Operation of Campuses of Foreign Higher Educational Institutions in India) Regulations, 2023</strong> have opened the doors for Ivy League and Top-100 universities. Legally, these 'Foreign Campuses' will have full autonomy regarding fees, admission, and curriculum, provided they don't lower their global standards. This is a major shift in the 'Non-Profit' character of Indian education law.</p>

                <h2>3. Academic Bank of Credits (ABC)</h2>
                <p>NEP introduces the 'Multiple Entry-Exit' system. A student can leave after 1 year with a certificate and return years later to finish a degree. The <strong>National Academic Depository (NAD)</strong> is the legal 'Bank' for these credits. This requires a fundamental rewrite of 'Graduation Requirements' in every university statute to ensure credit portability is legally binding.</p>
            </div>
        `,
        category: "Constitutional Law",
        date: "November 20, 2023",
        image: "/images/update_education.png",
        readTime: "8 min read"
    },
    {
        id: "cyber-security-critical-infrastructure",
        title: "Cyber Security: The Critical Infrastructure Act",
        summary: "Analyzing the new mandates for 'Protected Systems' and the reporting requirements under CERT-In, focusing on the legal vulnerability of banking and power grids.",
        content: `
            <div class="article-section">
                <h2>Hardening the Shield: Securing Digital Sovereignty</h2>
                <p>Cyber-attacks on the AIIMS server and the Kudankulam power plant have highlighted that the <strong>IT Act, 2000</strong> is no longer sufficient. The proposed <strong>Cyber Security Infrastructure Act</strong> aims to treat 'Digital Systems' with the same legal priority as 'Physical Borders'.</p>

                <h2>1. 'Protected Systems' and the NCIIPC</h2>
                <p>Systems critical to the nation (Banking, Power, Telecom) are now designated as <strong>Protected Systems</strong>. Unauthorized access to these systems can lead to up to 10 years of rigorous imprisonment. The <strong>National Critical Information Infrastructure Protection Centre (NCIIPC)</strong> has strict legal authority to conduct mandatory 'Vulnerability Audits' on any entity, including private banks.</p>

                <h2>2. The 6-Hour Breach Reporting Mandate</h2>
                <p>Under new CERT-In guidelines, all organizations must report a cyber-security incident within <strong>6 hours</strong> of detection. Failure to do so results in heavy fines. This transparency is legally required to prevent 'Lateral Movement' of attackers across the national network, essentially treating a cyber-breach as a public health emergency of the digital state.</p>
                
                <h2>3. Supply Chain Security: Banning 'Untrusted' Hardware</h2>
                <p>The law now mandates a 'Clean Network' policy. Telcos and Government agencies can only buy equipment from 'Trusted Sources' approved by the National Security Council. This is <strong>Geo-Legal Strategy</strong> at play, ensuring that our critical hardware doesn't have 'Backdoors' belonging to hostile foreign entities.</p>

                <blockquote>"In the 21st century, the first shot in a war is fired by a keyboard, not a cannon." <cite>— Cyber Defense Journal</cite></blockquote>
            </div>
        `,
        category: "Technology",
        date: "November 10, 2023",
        image: "/images/privacy_news.png",
        readTime: "12 min read"
    }
];
