import {createContext, ReactNode, useContext, useState} from 'react';

interface User {
    username: string;
}


export interface AuthContextType {
    user: User | null;
    login: (userData: User) => void;
    logout: () => void;
    isLogged: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({children}) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLogged, setIsLogged] = useState(false);

    const login = (userData: User) => {
        setUser(userData);
        setIsLogged(true)
    };

    const logout = () => {
        setUser(null);
        setIsLogged(false);
    };

    return (
        <AuthContext.Provider value={{user, login, logout, isLogged}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};