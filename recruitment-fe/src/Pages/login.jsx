import FormLogin from "../components/Fragments/FormLogin";
import AuthLayout from "../components/Layouts/AuthLayout";

const LoginPage = () => {
    console.log(import.meta.env.VITE_API_URL);
    return (
        <AuthLayout title="Login" type="login">
            <FormLogin />
        </AuthLayout>
    );
};

export default LoginPage;
