import { User } from "@/models/user";
import { authService, storageService } from "@/services";
import { createContext, useContext, useEffect, useState } from "react";

interface AuthContextType {
    user: User;
    updateUser : (user: User) => void;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

interface Props {
    children: React.ReactNode;
}

export default function AuthContextProvider({ children }: Props) {
    const storeKey = "user";
    const [count, setCount] = useState<number>(0);
    const [user, setUser] = useState<User>(null as any);

    const login = async (email: string, password: string) => {
        const response = await authService.login(email, password);
        if (response) {
            storageService.set(storeKey, response.user);
            runEffect();
        }
    }

    const runEffect = () => {
        setCount(count + 1);
    }

    const logout = () => {
        storageService.remove(storeKey);
        runEffect();
    }

    const updateUser = (user: User) => {
        storageService.update(storeKey, user);
        runEffect();
    }

    useEffect(() => {
        const currentUser = storageService.get(storeKey) as User;

        if (!!currentUser) {
            setUser(currentUser);
        }
        else {
            setUser(null as any);
        }
    }, [count]);

    return (
        <AuthContext.Provider value={{ user, updateUser,  login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);