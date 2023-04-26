import { User } from "@/models/user";
import { authService, storageService } from "@/services";
import { createContext, useContext, useEffect, useState } from "react";

interface AuthContextType {
    user: User | undefined;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

interface Props {
    children: React.ReactNode;
}

export default function AuthContextProvider({ children }: Props) {
    const storeKey = "user";
    const [auth, setAuth] = useState<boolean>(false);
    const [user, setUser] = useState<User>();

    const login = async (email: string, password: string) => {
        const response = await authService.login(email, password);
        if (response) {
            storageService.set(storeKey, response.user);
            setAuth(true);
        }
    }

    const logout = () => {
        storageService.remove(storeKey);
        setAuth(false);
    }

    useEffect(() => {
        if (!auth) {
            setUser(undefined);
            return;
        }

        const currentUser = storageService.get(storeKey) as User;

        if (!!currentUser) {
            setUser(currentUser);
        }
    }, [auth]);

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);