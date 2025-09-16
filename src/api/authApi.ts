import type { SignUpForm } from "@/type/signup/signupType";
import axiosClient from "./axiosClient";
import type { LoginForm } from "@/type/login/loginType";

export const login = async (data: LoginForm) => {
    const response = await axiosClient.post("/login", { email: data.email, password: data.password, create: data.create});
    return response.data;
};

export const signup = async (data: SignUpForm) => {
    const response = await axiosClient.post("/signup", data);
    return response.data;
};
