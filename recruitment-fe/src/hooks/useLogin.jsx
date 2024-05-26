import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { getEmail } from "../services/auth.service";

export const useLogin = () => {
    const [email, setEmail] = useState("");
    const [cookies] = useCookies(["token"]);
    const token = cookies.token;
    useEffect(() => {
        token ? setEmail(getEmail(token)) : (window.location.href = "/login");
    }, [token]);

    return email;
};
