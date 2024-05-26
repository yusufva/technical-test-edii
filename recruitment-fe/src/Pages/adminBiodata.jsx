import { useEffect, useState } from "react";
import AdminLayout from "../components/Layouts/AdminLayout";
import { getBiodata } from "../services/biodata.service";
import { useConfig } from "../hooks/useConfig";
import Button from "../components/Elements/Button/Index";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2"; // Import SweetAlert2

const AdminBiodata = () => {
    const [list, setList] = useState([]);
    const config = useConfig();

    useEffect(() => {}, []);

    useEffect(() => {
        getBiodata((data) => {
            console.log(data.data);
            setList(data.data);
        }, config);
    }, []);

    const handleDelete = async (id) => {
        await axios
            .delete(import.meta.env.VITE_API_URL + "biodata/" + id, config)
            .then((res) => {
                Swal.fire({
                    title: "Success",
                    text: res.data.message,
                    icon: "success",
                });
            })
            .catch((err) => {
                console.log(err);
                Swal.fire({
                    title: "Failed",
                    text: "Failed delete data",
                    icon: "error",
                });
            });
    };

    return (
        <AdminLayout title={"AdminBiodata"}>
            <h1 className="text-3xl font-bold text-sky-600 mb-10">
                List Biodata
            </h1>
            <div className="shadow-lg rounded-lg overflow-hidden mx-4 md:mx-10">
                <table className="w-full table-fixed">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">
                                Name
                            </th>
                            <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">
                                Tempat, Tangal Lahir
                            </th>
                            <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">
                                Posisi
                            </th>
                            <th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">
                                Aksi
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white">
                        {list.length > 0 &&
                            list.map((item) => (
                                <tr key={item.id}>
                                    <td className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">
                                        {item.nama}
                                    </td>
                                    <td className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">
                                        {item.ttl}
                                    </td>
                                    <td className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">
                                        {item.posisi}
                                    </td>
                                    <td className="w-fit py-4 grid grid-cols-2 gap-4 px-6 text-left text-gray-600 font-bold uppercase">
                                        <Button
                                            className="bg-red-700 text-white w-full"
                                            onClick={() =>
                                                handleDelete(item.id)
                                            }
                                        >
                                            Delete
                                        </Button>
                                        <Link
                                            to={"/edit-admin"}
                                            className="bg-orange-400 border rounded-lg text-white flex justify-center items-center"
                                        >
                                            Edit
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </AdminLayout>
    );
};
export default AdminBiodata;
