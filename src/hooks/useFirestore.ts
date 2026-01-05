import { useState, useEffect } from 'react';
import { collection, query, onSnapshot, QueryConstraint, DocumentData } from 'firebase/firestore';
import { db } from '../config/firebase';

export function useFirestore<T = DocumentData>(
    collectionName: string,
    queryConstraints: QueryConstraint[] = []
) {
    const [data, setData] = useState<T[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        setLoading(true);
        setError(null);
        
        try {
            const q = queryConstraints.length > 0 
                ? query(collection(db, collectionName), ...queryConstraints)
                : query(collection(db, collectionName));

            const unsubscribe = onSnapshot(
                q,
                (querySnapshot) => {
                    const items: T[] = [];
                    querySnapshot.forEach((doc) => {
                        items.push({ id: doc.id, ...doc.data() } as T);
                    });
                    setData(items);
                    setLoading(false);
                },
                (err) => {
                    console.error(`Error fetching collection ${collectionName}:`, err);
                    setError(err as Error);
                    setLoading(false);
                    setData([]); // Set empty array on error
                }
            );

            return () => unsubscribe();
        } catch (err) {
            console.error(`Error setting up query for ${collectionName}:`, err);
            setError(err as Error);
            setLoading(false);
            setData([]);
        }
    }, [collectionName, queryConstraints.length]);

    return { data, loading, error };
}
