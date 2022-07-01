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
const aFindUnique = jest.fn();
const aUpdateMany = jest.fn();
const aCreate = jest.fn();
const aUpdate = jest.fn();
const cFindUnique = jest.fn();
const cFindMany = jest.fn();
const uFindUnique = jest.fn();
const { getAddressesByUserId, } = require("../addresses-repository");
const client_1 = __importDefault(require("../../../client"));
const { PrismaClient } = require("@prisma/client");
jest.mock("@prisma/client", () => {
    return {
        PrismaClient: function () {
            return {
                address: {
                    findUnique: aFindUnique,
                    create: aCreate,
                    updateMany: aUpdateMany,
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
            uFindUnique.mockResolvedValueOnce(`returned product with id: ${id}`);
            const res = yield getAddressesByUserId(id);
            expect(res).toStrictEqual("returned product with id: 2");
            expect(client_1.default.product.findUnique).toHaveBeenCalledTimes(1);
        }));
    });
});
