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
const orders_repository_1 = require("../../infrastructure/orders-repository");
exports.default = (data, prods) => __awaiter(void 0, void 0, void 0, function* () {
    let total = 0;
    prods.forEach((e) => {
        total += e.quantity * e.price;
    });
    return yield (0, orders_repository_1.postOrder)(data, prods, total);
});
