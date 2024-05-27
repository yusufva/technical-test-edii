import { useState } from "react";
import InputForm from "../components/Elements/Input/Index";
import Label from "../components/Elements/Input/Label";
import BasicLayout from "../components/Layouts/BasicLayout";
import Button from "../components/Elements/Button/Index";
import Swal from "sweetalert2"; // Import SweetAlert2
import Loading from "../components/Elements/Loading/Index";
import axios from "axios";
import { useConfig } from "../hooks/useConfig";
import { getEmail } from "../services/auth.service";
import { useCookies } from "react-cookie";

const EditBiodata = () => {
    const config = useConfig();
    const [isLoading, setIsLoading] = useState(false);
    const [kesiapan, setKesiapan] = useState(0);
    const [pendidikan, setPendidikan] = useState([
        {
            jenjang: "",
            jurusan: "",
            institusi: "",
            lulus: "",
            ipk: 0,
        },
    ]);
    const [pelatihan, setPelatihan] = useState([
        {
            kursus: "",
            sertifikat: 0,
            tahun: "",
        },
    ]);
    const [pekerjaan, setPekerjaan] = useState([
        {
            perusahaan: "",
            posisi: "",
            pendapatan: 0,
            tahun: "",
        },
    ]);
    const [cookies] = useCookies(["token"]);
    const token = cookies.token;
    const email = getEmail(token);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        // setIsLoading(true);
        pendidikan.map((data) => {
            data.ipk = parseFloat(data.ipk);
        });
        pelatihan.map((data) => {
            data.sertifikat = parseInt(data.sertifikat);
        });
        pekerjaan.map((data) => {
            data.pendapatan = parseInt(data.pendapatan);
        });
        const data = {
            nama: event.target.name.value,
            posisi: event.target.posisiLamaran.value,
            nik: event.target.nik.value,
            ttl: `${event.target.tempatLahir.value}, ${event.target.tglLahir.value}`,
            kelamin: event.target.gender.value,
            agama: event.target.agama.value,
            golongan_darah: event.target.goldar.value,
            status: event.target.status.value,
            alamat_ktp: event.target.alamatKtp.value,
            alamat_domisili: event.target.alamatDomisili.value,
            telpon: event.target.noHp.value,
            kerabat: event.target.kerabat.value,
            skill: event.target.skill.value,
            expektasi_gaji: parseInt(event.target.expektasiGaji.value) || 0,
            kesiapan: parseInt(kesiapan) || 0,
            pendidikan: pendidikan[0].jenjang === "" ? [] : pendidikan,
            pelatihan: pelatihan[0].kursus === "" ? [] : pelatihan,
            pekerjaan: pekerjaan[0].perusahaan === "" ? [] : pekerjaan,
        };
        await axios
            .post(import.meta.env.VITE_API_URL + "biodata/", data, config)
            .then((res) => {
                console.log(res);
                setIsLoading(false);
                successSwal(res.data.message);
                setTimeout(() => {
                    window.location.href = "/";
                }, 3000);
            })
            .catch((error) => {
                setIsLoading(false);
                console.log(error.response);
                return errorSwal("Failed submit data");
            });
    };

    const addPendidikan = () => {
        setPendidikan([
            ...pendidikan,
            {
                jenjang: "",
                jurusan: "",
                institusi: "",
                lulus: "",
                ipk: "",
            },
        ]);
    };

    const addPelatihan = () => {
        setPelatihan([
            ...pelatihan,
            {
                kursus: "",
                sertifikat: 0,
                tahun: "",
            },
        ]);
        setIsLoading(false);
    };

    const addPekerjaan = () => {
        setPekerjaan([
            ...pekerjaan,
            {
                perusahaan: "",
                posisi: "",
                pendapatan: 0,
                tahun: "",
            },
        ]);
    };

    const onChangeValuePendidikan = (event, index) => {
        const { name, value } = event.target;
        const newPendidikan = [...pendidikan];
        newPendidikan[index][name] = value;
        setPendidikan(newPendidikan);
    };

    const onChangeValueKesiapan = (event) => {
        const value = event.target.value;
        setKesiapan(value);
    };

    const onChangeValuePelatihan = (event, index) => {
        const { name, value } = event.target;
        const newPelatihan = [...pelatihan];
        newPelatihan[index][name] = value;
        setPelatihan(newPelatihan);
    };

    const onChangeValuePekerjaan = (event, index) => {
        const { name, value } = event.target;
        const newPekerjaan = [...pekerjaan];
        if (name === "posisiLama") {
            newPekerjaan[index]["posisi"] = value;
            return newPekerjaan;
        }
        newPekerjaan[index][name] = value;
        setPekerjaan(newPekerjaan);
    };

    const successSwal = (message) => {
        return Swal.fire({
            title: "Success",
            text: message,
            icon: "success",
        });
    };

    const errorSwal = () => {
        Swal.fire({
            title: "Failed",
            text: "Failed adding data",
            icon: "error",
        });
    };

    const deletePendidikan = (index) => {
        if (pendidikan.length === 1) {
            return Swal.fire({
                title: "Error",
                text: "Minimal memasukkan 1 pendidikan",
                icon: "error",
                confirmButtonText: "OK",
            });
        }
        setPendidikan(pendidikan.filter((_, i) => i !== index));
    };

    const deletePelatihan = (index) => {
        if (pelatihan.length === 1) {
            return Swal.fire({
                title: "Error",
                text: "Minimal memasukkan 1 pelatihan",
                icon: "error",
                confirmButtonText: "OK",
            });
        }
        setPelatihan(pelatihan.filter((_, i) => i !== index));
    };

    const deletePekerjaan = (index) => {
        if (pekerjaan.length === 1) {
            return Swal.fire({
                title: "Error",
                text: "Minimal memasukkan 1 pekerjaan",
                icon: "error",
                confirmButtonText: "OK",
            });
        }
        setPekerjaan(pekerjaan.filter((_, i) => i !== index));
    };

    return (
        <BasicLayout title={"Edit Biodata"}>
            <div>
                <h1 className="text-3xl font-bold text-sky-700 mb-5">
                    Isi Biodata
                </h1>
                <form onSubmit={handleSubmit}>
                    <div className="w-full h-full py-10 px-14 grid grid-cols-2 gap-10">
                        <InputForm type="text" name="name" label="Name" />
                        <InputForm
                            type="text"
                            name="posisiLamaran"
                            label="Posisi"
                        />
                        <InputForm type="text" name="nik" label="No. KTP" />
                        <InputForm
                            type="text"
                            name="tempatLahir"
                            label="Tempat Lahir"
                            placeholder="Kota Lahir"
                        />
                        <InputForm
                            type="text"
                            name="tglLahir"
                            label="Tgl. Lahir"
                            placeholder="DD-MM-YYYY"
                        />
                        <div>
                            <Label htmlFor="gender">Jenis Kelamin</Label>
                            <select
                                className="text-sm border rounded w-full py-2 px-3 text-slate-800  mb-3 bg-transparent"
                                name="gender"
                                id="gender"
                            >
                                <option value={"Laki-Laki"}>Laki - Laki</option>
                                <option value={"Perempuan"}>Perempuan</option>
                            </select>
                        </div>
                        <div>
                            <Label htmlFor="goldar">Golongan Darah</Label>
                            <select
                                className="text-sm border rounded w-full py-2 px-3 text-slate-800  mb-3 bg-transparent"
                                htmlFor="goldar"
                                id="goldar"
                            >
                                <option value={"-"}>-</option>
                                <option value={"A"}>A</option>
                                <option value={"B"}>B</option>
                                <option value={"O"}>O</option>
                                <option value={"AB"}>AB</option>
                            </select>
                        </div>
                        <div>
                            <Label htmlFor="status">Status</Label>
                            <select
                                className="text-sm border rounded w-full py-2 px-3 text-slate-800  mb-3 bg-transparent"
                                name="status"
                                id="status"
                            >
                                <option value={"Lajang"}>Lajang</option>
                                <option value={"Menikah"}>Menikah</option>
                                <option value={"Janda"}>Janda</option>
                                <option value={"Duda"}>Duda</option>
                            </select>
                        </div>
                        <InputForm
                            type="text"
                            name="agama"
                            label="Agama"
                            placeholder="Agama"
                        />
                        <InputForm
                            type="text"
                            name="alamatKtp"
                            label="Alamat KTP"
                            placeholder="alamat lengkap KTP"
                        />
                        <InputForm
                            type="text"
                            name="alamatDomisili"
                            label="Alamat Domisili"
                            placeholder="alamat lengkap Domisili"
                        />
                        <InputForm
                            type="text"
                            name="email"
                            label="Email"
                            placeholder="example@mail.com"
                            value={email}
                            className="cursor-not-allowed bg-slate-300"
                        />
                        <InputForm
                            type="text"
                            name="noHp"
                            label="No. Handphone"
                            placeholder="+62000000000000"
                        />
                        <InputForm
                            type="text"
                            name="kerabat"
                            label="Kerabat dekat yang dapat dihubungi"
                        />
                        <InputForm
                            type="text"
                            name="skill"
                            label="Skill/Kemampuan yang dimiliki"
                        />
                        <InputForm
                            type="number"
                            name="expektasiGaji"
                            label="Ekspektasi Gaji"
                            placeholder="1000000"
                        />
                        <div className="col-span-2 p-10 border-2 rounded-lg">
                            <h2 className="text-xl font-bold mb-5">
                                Riwayat Pendidikan
                            </h2>
                            <div className="flex justify-between">
                                <Button
                                    className="bg-sky-700 text-white mb-5"
                                    onClick={addPendidikan}
                                >
                                    Tambah Pendidikan
                                </Button>

                                <Button
                                    className={`bg-sky-700 text-white mb-5`}
                                    type="button"
                                    onClick={() =>
                                        deletePendidikan(pendidikan.length - 1)
                                    }
                                >
                                    Hapus Pendidikan
                                </Button>
                            </div>
                            {pendidikan.map((_, index) => (
                                <div
                                    key={index}
                                    className="grid grid-cols-2 p-5 gap-10"
                                >
                                    <div className="col-span-2 flex justify-between w-full px-5">
                                        <h3 className="text-3xl">
                                            Pendidikan {index + 1}
                                        </h3>
                                    </div>
                                    <InputForm
                                        type="text"
                                        name={`jenjang`}
                                        label="Jenjang"
                                        placeholder="Jenjang Pendidikan"
                                        onChange={(e) => {
                                            onChangeValuePendidikan(e, index);
                                        }}
                                        value={pendidikan[index].jenjang}
                                    />
                                    <InputForm
                                        type="text"
                                        name={`institusi`}
                                        label="Institusi"
                                        placeholder="institusi"
                                        onChange={(e) => {
                                            onChangeValuePendidikan(e, index);
                                        }}
                                        value={pendidikan[index].institusi}
                                    />
                                    <InputForm
                                        type="text"
                                        name={`jurusan`}
                                        label="Jurusan"
                                        placeholder="Jurusan"
                                        onChange={(e) => {
                                            onChangeValuePendidikan(e, index);
                                        }}
                                        value={pendidikan[index].jurusan}
                                    />
                                    <InputForm
                                        type="text"
                                        name={`lulus`}
                                        label="Tahun lulus"
                                        placeholder="Tahun lulus"
                                        onChange={(e) => {
                                            onChangeValuePendidikan(e, index);
                                        }}
                                        value={pendidikan[index].lulus}
                                    />
                                    <InputForm
                                        type="number"
                                        name={`ipk`}
                                        label="IPK"
                                        placeholder="4.00"
                                        onChange={(e) => {
                                            onChangeValuePendidikan(e, index);
                                        }}
                                        value={pendidikan[index].ipk}
                                    />
                                </div>
                            ))}
                        </div>
                        <div className="col-span-2 p-10 border-2 rounded-lg">
                            <h2 className="text-xl font-bold mb-5">
                                Riwayat Pelatihan
                            </h2>
                            <div className="flex justify-between">
                                <Button
                                    className="bg-sky-700 text-white mb-5"
                                    onClick={addPelatihan}
                                >
                                    Tambah Pendidikan
                                </Button>

                                <Button
                                    className={`bg-sky-700 text-white mb-5`}
                                    type="button"
                                    onClick={() =>
                                        deletePelatihan(pelatihan.length - 1)
                                    }
                                >
                                    Hapus Pendidikan
                                </Button>
                            </div>
                            {pelatihan.map((_, index) => (
                                <div
                                    key={index}
                                    className="grid grid-cols-2 p-5 gap-10"
                                >
                                    <div className="col-span-2 flex justify-between w-full px-5">
                                        <h3 className="text-3xl">
                                            Pelatihan {index + 1}
                                        </h3>
                                    </div>
                                    <InputForm
                                        type="text"
                                        name={`kursus`}
                                        label="Kursus Pelatihan"
                                        placeholder="Nama Kursus Pelatihan"
                                        onChange={(e) => {
                                            onChangeValuePelatihan(e, index);
                                        }}
                                        value={pelatihan[index].kursus}
                                    />
                                    <InputForm
                                        type="text"
                                        name={`tahun`}
                                        label="Tahun"
                                        placeholder="Tahun"
                                        onChange={(e) => {
                                            onChangeValuePelatihan(e, index);
                                        }}
                                        value={pelatihan[index].tahun}
                                    />

                                    <div className="flex w-full justify-around items-center">
                                        <p className="text-md font-semibold">
                                            Ada sertifikat?
                                        </p>
                                        <InputForm
                                            type="radio"
                                            name="sertifikat"
                                            value={1}
                                            label="Ada"
                                            onChange={(e) => {
                                                onChangeValuePelatihan(
                                                    e,
                                                    index
                                                );
                                            }}
                                            checked={pelatihan[index].ada === 1}
                                        />
                                        <InputForm
                                            type="radio"
                                            name="sertifikat"
                                            value={0}
                                            label="Tidak Ada"
                                            onChange={(e) => {
                                                onChangeValuePelatihan(
                                                    e,
                                                    index
                                                );
                                            }}
                                            checked={pelatihan[index].ada === 0}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="col-span-2 p-10 border-2 rounded-lg">
                            <h2 className="text-xl font-bold mb-5">
                                Riwayat Pekerjaan
                            </h2>
                            <div className="flex justify-between">
                                <Button
                                    className="bg-sky-700 text-white mb-5"
                                    onClick={addPekerjaan}
                                >
                                    Tambah Pekerjaan
                                </Button>

                                <Button
                                    className={`bg-sky-700 text-white mb-5`}
                                    type="button"
                                    onClick={() =>
                                        deletePekerjaan(pekerjaan.length - 1)
                                    }
                                >
                                    Hapus Pekerjaan
                                </Button>
                            </div>
                            {pekerjaan.map((_, index) => (
                                <div
                                    key={index}
                                    className="grid grid-cols-2 p-5 gap-10"
                                >
                                    <div className="col-span-2 flex justify-between w-full px-5">
                                        <h3 className="text-3xl">
                                            Pekerjaan {index + 1}
                                        </h3>
                                    </div>
                                    <InputForm
                                        type="text"
                                        name={`perusahaan`}
                                        label="Perusahaan"
                                        placeholder="perusahaan"
                                        onChange={(e) => {
                                            onChangeValuePekerjaan(e, index);
                                        }}
                                        value={pekerjaan[index].perusahaan}
                                    />
                                    <InputForm
                                        type="text"
                                        name={`posisi`}
                                        label="Posisi Lama"
                                        placeholder="posisi"
                                        onChange={(e) => {
                                            onChangeValuePekerjaan(e, index);
                                        }}
                                        value={pekerjaan[index].posisilama}
                                    />
                                    <InputForm
                                        type="number"
                                        name={`pendapatan`}
                                        label="Pendapatan"
                                        placeholder="1000000"
                                        onChange={(e) => {
                                            onChangeValuePekerjaan(e, index);
                                        }}
                                        value={pekerjaan[index].pendapatan}
                                    />
                                    <InputForm
                                        type="text"
                                        name={`tahun`}
                                        label="Tahun"
                                        placeholder="2000 - 2004"
                                        onChange={(e) => {
                                            onChangeValuePekerjaan(e, index);
                                        }}
                                        value={pekerjaan[index].tahun}
                                    />
                                </div>
                            ))}
                        </div>
                        <div className="flex col-span-2 w-full justify-around items-center">
                            <p className="text-md font-semibold">
                                Bersedia untuk ditempatkan diseluruh kantor
                                perusahaan? :
                            </p>
                            <InputForm
                                type="radio"
                                name="kesiapan"
                                value={1}
                                label="ya"
                                onChange={(e) => {
                                    onChangeValueKesiapan(e);
                                }}
                                checked={kesiapan === 1}
                            />
                            <InputForm
                                type="radio"
                                name="kesiapan"
                                value={0}
                                label="Tidak"
                                onChange={(e) => {
                                    onChangeValueKesiapan(e);
                                }}
                                checked={kesiapan === 0}
                            />
                        </div>
                        <Button
                            className={`col-span-2 flex justify-center items-center ${
                                isLoading
                                    ? "cursor-not-allowed bg-gray-300"
                                    : "bg-sky-600 hover:bg-sky-700 active:bg-sky-800"
                            }`}
                            type="submit"
                        >
                            {isLoading ? <Loading /> : "Simpan"}
                        </Button>
                    </div>
                </form>
            </div>
        </BasicLayout>
    );
};

export default EditBiodata;
