import express from "express";
import userService from "../service/userService.js";

let router = express.Router();

router.post("/login", async (req, res) => {
    const login = await userService.login(req.body);
    res.status(login.statusCode).send(login);
});

router.post("/register", async (req, res) => {
    const register = await userService.register(req.body);
    res.status(register.statusCode).send(register);
});

export default router;
