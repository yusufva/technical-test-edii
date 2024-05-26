import jwt from "jsonwebtoken";

function verifyToken() {
    return async (req, res, next) => {
        const authHeader = req.headers["authorization"];
        const token = authHeader && authHeader.split(" ")[1];
        if (token == null) return res.sendStatus(401);
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decode) => {
            if (err) return res.sendStatus(403);
            req.id = decode.userId;
            req.email = decode.email;
            req.role = decode.role;
            next();
        });
    };
}

function auth(roles) {
    return async (req, res, next) => {
        try {
            const authHeader = req.headers["authorization"];
            const token = authHeader && authHeader.split(" ")[1];
            if (token == null)
                return res.status(401).json({ message: "no token" });
            jwt.verify(
                token,
                process.env.ACCESS_TOKEN_SECRET,
                (err, decode) => {
                    if (err) return res.sendStatus(403);
                    if (!roles.includes(decode.role))
                        return res
                            .status(401)
                            .json({ message: "Unauthorized" });
                    req.user = decode;
                    next();
                }
            );
        } catch (e) {
            res.status(500).json({ message: "something went wrong" });
        }
    };
}

export default {
    auth,
    verifyToken,
};
