import React, { useState } from 'react';
import { db, auth } from '../config/firebase';
import { writeBatch, doc } from 'firebase/firestore';

// DATA EMBEDDED DIRECTLY TO MAKE SEEDDB STANDALONE AFTER DELETING DATA FILES

import { MOCK_NEWS, MOCK_FORUM, MOCK_LAWYERS } from '../data/mockData';

const legalNews = MOCK_NEWS;
const forumDiscussions = MOCK_FORUM;
const lawyers = MOCK_LAWYERS;


const ipcChapters = [
    {
        id: "ipc-01",
        chapterName: "Introduction",
        sections: [
            { id: "s1", title: "Section 1", content: "Title and extent of operation of the Code." },
            { id: "s2", title: "Section 2", content: "Punishment of offences committed within India." }
        ]
    }
];

const casesData = [
    {
        id: "CN-88219/2025",
        category: "Civil Suit (Property & Title)",
        title: "Property Title Dispute - Sector 15",
        status: "Ongoing",
        nextHearing: "Jan 15, 2026",
        userId: "demo-user-id" // Placeholder, will be updated by handleSeed
    }
];

const vaultDocs = [
    {
        id: "vault-001",
        name: "Property Deed.pdf",
        type: "PDF",
        date: "15 Oct 2023",
        size: "15.4 MB",
        tag: "#Property",
        status: "Encrypted"
    },
    {
        id: "vault-002",
        name: "Rent Agreement.pdf",
        type: "PDF",
        date: "01 Jan 2024",
        size: "1.2 MB",
        tag: "#Property",
        status: "Synced"
    }
];

const SeedDB: React.FC = () => {
    const [status, setStatus] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);

    const log = (msg: string) => setStatus(prev => [...prev, msg]);

    const seedCollection = async (collectionName: string, data: any[], idField = 'id', overrideData = {}) => {
        const batch = writeBatch(db);
        const limit = 50;
        const itemsToSeed = data.slice(0, limit);

        itemsToSeed.forEach(item => {
            const docId = String(item[idField]).replace(/\//g, '_');
            const docRef = doc(db, collectionName, docId);
            const dataToSave = { ...JSON.parse(JSON.stringify(item)), ...overrideData };
            batch.set(docRef, dataToSave);
        });

        await batch.commit();
        return `✅ Seeded ${collectionName} (${itemsToSeed.length} docs)`;
    };

    const handleSeed = async () => {
        if (!auth.currentUser) {
            log("❌ Security Error: You must be logged in to Firebase Auth to seed data.");
            alert("Please log in first!");
            return;
        }

        if (!confirm("Overwrite Firestore data with embedded demo data?")) return;

        setLoading(true);
        setStatus(['🚀 Starting high-performance standalone seeding...']);

        try {
            const userId = auth.currentUser.uid;

            const results = await Promise.all([
                seedCollection('cms_legal_news', legalNews),
                seedCollection('public_forum', forumDiscussions),
                seedCollection('directory_lawyers', lawyers),
                seedCollection('cms_updates', legalNews, 'id', { type: 'update' }),
                seedCollection('legal_cases', casesData, 'id', { userId }),
                seedCollection('cms_ipc', ipcChapters),
                seedCollection('vault_documents', vaultDocs, 'id', { userId })
            ]);

            results.forEach(res => log(res));
            log("\n✨ SUCCESS: All demo data seeded to Firestore!");

        } catch (error: any) {
            console.error("Seeding failed:", error);
            log(`❌ ERROR: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-black text-white p-10 font-mono">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-3xl text-emerald-400 font-bold mb-4">Sahayak Firebase Initializer</h1>
                <p className="mb-8 text-neutral-400 border-l-4 border-emerald-500 pl-4 py-2 bg-emerald-900/10 text-sm">
                    Standalone Data Seeding: Uses <strong>Firestore Batch Writes</strong> for immediate, competition-safe initialization.
                    <br />
                    This utility acts as the primary data builder for the Nyaya Sathi ecosystem.
                    <br />
                    <span className="text-amber-400 font-bold underline">IMPORTANT:</span> Re-run this after any code updates to Article IDs or Content in <code>mockData.ts</code>.
                </p>

                <div className="flex gap-4 items-center mb-8">
                    <button
                        onClick={handleSeed}
                        disabled={loading}
                        className={`px-8 py-4 rounded-lg font-bold text-white transition-all transform hover:scale-105 ${loading ? 'bg-neutral-600 cursor-not-allowed' : 'bg-emerald-600 hover:bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.4)]'}`}
                    >
                        {loading ? 'Seeding...' : 'INITIALIZE DATABASE'}
                    </button>
                    {auth.currentUser ? (
                        <span className="text-xs text-emerald-400 font-mono border border-emerald-500/30 px-3 py-1 rounded">Auth: {auth.currentUser.email}</span>
                    ) : (
                        <span className="text-xs text-red-400 font-mono border border-red-500/30 px-3 py-1 rounded">Auth: Not Logged In</span>
                    )}
                </div>

                <div className="p-6 bg-neutral-900 rounded-xl border border-neutral-800 font-mono text-sm min-h-[200px] shadow-2xl">
                    {status.length === 0 ? (
                        <span className="text-neutral-600">Ensure you are logged in using the Login page before seeding.</span>
                    ) : (
                        <div className="flex flex-col gap-2">
                            {status.map((line, i) => (
                                <div key={i} className={`${line.includes('ERROR') ? 'text-red-400' : line.includes('SUCCESS') ? 'text-emerald-400 font-bold' : 'text-neutral-300'}`}>
                                    {line}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SeedDB;
