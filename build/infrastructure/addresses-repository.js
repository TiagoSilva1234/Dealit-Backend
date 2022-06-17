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
Object.defineProperty(exports, "__esModule", { value: true });
exports.setAdressFavorite = exports.postAddress = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
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
