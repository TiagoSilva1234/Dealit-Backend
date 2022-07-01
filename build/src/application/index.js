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
exports.endpointCompletion = exports.endpointGetAddressAutocomplete = exports.endpointPatchAddressFavorite = exports.endpointGetAddressesByUserId = exports.endpointPostAddress = exports.endpointPostCreditCard = exports.endpointGetCreditCardsByUserId = exports.endpointSetFavoriteCreditCard = exports.endpointPostReviews = exports.endpointGetReviewsByReviewer = exports.endpointGetReviewsByProductId = exports.endpointGetReviewsByUserId = exports.endpointPatchOrdersDeliveryDate = exports.endpointPatchOrdersSendDate = exports.endpointPostOrders = exports.endpointGetOrdersByUserId = exports.endpointGetAllMainCategories = exports.endpointGetCategoryByMainCat = exports.endpointPatchProducts = exports.EndpointGetProductsStatsByUserId = exports.endpointgetProductsByUserId = exports.endpointgetAllProductsPaginated = exports.endpointgetProductsByCategoryPaginated = exports.endpointPostProduct = exports.endpointGetProductById = exports.endpointPostLogin = exports.endpointPostUser = exports.endpointGetAllUsers = exports.endpointPatchUser = exports.endpointGetUserByToken = exports.endpointGetUserById = void 0;
const verifyToken_1 = __importDefault(require("../utils/verifyToken"));
const path = require("path");
const multer = require("multer");
const client_1 = __importDefault(require("../../client"));
const fs = require("fs");
const http_status_codes_1 = require("http-status-codes");
const users_1 = require("./users");
const orders_1 = require("./orders");
const auth_1 = require("./auth");
const products_1 = require("./products");
const categories_1 = require("./categories");
const reviews_1 = require("./reviews");
const addresses_1 = require("./addresses");
const creditCards_1 = require("./creditCards");
const completion_1 = require("./completion");
const products_repository_1 = require("../infrastructure/products-repository");
//EndpointsUser
const endpointGetUserById = (app) => {
    app.get("/dealit/api/users/:id", users_1.getUserById);
};
exports.endpointGetUserById = endpointGetUserById;
const endpointGetUserByToken = (app) => {
    app.get("/dealit/api/users/", verifyToken_1.default, users_1.getUserByToken);
};
exports.endpointGetUserByToken = endpointGetUserByToken;
const endpointPatchUser = (app) => {
    app.patch("/dealit/api/users/:id", verifyToken_1.default, users_1.patchUser);
};
exports.endpointPatchUser = endpointPatchUser;
const endpointGetAllUsers = (app) => {
    app.get("/dealit/api/all-users/", users_1.getEveryUser);
};
exports.endpointGetAllUsers = endpointGetAllUsers;
//EndpointsAuth
const endpointPostUser = (app) => {
    app.post("/dealit/api/register", auth_1.registerUser);
};
exports.endpointPostUser = endpointPostUser;
const endpointPostLogin = (app) => {
    app.post("/dealit/api/login", auth_1.userLogin);
};
exports.endpointPostLogin = endpointPostLogin;
//EndpointsProduct
const endpointGetProductById = (app) => {
    app.get("/dealit/api/products/:id", products_1.getProductById);
};
exports.endpointGetProductById = endpointGetProductById;
let counter = 0;
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield client_1.default.product.findMany({
                orderBy: { id: "desc" },
                take: 1,
            });
            fs.mkdirSync(`./public/${req.body.userId}`, { recursive: true });
            fs.mkdirSync(`./public/${req.body.userId}/${product[0].id + 1}`, {
                recursive: true,
            });
            cb(null, `./public/${req.body.userId}/${product[0].id + 1}`);
        });
    },
    filename: function (req, file, cb) {
        counter = counter + 1;
        cb(null, counter + ".png");
    },
});
var upload = multer({ storage: storage }).array("photos");
const endpointPostProduct = (app) => {
    app.post("/dealit/api/products", upload, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        counter = 0;
        try {
            console.log(req.body);
            const name = req.body.name;
            const description = req.body.description;
            const price = Number(req.body.price);
            const userId = Number(req.body.userId);
            const category = req.body.category;
            let length = 0;
            fs.readdir("./public", (err, files) => {
                length = files.length;
            });
            if (!(name && description && price && category) || userId === undefined) {
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
                photos: [],
                price,
                userId,
                category,
            };
            const result = yield (0, products_repository_1.saveProduct)(data, upload, req, res);
            const urls = [];
            for (let i = 1; i < length + 1; i++) {
                urls.push(`https://dealit-backend.herokuapp.com/static/${data.userId}/${result.id}/${i}.png`);
            }
            const updated = yield client_1.default.product.update({
                where: {
                    id: result.id,
                },
                data: {
                    photos: urls,
                },
            });
            return res.status(http_status_codes_1.StatusCodes.CREATED).send({
                message: "Product successfully saved to database!",
                product: updated,
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
    }));
};
exports.endpointPostProduct = endpointPostProduct;
const endpointgetProductsByCategoryPaginated = (app) => {
    app.get("/dealit/api/products/category/:category", products_1.getProductsByCategory);
};
exports.endpointgetProductsByCategoryPaginated = endpointgetProductsByCategoryPaginated;
const endpointgetAllProductsPaginated = (app) => {
    app.get("/dealit/api/products", products_1.getAllProductsPaginated);
};
exports.endpointgetAllProductsPaginated = endpointgetAllProductsPaginated;
const endpointgetProductsByUserId = (app) => {
    app.get("/dealit/api/products/user/:userId", products_1.getProductsByUserId);
};
exports.endpointgetProductsByUserId = endpointgetProductsByUserId;
const EndpointGetProductsStatsByUserId = (app) => {
    app.get("/dealit/api/product-stats/user/:userId", verifyToken_1.default, products_1.getProductsStatsByUserId);
};
exports.EndpointGetProductsStatsByUserId = EndpointGetProductsStatsByUserId;
const endpointPatchProducts = (app) => {
    app.patch("/dealit/api/products/:id", verifyToken_1.default, products_1.patchProduct);
};
exports.endpointPatchProducts = endpointPatchProducts;
//EndpointsCategory
const endpointGetCategoryByMainCat = (app) => {
    app.get("/dealit/api/categories/:cat", categories_1.getCategoryByMainCat);
};
exports.endpointGetCategoryByMainCat = endpointGetCategoryByMainCat;
const endpointGetAllMainCategories = (app) => {
    app.get("/dealit/api/categories", categories_1.getAllMainCategories);
};
exports.endpointGetAllMainCategories = endpointGetAllMainCategories;
//EndpointsOrders
const endpointGetOrdersByUserId = (app) => {
    app.get("/dealit/api/orders/user/:userId", verifyToken_1.default, orders_1.getOrdersByUserId);
};
exports.endpointGetOrdersByUserId = endpointGetOrdersByUserId;
const endpointPostOrders = (app) => {
    app.post("/dealit/api/orders", verifyToken_1.default, orders_1.postOrder);
};
exports.endpointPostOrders = endpointPostOrders;
const endpointPatchOrdersSendDate = (app) => {
    app.patch("/dealit/api/orders/sendDate/:id", verifyToken_1.default, orders_1.patchOrderSend);
};
exports.endpointPatchOrdersSendDate = endpointPatchOrdersSendDate;
const endpointPatchOrdersDeliveryDate = (app) => {
    app.patch("/dealit/api/orders/deliveryDate/:id", verifyToken_1.default, orders_1.patchOrderDelivery);
};
exports.endpointPatchOrdersDeliveryDate = endpointPatchOrdersDeliveryDate;
//EndpointsReviews
const endpointGetReviewsByUserId = (app) => {
    app.get("/dealit/api/reviews/user/:userId", reviews_1.getReviewsByUserId);
};
exports.endpointGetReviewsByUserId = endpointGetReviewsByUserId;
const endpointGetReviewsByProductId = (app) => {
    app.get("/dealit/api/reviews/product/:productId", reviews_1.getReviewsByProductId);
};
exports.endpointGetReviewsByProductId = endpointGetReviewsByProductId;
const endpointGetReviewsByReviewer = (app) => {
    app.get("/dealit/api/reviews/rev/:reviewer", reviews_1.getReviewsByReviewer);
};
exports.endpointGetReviewsByReviewer = endpointGetReviewsByReviewer;
const endpointPostReviews = (app) => {
    app.post("/dealit/api/reviews", verifyToken_1.default, reviews_1.postReview);
};
exports.endpointPostReviews = endpointPostReviews;
//Endpoints CreditCard
const endpointSetFavoriteCreditCard = (app) => {
    app.patch("/dealit/api/credit-cards/:id", verifyToken_1.default, creditCards_1.setFavoriteCreditCard);
};
exports.endpointSetFavoriteCreditCard = endpointSetFavoriteCreditCard;
const endpointGetCreditCardsByUserId = (app) => {
    app.get("/dealit/api/credit-cards/user/:userId", verifyToken_1.default, creditCards_1.getCreditCardsByUserId);
};
exports.endpointGetCreditCardsByUserId = endpointGetCreditCardsByUserId;
const endpointPostCreditCard = (app) => {
    app.post("/dealit/api/credit-cards", verifyToken_1.default, creditCards_1.postCreditCard);
};
exports.endpointPostCreditCard = endpointPostCreditCard;
//Endpoints Adress
const endpointPostAddress = (app) => {
    app.post("/dealit/api/addresses", verifyToken_1.default, addresses_1.postAddress);
};
exports.endpointPostAddress = endpointPostAddress;
const endpointGetAddressesByUserId = (app) => {
    app.get("/dealit/api/addresses/user/:userId", verifyToken_1.default, addresses_1.getAddressesByUserId);
};
exports.endpointGetAddressesByUserId = endpointGetAddressesByUserId;
const endpointPatchAddressFavorite = (app) => {
    app.patch("/dealit/api/addresses/:id", verifyToken_1.default, addresses_1.setFavoriteAddress);
};
exports.endpointPatchAddressFavorite = endpointPatchAddressFavorite;
const endpointGetAddressAutocomplete = (app) => {
    app.get("/dealit/api/addresses/autocomplete", addresses_1.getAddressAutocomplete);
};
exports.endpointGetAddressAutocomplete = endpointGetAddressAutocomplete;
//Endpoint Completion
const endpointCompletion = (app) => {
    app.post("/dealit/api/completion", completion_1.GetTextCompletion);
};
exports.endpointCompletion = endpointCompletion;
