import app from "../index";
import { getUserById } from "./users";
import { getOrdersByUserId } from "./orders";
import { registerUser, userLogin } from "./auth";
import {
  getProductById,
  postNewProduct,
  getProductsByCategory,
  getAllProductsPaginated,
  getProductsByUserId,
  getLateProducts,
} from "./products";
import { getCategoryByMainCat, getAllMainCategories } from "./categories";
import { verifyToken } from "../domain/auth/verifyToken";
import { Express } from "express";

//EndpointsUser
export const endpointGetUserById = (app: Express) =>
  app.get("/dealit/api/users/:id", getUserById);

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
  app.get(
    "/dealit/api/products/category/:category",
    getProductsByCategory
  );

export const endpointgetAllProductsPaginated = (app: Express) =>
  app.get("/dealit/api/products/", getAllProductsPaginated);

export const endpointgetProductsByUserId = (app: Express) =>
  app.get("/dealit/api/products/user/:userId", getProductsByUserId);

export const endpointGetLatestProducts = (app: Express) =>
  app.get("/dealit/api/latest-products", getLateProducts);
//EndpointsCategory
export const endpointGetCategoryByMainCat = (app: Express) =>
  app.get("/dealit/api/categories/:mainCat", getCategoryByMainCat);

export const endpointGetAllMainCategories = (app: Express) =>
  app.get("/dealit/api/categories", getAllMainCategories);

//EndpointsOrders
export const endpointGetOrdersByUserId = (app: Express) =>
  app.get("/dealit/api/orders/:userId", getOrdersByUserId);
