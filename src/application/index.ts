import { verifyToken } from "../verifyToken";
import { Express } from "express";

import { getUserById, patchUser } from "./users";
import { getOrdersByUserId, postOrder,patchOrderSend, patchOrderDelivery} from "./orders";
import { registerUser, userLogin } from "./auth";
import {
  getProductById,
  postNewProduct,
  getProductsByCategory,
  getAllProductsPaginated,
  getProductsByUserId,
  getLateProducts,
  patchProduct
} from "./products";
import { getCategoryByMainCat, getAllMainCategories } from "./categories";
import {
  getReviewsByUserId,
  getReviewsByProductId,
  getReviewsByReviewer,
  postReview,
} from "./reviews";
import {postAddress} from "./addresses"
import {postCreditCard, setFavoriteCreditCard} from "./creditCards"

//EndpointsUser
export const endpointGetUserById = (app: Express) =>
  app.get("/dealit/api/users/:id", getUserById);

export const endpointPatchUser = (app: Express) =>
  app.patch("/dealit/api/users/:id", patchUser);

//EndpointsAuth
export const endpointPostUser = (app: Express) =>
  app.post("/dealit/api/register", registerUser);

export const endpointPostLogin = (app: Express) =>
  app.post("/dealit/api/login", userLogin);

//EndpointsProduct
export const endpointGetProductById = (app: Express) =>
  app.get("/dealit/api/products/:id", getProductById);

export const endpointPostProduct = (app: Express) =>
  app.post("/dealit/api/products", verifyToken, postNewProduct);

export const endpointgetProductsByCategoryPaginated = (app: Express) =>
  app.get("/dealit/api/products/category/:category", getProductsByCategory);

export const endpointgetAllProductsPaginated = (app: Express) =>
  app.get("/dealit/api/products/", getAllProductsPaginated);

export const endpointgetProductsByUserId = (app: Express) =>
  app.get("/dealit/api/products/user/:userId", getProductsByUserId);

export const endpointGetLatestProducts = (app: Express) =>
  app.get("/dealit/api/latest-products", getLateProducts);

  export const endpointPatchProducts = (app:Express)=>
  app.patch("/dealit/api/products/:id",patchProduct);
  
//EndpointsCategory
export const endpointGetCategoryByMainCat = (app: Express) =>
  app.get("/dealit/api/categories/:mainCat", getCategoryByMainCat);

export const endpointGetAllMainCategories = (app: Express) =>
  app.get("/dealit/api/categories", getAllMainCategories);

//EndpointsOrders
export const endpointGetOrdersByUserId = (app: Express) =>
  app.get("/dealit/api/orders/user/:userId", getOrdersByUserId);

  export const endpointPostOrders = (app:Express)=>
  app.post("/dealit/api/orders",postOrder);

  export const endpointPatchOrdersSendDate = (app:Express)=>
  app.patch("/dealit/api/orders/sendDate/:id",patchOrderSend)

  export const endpointPatchOrdersDeliveryDate = (app:Express)=>
  app.patch("/dealit/api/orders/deliveryDate/:id",patchOrderDelivery)


//EndpointsReviews
export const endpointGetReviewsByUserId = (app: Express) =>
  app.get("/dealit/api/reviews/user/:userId", getReviewsByUserId);

export const endpointGetReviewsByProductId = (app: Express) =>
  app.get("/dealit/api/reviews/product/:productId", getReviewsByProductId);

export const endpointGetReviewsByReviewer = (app: Express) =>
  app.get("/dealit/api/reviews/rev/:reviewer", getReviewsByReviewer);

export const endpointPostReviews = (app: Express) =>
  app.post("/dealit/api/reviews/", postReview);
  
  export const endpointPostCreditCard = (app: Express) => {
    app.post("/dealit/api/credit-cards", postCreditCard)
  }
  export const endpointPostAddress = (app: Express) => {
    app.post("/dealit/api/addresses", postAddress)
  }
  export const endpointSetFavoriteCreditCard = (app: Express) => {
    app.patch("/dealit/api/credit-cards", setFavoriteCreditCard)
  }



  