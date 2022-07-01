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
const { postCreditCard, setFavoriteCreditCard, getCreditCardsByUserId, } = require("../creditCards");
const postCC = require("../../domain/creditCards/post-creditCard");
jest.mock("../../domain/creditCards/post-creditCard", () => jest.fn());
const setFav = require("../../domain/creditCards/patch-setFavorite");
jest.mock("../../domain/creditCards/patch-setFavorite", () => jest.fn());
const getCardsByUserId = require("../../domain/creditCards/get-creditCardsByUserId");
jest.mock("../../domain/creditCards/get-creditCardsByUserId", () => jest.fn());
describe("Credit Cards Endpoint", () => {
    const mockSend = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn().mockReturnThis(),
    };
    describe("get credit cards by user id", () => {
        beforeEach(() => {
            jest.clearAllMocks();
        });
        it("should return a custom error object if id has letters in it", () => __awaiter(void 0, void 0, void 0, function* () {
            yield getCreditCardsByUserId({ params: { userId: "q" } }, mockSend);
            expect(mockSend.status).toHaveBeenNthCalledWith(1, 400);
            expect(mockSend.send).toHaveBeenNthCalledWith(1, {
                error: {
                    message: "Invalid id format",
                    cause: "Bad Request",
                    date: new Date().toLocaleString(),
                },
            });
        }));
        it("should return a custom error object if id doesn't match user in database", () => __awaiter(void 0, void 0, void 0, function* () {
            getCardsByUserId.mockRejectedValueOnce(new Error("User does not exist"));
            yield getCreditCardsByUserId({ params: { userId: "9" } }, mockSend);
            expect(mockSend.status).toHaveBeenNthCalledWith(1, 404);
            expect(mockSend.send).toHaveBeenNthCalledWith(1, {
                error: {
                    message: "User does not exist",
                    cause: "Not found",
                    date: new Date().toLocaleString(),
                },
            });
        }));
        it("should return a successful response", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = [
                {
                    id: 5,
                    userId: 0,
                    cardNumber: 123412,
                    cvc: 131242,
                    expiryDate: "teste",
                    isFavorite: false,
                },
                {
                    id: 6,
                    userId: 0,
                    cardNumber: 1627352361,
                    cvc: 987,
                    expiryDate: "11/25",
                    isFavorite: true,
                },
            ];
            getCardsByUserId.mockResolvedValueOnce(response);
            yield getCreditCardsByUserId({ params: { userId: 0 } }, mockSend);
            expect(mockSend.status).toHaveBeenCalledTimes(0);
            expect(mockSend.send).toHaveBeenNthCalledWith(1, response);
        }));
        it("should return a custom error object if any unexpected error is met", () => __awaiter(void 0, void 0, void 0, function* () {
            getCardsByUserId.mockRejectedValueOnce(new Error("An unexpected Error"));
            yield getCreditCardsByUserId({ params: { userId: "0" } }, mockSend);
            expect(mockSend.status).toHaveBeenNthCalledWith(1, 500);
            expect(mockSend.send).toHaveBeenNthCalledWith(1, {
                error: {
                    message: "An unexpected Error",
                    cause: "Unexpected error",
                    date: new Date().toLocaleString(),
                },
            });
        }));
    });
    describe("post credit card", () => {
        afterEach(() => {
            jest.clearAllMocks();
        });
        it("should return a custom error if required data is missing", () => __awaiter(void 0, void 0, void 0, function* () {
            yield postCreditCard({ body: {} }, mockSend);
            expect(mockSend.status).toHaveBeenNthCalledWith(1, 400);
            expect(mockSend.send).toHaveBeenNthCalledWith(1, {
                error: {
                    message: "Required data missing",
                    cause: "Bad Request",
                    date: new Date().toLocaleString(),
                },
            });
        }));
        it("should return a custom error if an unexpected error occurs", () => __awaiter(void 0, void 0, void 0, function* () {
            const mockReq = {
                body: {
                    "cardNumber": 1234234534564567,
                    "cvc": 987,
                    "expiryDate": "11/25",
                    "isFavorite": true,
                    "userId": 0
                },
            };
            postCC.mockRejectedValueOnce(new Error("An unexpected error"));
            yield postCreditCard(mockReq, mockSend);
            expect(mockSend.status).toHaveBeenNthCalledWith(1, 500);
            expect(mockSend.send).toHaveBeenNthCalledWith(1, {
                error: {
                    message: "An unexpected error",
                    cause: "Unexpected error",
                    date: new Date().toLocaleString(),
                },
            });
        }));
        it("should return a successful response", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = {
                message: "Credit Card successfully saved to database",
                creditCard: {
                    "id": 6,
                    "userId": 0,
                    "cardNumber": 1234234534564567,
                    "cvc": 987,
                    "expiryDate": "11/25",
                    "isFavorite": true
                },
            };
            const mockReq = {
                body: {
                    "cardNumber": 1234234534564567,
                    "cvc": 987,
                    "expiryDate": "11/25",
                    "isFavorite": true,
                    "userId": 0
                },
            };
            postCC.mockResolvedValueOnce(response.creditCard);
            yield postCreditCard(mockReq, mockSend);
            expect(mockSend.status).toHaveBeenNthCalledWith(1, 201);
            expect(mockSend.send).toHaveBeenNthCalledWith(1, response);
        }));
    });
    describe("set favorite credit card", () => {
        afterEach(() => {
            jest.clearAllMocks();
        });
        it("should return a custom error if id has letters", () => __awaiter(void 0, void 0, void 0, function* () {
            yield setFavoriteCreditCard({ params: { id: "f" } }, mockSend);
            expect(mockSend.status).toHaveBeenNthCalledWith(1, 400);
            expect(mockSend.send).toHaveBeenNthCalledWith(1, {
                error: {
                    message: "Invalid id format",
                    cause: "Bad Request",
                    date: new Date().toLocaleString(),
                },
            });
        }));
        it("should return a custom error if an unexpected error occurs", () => __awaiter(void 0, void 0, void 0, function* () {
            setFav.mockRejectedValueOnce(new Error("An unexpected error"));
            yield setFavoriteCreditCard({ params: { id: "0" } }, mockSend);
            expect(mockSend.status).toHaveBeenNthCalledWith(1, 500);
            expect(mockSend.send).toHaveBeenNthCalledWith(1, {
                error: {
                    message: "An unexpected error",
                    cause: "Unexpected error",
                    date: new Date().toLocaleString(),
                },
            });
        }));
        it("should return a successful response", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = {
                message: "Favorite Credit Card successfully updated",
                creditCard: {
                    country: "United States",
                    city: "Silicon Valley",
                    zipCode: "90041",
                    street: "Sili Street",
                    houseNumber: "332",
                    isFavorite: false,
                    userId: 0,
                },
            };
            setFav.mockResolvedValueOnce(response.creditCard);
            yield setFavoriteCreditCard({ params: { id: "0" } }, mockSend);
            expect(mockSend.status).toHaveBeenCalledTimes(0);
            expect(mockSend.send).toHaveBeenNthCalledWith(1, response);
        }));
    });
});
