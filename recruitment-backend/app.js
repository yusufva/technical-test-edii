import express from "express";
import path from "path";
import cors from "cors";
import cookieParser from "cookie-parser";
import logger from "morgan";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import JwtAuth from "./middleware/JwtAuth.js";

import AuthRoute from "./routes/AuthRoute.js";
import UserRoute from "./routes/UserRoute.js";
import BiodataRoute from "./routes/biodataRoute.js";

var app = express();

app.use(
    cors({
        origin: function (origin, callback) {
            console.log(`Origin ${origin} is being granted CORS access`);
            callback(null, true);
        },
        methods: "GET, PUT, POST, DELETE, HEAD, OPTIONS",
    })
);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/auth", AuthRoute);
app.use("/user", JwtAuth.verifyToken(), UserRoute);
app.use("/biodata", JwtAuth.verifyToken(), BiodataRoute);

export default app;
