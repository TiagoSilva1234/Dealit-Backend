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
exports.getAdressAutocomplete = exports.setAdressFavorite = exports.postAddress = exports.getAddressesByUserId = void 0;
const client_1 = require("@prisma/client");
const axios_1 = __importDefault(require("axios"));
const prisma = new client_1.PrismaClient();
const getAddressesByUserId = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma.user.findUnique({
        where: { id: userId },
        include: { addresses: true },
    });
    if (user) {
        return user.addresses;
    }
    throw new Error("User does not exist");
});
exports.getAddressesByUserId = getAddressesByUserId;
const postAddress = (data) => __awaiter(void 0, void 0, void 0, function* () {
    if (data.isFavorite) {
        yield prisma.address.updateMany({
            where: { userId: data.userId },
            data: {
                isFavorite: false,
            },
        });
    }
    const order = yield prisma.address.create({
        data: {
            country: data.country,
            city: data.city,
            zipCode: data.zipCode,
            street: data.street,
            houseNumber: data.houseNumber,
            isFavorite: data.isFavorite || false,
            user: { connect: { id: data.userId } },
        },
    });
    return order;
});
exports.postAddress = postAddress;
const setAdressFavorite = (addressId) => __awaiter(void 0, void 0, void 0, function* () {
    const address = yield prisma.address.findUnique({
        where: {
            id: addressId,
        },
    });
    if (address) {
        yield prisma.address.updateMany({
            where: {
                isFavorite: true,
                userId: address.userId,
            },
            data: { isFavorite: false },
        });
    }
    const updated = yield prisma.address.update({
        where: {
            id: addressId,
        },
        data: { isFavorite: true },
    });
    return updated;
});
exports.setAdressFavorite = setAdressFavorite;
const getAdressAutocomplete = (text) => __awaiter(void 0, void 0, void 0, function* () {
    const env = process.env.ADRRESS_API_KEY;
    let idk = {};
    yield axios_1.default.get(`https://api.geoapify.com/v1/geocode/autocomplete?text=${text}&apiKey=${env}`).then(res => {
        idk = res.data;
    });
    if (idk) {
        return idk;
    }
    return "nothing found";
});
exports.getAdressAutocomplete = getAdressAutocomplete;
