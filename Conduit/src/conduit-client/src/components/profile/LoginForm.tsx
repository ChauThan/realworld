import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/router";
import React, { ChangeEvent, FormEvent, useCallback, useState } from "react";
import ErrorMessage from "../common/ErrorMessage";
import ValidationResult from '@/models/validationResult';

export default function LoginForm() {
    const router = useRouter()
    const [isLoading, setLoading] = useState(false);
    const [errors, setErrors] = useState<string[]>();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { login } = useAuth();

    const handleEmailChange = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value),
        [setEmail]
    );
    const handlePasswordChange = useCallback(
        (e: ChangeEvent<HTMLInputElement>): void => setPassword(e.target.value),
        [setPassword]
    );

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        try {
            await login(email, password);
            router.push("/");
        }
        catch (error) {
            const valResult = error as ValidationResult;
            if(!!valResult){
                const messages : string[] = [];
                Object.keys(valResult.errors).forEach((key, index) => messages.push(valResult.errors[key]));
                if(messages.length > 0){
                    setErrors(messages);
                }
            }
            
        } finally {
            setLoading(false);
        }
    };
    return (
        <>
            <ErrorMessage messages={errors} ></ErrorMessage>
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