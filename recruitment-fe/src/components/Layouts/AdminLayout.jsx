import SidebarAdmin from "../Fragments/SidebarAdmin";
import TopSection from "../Fragments/TopSection";
import Loading from "../Elements/Loading/Index";
import { useCookies } from "react-cookie";
import { useState } from "react";
import { useLogin } from "../../hooks/useLogin";

const AdminLayout = ({ children, title }) => {
    const [isLoading, setIsLoading] = useState(false);
    // eslint-disable-next-line no-unused-vars
    const [cookies, setCookie, removeCookie] = useCookies(["token"]);
    // eslint-disable-next-line no-unused-vars
    const email = useLogin();

    const handleLogout = () => {
        setIsLoading(true);
        removeCookie("token", { path: "/" });
        setIsLoading(false);
        window.location.href = "/login";
    };
    return (
        <div className="flex w-screen relative overflow-hidden">
            {isLoading && <Loading />}
            <SidebarAdmin />

            <div
                className={`w-full overflow-y-auto h-screen ${
                    isLoading ? "opacity-50" : "opacity-100"
                }`}
            >
                <TopSection
                    title={title}
                    onClick={handleLogout}
                    className={isLoading ? "cursor-not-allowed" : ""}
                />
                <div className="p-8 border-2 border-slate-200 rounded-lg mx-7 mb-5">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default AdminLayout;
