"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const application_1 = require("./application");
var bodyParser = require('body-parser');
const app = (0, express_1.default)();
// Put these statements before you define any routes.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use((0, cors_1.default)());
app.use('/static', express_1.default.static('public'));
const port = Number(process.env.API_PORT) || 8080;
//Endpoints user
(0, application_1.endpointGetUserById)(app);
(0, application_1.endpointGetUserByToken)(app);
(0, application_1.endpointPatchUser)(app);
(0, application_1.endpointPostUser)(app);
(0, application_1.endpointPostLogin)(app);
(0, application_1.endpointGetAllUsers)(app);
//Endpoints products
(0, application_1.endpointGetProductById)(app);
(0, application_1.endpointPostProduct)(app);
(0, application_1.endpointgetProductsByCategoryPaginated)(app);
(0, application_1.endpointgetAllProductsPaginated)(app);
(0, application_1.endpointgetProductsByUserId)(app);
(0, application_1.endpointPatchProducts)(app);
//Endpoints categories
(0, application_1.endpointGetCategoryByMainCat)(app);
(0, application_1.endpointGetAllMainCategories)(app);
//Endpoints reviews
(0, application_1.endpointGetReviewsByUserId)(app);
(0, application_1.endpointGetReviewsByProductId)(app);
(0, application_1.endpointGetReviewsByReviewer)(app);
(0, application_1.endpointPostReviews)(app);
//Endpoints orders
(0, application_1.endpointGetOrdersByUserId)(app);
(0, application_1.endpointPostOrders)(app);
(0, application_1.endpointPatchOrdersSendDate)(app);
(0, application_1.endpointPatchOrdersDeliveryDate)(app);
//Endpoints addresses
(0, application_1.endpointPostAddress)(app);
(0, application_1.endpointPatchAddressFavorite)(app);
(0, application_1.endpointGetAddressesByUserId)(app);
(0, application_1.endpointGetAddressAutocomplete)(app);
//Endpoints credit cards
(0, application_1.endpointPostCreditCard)(app);
(0, application_1.endpointSetFavoriteCreditCard)(app);
(0, application_1.endpointGetCreditCardsByUserId)(app);
//Endpoint Completion
(0, application_1.endpointCompletion)(app);
app.get("/", (req, res) => {
    res.send("hello!");
});
app.listen(process.env.PORT || 8080, () => console.log(`listening on port ${port} :)`));
exports.default = app;
