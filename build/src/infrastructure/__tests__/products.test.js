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
const pFindUnique = jest.fn();
const pFindMany = jest.fn();
const pCreate = jest.fn();
const pUpdate = jest.fn();
const cFindUnique = jest.fn();
const cFindMany = jest.fn();
const uFindUnique = jest.fn();
const { getProductById, saveProduct, getProductsByCategoryPaginated, getAllProductsPaginated, getProductsByUserId, patchProduct } = require("../products-repository");
const client_1 = __importDefault(require("../../../client"));
const { PrismaClient } = require("@prisma/client");
jest.mock("@prisma/client", () => {
    return {
        PrismaClient: function () {
            return {
                product: {
                    findUnique: pFindUnique,
                    findMany: pFindMany,
                    create: pCreate,
                    update: pUpdate,
                },
                category: {
                    findUnique: cFindUnique,
                    findMany: cFindMany,
                },
                user: {
                    findUnique: uFindUnique,
                }
            };
        },
    };
});
describe("Products infrastructure", () => {
    describe("get products by id ", () => {
        afterEach(() => {
            jest.clearAllMocks();
        });
        it("should return crud query as supposed", () => __awaiter(void 0, void 0, void 0, function* () {
            const id = "2";
            pFindUnique.mockResolvedValueOnce(`returned product with id: ${id}`);
            const res = yield getProductById(id);
            expect(res).toStrictEqual("returned product with id: 2");
            expect(client_1.default.product.findUnique).toHaveBeenCalledTimes(1);
        }));
        it("should return three random products", () => __awaiter(void 0, void 0, void 0, function* () {
            const id = "random";
            pFindUnique.mockResolvedValue({ id: 2 });
            pFindMany.mockResolvedValueOnce([{ id: 2 }]);
            const res = yield getProductById(id, 0, 5);
            expect(res).toStrictEqual([
                { id: 2 },
                { id: 2 },
                { id: 2 },
                { id: 2 },
                { id: 2 },
            ]);
            expect(client_1.default.product.findUnique).toHaveBeenCalledTimes(5);
            expect(client_1.default.product.findMany).toHaveBeenCalledTimes(1);
        }));
        it("should return a single random", () => __awaiter(void 0, void 0, void 0, function* () {
            pFindUnique.mockResolvedValueOnce("Product found");
            pFindMany.mockResolvedValueOnce([{ id: 5 }]);
            const id = "random";
            const res = yield getProductById(id, 1, 1);
            expect(res).toStrictEqual("Product found");
            expect(client_1.default.product.findUnique).toHaveBeenCalledTimes(1);
            expect(client_1.default.product.findMany).toHaveBeenCalledTimes(1);
        }));
        it("should return latest products", () => __awaiter(void 0, void 0, void 0, function* () {
            const id = "latest";
            pFindMany.mockResolvedValueOnce("Latest Products");
            const res = yield getProductById(id, 1, 1);
            expect(res).toStrictEqual("Latest Products");
            expect(client_1.default.product.findMany).toHaveBeenCalledTimes(1);
        }));
        it("should return error on latest", () => __awaiter(void 0, void 0, void 0, function* () {
            const id = "latest";
            pFindMany.mockResolvedValueOnce(undefined);
            expect(getProductById(id, 1, 1)).rejects.toThrow();
            expect(client_1.default.product.findMany).toHaveBeenCalledTimes(1);
        }));
        it("should return error", () => __awaiter(void 0, void 0, void 0, function* () {
            const id = "2";
            pFindUnique.mockResolvedValueOnce(null);
            expect(() => __awaiter(void 0, void 0, void 0, function* () {
                yield getProductById(id);
            })).rejects.toThrow(new Error("Product does not exist"));
            expect(client_1.default.product.findUnique).toHaveBeenCalledTimes(1);
        }));
    });
    describe("post Product ", () => {
        afterEach(() => {
            jest.clearAllMocks();
        });
        it("should return created with success", () => __awaiter(void 0, void 0, void 0, function* () {
            pCreate.mockResolvedValueOnce("created with success");
            const res = yield saveProduct({});
            expect(res).toStrictEqual("created with success");
            expect(client_1.default.product.create).toHaveBeenCalledTimes(1);
        }));
    });
    describe("get Products by Category Paginated ", () => {
        afterEach(() => {
            jest.clearAllMocks();
        });
        it("should return products paginaged if level 2", () => __awaiter(void 0, void 0, void 0, function* () {
            cFindUnique.mockResolvedValueOnce({ name: "pao", level: 2 });
            pFindMany.mockResolvedValueOnce("cool");
            const res = yield getProductsByCategoryPaginated("pao", 2);
            expect(res).toStrictEqual("cool");
            expect(client_1.default.product.findMany).toHaveBeenCalledTimes(1);
        }));
        it("should return products paginaged if level 1", () => __awaiter(void 0, void 0, void 0, function* () {
            cFindUnique.mockResolvedValueOnce({ name: "pao", level: 1 });
            cFindMany.mockResolvedValueOnce([
                { products: ["teste", "teste1", "teste2"] },
            ]);
            const res = yield getProductsByCategoryPaginated("pao", 1);
            expect(res).toStrictEqual(["teste1", "teste2"]);
            expect(client_1.default.category.findMany).toHaveBeenCalledTimes(1);
        }));
        it("should return category not found", () => __awaiter(void 0, void 0, void 0, function* () {
            cFindUnique.mockResolvedValueOnce(null);
            expect(() => __awaiter(void 0, void 0, void 0, function* () { yield getProductsByCategoryPaginated("pao", 1); })).rejects.toThrow(new Error("category not found"));
            expect(client_1.default.category.findUnique).toHaveBeenCalledTimes(1);
        }));
    });
    describe("get all products paginated ", () => {
        afterEach(() => {
            jest.clearAllMocks();
        });
        it("should return prods paginated", () => __awaiter(void 0, void 0, void 0, function* () {
            pFindMany.mockResolvedValueOnce(["1", "2"]);
            const res = yield getAllProductsPaginated(1, 2);
            expect(res).toStrictEqual(["1", "2"]);
            expect(client_1.default.product.findMany).toHaveBeenCalledTimes(1);
        }));
    });
    describe("get products by user Id", () => {
        afterEach(() => {
            jest.clearAllMocks();
        });
        it("should return prods paginated", () => __awaiter(void 0, void 0, void 0, function* () {
            uFindUnique.mockResolvedValueOnce({ products: "cool" });
            const res = yield getProductsByUserId(1);
            expect(res).toStrictEqual("cool");
            expect(client_1.default.user.findUnique).toHaveBeenCalledTimes(1);
        }));
        it("should return error", () => __awaiter(void 0, void 0, void 0, function* () {
            uFindUnique.mockResolvedValueOnce(null);
            expect(() => __awaiter(void 0, void 0, void 0, function* () { yield getProductsByUserId(1); })).rejects.toThrow(new Error("User does not exist"));
            expect(client_1.default.user.findUnique).toHaveBeenCalledTimes(1);
        }));
    });
    describe("patch products", () => {
        afterEach(() => {
            jest.clearAllMocks();
        });
        it("should return prods paginated", () => __awaiter(void 0, void 0, void 0, function* () {
            pFindUnique.mockResolvedValueOnce("prod");
            pUpdate.mockResolvedValueOnce("updated");
            const res = yield patchProduct(1, { name: "pao" });
            expect(res).toStrictEqual("updated");
            expect(client_1.default.product.findUnique).toHaveBeenCalledTimes(1);
            expect(client_1.default.product.update).toHaveBeenCalledTimes(1);
        }));
        it("should return error", () => __awaiter(void 0, void 0, void 0, function* () {
            pFindUnique.mockResolvedValueOnce(null);
            expect(() => __awaiter(void 0, void 0, void 0, function* () { yield patchProduct(1); })).rejects.toThrow(new Error("Product not found"));
            expect(client_1.default.product.findUnique).toHaveBeenCalledTimes(1);
        }));
    });
});
