import { useAuth } from "@/contexts/AuthContext";
import React from "react";
import Maybe from "./Maybe";
import NavLink from "./NavLink";

export default function Navbar() {
    const {user : currentUser} = useAuth();
    const isLogged = !!currentUser

    return (
        <nav className="navbar navbar-light">
            <div className="container">
                <a className="navbar-brand" href="index.html">conduit</a>
                <ul className="nav navbar-nav pull-xs-right">
                    <li className="nav-item">
                        <NavLink href="/" as="/">
                            Home
                        </NavLink>
                    </li>
                    
                    <Maybe availableIf={isLogged}>
                        <li className="nav-item">
                            <NavLink href="/article" as="/article">
                                <i className="ion-compose"></i>&nbsp; New Article
                            </NavLink>
                            <a className="nav-link" href=""> </a>
                        </li>
                        <li className="nav-item">
                            <NavLink href="/settings" as="/settings">
                                <i className="ion-gear-a"></i>&nbsp; Settings
                            </NavLink>
                        </li>
                    </Maybe>

                    <Maybe availableIf={!isLogged}>
                        <li className="nav-item">
                            <NavLink href="/login" as="/login">
                                Sign in
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink href="/signup" as="/signup">
                                Sign up
                            </NavLink>
                        </li>
                    </Maybe>
                </ul>
            </div>
        </nav>
    );
}