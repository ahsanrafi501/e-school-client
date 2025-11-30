import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword,  onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import { auth } from '../firebase.config';
import { GoogleAuthProvider } from 'firebase/auth/web-extension';


const googleProvider = new GoogleAuthProvider()

const AuthProvider = ({children}) => {
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState(null)
    

    const registerUserWithEmail = (email, password) =>{
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }
    const signInUserWithEmail = (email, password) => {
        setLoading(true);
       return signInWithEmailAndPassword(auth, email, password);
    }

    const signInWithGoogle = () =>{
        setLoading(true);
        return signInWithPopup(auth, googleProvider)
    }

    const signOutUser = () =>{
        setLoading(true)
        return signOut(auth)
    }

    useEffect(() => {
       const unsubscribe = onAuthStateChanged(auth, (currentUser) =>{
            setUser(currentUser);
            setLoading(false);
        })
        return () =>{
            unsubscribe();
        }
    },[])

    const authInfo = {
        registerUserWithEmail,
        signInUserWithEmail,
        signInWithGoogle,
        user,
        loading,
        signOutUser,
    }
    return (
        <div>
            <AuthContext value={authInfo}>{children}</AuthContext>
        </div>
    );
};

export default AuthProvider;