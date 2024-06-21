import { useAuth } from "@/contexts/AuthContext";
import { SERVER_BASE_URL } from "@/lib/constant";
import { User } from "@/models/user";
import { storageService } from "@/services";
import http from "@/services/http";
import { useRouter } from "next/router";
import { ChangeEvent, useEffect, useState } from "react";

interface SettingInputs {
    userName: string;
    email: string;
    bio: string;
    image: string;
    password?: string;
};

export default function SettingsForm() {
    const [isLoading, setLoading] = useState(false);
    const [errors, setErrors] = useState<string[]>();
    const [userInfo, setUserInfo] = useState<SettingInputs>({
        image: "",
        userName: "",
        bio: "",
        email: "",
        password: "",
    });
    const { user: currentUser, updateUser } = useAuth();
    const router = useRouter();

    const updateState = (field: string) => (e: any) => {
        const state = userInfo;
        const newState = { ...state, [field]: e.target.value };
        setUserInfo(newState);
    };

    const submitForm = async (e: any) => {
        e.preventDefault();
        setLoading(true);

        const user = { ...userInfo };

        if (!user.password) {
            delete user.password;
        }

        const payload = { user: { ...user } };
        const data = await http.put(
            `/user`,
            payload,
            currentUser.token
        ) as any;

        setLoading(false);

        if (data?.user) {
            updateUser(data?.user);
            router.push(`/`);
        }
    };

    useEffect(() => {
        if (!currentUser) {
            return;
        }

        setUserInfo({ ...userInfo, ...currentUser as User });
    }, [currentUser]);

    return (
        <>
            {/* <ListErrors errors={errors} /> */}
            <form onSubmit={submitForm}>
                <fieldset>
                    <fieldset className="form-group">
                        <input
                            className="form-control"
                            type="text"
                            placeholder="URL of profile picture"
                            value={userInfo.image}
                            onChange={updateState("image")}
                        />
                    </fieldset>

                    <fieldset className="form-group">
                        <input
                            className="form-control form-control-lg"
                            type="text"
                            placeholder="Username"
                            value={userInfo.userName}
                            onChange={updateState("userName")}
                        />
                    </fieldset>

                    <fieldset className="form-group">
                        <textarea
                            className="form-control form-control-lg"
                            rows={8}
                            placeholder="Short bio about you"
                            value={userInfo.bio}
                            onChange={updateState("bio")}
                        />
                    </fieldset>

                    <fieldset className="form-group">
                        <input
                            className="form-control form-control-lg"
                            type="email"
                            placeholder="Email"
                            value={userInfo.email}
                            onChange={updateState("email")}
                        />
                    </fieldset>

                    <fieldset className="form-group">
                        <input
                            className="form-control form-control-lg"
                            type="password"
                            placeholder="New Password"
                            value={userInfo.password}
                            onChange={updateState("password")}
                        />
                    </fieldset>

                    <button
                        className="btn btn-lg btn-primary pull-xs-right"
                        type="submit"
                        disabled={isLoading}
                    >
                        Update Settings
                    </button>
                </fieldset>
            </form>
        </>
    );
};