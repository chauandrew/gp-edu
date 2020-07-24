import React, { useEffect, useState } from "react";
import db from "../firebase";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children })=> {
    // user object from firebase auth
    const [currentUser, setCurrentUser] = useState(null)
    // indicates whether firebase is fetching user
    const [pending, setPending] = useState(true)

    useEffect(() => {
        db.auth().onAuthStateChanged((user) => {
            setCurrentUser(user);
            setPending(false);
        });
    }, []);

    return (
        <AuthContext.Provider value={{ currentUser, pending }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;