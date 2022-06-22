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
const { StatusCodes } = require("http-status-codes");
const { getUserById, getEveryUser, patchUser, getUserByToken } = require("../users");
const getUser = require("../../Domain/users/get-userById");
const getAllUsers = require("../../Domain/users/get-allUsers");
const patchU = require("../../Domain/users/patch-user");
const userDataIsNotValid = require("../../utils/utils");
jest.mock("../../Domain/users/get-userById", () => jest.fn());
jest.mock("../../Domain/users/get-allUsers", () => jest.fn());
jest.mock("../../Domain/users/patch-user", () => jest.fn());
jest.mock("../../utils/utils", () => jest.fn());
describe("Users Endpoints", () => {
    describe("get user by id", () => {
        const mockSend = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn().mockReturnThis(),
        };
        beforeEach(() => {
            jest.clearAllMocks();
        });
        it("should return a custom error object if id has letters in it", () => __awaiter(void 0, void 0, void 0, function* () {
            yield getUserById({ params: { id: "qu1m" } }, mockSend);
            expect(mockSend.status).toHaveBeenNthCalledWith(1, StatusCodes.BAD_REQUEST);
            expect(mockSend.send).toHaveBeenNthCalledWith(1, {
                error: {
                    message: "Invalid id format",
                    cause: "Bad Request",
                    date: new Date().toLocaleString(),
                },
            });
        }));
        it("should return a custom error object if id doesn't match user in database", () => __awaiter(void 0, void 0, void 0, function* () {
            getUser.mockRejectedValueOnce(new Error("User does not exist"));
            yield getUserById({ params: { id: "90" } }, mockSend);
            expect(mockSend.status).toHaveBeenNthCalledWith(1, StatusCodes.NOT_FOUND);
            expect(mockSend.send).toHaveBeenNthCalledWith(1, {
                error: {
                    message: "User does not exist",
                    cause: "Not found",
                    date: new Date().toLocaleString(),
                },
            });
        }));
        it("should return a successful response", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = {
                id: 0,
                username: "DealIt",
                email: "dealit@dealit.com",
                phone: "910000000",
                address: {
                    country: "Portugal",
                    city: "Porto",
                },
            };
            getUser.mockResolvedValueOnce(response);
            yield getUserById({ params: { id: "1" } }, mockSend);
            expect(mockSend.status).toHaveBeenCalledTimes(0);
            expect(mockSend.send).toHaveBeenNthCalledWith(1, response);
        }));
    });
    describe("get all users", () => {
        const mockSend = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn().mockReturnThis(),
        };
        afterEach(() => {
            jest.clearAllMocks();
        });
        it("should return existing users", () => __awaiter(void 0, void 0, void 0, function* () {
            getAllUsers.mockResolvedValueOnce([
                { id: 1, username: "Manel", email: "email", phone: 964345765 },
            ]);
            yield getEveryUser({}, mockSend);
            expect(mockSend.status).toHaveBeenCalledTimes(0);
            expect(mockSend.send).toHaveBeenNthCalledWith(1, [
                { id: 1, username: "Manel", email: "email", phone: 964345765 },
            ]);
        }));
        it("should return internal error", () => __awaiter(void 0, void 0, void 0, function* () {
            yield getUserById({}, mockSend);
            expect(mockSend.status).toHaveBeenNthCalledWith(1, StatusCodes.INTERNAL_SERVER_ERROR);
            expect(mockSend.send).toHaveBeenNthCalledWith(1, {
                error: {
                    message: "Cannot read properties of undefined (reading 'id')",
                    cause: "Unexpected error",
                    date: new Date().toLocaleString(),
                },
            });
        }));
    });
    describe("patch user", () => {
        const mockSend = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn().mockReturnThis(),
        };
        afterEach(() => {
            jest.clearAllMocks();
        });
        it("should return a custom error object if id has letters in it", () => __awaiter(void 0, void 0, void 0, function* () {
            const data = {
                username: "DealIt",
                email: "dealit@dealit.com",
                phone: "910000000",
                oldPassword: "admin",
                newPassword: "admin",
            };
            yield patchUser({ params: { id: "qu1m" }, body: data }, mockSend);
            expect(mockSend.status).toHaveBeenNthCalledWith(1, StatusCodes.BAD_REQUEST);
            expect(mockSend.send).toHaveBeenNthCalledWith(1, {
                error: {
                    message: "Invalid id format",
                    cause: "Bad Request",
                    date: new Date().toLocaleString(),
                },
            });
        }));
        it("should return a custom error object if any field is invalid", () => __awaiter(void 0, void 0, void 0, function* () {
            const data = {
                username: "D",
                email: "deali",
                phone: "9",
                photo: "http://xyz.abc.com",
                oldPassword: "admin",
                newPassword: "admin",
            };
            const testerResponse = {
                check: true,
                cause: [
                    "Username is too short",
                    "Email is not valid",
                    "Phone number not valid",
                ],
            };
            userDataIsNotValid.mockReturnValueOnce(testerResponse);
            yield patchUser({ params: { id: "0" }, body: data }, mockSend);
            // expect(mockSend.status).toHaveBeenNthCalledWith(1, StatusCodes.BAD_REQUEST);
            expect(mockSend.send).toHaveBeenNthCalledWith(1, {
                error: {
                    message: [
                        "Username is too short",
                        "Email is not valid",
                        "Phone number not valid",
                    ],
                    cause: "Bad Request",
                    date: new Date().toLocaleString(),
                },
            });
        }));
        it("should return a custom error object if user doesn't exist", () => __awaiter(void 0, void 0, void 0, function* () {
            const data = {
                username: "DealIt",
                email: "dealit@dealit.com",
                phone: "910000000",
                oldPassword: "admin",
                newPassword: "admin",
            };
            const testerResponse = {
                check: false,
                cause: [],
            };
            userDataIsNotValid.mockReturnValueOnce(testerResponse);
            patchU.mockRejectedValueOnce(new Error("User not found"));
            yield patchUser({ params: { id: "1521" }, body: data }, mockSend);
            expect(mockSend.status).toHaveBeenNthCalledWith(1, StatusCodes.NOT_FOUND);
            expect(mockSend.send).toHaveBeenNthCalledWith(1, {
                error: {
                    message: "User not found",
                    cause: "Not Found",
                    date: new Date().toLocaleString(),
                },
            });
        }));
        it("should return a success response", () => __awaiter(void 0, void 0, void 0, function* () {
            const data = {
                username: "DealIt",
                email: "dealit@dealit.com",
                phone: "910000000",
                oldPassword: "admin",
                newPassword: "admin",
            };
            const testerResponse = {
                check: false,
                cause: [],
            };
            const res = {
                id: 0,
                username: "DealIt",
                email: "dealit@dealit.com",
                password: "$2a$10$bcHToFLcH6lDMMpbjFMg7O6D/yYp6kJ681exNkAOh7lEQBJxqZFKG",
                phone: "910000000",
                token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOjAsInVzZXJuYW1lIjoiRGVhbEl0IiwiZW1haWwiOiJkZWFsaXRAZGVhbGl0LmNvbSIsImlhdCI6MTY1NTMwMjY1NywiZXhwIjoxNjU1MzA5ODU3fQ.b0OLIK1HnPZy_cY9Mt48W5-VxVmJRoup11BUlo3fK5Y",
                photo: "https://toppng.com/uploads/preview/file-svg-profile-icon-vector-11562942678pprjdh47a8.png",
            };
            userDataIsNotValid.mockReturnValueOnce(testerResponse);
            patchU.mockResolvedValueOnce(res);
            yield patchUser({ params: { id: "0" }, body: data }, mockSend);
            expect(mockSend.status).toHaveBeenCalledTimes(0);
            expect(mockSend.send).toHaveBeenNthCalledWith(1, {
                message: "User successfully patched",
                user: res,
            });
        }));
    });
    describe("get user by token", () => {
        const mockSend = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn().mockReturnThis(),
        };
        afterEach(() => {
            jest.clearAllMocks();
        });
        it("should return a custom error object if id has letters in it", () => __awaiter(void 0, void 0, void 0, function* () {
            yield getUserById({ params: { id: "qu1m" } }, mockSend);
            expect(mockSend.status).toHaveBeenNthCalledWith(1, StatusCodes.BAD_REQUEST);
            expect(mockSend.send).toHaveBeenNthCalledWith(1, {
                error: {
                    message: "Invalid id format",
                    cause: "Bad Request",
                    date: new Date().toLocaleString(),
                },
            });
        }));
        it("should return a custom error object if id doesn't match user in database", () => __awaiter(void 0, void 0, void 0, function* () {
            getUser.mockRejectedValueOnce(new Error("User does not exist"));
            yield getUserById({ params: { id: "90" } }, mockSend);
            expect(mockSend.status).toHaveBeenNthCalledWith(1, StatusCodes.NOT_FOUND);
            expect(mockSend.send).toHaveBeenNthCalledWith(1, {
                error: {
                    message: "User does not exist",
                    cause: "Not found",
                    date: new Date().toLocaleString(),
                },
            });
        }));
        it("should return a successful response", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = {
                id: 0,
                username: "DealIt",
                email: "dealit@dealit.com",
                phone: "910000000",
                address: {
                    country: "Portugal",
                    city: "Porto",
                },
            };
            getUser.mockResolvedValueOnce(response);
            yield getUserById({ params: { id: "1" } }, mockSend);
            expect(mockSend.status).toHaveBeenCalledTimes(0);
            expect(mockSend.send).toHaveBeenNthCalledWith(1, response);
        }));
    });
});
