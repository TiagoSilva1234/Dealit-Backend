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
exports.patchUser = exports.login = exports.saveUser = exports.getAllUsers = exports.getUserByToken = exports.getUserById = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const client_1 = __importDefault(require("../../client"));
const getUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield client_1.default.user.findUnique({
        where: {
            id: Number(id),
        },
        include: {
            addresses: true,
        },
    });
    if (user === null) {
        throw new Error("User does not exist");
    }
    const favAdd = user.addresses.filter((e) => e.isFavorite)[0];
    return {
        id: user.id,
        username: user.username,
        email: user.email,
        phone: user.phone,
        address: { country: favAdd.country, city: favAdd.city },
    };
});
exports.getUserById = getUserById;
const getUserByToken = (username) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield client_1.default.user.findUnique({
        where: {
            username: username,
        },
        include: {
            addresses: true,
            creditCards: true,
            orders: true,
        },
    });
    if (!user) {
        throw new Error("User does not exist");
    }
    return user;
});
exports.getUserByToken = getUserByToken;
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield client_1.default.user.findMany({
        orderBy: { id: "asc" },
    });
    return users.map((user) => ({
        id: user.id,
        username: user.username,
        email: user.email,
        phone: user.phone,
    }));
});
exports.getAllUsers = getAllUsers;
const saveUser = (data) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const oldUser = yield client_1.default.user.findUnique({
        where: { email: data.email },
    });
    if (oldUser) {
        throw new Error("User Already Exists. Please Login");
    }
    data.password = bcryptjs_1.default.hashSync(data.password, 10);
    let secret;
    if (process.env.TOKEN_KEY) {
        secret = process.env.TOKEN_KEY;
        data.token = jsonwebtoken_1.default.sign({ username: data.username, email: data.email }, secret, {
            expiresIn: "2h",
        });
    }
    if (!data.token)
        throw new Error("Something went wrong with JWT creation");
    if (data.creditCard && ((_a = data.creditCard) === null || _a === void 0 ? void 0 : _a.isFavorite)) {
        const user = yield client_1.default.user.create({
            data: {
                username: data.username,
                addresses: { create: data.address },
                email: data.email,
                password: data.password,
                phone: data.phone,
                token: data.token,
                //@ts-ignore
                creditCards: { create: data.creditCard },
            },
        });
        data.password = "********";
        return data;
    }
    const user = yield client_1.default.user.create({
        data: {
            username: data.username,
            addresses: { create: data.address },
            email: data.email,
            password: data.password,
            phone: data.phone,
            token: data.token,
        },
    });
    data.password = "********";
    return data;
});
exports.saveUser = saveUser;
const login = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield client_1.default.user.findUnique({ where: { email: email } });
    if (user && bcryptjs_1.default.compareSync(password, user.password)) {
        let secret;
        let token;
        if (process.env.TOKEN_KEY) {
            secret = process.env.TOKEN_KEY;
            token = jsonwebtoken_1.default.sign({ username: user.username, email }, secret, {
                expiresIn: "2h",
            });
            const newUser = yield client_1.default.user.update({
                where: { id: user.id },
                data: { token: token },
            });
            return {
                id: newUser.id,
                username: newUser.username,
                email: newUser.email,
                phone: newUser.phone,
                token: newUser.token,
                photo: newUser.photo,
            };
        }
        throw new Error("token secret not found");
    }
    throw new Error("Invalid credentials");
});
exports.login = login;
const patchUser = (id, obj) => __awaiter(void 0, void 0, void 0, function* () {
    const before = yield client_1.default.user.findUnique({
        where: { id: id },
    });
    if (!before)
        throw new Error("User not found");
    if (obj.oldPassword && obj.newPassword) {
        if (bcryptjs_1.default.compareSync(obj.oldPassword, before.password)) {
            obj.pws = bcryptjs_1.default.hashSync(obj.newPassword, 10);
        }
        else {
            throw new Error("Old passwords do not match");
        }
    }
    return yield client_1.default.user.update({
        where: { id: id },
        data: {
            username: !obj.username ? before.username : obj.username,
            email: !obj.email ? before.email : obj.email,
            phone: !obj.phone ? before.phone : obj.phone,
            password: !obj.pws ? before.password : obj.pws,
            photo: !obj.photo ? before.photo : obj.photo,
        },
    });
});
exports.patchUser = patchUser;