"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const { endpointGetUserById, endpointGetUserByToken, endpointPatchUser, endpointGetOrdersByUserId, endpointPostUser, endpointPostLogin, endpointGetProductById, endpointPostProduct, endpointgetProductsByCategoryPaginated, endpointgetAllProductsPaginated, endpointgetProductsByUserId, endpointGetCategoryByMainCat, endpointGetAllMainCategories, endpointGetReviewsByUserId, endpointGetReviewsByProductId, endpointGetReviewsByReviewer, endpointPostReviews, endpointPostOrders, endpointPatchProducts, endpointPatchOrdersSendDate, endpointPatchOrdersDeliveryDate, endpointPostAddress, endpointPatchAddressFavorite, endpointGetAddressesByUserId, endpointPostCreditCard, endpointSetFavoriteCreditCard, endpointGetCreditCardsByUserId, endpointGetAllUsers, endpointCompletion, endpointGetAddressAutocomplete, } = require("../");
const users_1 = require("../users");
const orders_1 = require("../orders");
const auth_1 = require("../auth");
const products_1 = require("../products");
const categories_1 = require("../categories");
const reviews_1 = require("../reviews");
const addresses_1 = require("../addresses");
const creditCards_1 = require("../creditCards");
const completion_1 = require("../completion");
const verifyToken_1 = __importDefault(require("../../utils/verifyToken"));
const mockApp = {
    get: jest.fn().mockReturnThis(),
    patch: jest.fn().mockReturnThis(),
    post: jest.fn().mockReturnThis(),
};
describe("Index endpoints", () => {
    describe("All endpoints must be called at least once with their respective functions and URI", () => {
        beforeEach(() => {
            jest.resetAllMocks();
        });
        describe("User endpoints", () => {
            it("get User by token should be called once", () => {
                endpointGetUserByToken(mockApp);
                expect(mockApp.get).toHaveBeenCalledWith("/dealit/api/users/", verifyToken_1.default, users_1.getUserByToken);
            });
            it("patch user should be called once", () => {
                endpointPatchUser(mockApp);
                expect(mockApp.patch).toHaveBeenCalledWith("/dealit/api/users/:id", verifyToken_1.default, users_1.patchUser);
            });
            it("get all users should be called once", () => {
                endpointGetAllUsers(mockApp);
                expect(mockApp.get).toHaveBeenCalledWith("/dealit/api/all-users/", users_1.getEveryUser);
            });
            it("get user by id should be called once", () => {
                endpointGetUserById(mockApp);
                expect(mockApp.get).toHaveBeenCalledWith("/dealit/api/users/:id", users_1.getUserById);
            });
        });
        describe("auth endpoints", () => {
            it("post user should be called once", () => {
                endpointPostUser(mockApp);
                expect(mockApp.post).toHaveBeenCalledWith("/dealit/api/register", auth_1.registerUser);
            });
            it("post Login should be called once", () => {
                endpointPostLogin(mockApp);
                expect(mockApp.post).toHaveBeenCalledWith("/dealit/api/login", auth_1.userLogin);
            });
        });
        describe("Products endpoints", () => {
            it("Get Product by id should be called once", () => {
                endpointGetProductById(mockApp);
                expect(mockApp.get).toHaveBeenCalledWith("/dealit/api/products/:id", products_1.getProductById);
            });
            it("post Product should be called once", () => {
                endpointPostProduct(mockApp);
                expect(mockApp.post).toHaveBeenCalledWith("/dealit/api/products", verifyToken_1.default, products_1.postNewProduct);
            });
            it("get products by category should be called once", () => {
                endpointgetProductsByCategoryPaginated(mockApp);
                expect(mockApp.get).toHaveBeenCalledWith("/dealit/api/products/category/:category", products_1.getProductsByCategory);
            });
            it("get all products by category should be called once", () => {
                endpointgetAllProductsPaginated(mockApp);
                expect(mockApp.get).toHaveBeenCalledWith("/dealit/api/products", products_1.getAllProductsPaginated);
            });
            it("get product by user id should be called once", () => {
                endpointgetProductsByUserId(mockApp);
                expect(mockApp.get).toHaveBeenCalledWith("/dealit/api/products/user/:userId", products_1.getProductsByUserId);
            });
            it("patch product should be called once", () => {
                endpointPatchProducts(mockApp);
                expect(mockApp.patch).toHaveBeenCalledWith("/dealit/api/products/:id", verifyToken_1.default, products_1.patchProduct);
            });
        });
        describe("Category endpoints", () => {
            it("get category by main categories should be called once", () => {
                endpointGetCategoryByMainCat(mockApp);
                expect(mockApp.get).toHaveBeenCalledWith("/dealit/api/categories/:cat", categories_1.getCategoryByMainCat);
            });
            it("Get all main categories", () => {
                endpointGetAllMainCategories(mockApp);
                expect(mockApp.get).toHaveBeenCalledWith("/dealit/api/categories", categories_1.getAllMainCategories);
            });
        });
        describe("Order's endpoints", () => {
            it("get orders by user id should be called once", () => {
                endpointGetOrdersByUserId(mockApp);
                expect(mockApp.get).toHaveBeenCalledWith("/dealit/api/orders/user/:userId", orders_1.getOrdersByUserId);
            });
            it("post orders should be called once", () => {
                endpointPostOrders(mockApp);
                expect(mockApp.post).toHaveBeenCalledWith("/dealit/api/orders", verifyToken_1.default, orders_1.postOrder);
            });
            it("post orders send date should be called once", () => {
                endpointPatchOrdersSendDate(mockApp);
                expect(mockApp.patch).toHaveBeenCalledWith("/dealit/api/orders/sendDate/:id", verifyToken_1.default, orders_1.patchOrderSend);
            });
            it("post orders delivery date should be called once", () => {
                endpointPatchOrdersDeliveryDate(mockApp);
                expect(mockApp.patch).toHaveBeenCalledWith("/dealit/api/orders/deliveryDate/:id", verifyToken_1.default, orders_1.patchOrderDelivery);
            });
        });
        describe("Review's endpoints", () => {
            it("get reviews by user id should be called once", () => {
                endpointGetReviewsByUserId(mockApp);
                expect(mockApp.get).toHaveBeenCalledWith("/dealit/api/reviews/user/:userId", reviews_1.getReviewsByUserId);
            });
            it("get reviews by product id should be called once", () => {
                endpointGetReviewsByProductId(mockApp);
                expect(mockApp.get).toHaveBeenCalledWith("/dealit/api/reviews/product/:productId", reviews_1.getReviewsByProductId);
            });
            it("get reviews by reviewer should be called once", () => {
                endpointGetReviewsByReviewer(mockApp);
                expect(mockApp.get).toHaveBeenCalledWith("/dealit/api/reviews/rev/:reviewer", reviews_1.getReviewsByReviewer);
            });
            it("post reviews should be called once", () => {
                endpointPostReviews(mockApp);
                expect(mockApp.post).toHaveBeenCalledWith("/dealit/api/reviews", verifyToken_1.default, reviews_1.postReview);
            });
        });
        describe("Credit card endpoints", () => {
            it("set favorite credit card should be called once", () => {
                endpointSetFavoriteCreditCard(mockApp);
                expect(mockApp.patch).toHaveBeenCalledWith("/dealit/api/credit-cards/:id", verifyToken_1.default, creditCards_1.setFavoriteCreditCard);
            });
            it("get credit card by user id should be called once", () => {
                endpointGetCreditCardsByUserId(mockApp);
                expect(mockApp.get).toHaveBeenCalledWith("/dealit/api/credit-cards/user/:userId", creditCards_1.getCreditCardsByUserId);
            });
            it("post credit card should be called once", () => {
                endpointPostCreditCard(mockApp);
                expect(mockApp.post).toHaveBeenCalledWith("/dealit/api/credit-cards", verifyToken_1.default, creditCards_1.postCreditCard);
            });
        });
        describe("Address endpoints", () => {
            it("post address should be called once", () => {
                endpointPostAddress(mockApp);
                expect(mockApp.post).toHaveBeenCalledWith("/dealit/api/addresses", verifyToken_1.default, addresses_1.postAddress);
            });
            it("patch favorite address should be called once", () => {
                endpointPatchAddressFavorite(mockApp);
                expect(mockApp.patch).toHaveBeenCalledWith("/dealit/api/addresses/:id", verifyToken_1.default, addresses_1.setFavoriteAddress);
            });
            it("get address by user id should be called once", () => {
                endpointGetAddressesByUserId(mockApp);
                expect(mockApp.get).toHaveBeenCalledWith("/dealit/api/addresses/user/:userId", addresses_1.getAddressesByUserId);
            });
            it("get address autocomplete should be called once", () => {
                endpointGetAddressAutocomplete(mockApp);
                expect(mockApp.get).toHaveBeenCalledWith("/dealit/api/addresses/autocomplete", addresses_1.getAddressAutocomplete);
            });
        });
        describe("Completion endpoints", () => {
            it("get completition should be called once", () => {
                endpointCompletion(mockApp);
                expect(mockApp.get).toHaveBeenCalledWith("/dealit/api/completion", completion_1.GetTextCompletion);
            });
        });
    });
});
