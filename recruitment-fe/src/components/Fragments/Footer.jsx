import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <>
            <div className="mx-3 mt-5 w-5/6 absolute h-16 max-h-16 bg-white border-t-2 p-5 flex justify-between">
                <p className="font-semibold text-slate-600 text-lg">
                    © Created By Yusuf Valent Adyatomo
                </p>
                <p className="font-semibold text-lg text-indigo-600">
                    <Link to="https://github.com/yusufva">Github</Link>
                </p>
            </div>
        </>
    );
};

export default Footer;
