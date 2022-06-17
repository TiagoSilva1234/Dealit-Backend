import { verifyToken } from "../utils/verifyToken";
import { Express } from "express";

import { getUserById, patchUser, getEveryUser } from "./users";
import {
  getOrdersByUserId,
  postOrder,
  patchOrderSend,
  patchOrderDelivery,
} from "./orders";

import { registerUser, userLogin } from "./auth";
import {
  getProductById,
  postNewProduct,
  getProductsByCategory,
  getAllProductsPaginated,
  getProductsByUserId,
  getLateProducts,
  patchProduct,
} from "./products";
import { getCategoryByMainCat, getAllMainCategories } from "./categories";
import {
  getReviewsByUserId,
  getReviewsByProductId,
  getReviewsByReviewer,
  postReview,
} from "./reviews";
import { postAddress, setFavoriteAddress } from "./addresses";
import { postCreditCard, setFavoriteCreditCard } from "./creditCards";
import { GetTextCompletion } from "./completion";

//EndpointsUser
export const endpointGetUserById = (app: Express): Express =>
  app.get("/dealit/api/users/:id", getUserById);

export const endpointPatchUser = (app: Express): Express =>
  app.patch("/dealit/api/users/:id", verifyToken, patchUser);

export const endpointGetAllUsers = (app: Express) =>
  app.get("/dealit/api/users", getEveryUser);
//EndpointsAuth
export const endpointPostUser = (app: Express): Express =>
  app.post("/dealit/api/register", registerUser);

export const endpointPostLogin = (app: Express): Express =>
  app.post("/dealit/api/login", userLogin);

//EndpointsProduct
export const endpointGetProductById = (app: Express): Express =>
  app.get("/dealit/api/products/:id", getProductById);

export const endpointPostProduct = (app: Express): Express =>
  app.post("/dealit/api/products", verifyToken, postNewProduct);

export const endpointgetProductsByCategoryPaginated = (app: Express): Express =>
  app.get("/dealit/api/products/category/:category", getProductsByCategory);

export const endpointgetAllProductsPaginated = (app: Express): Express =>
  app.get("/dealit/api/products", getAllProductsPaginated);

export const endpointgetProductsByUserId = (app: Express): Express =>
  app.get("/dealit/api/products/user/:userId", getProductsByUserId);

export const endpointGetLatestProducts = (app: Express): Express =>
  app.get("/dealit/api/latest-products", getLateProducts);

export const endpointPatchProducts = (app: Express): Express =>
  app.patch("/dealit/api/products/:id", verifyToken, patchProduct);

//EndpointsCategory
export const endpointGetCategoryByMainCat = (app: Express): void => {
  app.get("/dealit/api/categories/:mainCat", getCategoryByMainCat);
};

export const endpointGetAllMainCategories = (app: Express): void => {
  app.get("/dealit/api/categories", getAllMainCategories);
};

//EndpointsOrders
export const endpointGetOrdersByUserId = (app: Express): void => {
  app.get("/dealit/api/orders/user/:userId", getOrdersByUserId);
};

export const endpointPostOrders = (app: Express): void => {
  app.post("/dealit/api/orders", verifyToken, postOrder);
};

export const endpointPatchOrdersSendDate = (app: Express): void => {
  app.patch("/dealit/api/orders/sendDate/:id", verifyToken, patchOrderSend);
};

export const endpointPatchOrdersDeliveryDate = (app: Express): void => {
  app.patch(
    "/dealit/api/orders/deliveryDate/:id",
    verifyToken,
    patchOrderDelivery
  );
};

//EndpointsReviews
export const endpointGetReviewsByUserId = (app: Express): void => {
  app.get("/dealit/api/reviews/user/:userId", getReviewsByUserId);
};

export const endpointGetReviewsByProductId = (app: Express): void => {
  app.get("/dealit/api/reviews/product/:productId", getReviewsByProductId);
};

export const endpointGetReviewsByReviewer = (app: Express): void => {
  app.get("/dealit/api/reviews/rev/:reviewer", getReviewsByReviewer);
};

export const endpointPostReviews = (app: Express): void => {
  app.post("/dealit/api/reviews", verifyToken, postReview);
};

//Endpoints CreditCard
export const endpointSetFavoriteCreditCard = (app: Express): void => {
  app.patch("/dealit/api/credit-cards/:id", verifyToken, setFavoriteCreditCard);
};
export const endpointPostCreditCard = (app: Express): void => {
  app.post("/dealit/api/credit-cards", verifyToken, postCreditCard);
};

//Endpoints Adress
export const endpointPostAddress = (app: Express): void => {
  app.post("/dealit/api/addresses", verifyToken, postAddress);
};

export const endpointPatchAddressFavorite = (app: Express): void => {
  app.patch("/dealit/api/addresses/:id", verifyToken, setFavoriteAddress);
};

//Endpoint Completion
export const endpointCompletion = (app: Express): void => {
  app.get("/dealit/api/completion", GetTextCompletion);
};
