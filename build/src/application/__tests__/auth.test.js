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
const { registerUser, userLogin } = require("../auth");
const postUser = require("../../domain/auth/post-user");
const postLogin = require("../../domain/auth/post-login");
const userDataIsNotValids = require("../../utils/utils");
jest.mock("../../domain/auth/post-user", () => jest.fn());
jest.mock("../../domain/auth/post-login", () => jest.fn());
jest.mock("../../utils/utils", () => jest.fn());
describe("auth Endpoints", () => {
    const mockSend = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn().mockReturnThis(),
        cookie: jest.fn().mockReturnThis(),
    };
    describe("Register user endpoint", () => {
        beforeEach(() => {
            jest.clearAllMocks();
        });
        it("should return Required data missing", () => __awaiter(void 0, void 0, void 0, function* () {
            yield registerUser({ body: { address: {} } }, mockSend);
            expect(mockSend.status).toHaveBeenNthCalledWith(1, 400);
            expect(mockSend.send).toHaveBeenNthCalledWith(1, {
                error: {
                    message: "Required data missing",
                    cause: "Bad Request",
                    date: new Date().toLocaleString(),
                },
            });
        }));
        it("should return Successefully saved", () => __awaiter(void 0, void 0, void 0, function* () {
            const mock = {
                body: {
                    username: "Jacques Tronault",
                    address: {
                        country: "France",
                        city: "Paris",
                        zipCode: "2314123",
                        street: "Rue de Mock",
                        houseNumber: "532",
                        isFavorite: true,
                    },
                    email: "jacq@email.com",
                    password: "P#s5w0rd",
                    phone: "923456789",
                },
            };
            const test = { check: false, cause: [""] };
            userDataIsNotValids.mockImplementationOnce(() => test);
            postUser.mockResolvedValueOnce({});
            yield registerUser(mock, mockSend);
            expect(mockSend.status).toHaveBeenNthCalledWith(1, 201);
            expect(mockSend.send).toHaveBeenNthCalledWith(1, {
                message: "User successfully saved to database!",
                user: {},
            });
        }));
        it("should return data is not valid", () => __awaiter(void 0, void 0, void 0, function* () {
            const mock = {
                body: {
                    username: "Jacques Tronault",
                    address: {
                        country: "France",
                        city: "Paris",
                        zipCode: "2314123",
                        street: "Rue de Mock",
                        houseNumber: "532",
                        isFavorite: true,
                    },
                    photo: "asda",
                    email: "jacq@email.com",
                    password: "P#s5w0rd",
                    phone: "923456789",
                },
            };
            const test = { check: true, cause: ["not valid"] };
            userDataIsNotValids.mockImplementationOnce(() => test);
            yield registerUser(mock, mockSend);
            expect(mockSend.status).toHaveBeenNthCalledWith(1, 400);
            expect(mockSend.send).toHaveBeenNthCalledWith(1, {
                error: {
                    message: ["not valid"],
                    cause: "Bad Request",
                    date: new Date().toLocaleString(),
                },
            });
        }));
        it("should return data is not valid", () => __awaiter(void 0, void 0, void 0, function* () {
            const mock = {
                body: {
                    username: "Jacques Tronault",
                    address: {
                        country: "France",
                        city: "Paris",
                        zipCode: "2314123",
                        street: "Rue de Mock",
                        houseNumber: "532",
                        isFavorite: true,
                    },
                    creditCard: {
                        cardNumber: 123,
                        cvc: 123,
                        expiryDate: "asda",
                    },
                    photo: "asda",
                    email: "jacq@email.com",
                    password: "P#s5w0rd",
                    phone: "923456789",
                },
            };
            const test = { check: true, cause: ["not valid"] };
            userDataIsNotValids.mockImplementationOnce(() => test);
            yield registerUser(mock, mockSend);
            expect(mockSend.status).toHaveBeenNthCalledWith(1, 400);
            expect(mockSend.send).toHaveBeenNthCalledWith(1, {
                error: {
                    message: ["not valid"],
                    cause: "Bad Request",
                    date: new Date().toLocaleString(),
                },
            });
        }));
        it("should return user already exists", () => __awaiter(void 0, void 0, void 0, function* () {
            const mock = {
                body: {
                    username: "Jacques Tronault",
                    address: {
                        country: "France",
                        city: "Paris",
                        zipCode: "2314123",
                        street: "Rue de Mock",
                        houseNumber: "532",
                        isFavorite: true,
                    },
                    creditCard: {
                        cardNumber: 123,
                        cvc: 123,
                        expiryDate: "asda",
                    },
                    email: "jacq@email.com",
                    password: "P#s5w0rd",
                    phone: "923456789",
                },
            };
            const test = { check: false, cause: [""] };
            userDataIsNotValids.mockImplementationOnce(() => test);
            postUser.mockRejectedValueOnce(new Error("User Already Exists. Please Login"));
            yield registerUser(mock, mockSend);
            expect(mockSend.status).toHaveBeenNthCalledWith(1, 409);
            expect(mockSend.send).toHaveBeenNthCalledWith(1, {
                error: {
                    message: "User Already Exists. Please Login",
                    cause: "Conflict",
                    date: new Date().toLocaleString(),
                },
            });
        }));
        it("should return internal server error", () => __awaiter(void 0, void 0, void 0, function* () {
            const mock = {
                body: {
                    username: "Jacques Tronault",
                    address: {
                        country: "France",
                        city: "Paris",
                        zipCode: "2314123",
                        street: "Rue de Mock",
                        houseNumber: "532",
                        isFavorite: true,
                    },
                    email: "jacq@email.com",
                    password: "P#s5w0rd",
                    phone: "923456789",
                },
            };
            const test = { check: false, cause: [""] };
            userDataIsNotValids.mockImplementationOnce(() => test);
            postUser.mockRejectedValueOnce(new Error("test"));
            yield registerUser(mock, mockSend);
            expect(mockSend.status).toHaveBeenNthCalledWith(1, 500);
            expect(mockSend.send).toHaveBeenNthCalledWith(1, {
                error: {
                    message: "test",
                    cause: "Unexpected error",
                    date: new Date().toLocaleString(),
                },
            });
        }));
        describe("login user", () => {
            beforeEach(() => {
                jest.clearAllMocks();
            });
            it("should return all inputs are required", () => __awaiter(void 0, void 0, void 0, function* () {
                yield userLogin({ body: {} }, mockSend);
                expect(mockSend.status).toHaveBeenNthCalledWith(1, 400);
                expect(mockSend.send).toHaveBeenNthCalledWith(1, {
                    error: {
                        message: "All inputs are required",
                        cause: "Bad Request",
                        date: new Date().toLocaleString(),
                    },
                });
            }));
            it("should return Login successfully completed", () => __awaiter(void 0, void 0, void 0, function* () {
                postLogin.mockResolvedValueOnce({ token: "teste" });
                yield userLogin({ body: { email: "claudio", password: "renato" } }, mockSend);
                expect(mockSend.status).toHaveBeenCalledTimes(0);
                expect(mockSend.cookie).toHaveBeenNthCalledWith(1, "token", "teste", { "domain": ".dealit-backend.herokuapp.com", "path": "/dealit/api", "secure": true });
                expect(mockSend.send).toHaveBeenNthCalledWith(1, {
                    message: "Login successfully completed",
                    res: { token: "teste" },
                });
            }));
            it("should return invalid credentials", () => __awaiter(void 0, void 0, void 0, function* () {
                postLogin.mockRejectedValueOnce(new Error("Invalid credentials"));
                yield userLogin({ body: { email: "claudio", password: "renato" } }, mockSend);
                expect(mockSend.status).toHaveBeenNthCalledWith(1, 401);
                expect(mockSend.send).toHaveBeenNthCalledWith(1, {
                    error: {
                        message: "Invalid credentials",
                        cause: "Unauthorized",
                        date: new Date().toLocaleString(),
                    },
                });
            }));
            it("should return internal server error", () => __awaiter(void 0, void 0, void 0, function* () {
                postLogin.mockRejectedValueOnce(new Error("test"));
                yield userLogin({ body: { email: "claudio", password: "renato" } }, mockSend);
                expect(mockSend.status).toHaveBeenNthCalledWith(1, 500);
                expect(mockSend.send).toHaveBeenNthCalledWith(1, {
                    error: {
                        message: "test",
                        cause: "Unexpected error",
                        date: new Date().toLocaleString(),
                    },
                });
            }));
        });
    });
});
