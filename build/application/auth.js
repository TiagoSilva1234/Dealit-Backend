"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userLogin = exports.registerUser = void 0;
const post_user_1 = __importDefault(require("../domain/auth/post-user"));
const post_login_1 = __importDefault(require("../domain/auth/post-login"));
const http_status_codes_1 = require("http-status-codes");
const utils_1 = __importDefault(require("../utils/utils"));
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password, phone, photo } = req.body;
        const { country, city, zipCode, street, houseNumber } = req.body.address;
        if (!(email &&
            password &&
            username &&
            phone &&
            country &&
            city &&
            zipCode &&
            street &&
            houseNumber)) {
            return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).send({
                error: {
                    message: "Required data missing",
                    cause: "Bad Request",
                    date: new Date().toLocaleString(),
                },
            });
        }
        let data;
        if (photo) {
            if (req.body.creditCard) {
                const { cardNumber, cvc, expiryDate } = req.body.creditCard;
                data = {
                    username,
                    address: {
                        country,
                        city,
                        zipCode,
                        street,
                        houseNumber,
                        isFavorite: true,
                    },
                    photo,
                    email,
                    password,
                    phone,
                    creditCard: {
                        cardNumber,
                        cvc,
                        expiryDate,
                        isFavorite: true,
                    },
                    token: "",
                };
            }
            else {
                data = {
                    username,
                    address: {
                        country,
                        city,
                        zipCode,
                        street,
                        houseNumber,
                        isFavorite: true,
                    },
                    photo,
                    email,
                    password,
                    phone,
                    token: "",
                };
            }
        }
        else {
            if (req.body.creditCard) {
                const { cardNumber, cvc, expiryDate } = req.body.creditCard;
                data = {
                    username,
                    address: {
                        country,
                        city,
                        zipCode,
                        street,
                        houseNumber,
                        isFavorite: true,
                    },
                    email,
                    password,
                    phone,
                    creditCard: {
                        cardNumber,
                        cvc,
                        expiryDate,
                        isFavorite: true,
                    },
                    token: "",
                };
            }
            else {
                data = {
                    username,
                    address: {
                        country,
                        city,
                        zipCode,
                        street,
                        houseNumber,
                        isFavorite: true,
                    },
                    email,
                    password,
                    phone,
                    token: "",
                };
            }
        }
        const tester = (0, utils_1.default)(data);
        if (tester.check) {
            return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).send({
                error: {
                    message: tester.cause,
                    cause: "Bad Request",
                    date: new Date().toLocaleString(),
                },
            });
        }
        return res.status(http_status_codes_1.StatusCodes.CREATED).send({
            message: "User successfully saved to database!",
            user: yield (0, post_user_1.default)(data),
        });
    }
    catch (e) {
        if (e.message === "User Already Exists. Please Login") {
            return res.status(http_status_codes_1.StatusCodes.CONFLICT).send({
                error: {
                    message: e.message,
                    cause: "Conflict",
                    date: new Date().toLocaleString(),
                },
            });
        }
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).send({
            error: {
                message: e.message,
                cause: "Unexpected error",
                date: new Date().toLocaleString(),
            },
        });
    }
});
exports.registerUser = registerUser;
const userLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!(email && password)) {
            return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).send({
                error: {
                    message: "All inputs are required",
                    cause: "Bad Request",
                    date: new Date().toLocaleString(),
                },
            });
        }
        const arroz = yield (0, post_login_1.default)(email, password);
        res.cookie("token", arroz.token, { domain: ".dealit-backend.herokuapp.com", path: '/dealit/api', secure: true });
        return res.send({
            message: "Login successfully completed",
            res: arroz,
        });
    }
    catch (e) {
        if (e.message === "Invalid credentials") {
            return res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).send({
                error: {
                    message: e.message,
                    cause: "Unauthorized",
                    date: new Date().toLocaleString(),
                },
            });
        }
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).send({
            error: {
                message: e.message,
                cause: "Unexpected error",
                date: new Date().toLocaleString(),
            },
        });
    }
});
exports.userLogin = userLogin;
