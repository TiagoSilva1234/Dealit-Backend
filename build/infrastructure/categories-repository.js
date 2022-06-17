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
exports.getAllMainCategories = exports.getCategoryByMainCat = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getCategoryByMainCat = (cat) => __awaiter(void 0, void 0, void 0, function* () {
    const main = yield prisma.category.findUnique({
        where: {
            name: cat,
        },
    });
<<<<<<< HEAD
    console.log(cat);
=======
>>>>>>> 8f5970bf5c384bc5c08901bc38d3b0490acf379d
    if (main && main.level === 2 && main.upperLevel !== null) {
        const actualMain = yield prisma.category.findUnique({
            where: {
                name: main.upperLevel,
            },
        });
        if (actualMain)
            return { main: actualMain, subcategory: main };
        throw new Error("Something went wrong with database connection");
    }
<<<<<<< HEAD
    const subcategories = yield prisma.category.findMany({
        where: {
            upperLevel: cat,
        },
    });
    if (main)
        return { main: main, subcategories };
=======
    if (main) {
        const subcategories = yield prisma.category.findMany({
            where: {
                upperLevel: main.name,
            },
        });
        return { main: main, subcategories };
    }
>>>>>>> 8f5970bf5c384bc5c08901bc38d3b0490acf379d
    throw new Error("Something went wrong with database connection");
});
exports.getCategoryByMainCat = getCategoryByMainCat;
const getAllMainCategories = () => __awaiter(void 0, void 0, void 0, function* () {
    const main = yield prisma.category.findMany({
        where: {
            level: 1,
        },
    });
    const result = Promise.all(main.map((e) => __awaiter(void 0, void 0, void 0, function* () {
        const sub = yield prisma.category.findMany({
            where: {
                upperLevel: e.name,
            },
        });
        return Object.assign(Object.assign({}, e), { subcategories: sub });
    })));
    return result;
});
exports.getAllMainCategories = getAllMainCategories;
