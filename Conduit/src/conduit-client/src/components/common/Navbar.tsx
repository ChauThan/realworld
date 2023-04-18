import React from "react";
import NavLink from "./NavLink";

export default function Navbar() {
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
                    <li className="nav-item">
                        <NavLink href="/signin" as="/signin">
                            Sign in
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink href="/signup" as="/signup">
                            Sign up
                        </NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    );
}