import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import firebaseConfig from "../config";




export const FirebaseContext = React.createContext();

const firebaseapp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseapp);



export const FirebaseContextProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const FirebaseContextValue = { user, firebaseapp }
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            } else {
                setUser(null)
            }
        }
        );
    }, [user])


    return (
        <FirebaseContext.Provider value={FirebaseContextValue}>
            {children}
        </FirebaseContext.Provider>
    )
}

