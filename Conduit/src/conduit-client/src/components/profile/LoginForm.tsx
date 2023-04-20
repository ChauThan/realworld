import { useAuth } from "@/contexts/AuthContext";
import { useLogin } from "@/hooks/useLogin";
import { useRouter } from "next/router";
import React, { ChangeEvent } from "react";

export default function LoginForm() {
    const router = useRouter()
    const [isLoading, setLoading] = React.useState(false);
    const [errors, setErrors] = React.useState([]);
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const { login } = useLogin();

    const { setAuth } = useAuth();

    const handleEmailChange = React.useCallback(
        (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value),
        [setEmail]
    );
    const handlePasswordChange = React.useCallback(
        (e: ChangeEvent<HTMLInputElement>): void => setPassword(e.target.value),
        [setPassword]
    );

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        try {
            await login(email, password);
            setAuth(true);
            router.push("/");
        }
        catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <fieldset>
                    <fieldset className="form-group">
                        <input
                            className="form-control form-control-lg"
                            type="email"
                            placeholder="Email"
                            value={email}
                            disabled={isLoading}
                            onChange={handleEmailChange}
                        />
                    </fieldset>

                    <fieldset className="form-group">
                        <input
                            className="form-control form-control-lg"
                            type="password"
                            placeholder="Password"
                            value={password}
                            disabled={isLoading}
                            onChange={handlePasswordChange}
                        />
                    </fieldset>

                    <button
                        className="btn btn-lg btn-primary pull-xs-right"
                        type="submit"
                        disabled={isLoading}
                    >
                        Sign in
                    </button>
                </fieldset>
            </form>
        </>
    );
}