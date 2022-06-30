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
exports.patchProduct = exports.getProductsByUserId = exports.getAllProductsPaginated = exports.getProductsByCategory = exports.postNewProduct = exports.getProductById = void 0;
const http_status_codes_1 = require("http-status-codes");
const get_productById_1 = __importDefault(require("../domain/products/get-productById"));
const get_allProductsPaginated_1 = __importDefault(require("../domain/products/get-allProductsPaginated"));
//import postProduct from "../domain/products/post-product";
const get_productsByCategoryPaginated_1 = __importDefault(require("../domain/products/get-productsByCategoryPaginated"));
const get_productsByUserId_1 = __importDefault(require("../domain/products/get-productsByUserId"));
const patch_product_1 = __importDefault(require("../domain/products/patch-product"));
const multer = require("multer");
//Product endpoints logic
const getProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 3;
        if ((isNaN(Number(id)) && id !== "random" && id !== "latest") ||
            limit > 10) {
            return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).send({
                error: {
                    message: "Invalid id format",
                    cause: "Bad Request",
                    date: new Date().toLocaleString(),
                },
            });
        }
        return res.send(yield (0, get_productById_1.default)(id, page, limit));
    }
    catch (e) {
        if (e.message === "Product does not exist") {
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).send({
                error: {
                    message: e.message,
                    cause: "Not found",
                    date: new Date().toLocaleString(),
                },
            });
        }
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).send({
            error: {
                message: e.message,
                cause: "Unexpected error",
                date: new Date().toLocaleString(),
            },
        });
    }
});
exports.getProductById = getProductById;
const postNewProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const name = req.body.name;
        const description = req.body.description;
        const photos = req.body.photos;
        const price = req.body.price;
        const userId = req.body.userId;
        const category = req.body.category;
        if (!(name && description && photos && price && category) ||
            userId === undefined) {
            return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).send({
                error: {
                    message: "Required data missing",
                    cause: "Bad Request",
                    date: new Date().toLocaleString(),
                },
            });
        }
        const data = {
            name,
            description,
            photos,
            price,
            userId,
            category,
        };
        //const result = await saveProduct(data,upload,req,res);
        return res.status(http_status_codes_1.StatusCodes.CREATED).send({
            message: "Product successfully saved to database!",
            product: "result",
        });
    }
    catch (e) {
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).send({
            error: {
                message: e.message,
                cause: "Unexpected error",
                date: new Date().toLocaleString(),
            },
        });
    }
});
exports.postNewProduct = postNewProduct;
const getProductsByCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const category = req.params.category;
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 6;
        const ret = yield (0, get_productsByCategoryPaginated_1.default)(category, page, limit);
        return res.send(ret);
    }
    catch (e) {
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).send({
            error: {
                message: e.message,
                cause: "Unexpected error",
                date: new Date().toLocaleString(),
            },
        });
    }
});
exports.getProductsByCategory = getProductsByCategory;
const getAllProductsPaginated = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 6;
        const ret = yield (0, get_allProductsPaginated_1.default)(page, limit);
        return res.send(ret);
    }
    catch (e) {
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).send({
            error: {
                message: e.message,
                cause: "Unexpected error",
                date: new Date().toLocaleString(),
            },
        });
    }
});
exports.getAllProductsPaginated = getAllProductsPaginated;
const getProductsByUserId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        if (isNaN(Number(userId))) {
            return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).send({
                error: {
                    message: "Invalid id format",
                    cause: "Bad Request",
                    date: new Date().toLocaleString(),
                },
            });
        }
        return res.send(yield (0, get_productsByUserId_1.default)(Number(userId)));
    }
    catch (e) {
        if (e.message === "User does not exist") {
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).send({
                error: {
                    message: e.message,
                    cause: "Not found",
                    date: new Date().toLocaleString(),
                },
            });
        }
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).send({
            error: {
                message: e.message,
                cause: "Unexpected error",
                date: new Date().toLocaleString(),
            },
        });
    }
});
exports.getProductsByUserId = getProductsByUserId;
const patchProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const data = req.body;
        if (isNaN(Number(id))) {
            return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).send({
                error: {
                    message: "Invalid id format",
                    cause: "Bad Request",
                    date: new Date().toLocaleString(),
                },
            });
        }
        if (!data) {
            return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).send({
                error: {
                    message: "Required inputs missing",
                    cause: "Bad Requ∆est",
                    date: new Date().toLocaleString(),
                },
            });
        }
        const result = yield (0, patch_product_1.default)(Number(id), data);
        return res.send({
            message: "Product successfully patched",
            user: result,
        });
    }
    catch (e) {
        if (e.message === "Product not found") {
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).send({
                error: {
                    message: e.message,
                    cause: "Product not found",
                    date: new Date().toLocaleString(),
                },
            });
        }
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).send({
            error: {
                message: e.message,
                cause: "Unexpected error",
                date: new Date().toLocaleString(),
            },
        });
    }
});
exports.patchProduct = patchProduct;
