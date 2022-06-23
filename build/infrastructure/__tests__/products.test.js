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
const { getProductById } = require("../products-repository");
const { PrismaClient } = require("@prisma/client");
describe("Products infrastructure", () => {
    describe("get products by id", () => {
        it("test", () => __awaiter(void 0, void 0, void 0, function* () {
            yield getProductById("0", 1, 2);
            expect(PrismaClient().product.findUnique).toHaveBeenNthCalledWith(1, {
                where: {
                    id: Number(0),
                },
            });
        }));
    });
});
