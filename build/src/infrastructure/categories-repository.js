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
exports.getAllMainCategories = exports.getCategoryByMainCat = void 0;
const client_1 = __importDefault(require("../../client"));
const getCategoryByMainCat = (cat) => __awaiter(void 0, void 0, void 0, function* () {
    const main = yield client_1.default.category.findUnique({
        where: {
            name: cat,
        },
    });
    if (main && main.level === 2 && main.upperLevel !== null) {
        const actualMain = yield client_1.default.category.findUnique({
            where: {
                name: main.upperLevel,
            },
        });
        if (actualMain)
            return { main: actualMain, subcategory: main };
        throw new Error("Something went wrong with database connection");
    }
    if (main) {
        const subcategories = yield client_1.default.category.findMany({
            where: {
                upperLevel: main.name,
            },
        });
        return { main: main, subcategories };
    }
    throw new Error("Something went wrong with database connection");
});
exports.getCategoryByMainCat = getCategoryByMainCat;
const getAllMainCategories = () => __awaiter(void 0, void 0, void 0, function* () {
    const main = yield client_1.default.category.findMany({
        where: {
            level: 1,
        },
    });
    const result = Promise.all(main.map((e) => __awaiter(void 0, void 0, void 0, function* () {
        const sub = yield client_1.default.category.findMany({
            where: {
                upperLevel: e.name,
            },
        });
        return Object.assign(Object.assign({}, e), { subcategories: sub });
    })));
    return result;
});
exports.getAllMainCategories = getAllMainCategories;
