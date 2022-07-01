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
exports.patchProduct = exports.getSoldProductStatsByUserId = exports.getProductsByUserId = exports.getAllProductsPaginated = exports.getProductsByCategoryPaginated = exports.saveProduct = exports.getProductById = void 0;
const client_1 = __importDefault(require("../../client"));
const getProductById = (id, skip, take) => __awaiter(void 0, void 0, void 0, function* () {
    if (id === "random") {
        return getRandomProduct(take);
    }
    if (id === "latest") {
        return getLatestProducts(skip, take);
    }
    const product = yield client_1.default.product.findUnique({
        where: {
            id: Number(id),
        },
    });
    if (product === null || product === undefined) {
        throw new Error("Product does not exist");
    }
    return product;
});
exports.getProductById = getProductById;
const saveProduct = (data, upload, req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield client_1.default.product.create({
        data: {
            user: { connect: { id: data.userId } },
            name: data.name,
            description: data.description,
            category: { connect: { name: data.category } },
            photos: data.photos,
            price: data.price,
        },
    });
    upload(req, res, function (err) {
        if (err) {
            console.log(err);
            return "pao";
        }
        console.log("done upload---");
        res.json({ status: "completed" });
    });
    return result;
});
exports.saveProduct = saveProduct;
const getProductsByCategoryPaginated = (category, skip, take = 6) => __awaiter(void 0, void 0, void 0, function* () {
    const cat = yield client_1.default.category.findUnique({
        where: {
            name: category,
        },
    });
    if (cat !== null) {
        if (cat.level === 2) {
            const products = yield client_1.default.product.findMany({
                skip,
                take,
                where: {
                    categoryName: cat.name,
                },
            });
            return products;
        }
        const cats = yield client_1.default.category.findMany({
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
    return client_1.default.product.findMany({ skip, take });
});
exports.getAllProductsPaginated = getAllProductsPaginated;
const getProductsByUserId = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield client_1.default.user.findUnique({
        where: { id: userId },
        include: { products: true },
    });
    if (user) {
        return user.products;
    }
    throw new Error("User does not exist");
});
exports.getProductsByUserId = getProductsByUserId;
const getSoldProductStatsByUserId = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield client_1.default.user.findUnique({
        where: { id: userId },
        include: { products: true },
    });
    const orders = yield client_1.default.order.findMany({
        include: { productInOrder: true },
    });
    if (orders && user) {
        let num = 0;
        let sum = 0;
        orders.forEach((order) => {
            order.productInOrder.forEach((prod) => {
                user.products.forEach((p) => {
                    console.log(p);
                    console.log(prod);
                    if (p.id === prod.productId) {
                        num++;
                        sum += prod.price;
                    }
                });
            });
        });
        return { num, sum };
    }
    throw new Error("User does not exist");
});
exports.getSoldProductStatsByUserId = getSoldProductStatsByUserId;
//////////////////////////////////////////////////////////
//called in get product by id
const getRandomProduct = (num) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield client_1.default.product.findMany({
            orderBy: { id: "desc" },
            take: 1,
        });
        if (num === 1) {
            const randomId = Math.floor(Math.random() * product[0].id) + 1;
            const randomProduct = yield client_1.default.product.findUnique({
                where: { id: randomId },
            });
            if (randomProduct) {
                return randomProduct;
            }
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
            const randomProduct = yield client_1.default.product.findUnique({
                where: { id: randomId },
            });
            if (randomProduct) {
                ar.push(randomProduct);
            }
        }
        return ar;
    }
    catch (e) {
        throw Error("unexpected error");
        console.log(e);
    }
});
const getLatestProducts = (skip, take) => __awaiter(void 0, void 0, void 0, function* () {
    const prodList = yield client_1.default.product.findMany({
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
    const before = yield client_1.default.product.findUnique({
        where: { id: id },
    });
    if (!before) {
        throw new Error("Product not found");
    }
    return yield client_1.default.product.update({
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
