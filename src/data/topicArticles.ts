export interface TopicArticle {
    id: string;
    title: string;
    summary: string;
    content: string;
    image: string;
    readTime: string;
    keyPoints: string[];
}

export const TOPIC_GUIDES: Record<string, TopicArticle> = {
    "Criminal Law": {
        id: "criminal-law",
        title: "The BNS Era: A New Dawn for Indian Criminal Jurisprudence",
        summary: "Deconstructing the Bharatiya Nyaya Sanhita (BNS) and the fundamental shift from colonial retribution to rehabilitative justice for Indian citizens.",
        image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80",
        readTime: "18 min read",
        keyPoints: ["Rehabilitative Justice", "Community Service", "Zero FIR", "Digital Evidence Protocol"],
        content: `
            <div class="article-section">
                <h2>1. The Philosophical Shift</h2>
                <p>The replacement of the IPC with the <strong>Bharatiya Nyaya Sanhita (BNS), 2023</strong>, represents a conscious effort to decolonize Indian criminal law. The most striking change is the introduction of <strong>Community Service</strong> (Section 4) as a formal punishment for petty offenses, signaling a shift towards reformation over mere incarceration.</p>
                
                <h2>2. Modern Crimes: Terrorism and Organized Crime</h2>
                <p>The BNS formalizes the definition of 'Terrorism' (Section 113) and 'Organized Crime' (Section 111) within a general penal statute, removing the reliance on special laws for many prosecutions. It also introduces strict penalties for <em>'Mob Lynching'</em> and offenses against the sovereignty of India.</p>

                <h2>3. Procedural Rights under BNSS</h2>
                <p>Complementing the BNS is the <strong>Bharatiya Nagarik Suraksha Sanhita (BNSS)</strong>, which mandates the videography of searches and seizures. This is a massive win for transparency, ensuring that digital trails are preserved from the moment of arrest.</p>
                
                <blockquote>
                    "The soul of the new criminal laws lies in the protection of the innocent and the swift rehabilitation of the misdirected."
                </blockquote>
            </div>
        `
    },
    "Constitutional": {
        id: "constitutional",
        title: "The Living Constitution: Rights, Federalism, and the Basic Structure",
        summary: "An exploration of India's foundational legal document, focusing on recent Supreme Court interpretations and the evolving nature of fundamental rights.",
        image: "https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&q=80",
        readTime: "20 min read",
        keyPoints: ["Basic Structure Doctrine", "Right to Privacy", "Federalism", "Judicial Review"],
        content: `
            <div class="article-section">
                <h2>1. The Supremacy of the Constitution</h2>
                <p>The Constitution of India is not a static scroll but a <strong>'Living Document'</strong>. Through the <em>Kesavananda Bharati</em> judgment, the Supreme Court established that the Parliament cannot alter the 'Basic Structure' of the Constitution, ensuring that the secular, democratic, and republican nature of India remains inviolate.</p>

                <h2>2. The Expanding Horizon of Article 21</h2>
                <p>Article 21 (Protection of Life and Liberty) has been interpreted as a fountainhead of rights. From the <strong>Right to Privacy</strong> (Puttaswamy) to the <strong>Right to a Clean Environment</strong> and the <strong>Right to Dignity</strong>, the judiciary has consistently expanded the safety net for citizens.</p>

                <h2>3. Cooperative Federalism</h2>
                <p>Constitutional law in India also governs the delicate balance between the Union and the States. Recent disputes over GST and administrative control in Delhi highlight the importance of <strong>Cooperative Federalism</strong> in a diverse nation.</p>
            </div>
        `
    },
    "Technology": {
        id: "technology",
        title: "Cyber Frontiers: Navigating the Digital Sovereignty of India",
        summary: "Analyzing the intersection of the IT Act, the new DPDP Act, and the legal challenges of AI and data privacy.",
        image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80",
        readTime: "15 min read",
        keyPoints: ["Data Privacy (DPDP)", "IT Rules 2021", "AI Regulation", "Cyber Insurance"],
        content: `
            <div class="article-section">
                <h2>1. The DPDP Act: India's GDPR</h2>
                <p>The <strong>Digital Personal Data Protection (DPDP) Act, 2023</strong>, marks a watershed moment for digital rights. It mandates explicit consent, provides the 'Right to Erasure', and imposes multi-crore penalties on data fiduciaries for breaches.</p>

                <h2>2. Intermediary Liability</h2>
                <p>Social media giants are governed by the IT Rules, which require them to appoint 'Grievance Officers' and remove harmful content within 72 hours. The debate between <em>Safe Harbor</em> protection and account accountability continues to evolve.</p>

                <h2>3. The Challenge of AI</h2>
                <p>As AI permeates Indian industries, new questions about copyright, deepfakes, and automated bias are surfacing. Current laws like the IT Act are being stretched to cover these 'Frontier Technologies'.</p>
            </div>
        `
    },
    "Corporate": {
        id: "corporate",
        title: "Corporate Governance: Building Ethical Empires in India",
        summary: "A guide for entrepreneurs and directors on the Companies Act, 2013, IBC, and SEBI regulations.",
        image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80",
        readTime: "16 min read",
        keyPoints: ["Companies Act 2013", "Insolvency Code (IBC)", "ESG Compliance", "Director's Liability"],
        content: `
            <div class="article-section">
                <h2>1. The Companies Act, 2013</h2>
                <p>This Act transformed corporate law by introducing mandatory <strong>Corporate Social Responsibility (CSR)</strong> and strengthening the role of Independent Directors. The focus is now on 'Stakeholder Interests' rather than just 'Shareholder Wealth'.</p>

                <h2>2. Insolvency and Bankruptcy Code (IBC)</h2>
                <p>The IBC has revolutionized debt recovery in India, shifting the balance of power from the 'Debtor' to the 'Creditor'. It provides a time-bound resolution process, clearing the Indian banking system of non-performing assets (NPAs).</p>

                <h2>3. ESG: The New Benchmark</h2>
                <p>Environmental, Social, and Governance (ESG) norms are no longer optional. SEBI's <strong>BRSR (Business Responsibility and Sustainability Reporting)</strong> mandates large listed companies to disclose their environmental footprint and social impact.</p>
            </div>
        `
    },
    "Environment": {
        id: "environment",
        title: "Green Jurisprudence: The Legal Fight for a Sustainable Future",
        summary: "Understanding Environmental Impact Assessments, the National Green Tribunal, and India's Net-Zero commitments.",
        image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80",
        readTime: "14 min read",
        keyPoints: ["NGT Powers", "Polluter Pays Principle", "EIA 2020", "Forest Rights"],
        content: `
            <div class="article-section">
                <h2>1. The National Green Tribunal (NGT)</h2>
                <p>The NGT acts as a specialized 'Green Court' with the power to order compensation for environmental damage. It follows the <strong>'Precautionary Principle'</strong> and the <strong>'Polluter Pays Principle'</strong> to ensure industrial growth doesn't come at the cost of ecology.</p>

                <h2>2. Environmental Impact Assessment (EIA)</h2>
                <p>Any large-scale project in India must undergo an EIA to evaluate its potential damage to the environment. The public hearing process ensures that local communities have a voice in the decision-making process.</p>

                <h2>3. Climate Change Litigation</h2>
                <p>As India strives for Net-Zero by 2070, the judiciary is increasingly using the <strong>Public Trust Doctrine</strong> to protect natural resources from exploitation.</p>
            </div>
        `
    },
    "Politics": {
        id: "politics",
        title: "Electoral Laws & Political Accountability in India",
        summary: "Deconstructing the Representation of the People Act, anti-defection laws, and the conduct of the world's largest democracy.",
        image: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?auto=format&fit=crop&q=80",
        readTime: "15 min read",
        keyPoints: ["RPA 1951", "Anti-Defection Law", "MCC Guidelines", "Electoral Bonds Debate"],
        content: `
            <div class="article-section">
                <h2>1. Representation of the People Act (RPA)</h2>
                <p>The RPA, 1951, is the backbone of Indian elections. It governs the qualification of candidates, the registration of political parties, and the adjudication of corrupt practices during polls.</p>

                <h2>2. The Tenth Schedule (Anti-Defection)</h2>
                <p>To prevent political instability, the anti-defection law disqualifies legislators who 'jump ship' or defy party whips. However, the 'Merger' exception remains a subject of intense judicial scrutiny.</p>

                <h2>3. The Model Code of Conduct (MCC)</h2>
                <p>The Election Commission's MCC ensures a level playing field during campaigning. While it doesn't have statutory backing, the Supreme Court has empowered the EC to take strict action against violations.</p>
            </div>
        `
    },
    "Consumer Rights": {
        id: "consumer-rights",
        title: "The Sovereign Consumer: Rights in the Age of Dark Patterns",
        summary: "Navigating the Consumer Protection Act 2019 and your rights against misleading ads and e-commerce fraud.",
        image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80",
        readTime: "12 min read",
        keyPoints: ["CCPA Authority", "Product Liability", "e-Daakhil Portal", "Unfair Trade Practices"],
        content: `
            <div class="article-section">
                <h2>1. The Central Consumer Protection Authority (CCPA)</h2>
                <p>The CCPA acts as a powerful regulator that can recall dangerous goods and impose heavy penalties for <strong>'Misleading Advertisements'</strong>. It has shifted the onus from 'Buyer Beware' to 'Seller Beware'.</p>

                <h2>2. E-Commerce Protections</h2>
                <p>New rules mandate that e-commerce sites cannot manipulate search results or use 'Dark Patterns' to trick users into spending more. They must also provide clear 'Country of Origin' and refund tracking.</p>

                <h2>3. Filing a Case</strong></h2>
                <p>With the <strong>e-Daakhil</strong> portal, consumers no longer need to visit courts physically. For disputes under ₹5 Lakhs, the process is streamlined to be accessible to every citizen without heavy legal fees.</p>
            </div>
        `
    }
};
