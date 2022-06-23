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
exports.patchProduct = exports.getProductsByUserId = exports.getAllProductsPaginated = exports.getProductsByCategoryPaginated = exports.saveProduct = exports.getProductById = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getProductById = (id, skip, take) => __awaiter(void 0, void 0, void 0, function* () {
    if (id === "random") {
        return getRandomProduct(take);
    }
    if (id === "latest") {
        return getLatestProducts(skip, take);
    }
    const product = yield prisma.product.findUnique({
        where: {
            id: Number(id),
        },
    });
    if (product === null) {
        throw new Error("Product does not exist");
    }
    return product;
});
exports.getProductById = getProductById;
const saveProduct = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.product.create({
        data: {
            user: { connect: { id: data.userId } },
            name: data.name,
            description: data.description,
            category: { connect: { name: data.category } },
            photos: data.photos,
            price: data.price,
        },
    });
});
exports.saveProduct = saveProduct;
const getProductsByCategoryPaginated = (category, skip, take = 6) => __awaiter(void 0, void 0, void 0, function* () {
    const cat = yield prisma.category.findUnique({
        where: {
            name: category,
        },
    });
    if (cat !== null) {
        if (cat.level === 2) {
            const products = yield prisma.product.findMany({
                skip,
                take,
                where: {
                    categoryName: cat.name,
                },
            });
            return products;
        }
        const cats = yield prisma.category.findMany({
            where: {
                upperLevel: cat.name,
            },
            include: {
                products: true,
            },
        });
        let prods = [];
        cats.forEach((e) => e.products.forEach((prod) => prods.push(prod)));
        prods = prods.slice(skip, skip + take);
        return prods;
    }
    throw new Error("category not found");
});
exports.getProductsByCategoryPaginated = getProductsByCategoryPaginated;
const getAllProductsPaginated = (skip, take = 6) => __awaiter(void 0, void 0, void 0, function* () {
    return prisma.product.findMany({ skip, take });
});
exports.getAllProductsPaginated = getAllProductsPaginated;
const getProductsByUserId = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma.user.findUnique({
        where: { id: userId },
        include: { products: true },
    });
    if (user) {
        return user.products;
    }
    throw new Error("User does not exist");
});
exports.getProductsByUserId = getProductsByUserId;
//////////////////////////////////////////////////////////
//called in get product by id
const getRandomProduct = (num) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield prisma.product.findMany({
        orderBy: { id: "desc" },
        take: 1,
    });
    if (num === 1) {
        const randomId = Math.floor(Math.random() * product[0].id) + 1;
        const randomProduct = yield prisma.product.findUnique({
            where: { id: randomId },
        });
        if (randomProduct) {
            return randomProduct;
        }
        return product;
    }
    const ar = [];
    while (ar.length !== num) {
        let rep = false;
        const randomId = Math.floor(Math.random() * product[0].id) + 1;
        for (let i = 0; i < ar.length; i++) {
            if (randomId === ar[i].id) {
                rep = true;
            }
        }
        if (rep === true) {
            continue;
        }
        const randomProduct = yield prisma.product.findUnique({
            where: { id: randomId },
        });
        if (randomProduct) {
            ar.push(randomProduct);
        }
    }
    return ar;
});
const getLatestProducts = (skip, take) => __awaiter(void 0, void 0, void 0, function* () {
    const prodList = yield prisma.product.findMany({
        skip,
        take,
        orderBy: { uploadDate: "desc" },
    });
    if (prodList) {
        return prodList;
    }
    throw new Error("Something went wrong with database products fetch");
});
//////////////////////////////////////////////////////////
const patchProduct = (id, obj) => __awaiter(void 0, void 0, void 0, function* () {
    const before = yield prisma.product.findUnique({
        where: { id: id },
    });
    if (!before) {
        throw new Error("Product not found");
    }
    return yield prisma.product.update({
        where: { id: id },
        data: {
            name: !obj.name ? before.name : obj.name,
            description: !obj.description ? before.description : obj.description,
            photos: !obj.photos ? before.photos : obj.photos,
            price: !obj.price ? before.price : obj.price,
            user: { connect: { id: !obj.userId ? before.userId : obj.userId } },
            category: {
                connect: {
                    name: !obj.category ? before.categoryName : obj.category,
                },
            },
        },
    });
});
exports.patchProduct = patchProduct;
