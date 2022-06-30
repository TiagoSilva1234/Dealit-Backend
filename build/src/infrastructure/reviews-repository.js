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
exports.saveReview = exports.getReviewsByReviewer = exports.getReviewsByProductId = exports.getReviewsByUserId = void 0;
const client_1 = __importDefault(require("../../client"));
const getReviewsByUserId = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield client_1.default.user.findUnique({
        where: { id: userId },
        include: { reviews: true },
    });
    if (user) {
        const revs = user.reviews.map((r) => {
            return {
                id: r.id,
                userId: r.userId,
                comment: r.comment,
                photo: r.photo,
                rating: r.rating,
                reviewer: r.reviewer,
            };
        });
        return revs;
    }
    throw new Error("User does not exist");
});
exports.getReviewsByUserId = getReviewsByUserId;
const getReviewsByProductId = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield client_1.default.product.findUnique({
        where: { id: productId },
        include: { reviews: true },
    });
    if (product) {
        const revs = product.reviews.map((r) => {
            return {
                id: r.id,
                productId: r.productId,
                comment: r.comment,
                photo: r.photo,
                rating: r.rating,
                reviewer: r.reviewer,
            };
        });
        return revs;
    }
    throw new Error("Product does not exist");
});
exports.getReviewsByProductId = getReviewsByProductId;
const getReviewsByReviewer = (reviewerName) => __awaiter(void 0, void 0, void 0, function* () {
    const reviews = yield client_1.default.review.findMany({
        where: { reviewer: reviewerName },
    });
    if (reviews.length > 0) {
        return reviews;
    }
    throw new Error("Reviewer not found");
});
exports.getReviewsByReviewer = getReviewsByReviewer;
const saveReview = (data) => __awaiter(void 0, void 0, void 0, function* () {
    if (data.userId !== undefined) {
        return yield client_1.default.review.create({
            data: {
                user: { connect: { id: data.userId } },
                comment: data.comment,
                photo: data.photo,
                rating: data.rating,
                reviewer: data.reviewer,
            },
        });
    }
    if (data.productId) {
        return yield client_1.default.review.create({
            data: {
                product: { connect: { id: data.productId } },
                comment: data.comment,
                photo: data.photo,
                rating: data.rating,
                reviewer: data.reviewer,
            },
        });
    }
    throw new Error("Could not find an id for either product or user");
});
exports.saveReview = saveReview;
