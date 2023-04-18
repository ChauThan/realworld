import React from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";

export default function Layout({ children }: any) {
    return (
        <>
            <Navbar />
            {children}
            <Footer />
        </>);
}
