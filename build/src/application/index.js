"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.endpointCompletion = exports.endpointGetAddressAutocomplete = exports.endpointPatchAddressFavorite = exports.endpointGetAddressesByUserId = exports.endpointPostAddress = exports.endpointPostCreditCard = exports.endpointGetCreditCardsByUserId = exports.endpointSetFavoriteCreditCard = exports.endpointPostReviews = exports.endpointGetReviewsByReviewer = exports.endpointGetReviewsByProductId = exports.endpointGetReviewsByUserId = exports.endpointPatchOrdersDeliveryDate = exports.endpointPatchOrdersSendDate = exports.endpointPostOrders = exports.endpointGetOrdersByUserId = exports.endpointGetAllMainCategories = exports.endpointGetCategoryByMainCat = exports.endpointPatchProducts = exports.endpointgetProductsByUserId = exports.endpointgetAllProductsPaginated = exports.endpointgetProductsByCategoryPaginated = exports.endpointPostProduct = exports.endpointGetProductById = exports.endpointPostLogin = exports.endpointPostUser = exports.endpointGetAllUsers = exports.endpointPatchUser = exports.endpointGetUserByToken = exports.endpointGetUserById = void 0;
const verifyToken_1 = __importDefault(require("../utils/verifyToken"));
const users_1 = require("./users");
const orders_1 = require("./orders");
const auth_1 = require("./auth");
const products_1 = require("./products");
const categories_1 = require("./categories");
const reviews_1 = require("./reviews");
const addresses_1 = require("./addresses");
const creditCards_1 = require("./creditCards");
const completion_1 = require("./completion");
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
const endpointPostProduct = (app) => {
    app.post("/dealit/api/products", verifyToken_1.default, products_1.postNewProduct);
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
    app.get("/dealit/api/orders/user/:userId", orders_1.getOrdersByUserId);
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
    app.get("/dealit/api/credit-cards/user/:userId", creditCards_1.getCreditCardsByUserId);
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
    app.get("/dealit/api/addresses/user/:userId", addresses_1.getAddressesByUserId);
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
    app.get("/dealit/api/completion", completion_1.GetTextCompletion);
};
exports.endpointCompletion = endpointCompletion;
