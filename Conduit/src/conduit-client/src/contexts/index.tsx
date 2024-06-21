import React, { ReactNode } from "react";
import AuthContextProvider from "./AuthContext";

interface Props {
    children: ReactNode
};

export default function ContextProvider({ children }: Props) {
    return (
        <AuthContextProvider>
            {children}
        </AuthContextProvider>
    );
}