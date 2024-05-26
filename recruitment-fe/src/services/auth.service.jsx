import axios from "axios";
import { jwtDecode } from "jwt-decode";

export const login = (data, callback) => {
    axios
        .post(import.meta.env.VITE_API_URL + "auth/login", data)
        .then((res) => {
            callback(true, res.data);
            // console.log(res.data);
        })
        .catch((err) => {
            callback(false, err);
        });
};

export const register = (data, callback) => {
    axios
        .post(import.meta.env.VITE_API_URL + "auth/register", data)
        .then((res) => {
            callback(true, res.data);
        })
        .catch((err) => {
            callback(false, err);
        });
};

export const getEmail = (token) => {
    const decoded = jwtDecode(token);
    return decoded.email;
};

export const getRole = (token) => {
    const decoded = jwtDecode(token);
    return decoded.role;
};
