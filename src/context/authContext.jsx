import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuthContext = () => {
    return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
    const [authUser, setAuthUser] = useState(null);

    useEffect(() => {
        const user = localStorage.getItem("auth-user");
        if (user) {
            try {
                const parsedUser = JSON.parse(user);
                setAuthUser(parsedUser);
            } catch (error) {
                console.error('Error parsing stored user:', error);
                localStorage.removeItem("auth-user");
            }
        }
    }, []);

    const logout = () => {
        localStorage.removeItem("auth-user");
        setAuthUser(null);
    };

    return (
        <AuthContext.Provider value={{ authUser, setAuthUser, logout }}>
            {children}
        </AuthContext.Provider>
    );
}; 