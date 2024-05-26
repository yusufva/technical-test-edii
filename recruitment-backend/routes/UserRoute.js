import express from "express";
import userService from "../service/userService.js";

let router = express.Router();

router.get("/", async (req, res) => {
    const user = await userService.getUser();
    return res.status(user.statusCode).json(user);
});

router.get("/:id", async (req, res) => {
    const user = await userService.getUserById(req.params.id);
    return res.status(user.statusCode).json(user);
});

export default router;
