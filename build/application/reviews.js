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
exports.postReview = exports.getReviewsByReviewer = exports.getReviewsByProductId = exports.getReviewsByUserId = void 0;
const get_reviewsByUserId_1 = __importDefault(require("../domain/reviews/get-reviewsByUserId"));
const get_reviewsByProductId_1 = __importDefault(require("../domain/reviews/get-reviewsByProductId"));
const get_reviewsByReviewer_1 = __importDefault(require("../domain/reviews/get-reviewsByReviewer"));
const post_review_1 = __importDefault(require("../domain/reviews/post-review"));
const http_status_codes_1 = require("http-status-codes");
const getReviewsByUserId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        if (isNaN(Number(userId))) {
            return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).send({
                error: {
                    message: "Invalid id format",
                    cause: "Bad Request",
                    date: new Date().toLocaleString(),
                },
            });
        }
        return res.send(yield (0, get_reviewsByUserId_1.default)(Number(userId)));
    }
    catch (e) {
        if (e.message === "User does not exist") {
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).send({
                error: {
                    message: e.message,
                    cause: "Not found",
                    date: new Date().toLocaleString(),
                },
            });
        }
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).send({
            error: {
                message: e.message,
                cause: "Unexpected error",
                date: new Date().toLocaleString(),
            },
        });
    }
});
exports.getReviewsByUserId = getReviewsByUserId;
const getReviewsByProductId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productId = req.params.productId;
        if (isNaN(Number(productId))) {
            return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).send({
                error: {
                    message: "Invalid id format",
                    cause: "Bad Request",
                    date: new Date().toLocaleString(),
                },
            });
        }
        return res.send(yield (0, get_reviewsByProductId_1.default)(Number(productId)));
    }
    catch (e) {
        if (e.message === "Product does not exist") {
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).send({
                error: {
                    message: e.message,
                    cause: "Not found",
                    date: new Date().toLocaleString(),
                },
            });
        }
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).send({
            error: {
                message: e.message,
                cause: "Unexpected error",
                date: new Date().toLocaleString(),
            },
        });
    }
});
exports.getReviewsByProductId = getReviewsByProductId;
const getReviewsByReviewer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reviewer = req.params.reviewer;
        return res.send(yield (0, get_reviewsByReviewer_1.default)(reviewer));
    }
    catch (e) {
        if (e.message === "Reviewer does not exist") {
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).send({
                error: {
                    message: e.message,
                    cause: "Not found",
                    date: new Date().toLocaleString(),
                },
            });
        }
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).send({
            error: {
                message: e.message,
                cause: "Unexpected error",
                date: new Date().toLocaleString(),
            },
        });
    }
});
exports.getReviewsByReviewer = getReviewsByReviewer;
const postReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, productId, comment, photo, rating, reviewer } = req.body;
        if (!(comment && photo && rating && reviewer)) {
            return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).send({
                error: {
                    message: "Required data missing",
                    cause: "Bad Request",
                    date: new Date().toLocaleString(),
                },
            });
        }
        if (userId !== undefined) {
            const data = {
                userId: Number(userId),
                comment,
                photo,
                rating: Number(rating),
                reviewer,
            };
            return res.status(http_status_codes_1.StatusCodes.CREATED).send({
                message: "Review successfully saved to datebase!",
                review: yield (0, post_review_1.default)(data),
            });
        }
        else if (productId !== undefined) {
            const data = {
                productId: Number(productId),
                comment,
                photo,
                rating: Number(rating),
                reviewer,
            };
            return res.status(http_status_codes_1.StatusCodes.CREATED).send({
                message: "Review successfully saved to datebase!",
                review: yield (0, post_review_1.default)(data),
            });
        }
        return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).send({
            error: {
                message: "Could not find an id for product or user",
                cause: "Bad Request",
                date: new Date().toLocaleString(),
            },
        });
    }
    catch (e) {
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).send({
            error: {
                message: e.message,
                cause: "Unexpected error",
                date: new Date().toLocaleString(),
            },
        });
    }
});
exports.postReview = postReview;
