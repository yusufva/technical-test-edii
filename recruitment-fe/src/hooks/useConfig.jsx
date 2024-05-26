import { useCookies } from "react-cookie";

export const useConfig = () => {
    const [cookies] = useCookies(["token"]);
    const token = cookies.token;

    const config = {
        headers: { Authorization: `Bearer ${token}` },
    };

    return config;
};
