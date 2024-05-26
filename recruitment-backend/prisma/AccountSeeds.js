import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function account() {
    const password = await bcrypt.hash("12345678", 13);
    const accountList = [
        {
            email: "admin@mail.com",
            password: password,
            role_id: 1,
        },
        {
            email: "pengguna1@mail.com",
            password: password,
            role_id: 2,
        },
    ];

    for (let data of accountList) {
        await prisma.user.create({
            data: data,
        });
    }
}

account()
    .then(async () => await prisma.$disconnect())
    .catch(async (e) => {
        console.log(e);
        await prisma.$disconnect();
        process.exit(1);
    });
