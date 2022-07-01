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
const { getOrdersByUserId, postOrder, patchOrderDelivery, patchOrderSend } = require("../orders");
const getUserOrders = require("../../domain/orders/get-ordersByUserId");
const postOrders = require("../../domain/orders/post-order");
const patchOrderSendDate = require("../../domain/orders/patch-orderSendDate");
const patchOrderDeliveryDate = require("../../domain/orders/patch-orderDeliveryDate");
jest.mock("../../domain/orders/get-ordersByUserId", () => jest.fn());
jest.mock("../../domain/orders/post-order", () => jest.fn());
jest.mock("../../domain/orders/patch-orderSendDate", () => jest.fn());
jest.mock("../../domain/orders/patch-orderDeliveryDate", () => jest.fn());
describe("Orders Endpoints", () => {
    describe("get Orders by user id", () => {
        const mockSend = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn().mockReturnThis(),
        };
        beforeEach(() => {
            jest.clearAllMocks();
        });
        it("should return a custom error object if id has letters in it", () => __awaiter(void 0, void 0, void 0, function* () {
            yield getOrdersByUserId({ params: { userId: "q" } }, mockSend);
            expect(mockSend.status).toHaveBeenNthCalledWith(1, 400);
            expect(mockSend.send).toHaveBeenNthCalledWith(1, {
                error: {
                    message: "Invalid id format",
                    cause: "Bad Request",
                    date: new Date().toLocaleString(),
                },
            });
        }));
        it("should return orders by user id", () => __awaiter(void 0, void 0, void 0, function* () {
            getUserOrders.mockResolvedValueOnce({});
            yield getOrdersByUserId({ params: { userId: "1" } }, mockSend);
            expect(mockSend.status).toHaveBeenCalledTimes(0);
            expect(mockSend.send).toHaveBeenNthCalledWith(1, {});
        }));
        it("should return orders by user id", () => __awaiter(void 0, void 0, void 0, function* () {
            getUserOrders.mockRejectedValueOnce(new Error("User does not exist"));
            yield getOrdersByUserId({ params: { userId: "1" } }, mockSend);
            expect(mockSend.status).toHaveBeenNthCalledWith(1, 404);
            expect(mockSend.send).toHaveBeenNthCalledWith(1, {
                error: {
                    message: "User does not exist",
                    cause: "Not found",
                    date: new Date().toLocaleString(),
                },
            });
        }));
        it("should return unexpeccted error", () => __awaiter(void 0, void 0, void 0, function* () {
            getUserOrders.mockRejectedValueOnce(new Error("error test"));
            yield getOrdersByUserId({ params: { userId: "1" } }, mockSend);
            expect(mockSend.status).toHaveBeenNthCalledWith(1, 500);
            expect(mockSend.send).toHaveBeenNthCalledWith(1, {
                error: {
                    message: "error test",
                    cause: "Unexpected error",
                    date: new Date().toLocaleString(),
                },
            });
        }));
        it("should return unexpeccted error", () => __awaiter(void 0, void 0, void 0, function* () {
            getUserOrders.mockRejectedValueOnce(new Error("error test"));
            yield getOrdersByUserId({ params: { userId: "1" } }, mockSend);
            expect(mockSend.status).toHaveBeenNthCalledWith(1, 500);
            expect(mockSend.send).toHaveBeenNthCalledWith(1, {
                error: {
                    message: "error test",
                    cause: "Unexpected error",
                    date: new Date().toLocaleString(),
                },
            });
        }));
    });
    describe("post orders", () => {
        const mockSend = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn().mockReturnThis(),
        };
        beforeEach(() => {
            jest.clearAllMocks();
        });
        it("should return Required inputs missing", () => __awaiter(void 0, void 0, void 0, function* () {
            yield postOrder({ params: { userId: "1" }, body: {} }, mockSend);
            expect(mockSend.status).toHaveBeenNthCalledWith(1, 400);
            expect(mockSend.send).toHaveBeenNthCalledWith(1, {
                error: {
                    message: "Required inputs missing",
                    cause: "Bad request",
                    date: new Date().toLocaleString(),
                },
            });
        }));
        it("should return Order requires products", () => __awaiter(void 0, void 0, void 0, function* () {
            yield postOrder({ params: { userId: "1" }, body: { order: {}, prods: [] } }, mockSend);
            expect(mockSend.status).toHaveBeenNthCalledWith(1, 400);
            expect(mockSend.send).toHaveBeenNthCalledWith(1, {
                error: {
                    message: "Order requires products",
                    cause: "Bad request",
                    date: new Date().toLocaleString(),
                },
            });
        }));
        it("should return Orders successfully saved", () => __awaiter(void 0, void 0, void 0, function* () {
            postOrders.mockResolvedValueOnce({});
            yield postOrder({ params: { userId: "1" }, body: { order: {}, prods: ["", ""] } }, mockSend);
            expect(mockSend.status).toHaveBeenNthCalledWith(1, 201);
            expect(mockSend.send).toHaveBeenNthCalledWith(1, {
                message: "Order successfully saved to database",
                order: {},
            });
        }));
        it("should return Unexpected Error", () => __awaiter(void 0, void 0, void 0, function* () {
            postOrders.mockRejectedValueOnce(new Error("test error"));
            yield postOrder({ params: { userId: "1" }, body: { order: {}, prods: ["", ""] } }, mockSend);
            expect(mockSend.status).toHaveBeenNthCalledWith(1, 500);
            expect(mockSend.send).toHaveBeenNthCalledWith(1, {
                error: {
                    message: "test error",
                    cause: "Unexpected error",
                    date: new Date().toLocaleString(),
                },
            });
        }));
    });
    describe("patch orders Delivery Date", () => {
        const mockSend = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn().mockReturnThis(),
        };
        beforeEach(() => {
            jest.clearAllMocks();
        });
        it("should return invalid id format", () => __awaiter(void 0, void 0, void 0, function* () {
            yield patchOrderDelivery({ params: { userId: "q" }, body: {} }, mockSend);
            expect(mockSend.status).toHaveBeenNthCalledWith(1, 400);
            expect(mockSend.send).toHaveBeenNthCalledWith(1, {
                error: {
                    message: "Invalid id format",
                    cause: "Bad Request",
                    date: new Date().toLocaleString(),
                },
            });
        }));
        it("should return Required inputs missing", () => __awaiter(void 0, void 0, void 0, function* () {
            yield patchOrderDelivery({ params: { id: "1" } }, mockSend);
            expect(mockSend.status).toHaveBeenNthCalledWith(1, 400);
            expect(mockSend.send).toHaveBeenNthCalledWith(1, {
                error: {
                    message: "Required inputs missing",
                    cause: "Bad request",
                    date: new Date().toLocaleString(),
                },
            });
        }));
        it("should return Required inputs missing", () => __awaiter(void 0, void 0, void 0, function* () {
            patchOrderDeliveryDate.mockResolvedValueOnce({});
            yield patchOrderDelivery({ params: { id: "1" }, body: {} }, mockSend);
            expect(mockSend.status).toHaveBeenCalledTimes(0);
            expect(mockSend.send).toHaveBeenNthCalledWith(1, {
                message: "Delivery date successfully updated",
                order: {},
            });
        }));
        it("should return Orders Unexpected error", () => __awaiter(void 0, void 0, void 0, function* () {
            patchOrderDeliveryDate.mockRejectedValueOnce(new Error("test error"));
            yield patchOrderDelivery({ params: { id: "1" }, body: {} }, mockSend);
            expect(mockSend.status).toHaveBeenNthCalledWith(1, 500);
            expect(mockSend.send).toHaveBeenNthCalledWith(1, {
                error: {
                    message: "test error",
                    cause: "Unexpected error",
                    date: new Date().toLocaleString(),
                },
            });
        }));
    });
    describe("patch orders send Date", () => {
        const mockSend = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn().mockReturnThis(),
        };
        beforeEach(() => {
            jest.clearAllMocks();
        });
        it("should return invalid id format", () => __awaiter(void 0, void 0, void 0, function* () {
            yield patchOrderSend({ params: { userId: "q" }, body: {} }, mockSend);
            expect(mockSend.status).toHaveBeenNthCalledWith(1, 400);
            expect(mockSend.send).toHaveBeenNthCalledWith(1, {
                error: {
                    message: "Invalid id format",
                    cause: "Bad Request",
                    date: new Date().toLocaleString(),
                },
            });
        }));
        it("should return Required inputs missing", () => __awaiter(void 0, void 0, void 0, function* () {
            yield patchOrderSend({ params: { id: "1" } }, mockSend);
            expect(mockSend.status).toHaveBeenNthCalledWith(1, 400);
            expect(mockSend.send).toHaveBeenNthCalledWith(1, {
                error: {
                    message: "Required inputs missing",
                    cause: "Bad request",
                    date: new Date().toLocaleString(),
                },
            });
        }));
        it("should return Required inputs missing", () => __awaiter(void 0, void 0, void 0, function* () {
            patchOrderSendDate.mockResolvedValueOnce({});
            yield patchOrderSend({ params: { id: "1" }, body: {} }, mockSend);
            expect(mockSend.status).toHaveBeenCalledTimes(0);
            expect(mockSend.send).toHaveBeenNthCalledWith(1, {
                message: "Send date successfully updated",
                order: {},
            });
        }));
        it("should return Orders Unexpected error", () => __awaiter(void 0, void 0, void 0, function* () {
            patchOrderSendDate.mockRejectedValueOnce(new Error("test error"));
            yield patchOrderSend({ params: { id: "1" }, body: {} }, mockSend);
            expect(mockSend.status).toHaveBeenNthCalledWith(1, 500);
            expect(mockSend.send).toHaveBeenNthCalledWith(1, {
                error: {
                    message: "test error",
                    cause: "Unexpected error",
                    date: new Date().toLocaleString(),
                },
            });
        }));
    });
});
