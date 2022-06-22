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
const get_productById_1 = __importDefault(require("../domain/products/get-productById"));
const get_allProductsPaginated_1 = __importDefault(require("../domain/products/get-allProductsPaginated"));
const post_product_1 = __importDefault(require("../domain/products/post-product"));
const get_productsByCategoryPaginated_1 = __importDefault(require("../domain/products/get-productsByCategoryPaginated"));
const get_productsByUserId_1 = __importDefault(require("../domain/products/get-productsByUserId"));
const patch_product_1 = __importDefault(require("../domain/products/patch-product"));
const http_status_codes_1 = require("http-status-codes");
//Product endpoints logic
const getProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 3;
        if (isNaN(Number(id)) && (id !== "random" && id !== "latest") || limit > 10) {
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
        console.log(e.message);
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
        if (!(name && description && photos && price && userId && category)) {
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
        return res.status(http_status_codes_1.StatusCodes.CREATED).send({
            message: "Product successfully saved to datebase!",
            product: yield (0, post_product_1.default)(data),
        });
    }
    catch (e) {
        if (e.message ===
            "\nInvalid `prisma.product.create()` invocation in\n/Users/tiagosilva/Desktop/BackEndDealIt/src/infrastructure/products-repository.ts:23:40\n\n  20 };\n  21 \n  22 export const saveProduct = async (data: ProductData) => {\n→ 23   const product = await prisma.product.create(\n  An operation failed because it depends on one or more records that were required but not found. No 'Category' record(s) (needed to inline the relation on 'Product' record(s)) was found for a nested connect on one-to-many relation 'CategoryToProduct'.") {
            return res.status(http_status_codes_1.StatusCodes.UNPROCESSABLE_ENTITY).send({
                error: {
                    message: "Category name does not match any category in database",
                    cause: "Unprocessable entity",
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
        return res.send({
            message: "Product successfully patched",
            user: yield (0, patch_product_1.default)(Number(id), data),
        });
    }
    catch (e) {
        if (e.message === "Product not found") {
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).send({
                error: {
                    message: e.message,
                    cause: "Unexpected error",
                    date: new Date().toLocaleString(),
                },
            });
        }
        if (e.message.slice(10, 33) === "prisma.product.update()")
            return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).send({
                error: {
                    message: `${e.message.slice(10, 33)} failed`,
                    cause: "Invalid data format",
                    date: new Date().toLocaleString(),
                },
            });
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
