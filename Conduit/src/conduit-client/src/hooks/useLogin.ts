import { User } from "@/models/user";
import { authService } from "@/services";

export const useLogin = () => {
    const login = async (email: string, password: string) => {
        const response = await authService.login(email, password);
        if (response) {
            localStorage.setItem("user", JSON.stringify(response.user));
        }

        return response.user as User;
    }

    return { login };
}