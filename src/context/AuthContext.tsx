import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, db } from '../config/firebase';
import { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';

interface FamilyMember {
    id: string;
    name: string;
    relation: 'Father' | 'Mother' | 'Son' | 'Daughter';
    age: number;
    avatar: string;
    income: string;
    occupation: string;
    matchScore: number;
    stats: {
        applied: number;
        approved: number;
        pending: number;
    };
}

interface AuthContextType {
    isAuthenticated: boolean;
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    signup: (email: string, password: string, fullName: string) => Promise<void>;
    signInWithGoogle: () => Promise<void>;
    logout: () => void;
    updateUser: (updates: Partial<User>) => void;
    isLoading: boolean;
}

interface User {
    uid?: string;
    name: string;
    email: string;
    avatar?: string;
    fullName?: string;
    age?: string;
    gender?: string;
    phone?: string;
    address?: string;
    city?: string;
    state?: string;
    pincode?: string;
    aadharNo?: string;
    panNo?: string;
    occupation?: string;
    education?: string;
    maritalStatus?: string;
    annualIncome?: string;
    category?: string;
    savedArticles?: string[];
    theme?: 'light' | 'dark';
    geminiApiKey?: string;
    sharedCases?: { lawyerId: number; caseId: string }[];
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Firebase Auth Listener
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {
                try {
                    // Fetch user profile from Firestore
                    const userDocRef = doc(db, 'users', firebaseUser.uid);
                    const userDoc = await getDoc(userDocRef);

                    if (userDoc.exists()) {
                        const userData = userDoc.data() as User;
                        setUser({ ...userData, uid: firebaseUser.uid });
                        setIsAuthenticated(true);
                    } else {
                        console.warn("User authenticated but no profile found.");
                        // Handle case where auth exists but doc doesn't (legacy or partial signups)
                        setUser({ uid: firebaseUser.uid, name: firebaseUser.displayName || 'Demo User', email: firebaseUser.email || '' });
                        setIsAuthenticated(true);
                    }
                } catch (error) {
                    console.error("Error fetching user profile:", error);
                }
            } else {
                setUser(null);
                setIsAuthenticated(false);
            }
            setIsLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const login = async (email: string, password: string) => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
            console.error("Firebase Login Error:", error);
            throw error;
        }
    };

    const signup = async (email: string, password: string, fullName: string) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const firebaseUser = userCredential.user;

            // Initialize profile in Firestore
            const userDocRef = doc(db, 'users', firebaseUser.uid);
            const userData: User = {
                uid: firebaseUser.uid,
                email,
                fullName,
                name: fullName.split(' ')[0],
                savedArticles: []
            };
            await setDoc(userDocRef, userData);

            setUser(userData);
            setIsAuthenticated(true);
        } catch (error) {
            console.error("Firebase Signup Error:", error);
            throw error;
        }
    };

    const signInWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        provider.setCustomParameters({ prompt: 'select_account' });
        try {
            const result = await signInWithPopup(auth, provider);
            const firebaseUser = result.user;

            // Check if profile exists
            const userDocRef = doc(db, 'users', firebaseUser.uid);
            const userDoc = await getDoc(userDocRef);

            if (!userDoc.exists()) {
                const userData: User = {
                    uid: firebaseUser.uid,
                    email: firebaseUser.email || '',
                    fullName: firebaseUser.displayName || 'Google User',
                    name: (firebaseUser.displayName || 'Google').split(' ')[0],
                    avatar: firebaseUser.photoURL || '',
                    savedArticles: []
                };
                await setDoc(userDocRef, userData);
                setUser(userData);
            } else {
                setUser({ ...(userDoc.data() as User), uid: firebaseUser.uid });
            }
            setIsAuthenticated(true);
        } catch (error) {
            console.error("Google Auth Error:", error);
            throw error;
        }
    };

    const logout = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.error("Logout Error:", error);
        }
    };

    const updateUser = async (updates: Partial<User>) => {
        if (!user || !auth.currentUser) return;

        try {
            const userDocRef = doc(db, 'users', auth.currentUser.uid);
            await setDoc(userDocRef, updates, { merge: true });
            // The onAuthStateChanged listener or a direct state update will handle the UI
            setUser(prev => prev ? { ...prev, ...updates } : null);
        } catch (error) {
            console.error("Error updating user profile:", error);
        }
    };

    return (
        <AuthContext.Provider value={{
            isAuthenticated,
            user,
            login,
            signup,
            signInWithGoogle,
            logout,
            updateUser,
            isLoading
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
