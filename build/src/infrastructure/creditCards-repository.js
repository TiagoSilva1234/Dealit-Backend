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
exports.setCreditCardFavorite = exports.postCreditCard = exports.getCreditCardsByUserId = void 0;
const client_1 = __importDefault(require("../../client"));
const getCreditCardsByUserId = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield client_1.default.user.findUnique({
        where: { id: userId },
        include: { creditCards: true },
    });
    if (user) {
        return user.creditCards;
    }
    throw new Error("User does not exist");
});
exports.getCreditCardsByUserId = getCreditCardsByUserId;
const postCreditCard = (data) => __awaiter(void 0, void 0, void 0, function* () {
    if (data.isFavorite) {
        yield client_1.default.creditCard.updateMany({
            where: { userId: data.userId },
            data: {
                isFavorite: false,
            },
        });
    }
    const creditCard = yield client_1.default.creditCard.create({
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
    const card = yield client_1.default.creditCard.findUnique({ where: { id: id } });
    if (card) {
        yield client_1.default.creditCard.updateMany({
            where: {
                isFavorite: true,
                userId: card.userId,
            },
            data: {
                isFavorite: false,
            },
        });
    }
    const creditCard = yield client_1.default.creditCard.update({
        where: { id: id },
        data: {
            isFavorite: true,
        },
    });
    return creditCard;
});
exports.setCreditCardFavorite = setCreditCardFavorite;
