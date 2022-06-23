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
const { getReviewsByUserId, getReviewsByProductId, getReviewsByReviewer, postReview, } = require("../reviews");
const getRevsByUserId = require("../../domain/reviews/get-reviewsByUserId");
jest.mock("../../domain/reviews/get-reviewsByUserId", () => jest.fn());
const getRevsByProductId = require("../../domain/reviews/get-reviewsByProductId");
jest.mock("../../domain/reviews/get-reviewsByProductId", () => jest.fn());
const getRevsByReviewer = require("../../domain/reviews/get-reviewsByReviewer");
jest.mock("../../domain/reviews/get-reviewsByReviewer", () => jest.fn());
const postRev = require("../../domain/reviews/post-review");
jest.mock("../../domain/reviews/post-review", () => jest.fn());
describe("Reviews Endpoint", () => {
    const mockSend = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn().mockReturnThis(),
    };
    describe("get reviews by user id", () => {
        beforeEach(() => {
            jest.clearAllMocks();
        });
        it("should return a custom error object if id has letters in it", () => __awaiter(void 0, void 0, void 0, function* () {
            yield getReviewsByUserId({ params: { userId: "q" } }, mockSend);
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
            getRevsByUserId.mockRejectedValueOnce(new Error("User does not exist"));
            yield getReviewsByUserId({ params: { userId: "9" } }, mockSend);
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
                    id: 1,
                    userId: 0,
                    comment: "Great seller! Fast and secure shipping!",
                    photo: "https://www.lg.com/pt/images/tv/MD05958458/gallery/medium01.jpg",
                    rating: 5,
                    reviewer: "Tobias Jánavês",
                },
            ];
            getRevsByUserId.mockResolvedValueOnce(response);
            yield getReviewsByUserId({ params: { userId: 0 } }, mockSend);
            expect(mockSend.status).toHaveBeenCalledTimes(0);
            expect(mockSend.send).toHaveBeenNthCalledWith(1, response);
        }));
        it("should return a custom error object if any unexpected error is met", () => __awaiter(void 0, void 0, void 0, function* () {
            getRevsByUserId.mockRejectedValueOnce(new Error("An unexpected Error"));
            yield getReviewsByUserId({ params: { userId: "0" } }, mockSend);
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
    describe("get reviews by product id", () => {
        beforeEach(() => {
            jest.clearAllMocks();
        });
        it("should return a custom error object if id has letters in it", () => __awaiter(void 0, void 0, void 0, function* () {
            yield getReviewsByProductId({ params: { productId: "q" } }, mockSend);
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
            getRevsByProductId.mockRejectedValueOnce(new Error("Product does not exist"));
            yield getReviewsByProductId({ params: { productId: "9" } }, mockSend);
            expect(mockSend.status).toHaveBeenNthCalledWith(1, 404);
            expect(mockSend.send).toHaveBeenNthCalledWith(1, {
                error: {
                    message: "Product does not exist",
                    cause: "Not found",
                    date: new Date().toLocaleString(),
                },
            });
        }));
        it("should return a successful response", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = [
                {
                    id: 1,
                    userId: 0,
                    comment: "Great seller! Fast and secure shipping!",
                    photo: "https://www.lg.com/pt/images/tv/MD05958458/gallery/medium01.jpg",
                    rating: 5,
                    reviewer: "Tobias Jánavês",
                },
            ];
            getRevsByProductId.mockResolvedValueOnce(response);
            yield getReviewsByProductId({ params: { productId: 0 } }, mockSend);
            expect(mockSend.status).toHaveBeenCalledTimes(0);
            expect(mockSend.send).toHaveBeenNthCalledWith(1, response);
        }));
        it("should return a custom error object if any unexpected error is met", () => __awaiter(void 0, void 0, void 0, function* () {
            getRevsByProductId.mockRejectedValueOnce(new Error("An unexpected Error"));
            yield getReviewsByProductId({ params: { productId: "0" } }, mockSend);
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
    describe("get reviews by reviewer", () => {
        beforeEach(() => {
            jest.clearAllMocks();
        });
        it("should return a custom error object if id doesn't match user in database", () => __awaiter(void 0, void 0, void 0, function* () {
            getRevsByReviewer.mockRejectedValueOnce(new Error("Reviewer does not exist"));
            yield getReviewsByReviewer({ params: { reviewer: "xxx" } }, mockSend);
            expect(mockSend.status).toHaveBeenNthCalledWith(1, 404);
            expect(mockSend.send).toHaveBeenNthCalledWith(1, {
                error: {
                    message: "Reviewer does not exist",
                    cause: "Not found",
                    date: new Date().toLocaleString(),
                },
            });
        }));
        it("should return a successful response", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = [
                {
                    id: 1,
                    userId: 0,
                    comment: "Great seller! Fast and secure shipping!",
                    photo: "https://www.lg.com/pt/images/tv/MD05958458/gallery/medium01.jpg",
                    rating: 5,
                    reviewer: "Tobias Jánavês",
                },
            ];
            getRevsByReviewer.mockResolvedValueOnce(response);
            yield getReviewsByReviewer({ params: { reviewer: "Tobias Jánavês" } }, mockSend);
            expect(mockSend.status).toHaveBeenCalledTimes(0);
            expect(mockSend.send).toHaveBeenNthCalledWith(1, response);
        }));
        it("should return a custom error object if any unexpected error is met", () => __awaiter(void 0, void 0, void 0, function* () {
            getRevsByReviewer.mockRejectedValueOnce(new Error("An unexpected Error"));
            yield getReviewsByReviewer({ params: { reviewer: "Tobias Jánavês" } }, mockSend);
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
    describe("post review", () => {
        afterEach(() => {
            jest.clearAllMocks();
        });
        it("should return a custom error if required data is missing", () => __awaiter(void 0, void 0, void 0, function* () {
            yield postReview({ body: {} }, mockSend);
            expect(mockSend.status).toHaveBeenNthCalledWith(1, 400);
            expect(mockSend.send).toHaveBeenNthCalledWith(1, {
                error: {
                    message: "Required data missing",
                    cause: "Bad Request",
                    date: new Date().toLocaleString(),
                },
            });
        }));
        it("should return a custom error if no user id or product id is provided", () => __awaiter(void 0, void 0, void 0, function* () {
            const mockReq = {
                body: {
                    comment: "Great product! Fast and secure shipping!",
                    photo: "https://www.lg.com/pt/images/tv/MD05958458/gallery/medium01.jpg",
                    rating: 5,
                    reviewer: "Tobias Jánavês",
                },
            };
            yield postReview(mockReq, mockSend);
            expect(mockSend.status).toHaveBeenNthCalledWith(1, 400);
            expect(mockSend.send).toHaveBeenNthCalledWith(1, {
                error: {
                    message: "Could not find an id for product or user",
                    cause: "Bad Request",
                    date: new Date().toLocaleString(),
                },
            });
        }));
        it("should return a custom error if an unexpected error occurs", () => __awaiter(void 0, void 0, void 0, function* () {
            const mockReq = {
                body: {
                    userId: 0,
                    comment: "Great product! Fast and secure shipping!",
                    photo: "https://www.lg.com/pt/images/tv/MD05958458/gallery/medium01.jpg",
                    rating: 5,
                    reviewer: "Tobias Jánavês",
                },
            };
            postRev.mockRejectedValueOnce(new Error("An unexpected error"));
            yield postReview(mockReq, mockSend);
            expect(mockSend.status).toHaveBeenNthCalledWith(1, 500);
            expect(mockSend.send).toHaveBeenNthCalledWith(1, {
                error: {
                    message: "An unexpected error",
                    cause: "Unexpected error",
                    date: new Date().toLocaleString(),
                },
            });
        }));
        it("should return a successful response for user review", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = {
                message: "Review successfully saved to database",
                review: {
                    userId: 0,
                    comment: "Great seller! Fast and secure shipping!",
                    photo: "https://www.lg.com/pt/images/tv/MD05958458/gallery/medium01.jpg",
                    rating: 5,
                    reviewer: "Tobias Jánavês",
                },
            };
            const mockReq = {
                body: {
                    userId: 0,
                    comment: "Great seller! Fast and secure shipping!",
                    photo: "https://www.lg.com/pt/images/tv/MD05958458/gallery/medium01.jpg",
                    rating: 5,
                    reviewer: "Tobias Jánavês",
                },
            };
            postRev.mockResolvedValueOnce(mockReq.body);
            yield postReview(mockReq, mockSend);
            expect(mockSend.status).toHaveBeenNthCalledWith(1, 201);
            expect(mockSend.send).toHaveBeenNthCalledWith(1, response);
        }));
        it("should return a successful response for product review", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = {
                message: "Review successfully saved to database",
                review: {
                    productId: 0,
                    comment: "Great product! Fast and secure shipping!",
                    photo: "https://www.lg.com/pt/images/tv/MD05958458/gallery/medium01.jpg",
                    rating: 5,
                    reviewer: "Tobias Jánavês",
                },
            };
            const mockReq = {
                body: {
                    productId: 0,
                    comment: "Great product! Fast and secure shipping!",
                    photo: "https://www.lg.com/pt/images/tv/MD05958458/gallery/medium01.jpg",
                    rating: 5,
                    reviewer: "Tobias Jánavês",
                },
            };
            postRev.mockResolvedValueOnce(mockReq.body);
            yield postReview(mockReq, mockSend);
            expect(mockSend.status).toHaveBeenNthCalledWith(1, 201);
            expect(mockSend.send).toHaveBeenNthCalledWith(1, response);
        }));
    });
});
