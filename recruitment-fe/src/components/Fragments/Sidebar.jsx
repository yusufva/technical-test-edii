import { Link } from "react-router-dom";

const Sidebar = () => {
    return (
        <div className="h-screen sticky top-0 w-fit max-w-1/4 pt-10 px-8 bg-sky-950 text-nowrap">
            <div>
                <h1 className="text-white text-3xl font-bold mb-10">
                    Recruitmen App
                </h1>
                <ul className="list-none">
                    <li className="text-white text-2xl font-semibold mb-4">
                        <Link to={`/`}>Home</Link>
                    </li>
                    <li className="text-white text-2xl font-semibold mb-4">
                        <Link to={`/edit-biodata`}>Edit Biodata</Link>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;
