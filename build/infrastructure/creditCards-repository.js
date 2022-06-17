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
exports.setCreditCardFavorite = exports.postCreditCard = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const postCreditCard = (data) => __awaiter(void 0, void 0, void 0, function* () {
    if (data.isFavorite) {
        yield prisma.creditCard.updateMany({
            where: { userId: data.userId },
            data: {
                isFavorite: false,
            },
        });
    }
    const creditCard = yield prisma.creditCard.create({
        data: {
            cardNumber: data.cardNumber,
            cvc: data.cvc,
            expiryDate: data.expiryDate,
            isFavorite: data.isFavorite || false,
            user: { connect: { id: data.userId } },
        },
    });
    return creditCard;
});
exports.postCreditCard = postCreditCard;
const setCreditCardFavorite = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const card = yield prisma.creditCard.findUnique({ where: { id: id } });
    if (card) {
        yield prisma.creditCard.updateMany({
            where: {
                isFavorite: true,
                userId: card.userId,
            },
            data: {
                isFavorite: false,
            },
        });
    }
    const creditCard = yield prisma.creditCard.update({
        where: { id: id },
        data: {
            isFavorite: true,
        },
    });
    return creditCard;
});
exports.setCreditCardFavorite = setCreditCardFavorite;
