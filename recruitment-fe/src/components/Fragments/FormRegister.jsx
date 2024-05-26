import InputForm from "../Elements/Input/Index";
import Button from "../Elements/Button/Index";
import Loading from "../Elements/Loading/Index";
import { register } from "../../services/auth.service";
import { useEffect, useRef, useState } from "react";

const FormRegister = () => {
    const [registerFailed, setRegisterFailed] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleRegister = async (event) => {
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;
        const confirmPassword = event.target.confirmPassword.value;
        setIsLoading(true);
        if (password !== confirmPassword) {
            setRegisterFailed("Password not match");
        } else {
            setRegisterFailed("");
            const data = {
                email: email,
                password: password,
            };

            await register(data, (status, res) => {
                if (status) {
                    window.location.href = "/login";
                } else {
                    setRegisterFailed(res.message);
                }
            });
        }
        setIsLoading(false);
    };

    const emailRef = useRef(null);

    useEffect(() => {
        emailRef.current.focus();
    }, []);

    return (
        <form onSubmit={handleRegister}>
            <InputForm
                label="Email"
                type="email"
                placeholder="example@mail.com"
                name="email"
                ref={emailRef}
            />
            <InputForm
                label="Password"
                type="password"
                placeholder="********"
                name="password"
            />
            <InputForm
                label="Confirm Password"
                type="password"
                placeholder="********"
                name="confirmPassword"
            />
            {registerFailed && (
                <p className="text-red-500 text-center mb-5">
                    {registerFailed}
                </p>
            )}
            <Button
                className={`w-full flex justify-center items-center ${
                    isLoading
                        ? "cursor-not-allowed bg-gray-300"
                        : "bg-sky-600 hover:bg-sky-700 active:bg-sky-800"
                }`}
                type="submit"
            >
                {isLoading ? <Loading /> : "Register"}
            </Button>
        </form>
    );
};

export default FormRegister;
