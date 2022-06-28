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
const { getProductById } = require("../products-repository");
const client_1 = __importDefault(require("../../../client"));
jest.mock("@prisma/client", () => {
    return {
        PrismaClient: function () {
            return {
                product: {
                    findUnique: jest.fn(() => Promise.resolve("Product found")),
                    findMany: jest.fn(() => Promise.resolve("Found products")),
                    create: jest.fn(() => Promise.resolve("created with success")),
                },
            };
        },
    };
});
describe("Products infrastructure", () => {
    describe("get products by id ", () => {
        beforeEach(() => {
            jest.clearAllMocks();
        });
        it("should return crud query as supposed", () => __awaiter(void 0, void 0, void 0, function* () {
            const id = "2";
            const recieved = { where: { id: Number(id) } };
            const res = yield getProductById(id);
            expect(res).toStrictEqual("Product found");
            expect(client_1.default.product.findUnique).toHaveBeenCalledTimes(1);
        }));
    });
});
