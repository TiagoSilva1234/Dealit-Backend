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
const post_address_1 = __importDefault(require("../addresses/post-address"));
const patch_adressIsFavorite_1 = __importDefault(require("../addresses/patch-adressIsFavorite"));
const get_addressByUserId_1 = __importDefault(require("../addresses/get-addressByUserId"));
const get_addressAuto_1 = __importDefault(require("../addresses/get-addressAuto"));
const post_user_1 = __importDefault(require("../auth/post-user"));
const post_login_1 = __importDefault(require("../auth/post-login"));
const get_categoryById_1 = __importDefault(require("../categories/get-categoryById"));
const get_allMainCategories_1 = __importDefault(require("../categories/get-allMainCategories"));
const get_textCompletion_1 = __importDefault(require("../completion/get-textCompletion"));
const post_creditCard_1 = __importDefault(require("../creditCards/post-creditCard"));
const patch_setFavorite_1 = __importDefault(require("../creditCards/patch-setFavorite"));
const get_creditCardsByUserId_1 = __importDefault(require("../creditCards/get-creditCardsByUserId"));
const get_ordersByUserId_1 = __importDefault(require("../orders/get-ordersByUserId"));
const post_order_1 = __importDefault(require("../orders/post-order"));
const patch_orderSendDate_1 = __importDefault(require("../orders/patch-orderSendDate"));
const patch_orderDeliveryDate_1 = __importDefault(require("../orders/patch-orderDeliveryDate"));
const get_productById_1 = __importDefault(require("../products/get-productById"));
const get_allProductsPaginated_1 = __importDefault(require("../products/get-allProductsPaginated"));
const post_product_1 = __importDefault(require("../products/post-product"));
const get_productsByCategoryPaginated_1 = __importDefault(require("../products/get-productsByCategoryPaginated"));
const get_productsByUserId_1 = __importDefault(require("../products/get-productsByUserId"));
const patch_product_1 = __importDefault(require("../products/patch-product"));
const get_reviewsByUserId_1 = __importDefault(require("../reviews/get-reviewsByUserId"));
const get_reviewsByProductId_1 = __importDefault(require("../reviews/get-reviewsByProductId"));
const get_reviewsByReviewer_1 = __importDefault(require("../reviews/get-reviewsByReviewer"));
const post_review_1 = __importDefault(require("../reviews/post-review"));
const patch_user_1 = __importDefault(require("../users/patch-user"));
const get_allUsers_1 = __importDefault(require("../users/get-allUsers"));
const get_UserById_1 = __importDefault(require("../users/get-UserById"));
const get_userByToken_1 = __importDefault(require("../users/get-userByToken"));
jest.mock("../../infrastructure/addresses-repository", () => ({
    getAddressAutocomplete: () => "test",
    getAddressesByUserId: () => "test",
    setAddressFavorite: () => "test",
    postAddress: () => "test",
}));
jest.mock("../../infrastructure/categories-repository", () => ({
    getCategoryByMainCat: () => "test",
    getAllMainCategories: () => "test",
}));
jest.mock("../../infrastructure/completion-repository", () => ({
    createCompletion: () => "test",
}));
jest.mock("../../infrastructure/creditCards-repository", () => ({
    getCreditCardsByUserId: () => "test",
    setCreditCardFavorite: () => "test",
    postCreditCard: () => "test",
}));
jest.mock("../../infrastructure/orders-repository", () => ({
    getOrdersByUserId: () => "test",
    patchOrderDeliveryDate: () => "test",
    patchOrderSendDate: () => "test",
    postOrder: () => "test",
}));
jest.mock("../../infrastructure/products-repository", () => ({
    getAllProductsPaginated: () => "test",
    getProductById: () => "test",
    getProductsByCategoryPaginated: () => "test",
    getProductsByUserId: () => "test",
    patchProduct: () => "test",
    saveProduct: () => "test",
}));
jest.mock("../../infrastructure/reviews-repository", () => ({
    getReviewsByProductId: () => "test",
    getReviewsByReviewer: () => "test",
    getReviewsByUserId: () => "test",
    saveReview: () => "test",
}));
jest.mock("../../infrastructure/users-repository", () => ({
    login: () => "test",
    saveUser: () => "test",
    getAllUsers: () => "test",
    getUserById: () => "test",
    getUserByToken: () => "test",
    patchUser: () => "test",
}));
describe("Domain tests", () => {
    describe("addresses domain", () => {
        it("get address autocomplete - should return infrastructure response", () => __awaiter(void 0, void 0, void 0, function* () {
            const x = yield (0, get_addressAuto_1.default)("xxx");
            expect(x).toEqual("test");
        }));
        it("get addresses by user id - should return infrastructure response", () => __awaiter(void 0, void 0, void 0, function* () {
            const x = yield (0, get_addressByUserId_1.default)(1);
            expect(x).toEqual("test");
        }));
        it("set favorite address - should return infrastructure response", () => __awaiter(void 0, void 0, void 0, function* () {
            const x = yield (0, patch_adressIsFavorite_1.default)(1);
            expect(x).toEqual("test");
        }));
        it("post address - should return infrastructure response", () => __awaiter(void 0, void 0, void 0, function* () {
            const x = yield (0, post_address_1.default)({
                country: "United States",
                city: "Silicon Valley",
                zipCode: "90041",
                street: "Sili Street",
                houseNumber: "332",
                isFavorite: false,
                userId: 0,
                id: 1,
            });
            expect(x).toEqual("test");
        }));
    });
    describe("auth domain", () => {
        it("register - should return infrastructure response", () => __awaiter(void 0, void 0, void 0, function* () {
            const x = yield (0, post_user_1.default)({
                username: "Jacques Tronault",
                address: {
                    country: "France",
                    city: "Paris",
                    zipCode: "2314123",
                    street: "Rue de Mock",
                    houseNumber: "532",
                    isFavorite: true,
                },
                email: "jacq@email.com",
                password: "P#s5w0rd",
                phone: "923456789",
            });
            expect(x).toEqual("test");
        }));
        it("login - should return infrastructure response", () => __awaiter(void 0, void 0, void 0, function* () {
            const x = yield (0, post_login_1.default)("email", "password");
            expect(x).toEqual("test");
        }));
    });
    describe("categories domain", () => {
        it("get categories by category - should return infrastructure response", () => __awaiter(void 0, void 0, void 0, function* () {
            const x = yield (0, get_categoryById_1.default)("cat");
            expect(x).toEqual("test");
        }));
        it("get all main categories - should return infrastructure response", () => __awaiter(void 0, void 0, void 0, function* () {
            const x = yield (0, get_allMainCategories_1.default)();
            expect(x).toEqual("test");
        }));
    });
    describe("completion domain", () => {
        it("get completion - should return infrastructure response", () => __awaiter(void 0, void 0, void 0, function* () {
            const x = yield (0, get_textCompletion_1.default)("hey");
            expect(x).toEqual("test");
        }));
    });
    describe("credit cards domain", () => {
        it("post credit card - should return infrastructure response", () => __awaiter(void 0, void 0, void 0, function* () {
            const x = yield (0, post_creditCard_1.default)({
                id: 1,
                userId: 1,
                isFavorite: true,
                cardNumber: 1,
                cvc: 123,
                expiryDate: "12/12",
            });
            expect(x).toEqual("test");
        }));
        it("set favorite credit card - should return infrastructure response", () => __awaiter(void 0, void 0, void 0, function* () {
            const x = yield (0, patch_setFavorite_1.default)(1);
            expect(x).toEqual("test");
        }));
        it("get credit cards by user id - should return infrastructure response", () => __awaiter(void 0, void 0, void 0, function* () {
            const x = yield (0, get_creditCardsByUserId_1.default)(1);
            expect(x).toEqual("test");
        }));
    });
    describe("orders domain", () => {
        it("get orders by user id - should return infrastructure response", () => __awaiter(void 0, void 0, void 0, function* () {
            const x = yield (0, get_ordersByUserId_1.default)(1);
            expect(x).toEqual("test");
        }));
        it("post order - should return infrastructure response", () => __awaiter(void 0, void 0, void 0, function* () {
            const x = yield (0, post_order_1.default)({
                id: 1,
                buyDate: new Date(),
                sendDate: new Date(),
                deliveryDate: new Date(),
                userId: 1,
                sellerName: "DealIt",
                creditCardId: 1,
            }, [1]);
            expect(x).toEqual("test");
        }));
        it("patch order send date - should return infrastructure response", () => __awaiter(void 0, void 0, void 0, function* () {
            const x = yield (0, patch_orderSendDate_1.default)(1, { sendDate: new Date() });
            expect(x).toEqual("test");
        }));
        it("patch order delivery date - should return infrastructure response", () => __awaiter(void 0, void 0, void 0, function* () {
            const x = yield (0, patch_orderDeliveryDate_1.default)(1, { deliveryDate: new Date() });
            expect(x).toEqual("test");
        }));
    });
    describe("products domain", () => {
        it("get product by id - should return infrastructure response", () => __awaiter(void 0, void 0, void 0, function* () {
            const x = yield (0, get_productById_1.default)("2", 1, 1);
            expect(x).toEqual("test");
        }));
        it("post product - should return infrastructure response", () => __awaiter(void 0, void 0, void 0, function* () {
            const x = yield (0, post_product_1.default)({
                photos: [""],
                userId: 1,
                name: "prod",
                description: "cool",
                category: "elecs",
                price: 123.12,
            });
            expect(x).toEqual("test");
        }));
        it("get product by id - should return infrastructure response", () => __awaiter(void 0, void 0, void 0, function* () {
            const x = yield (0, get_allProductsPaginated_1.default)(1, 2);
            expect(x).toEqual("test");
        }));
        it("get product by user id - should return infrastructure response", () => __awaiter(void 0, void 0, void 0, function* () {
            const x = yield (0, get_productsByUserId_1.default)(1);
            expect(x).toEqual("test");
        }));
        it("get product by category - should return infrastructure response", () => __awaiter(void 0, void 0, void 0, function* () {
            const x = yield (0, get_productsByCategoryPaginated_1.default)("cat", 1, 2);
            expect(x).toEqual("test");
        }));
        it("patch product - should return infrastructure response", () => __awaiter(void 0, void 0, void 0, function* () {
            const x = yield (0, patch_product_1.default)(1, {});
            expect(x).toEqual("test");
        }));
    });
    describe("reviews domain", () => {
        it("get reviews by reviewer - should return infrastructure response", () => __awaiter(void 0, void 0, void 0, function* () {
            const x = yield (0, get_reviewsByReviewer_1.default)("rev");
            expect(x).toEqual("test");
        }));
        it("post review - should return infrastructure response", () => __awaiter(void 0, void 0, void 0, function* () {
            const x = yield (0, post_review_1.default)({
                productId: 10,
                comment: "Great product! Fast and secure shipping!",
                photo: "https://www.lg.com/pt/images/tv/MD05958458/gallery/medium01.jpg",
                rating: 5,
                reviewer: "Tobias Jánavês",
            });
            expect(x).toEqual("test");
        }));
        it("get reviews by product id - should return infrastructure response", () => __awaiter(void 0, void 0, void 0, function* () {
            const x = yield (0, get_reviewsByProductId_1.default)(1);
            expect(x).toEqual("test");
        }));
        it("get reviews by user id - should return infrastructure response", () => __awaiter(void 0, void 0, void 0, function* () {
            const x = yield (0, get_reviewsByUserId_1.default)(1);
            expect(x).toEqual("test");
        }));
    });
    describe("users domain", () => {
        it("patch user - should return infrastructure response", () => __awaiter(void 0, void 0, void 0, function* () {
            const x = yield (0, patch_user_1.default)(1, {});
            expect(x).toEqual("test");
        }));
        it("get user by token - should return infrastructure response", () => __awaiter(void 0, void 0, void 0, function* () {
            const x = yield (0, get_userByToken_1.default)("jwt");
            expect(x).toEqual("test");
        }));
        it("get user by id - should return infrastructure response", () => __awaiter(void 0, void 0, void 0, function* () {
            const x = yield (0, get_UserById_1.default)("1");
            expect(x).toEqual("test");
        }));
        it("get all users - should return infrastructure response", () => __awaiter(void 0, void 0, void 0, function* () {
            const x = yield (0, get_allUsers_1.default)();
            expect(x).toEqual("test");
        }));
    });
});
