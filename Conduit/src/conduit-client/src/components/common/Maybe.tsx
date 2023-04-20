import React, { ReactNode } from "react";

interface MaybeProps {
    availableIf: boolean;
    children: ReactNode
}

export default function Maybe({ availableIf, children }: MaybeProps) {
    return (
        <>
            {availableIf && children}
        </>
    )
}