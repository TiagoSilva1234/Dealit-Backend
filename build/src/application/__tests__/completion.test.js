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
const { GetTextCompletion } = require("../completion");
const getCompletion = require("../../domain/completion/get-textCompletion");
jest.mock("../../domain/completion/get-textCompletion", () => jest.fn());
describe("AI Completion Endpoint", () => {
    const mockSend = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn().mockReturnThis(),
    };
    describe("get text completion", () => {
        it("should return a custom error if required data is missing", () => __awaiter(void 0, void 0, void 0, function* () {
            yield GetTextCompletion({ body: {} }, mockSend);
            expect(mockSend.status).toHaveBeenNthCalledWith(1, 400);
            expect(mockSend.send).toHaveBeenNthCalledWith(1, {
                error: {
                    message: "Required data missing",
                    cause: "Bad Request",
                    date: new Date().toLocaleString(),
                },
            });
        }));
        it("should return a custom error object if any unexpected error is met", () => __awaiter(void 0, void 0, void 0, function* () {
            getCompletion.mockRejectedValueOnce(new Error("An unexpected Error"));
            yield GetTextCompletion({ body: { input: "I need some pants" } }, mockSend);
            expect(mockSend.status).toHaveBeenNthCalledWith(1, 500);
            expect(mockSend.send).toHaveBeenNthCalledWith(1, {
                error: {
                    message: "An unexpected Error",
                    cause: "Unexpected error",
                    date: new Date().toLocaleString(),
                },
            });
        }));
        it("should return a successful response", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = {
                response: " You need to check out our Clothing section: http://www.dealit.com/products?category=Clothing"
            };
            getCompletion.mockResolvedValueOnce(response);
            yield GetTextCompletion({ body: { input: "I need some pants" } }, mockSend);
            expect(mockSend.status).toHaveBeenCalledTimes(0);
            expect(mockSend.send).toHaveBeenNthCalledWith(1, response);
        }));
    });
});
