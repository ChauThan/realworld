import storage from "@/lib/storage";
import { User } from "@/models/user";
import { createContext, useContext, useEffect, useState } from "react";

interface AuthContextType {
    auth: boolean;
    setAuth: (isAuthorized : boolean) => void;
    user: User | undefined;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

interface Props {
    children: React.ReactNode;
}

const AuthContextProvider = ({ children }: Props) => {
    const [auth, setAuthInternal] = useState<boolean>(false);
    const [user, setUser] = useState<User>();

    const setAuth = (isAuthorized : boolean) => {
        setAuthInternal(isAuthorized);
    }

    useEffect(() => {
        const currentUser = storage("user") as User;

        if (!!currentUser) {
            setUser(currentUser);
        }
    }, [auth]);

    return (
        <AuthContext.Provider value={{ auth, setAuth, user }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);
export default AuthContextProvider;
