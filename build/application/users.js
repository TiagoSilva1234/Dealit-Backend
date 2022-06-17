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
exports.patchUser = exports.getEveryUser = exports.getUserById = void 0;
const get_userById_1 = __importDefault(require("../domain/users/get-userById"));
const http_status_codes_1 = require("http-status-codes");
const patch_user_1 = __importDefault(require("../domain/users/patch-user"));
const get_allUsers_1 = __importDefault(require("../domain/users/get-allUsers"));
const utils_1 = require("../utils/utils");
//User endpoints logic
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        if (isNaN(Number(id))) {
            return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).send({
                error: {
                    message: "Invalid id format",
                    cause: "Bad Request",
                    date: new Date().toLocaleString(),
                },
            });
        }
        const user = yield (0, get_userById_1.default)(id);
        return res.send(user);
    }
    catch (e) {
        if (e.message === "User does not exist") {
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).send({
                error: {
                    message: e.message,
                    cause: "Not found",
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
exports.getUserById = getUserById;
const getEveryUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return res.send(yield (0, get_allUsers_1.default)());
    }
    catch (e) {
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).send({
            error: {
                message: e.message,
                cause: "Unexpected error",
                date: new Date().toLocaleString(),
            },
        });
    }
});
exports.getEveryUser = getEveryUser;
const patchUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const data = req.body;
        if (isNaN(Number(id))) {
            return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).send({
                error: {
                    message: "Invalid id format",
                    cause: "Bad Request",
                    date: new Date().toLocaleString(),
                },
            });
        }
        const tester = (0, utils_1.userDataIsNotValid)(data);
        if (tester.check) {
            return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).send({
                error: {
                    message: tester.cause,
                    cause: "Bad Request",
                    date: new Date().toLocaleString(),
                },
            });
        }
        return res.send({
            message: "User successfully patched",
            user: yield (0, patch_user_1.default)(Number(id), data),
        });
    }
    catch (e) {
        if (e.message === "User not found") {
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).send({
                error: {
                    message: e.message,
                    cause: "Not Found",
                    date: new Date().toLocaleString(),
                },
            });
        }
        if (e.message.slice(10, 33) === "prisma.user.update()")
            return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).send({
                error: {
                    message: `${e.message.slice(10, 33)} failed`,
                    cause: "Bad Request",
                    date: new Date().toLocaleString(),
                },
            });
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).send({
            error: {
                message: e.message,
                cause: "Unexpected error",
                date: new Date().toLocaleString(),
            },
        });
    }
});
exports.patchUser = patchUser;
