"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const verifyToken = (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers["x-access-token"];
    if (!token) {
        return res.status(http_status_codes_1.default.FORBIDDEN).send({
            error: {
                message: "A token is required for authentication",
                cause: "Forbidden",
                date: new Date().toLocaleString(),
            },
        });
    }
    try {
        if (process.env.TOKEN_KEY) {
            const secret = process.env.TOKEN_KEY;
            // console.log(jwt.decode(token, secret));
            const decoded = jsonwebtoken_1.default.verify(token, secret);
            req.body.user = decoded;
        }
    }
    catch (err) {
        return res.status(http_status_codes_1.default.UNAUTHORIZED).send({
            error: {
                message: "Invalid token",
                cause: "Unauthorized",
                date: new Date().toLocaleString(),
            },
        });
    }
    return next();
};
exports.verifyToken = verifyToken;
