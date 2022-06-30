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
const { postAddress, setFavoriteAddress, getAddressesByUserId, getAddressAutocomplete, } = require("../addresses");
const postAdd = require("../../Domain/addresses/post-address");
jest.mock("../../Domain/addresses/post-address", () => jest.fn());
const setAddressIsFavorite = require("../../domain/addresses/patch-adressIsFavorite");
jest.mock("../../Domain/addresses//patch-adressIsFavorite", () => jest.fn());
const getAddsByUserId = require("../../domain/addresses/get-addressByUserId");
jest.mock("../../Domain/addresses/get-addressByUserId", () => jest.fn());
const getAddressAuto = require("../../domain/addresses/get-addressAuto");
jest.mock("../../Domain/addresses/get-addressAuto", () => jest.fn());
describe("Addresses Endpoint", () => {
    const mockSend = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn().mockReturnThis(),
    };
    describe("get addresses by user id", () => {
        beforeEach(() => {
            jest.clearAllMocks();
        });
        it("should return a custom error object if id has letters in it", () => __awaiter(void 0, void 0, void 0, function* () {
            yield getAddressesByUserId({ params: { userId: "q" } }, mockSend);
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
            getAddsByUserId.mockRejectedValueOnce(new Error("User does not exist"));
            yield getAddressesByUserId({ params: { userId: "9" } }, mockSend);
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
                    id: 4,
                    country: "Portugal",
                    city: "Porto",
                    zipCode: "4000-543",
                    street: "Rua do Porto",
                    houseNumber: "534",
                    isFavorite: true,
                    userId: 0,
                },
                {
                    id: 6,
                    country: "United States",
                    city: "Silicon Valley",
                    zipCode: "90041",
                    street: "Sili Street",
                    houseNumber: "332",
                    isFavorite: false,
                    userId: 0,
                },
            ];
            getAddsByUserId.mockResolvedValueOnce(response);
            yield getAddressesByUserId({ params: { userId: 0 } }, mockSend);
            expect(mockSend.status).toHaveBeenCalledTimes(0);
            expect(mockSend.send).toHaveBeenNthCalledWith(1, response);
        }));
        it("should return a custom error object if any unexpected error is met", () => __awaiter(void 0, void 0, void 0, function* () {
            getAddsByUserId.mockRejectedValueOnce(new Error("An unexpected Error"));
            yield getAddressesByUserId({ params: { userId: "0" } }, mockSend);
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
    describe("post address", () => {
        afterEach(() => {
            jest.clearAllMocks();
        });
        it("should return a custom error if required data is missing", () => __awaiter(void 0, void 0, void 0, function* () {
            yield postAddress({ body: {} }, mockSend);
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
                    country: "United States",
                    city: "Silicon Valley",
                    zipCode: "90041",
                    street: "Sili Street",
                    houseNumber: "332",
                    isFavorite: false,
                    userId: 0,
                },
            };
            postAdd.mockRejectedValueOnce(new Error("An unexpected error"));
            yield postAddress(mockReq, mockSend);
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
                message: "Address successfully saved to database",
                address: {
                    country: "United States",
                    city: "Silicon Valley",
                    zipCode: "90041",
                    street: "Sili Street",
                    houseNumber: "332",
                    isFavorite: false,
                    userId: 0,
                },
            };
            const mockReq = {
                body: {
                    country: "United States",
                    city: "Silicon Valley",
                    zipCode: "90041",
                    street: "Sili Street",
                    houseNumber: "332",
                    isFavorite: false,
                    userId: 0,
                },
            };
            postAdd.mockResolvedValueOnce(mockReq.body);
            yield postAddress(mockReq, mockSend);
            expect(mockSend.status).toHaveBeenNthCalledWith(1, 201);
            expect(mockSend.send).toHaveBeenNthCalledWith(1, response);
        }));
    });
    describe("set favorite address", () => {
        afterEach(() => {
            jest.clearAllMocks();
        });
        it("should return a custom error if id has letters", () => __awaiter(void 0, void 0, void 0, function* () {
            yield setFavoriteAddress({ params: { id: "f" } }, mockSend);
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
            setAddressIsFavorite.mockRejectedValueOnce(new Error("An unexpected error"));
            yield setFavoriteAddress({ params: { id: "0" } }, mockSend);
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
                message: "Favorite address successfully updated",
                address: {
                    country: "United States",
                    city: "Silicon Valley",
                    zipCode: "90041",
                    street: "Sili Street",
                    houseNumber: "332",
                    isFavorite: false,
                    userId: 0,
                },
            };
            setAddressIsFavorite.mockResolvedValueOnce(response.address);
            yield setFavoriteAddress({ params: { id: "0" } }, mockSend);
            expect(mockSend.status).toHaveBeenCalledTimes(0);
            expect(mockSend.send).toHaveBeenNthCalledWith(1, response);
        }));
    });
    describe("get address autocomplete", () => {
        it("should return a custom error query param is not of string type", () => __awaiter(void 0, void 0, void 0, function* () {
            yield getAddressAutocomplete({ query: { text: ["asd", "sdf"] } }, mockSend);
            expect(mockSend.status).toHaveBeenNthCalledWith(1, 400);
            expect(mockSend.send).toHaveBeenNthCalledWith(1, {
                error: {
                    message: "Invalid query parameter type",
                    cause: "Bad Request",
                    date: new Date().toLocaleString(),
                },
            });
        }));
        it("should return a custom error if an unexpected error occurs", () => __awaiter(void 0, void 0, void 0, function* () {
            getAddressAuto.mockRejectedValueOnce(new Error("An unexpected error"));
            yield getAddressAutocomplete({ query: { text: "porto" } }, mockSend);
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
            const mockRes = [{ address: "a" }, { address: "b" }];
            getAddressAuto.mockResolvedValueOnce(mockRes);
            yield getAddressAutocomplete({ query: { text: "porto" } }, mockSend);
            // expect(mockSend.status).toHaveBeenCalledTimes(0);
            expect(mockSend.send).toHaveBeenNthCalledWith(1, mockRes);
        }));
    });
});
