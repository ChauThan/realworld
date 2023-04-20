import { User } from "@/models/user";
import http from "./http"

interface LoginResponse {
    user: User;
}

export class AuthService {
    login = async (email: string, password: string) => {
        var payload = {
            user: {
                email,
                password
            }
        };
        return await http.post<LoginResponse>(`users/login`, payload);
    }
}