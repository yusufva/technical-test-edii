import { Prisma, PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import httpRespondsMessage from "../helper/httpRespondsMessage.js";

const prisma = new PrismaClient();

async function getUser() {
    const user = await prisma.user.findMany({
        where: {
            role_id: 2,
        },
        select: {
            id: true,
            name: true,
            email: true,
            role: {
                select: {
                    id: true,
                    name: true,
                },
            },
        },
    });
}

async function getUserById(id) {
    const user = await prisma.user.findFirst({
        where: {
            id: id,
        },
        select: {
            id: true,
            name: true,
            email: true,
            role: {
                select: {
                    id: true,
                    name: true,
                },
            },
        },
    });
    return !user
        ? httpRespondsMessage.notFound("User not found")
        : httpRespondsMessage.getSuccess("success get user", user);
}

async function login(loginPayload) {
    const user = await prisma.user.findFirst({
        where: {
            email: loginPayload.email,
        },
    });
    if (!user) return httpRespondsMessage.notFound("User not exist");
    const isValid = await bcrypt.compare(loginPayload.password, user.password);
    if (!isValid)
        return httpRespondsMessage.badRequest("invalid email/password");
    const userId = user.id;
    const email = user.email;
    const role = user.role_id;

    const accessToken = jwt.sign(
        { userId, email, role },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: "2h",
        }
    );

    return httpRespondsMessage.getSuccess("Login success", {
        accessToken: accessToken,
    });
}

async function register(registerPayload) {
    const salt = await bcrypt.genSalt(13);
    const hashPassword = await bcrypt.hash(registerPayload.password, salt);

    try {
        await prisma.user.create({
            data: {
                name: registerPayload.name,
                email: registerPayload.email,
                password: hashPassword,
                role_id:
                    registerPayload.role_id == null
                        ? 2
                        : registerPayload.role_id,
            },
        });
        return httpRespondsMessage.getSuccess("Register success");
    } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            if (e.code === "P2002") {
                return httpRespondsMessage.conflict(
                    "this email already exists"
                );
            }
        }
        return httpRespondsMessage.internalServerError(e.message);
    }
}

export default {
    getUser,
    getUserById,
    login,
    register,
};
