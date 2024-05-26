import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function role() {
    const roleList = [
        {
            id: 1,
            name: "admin",
        },
        {
            id: 2,
            name: "user",
        },
    ];

    for (let data of roleList) {
        await prisma.role.create({
            data: data,
        });
    }
}

role()
    .then(async () => await prisma.$disconnect())
    .catch(async (e) => {
        console.log(e);
        await prisma.$disconnect();
        process.exit(1);
    });
