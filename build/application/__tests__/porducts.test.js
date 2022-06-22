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
const { getProductById } = require("../Products");
const getProduct = require("../../Domain/products/get-productById");
const postProduct = require("../../domain/products/post-product");
jest.mock("../../Domain/products/get-productById", () => jest.fn());
jest.mock("../../domain/products/post-product", () => jest.fn());
describe("Products Endpoints", () => {
    describe("get Product by id", () => {
        const mockSend = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn().mockReturnThis(),
        };
        beforeEach(() => {
            jest.clearAllMocks();
        });
        it("should return a custom error object if id has letters in it", () => __awaiter(void 0, void 0, void 0, function* () {
            yield getProductById({ params: { id: "as" }, query: { page: 1, limit: 3 } }, mockSend);
            expect(mockSend.status).toHaveBeenNthCalledWith(1, StatusCodes.BAD_REQUEST);
            expect(mockSend.send).toHaveBeenNthCalledWith(1, {
                error: {
                    message: "Invalid id format",
                    cause: "Bad Request",
                    date: new Date().toLocaleString(),
                },
            });
        }));
        it("should return a custom error object if name doesn't match Product in database", () => __awaiter(void 0, void 0, void 0, function* () {
            getProduct.mockRejectedValueOnce(new Error("Product does not exist"));
            yield getProductById({ params: { id: "1" }, query: { page: 1, limit: 3 } }, mockSend);
            expect(mockSend.status).toHaveBeenNthCalledWith(1, StatusCodes.NOT_FOUND);
            expect(mockSend.send).toHaveBeenNthCalledWith(1, {
                error: {
                    message: "Product does not exist",
                    cause: "Not found",
                    date: new Date().toLocaleString(),
                },
            });
        }));
        it("should return a successful response", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = {
                id: 1,
                name: "TCL 1080p Roku Smart LED TV",
                userId: 3,
                description: "Smart Functionality offers access to over 5,000 streaming channels featuring more than 500,000 movies and TV episodes via Roku TV. \\n Specs: 1080p Full HD Resolution excellent detail, color, and contrast. \\n Wireless Connection: 802.11 2x2 Dual Band Direct-lit LED produces great picture quality with 60Hz refresh rate for fast moving action scenes with virtually no motion blur.",
                categoryName: "TV & Video",
                photos: [
                    "https://m.media-amazon.com/images/I/71wYJc19PiL._AC_SL1500_.jpg",
                    "https://m.media-amazon.com/images/I/71cpX-cXJKL._AC_SL1500_.jpg",
                    "https://m.media-amazon.com/images/I/71BKXlC429L._AC_SL1500_.jpg",
                    "https://m.media-amazon.com/images/I/61L4dogSYSL._AC_SL1500_.jpg"
                ],
                price: 168,
                uploadDate: "2022-06-15T15:18:48.214Z"
            };
            getProduct.mockResolvedValueOnce(response);
            yield getProductById({ params: { id: 2 }, query: {} }, mockSend);
            expect(mockSend.status).toHaveBeenCalledTimes(0);
            expect(mockSend.send).toHaveBeenNthCalledWith(1, response);
        }));
        it("should return a custom error required data missing", () => __awaiter(void 0, void 0, void 0, function* () {
            yield getProductById({ body: {} }, mockSend);
            //  expect(mockSend.status).toHaveBeenNthCalledWith(1,StatusCodes.BAD_REQUEST);
            expect(mockSend.send).toHaveBeenNthCalledWith(1, {
                error: {
                    message: "Required data missing",
                    cause: "Bad Request",
                    date: new Date().toLocaleString(),
                },
            });
        }));
    });
});
