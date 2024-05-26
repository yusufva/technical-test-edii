import { Prisma, PrismaClient } from "@prisma/client";
import httpRespondsMessage from "../helper/httpRespondsMessage.js";

const prisma = new PrismaClient();

async function getBiodata(role, userId) {
    try {
        const whereClause =
            role === 1
                ? {
                      AND: {
                          deleted_at: null,
                          user: {
                              role_id: 2,
                          },
                      },
                  }
                : { id: userId };
        const biodata = await prisma.biodata.findMany({
            where: whereClause,
            include: {
                pendidikan: true,
                pelatihan: true,
                pekerjaan: true,
                user: {
                    select: {
                        email: true,
                    },
                },
            },
        });
        return httpRespondsMessage.getSuccess("success get biodata", biodata);
    } catch (e) {
        return httpRespondsMessage.internalServerError(e);
    }
}

async function getBiodataById(id, user_id, role) {
    try {
        const biodata = await prisma.biodata.findFirst({
            where: {
                id: id,
            },
            include: {
                pendidikan: true,
                pelatihan: true,
                pekerjaan: true,
                user: {
                    select: {
                        email: true,
                    },
                },
            },
        });

        if (!biodata) return httpRespondsMessage.notFound("User not found");

        if (role !== 1) {
            if (biodata.id !== user_id) {
                return httpRespondsMessage.forbidden("forbidden access");
            }
        }

        return httpRespondsMessage.getSuccess("success get biodata", biodata);
    } catch (e) {
        return httpRespondsMessage.internalServerError(e.message);
    }
}

async function createBiodata(biodataPayload) {
    try {
        biodataPayload.kesiapan === 1
            ? (biodataPayload.kesiapan = true)
            : (biodataPayload.kesiapan = false);

        biodataPayload.pelatihan?.map((item) => {
            item?.sertifikat === 1
                ? (item.sertifikat = true)
                : (item.sertifikat = false);
        });

        const biodata = await prisma.biodata.create({
            data: {
                id: biodataPayload.id,
                nama: biodataPayload.nama,
                posisi: biodataPayload.posisi,
                nik: biodataPayload.nik,
                ttl: biodataPayload.ttl,
                kelamin: biodataPayload.kelamin,
                agama: biodataPayload.agama,
                golongan_darah: biodataPayload.golongan_darah,
                status: biodataPayload.status,
                alamat_ktp: biodataPayload.alamat_ktp,
                alamat_domisili: biodataPayload.alamat_domisili,
                telpon: biodataPayload.telpon,
                orang_terdekat: biodataPayload.jabatan,
                skill: biodataPayload.skill,
                kesiapan: biodataPayload.kesiapan,
                expektasi_gaji: biodataPayload.expektasi_gaji,
                kerabat: biodataPayload.kerabat,
                pendidikan: {
                    createMany: {
                        data: biodataPayload.pendidikan,
                    },
                },
                pelatihan: {
                    createMany: {
                        data: biodataPayload.pelatihan,
                    },
                },
                pekerjaan: {
                    createMany: {
                        data: biodataPayload.pekerjaan,
                    },
                },
            },
        });

        return httpRespondsMessage.getSuccess(
            "success create biodata",
            biodata
        );
    } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            // The .code property can be accessed in a type-safe manner
            if (e.code === "P2002") {
                return httpRespondsMessage.conflict(
                    "data in this periods already exists"
                );
            }
            return httpRespondsMessage.internalServerError(e.message);
        }
        console.log(e);
        return httpRespondsMessage.internalServerError(e);
    }
}

async function updateBiodata(id, biodataPayload, user_id, role) {
    let biodata = await prisma.biodata.findFirst({
        where: {
            id: id,
        },
        include: {
            pekerjaan: true,
            pelatihan: true,
            pendidikan: true,
        },
    });
    if (!biodata) return httpRespondsMessage.notFound("Biodata not found");

    if (role !== 1) {
        if (biodata.id !== user_id) {
            return httpRespondsMessage.forbidden("forbidden access");
        }
    }

    try {
        await prisma.$transaction(async (tx) => {
            biodataPayload.pendidikan.map(async (item) => {
                await tx.riwayat_pendidikan.update({
                    where: {
                        id: item.id,
                    },
                    data: item,
                });
            });

            biodataPayload.pelatihan.map(async (item) => {
                await tx.riwayat_pelatihan.update({
                    where: {
                        id: item.id,
                    },
                    data: item,
                });
            });

            biodataPayload.pekerjaan.map(async (item) => {
                await tx.riwayat_pekerjaan.update({
                    where: {
                        id: item.id,
                    },
                    data: item,
                });
            });

            biodata = await tx.biodata.update({
                where: {
                    id: id,
                },
                data: {
                    nama: biodataPayload.nama,
                    posisi: biodataPayload.posisi,
                    nik: biodataPayload.nik,
                    ttl: biodataPayload.ttl,
                    kelamin: biodataPayload.kelamin,
                    agama: biodataPayload.agama,
                    golongan_darah: biodataPayload.golongan_darah,
                    status: biodataPayload.status,
                    alamat_ktp: biodataPayload.alamat_ktp,
                    alamat_domisili: biodataPayload.alamat_domisili,
                    telpon: biodataPayload.telpon,
                    kerabat: biodataPayload.kerabat,
                    jabatan: biodataPayload.jabatan,
                    skill: biodataPayload.skill,
                    kesiapan: biodataPayload.kesiapan,
                    expektasi_gaji: biodataPayload.expektasi_gaji,
                    updated_at: new Date(Date.now()),
                },
            });
        });

        return httpRespondsMessage.getSuccess(
            "success update biodata",
            biodata
        );
    } catch (e) {
        return httpRespondsMessage.internalServerError(e.message);
    }
}

async function deleteById(id, user_id, role) {
    let biodata = await prisma.biodata.findFirst({
        where: {
            id: id,
        },
    });
    if (!biodata) return httpRespondsMessage.notFound("Biodata not found");
    if (role !== 1) {
        if (biodata.id !== user_id) {
            return httpRespondsMessage.forbidden("forbidden access");
        }
    }
    try {
        biodata = await prisma.biodata.update({
            where: {
                id: id,
            },
            data: {
                deleted_at: new Date(Date.now()),
            },
        });

        return httpRespondsMessage.getSuccess(
            "success delete biodata",
            biodata
        );
    } catch (e) {
        return httpRespondsMessage.internalServerError(e.message);
    }
}

export default {
    getBiodata,
    getBiodataById,
    createBiodata,
    updateBiodata,
    deleteById,
};
