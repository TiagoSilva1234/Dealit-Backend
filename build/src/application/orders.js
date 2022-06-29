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
exports.patchOrderDelivery = exports.patchOrderSend = exports.postOrder = exports.getOrdersByUserId = void 0;
const http_status_codes_1 = require("http-status-codes");
const get_ordersByUserId_1 = __importDefault(require("../domain/orders/get-ordersByUserId"));
const post_order_1 = __importDefault(require("../domain/orders/post-order"));
const patch_orderSendDate_1 = __importDefault(require("../domain/orders/patch-orderSendDate"));
const patch_orderDeliveryDate_1 = __importDefault(require("../domain/orders/patch-orderDeliveryDate"));
const getOrdersByUserId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        return res.send(yield (0, get_ordersByUserId_1.default)(Number(userId)));
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
exports.getOrdersByUserId = getOrdersByUserId;
const postOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body.order;
        const prodIds = req.body.prods;
        if (!data || !prodIds) {
            return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).send({
                error: {
                    message: "Required inputs missing",
                    cause: "Bad request",
                    date: new Date().toLocaleString(),
                },
            });
        }
        if (prodIds.length === 0) {
            return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).send({
                error: {
                    message: "Order requires products",
                    cause: "Bad request",
                    date: new Date().toLocaleString(),
                },
            });
        }
        const result = yield (0, post_order_1.default)(data, prodIds);
        return res.status(http_status_codes_1.StatusCodes.CREATED).send({
            message: "Order successfully saved to database",
            order: result,
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
exports.postOrder = postOrder;
const patchOrderSend = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Number(req.params.id);
        const data = req.body;
        if (isNaN(Number(id))) {
            return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).send({
                error: {
                    message: "Invalid id format",
                    cause: "Bad Request",
                    date: new Date().toLocaleString(),
                },
            });
        }
        if (!data) {
            return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).send({
                error: {
                    message: "Required inputs missing",
                    cause: "Bad request",
                    date: new Date().toLocaleString(),
                },
            });
        }
        const result = yield (0, patch_orderSendDate_1.default)(id, data);
        return res.send({
            message: "Send date successfully updated",
            order: result,
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
exports.patchOrderSend = patchOrderSend;
const patchOrderDelivery = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const data = req.body;
        if (isNaN(Number(id))) {
            return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).send({
                error: {
                    message: "Invalid id format",
                    cause: "Bad Request",
                    date: new Date().toLocaleString(),
                },
            });
        }
        if (!data) {
            return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).send({
                error: {
                    message: "Required inputs missing",
                    cause: "Bad request",
                    date: new Date().toLocaleString(),
                },
            });
        }
        const result = yield (0, patch_orderDeliveryDate_1.default)(Number(id), data);
        return res.send({
            message: "Delivery date successfully updated",
            order: result,
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
exports.patchOrderDelivery = patchOrderDelivery;
