import React, { createContext, useState } from 'react'

export const AuthContext = createContext()

const AuthProvider = ({ children }) => {
    const storedUser = JSON.parse(localStorage.getItem("user"))?.user || null;
    const [user, setUser] = useState(storedUser);

    const [loading, setLoading] = useState(false);


    return (
        <AuthContext.Provider value={{ user, setUser, loading, setLoading }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider