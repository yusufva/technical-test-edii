import { useState, useRef, useEffect } from "react";
import { useCookies } from "react-cookie";
import { getRole, login } from "../../services/auth.service";
import InputForm from "../Elements/Input/Index";
import Button from "../Elements/Button/Index";
import Loading from "../Elements/Loading/Index";

const FormLogin = () => {
    const [loginFailed, setLoginFailed] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    // eslint-disable-next-line no-unused-vars
    const [cookies, setCookie] = useCookies();

    const handleLogin = async (event) => {
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;
        const data = {
            email: email,
            password: password,
        };
        setIsLoading(true);

        await login(data, (status, res) => {
            if (status) {
                setLoginFailed("");
                setCookie("token", res.data.accessToken, {
                    path: "/",
                    maxAge: 3 * 60 * 60,
                });
                getRole(res.data.accessToken) === 1
                    ? (window.location.href = "/admin")
                    : (window.location.href = "/");
            } else {
                setLoginFailed(res.message);
            }
            setIsLoading(false);
        });
    };

    const emailRef = useRef(null);

    useEffect(() => {
        emailRef.current.focus();
    }, []);

    return (
        <form onSubmit={handleLogin}>
            <InputForm
                label="Email"
                type="text"
                placeholder="example@mail.com"
                name="email"
                ref={emailRef}
            />
            <InputForm
                label="Password"
                type="password"
                placeholder="***********"
                name="password"
            />
            {loginFailed && (
                <p className="text-red-500 text-center mb-5">{loginFailed}</p>
            )}
            <Button
                className={`w-full flex justify-center items-center ${
                    isLoading
                        ? "cursor-not-allowed bg-gray-300"
                        : "bg-sky-600 hover:bg-sky-700 active:bg-sky-800"
                }`}
                type="submit"
            >
                {isLoading ? <Loading /> : "Login"}
            </Button>
        </form>
    );
};

export default FormLogin;
