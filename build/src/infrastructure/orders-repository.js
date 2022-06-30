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
exports.patchOrderDeliveryDate = exports.patchOrderSendDate = exports.postOrder = exports.getOrdersByUserId = void 0;
const client_1 = __importDefault(require("../../client"));
const getOrdersByUserId = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield client_1.default.user.findUnique({
        where: { id: userId },
        include: { orders: true },
    });
    if (user) {
        const orders = Promise.all(user.orders.map((order) => __awaiter(void 0, void 0, void 0, function* () {
            return yield client_1.default.order.findUnique({
                where: { id: order.id },
                include: { productInOrder: true },
            });
        })));
        console.log(orders);
        return orders;
    }
    throw new Error("User does not exist");
});
exports.getOrdersByUserId = getOrdersByUserId;
const postOrder = (data, arr, total) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield client_1.default.order.create({
        data: {
            buyDate: data.buyDate,
            user: { connect: { id: data.userId } },
            creditCard: { connect: { id: data.creditCardId } },
            total,
        },
    });
    arr.map((e) => __awaiter(void 0, void 0, void 0, function* () {
        yield client_1.default.productInOrder.create({
            data: {
                product: { connect: { id: e.productId } },
                order: { connect: { id: order.id } },
                quantity: e.quantity,
                price: e.price,
            },
        });
    }));
    return order;
});
exports.postOrder = postOrder;
const patchOrderSendDate = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield client_1.default.order.update({
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
    const order = yield client_1.default.order.update({
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
