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
Object.defineProperty(exports, "__esModule", { value: true });
exports.patchOrderDeliveryDate = exports.patchOrderSendDate = exports.postOrder = exports.getOrdersByUserId = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getOrdersByUserId = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma.user.findUnique({
        where: { id: userId },
        include: { orders: true },
    });
    if (user) {
        return user.orders;
    }
    throw new Error("User does not exist");
});
exports.getOrdersByUserId = getOrdersByUserId;
const postOrder = (data, arr) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield prisma.order.create({
        data: {
            buyDate: data.buyDate,
            sendDate: data.sendDate,
            deliveryDate: data.deliveryDate,
            user: { connect: { id: data.userId } },
            sellerName: data.sellerName,
            creditCard: { connect: { id: data.creditCardId } },
        },
    });
    arr.map((e) => __awaiter(void 0, void 0, void 0, function* () {
        yield prisma.productsOrders.create({
            data: {
                productId: e,
                orderId: order.id,
            },
        });
    }));
    return order;
});
exports.postOrder = postOrder;
const patchOrderSendDate = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield prisma.order.update({
        where: {
            id: id,
        },
        data: {
            sendDate: data.sendDate,
        },
    });
    return order;
});
exports.patchOrderSendDate = patchOrderSendDate;
const patchOrderDeliveryDate = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield prisma.order.update({
        where: {
            id: id,
        },
        data: {
            deliveryDate: data.deliveryDate,
        },
    });
    return order;
});
exports.patchOrderDeliveryDate = patchOrderDeliveryDate;
