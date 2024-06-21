
import SettingsForm from "@/components/profile/SettingsForm";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/router";
import React from "react";

export default function Settings() {
    var { logout } = useAuth();
    const router = useRouter()
    const handleLogout = async (e: React.MouseEvent) => {
        e.preventDefault();
        
        logout();
        router.push("/");
      }

    return (
        <div className="settings-page">
            <div className="container page">
                <div className="row">
                    <div className="col-md-6 offset-md-3 col-xs-12">
                        <h1 className="text-xs-center">Your Settings</h1>
                        <SettingsForm />
                        <hr />
                        <button className="btn btn-outline-danger" onClick={handleLogout}>
                            Or click here to logout.
                        </button>
                    </div>
                </div>
            </div>
        </div>);
}