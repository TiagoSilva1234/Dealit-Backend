import app from "../index";
import { getUserById } from "./users";
import {registerUser, userLogin } from "./auth"
import {
  getProductById,
  postNewProduct,
  getProductsByCategoryPaginated,
  getAllProductsPaginated
} from "./products";
import { getCategoryByMainCat, getAllMainCategories } from "./categories";
import {verifyToken} from "../domain/auth/verifyToken"
import { Express } from "express";

//EndpointsUser
export const endpointGetUserById = (app: Express) =>
  app.get("/users/:id", getUserById);

//EndpointsAuth  
export const endpointPostUser = (app: Express) =>
  app.post("/register", registerUser);
export const endpointPostLogin = (app: Express) =>
  app.post("/login", userLogin);

//EndpointsProduct
export const endpointGetProductById = (app: Express) =>
  app.get("/products/:id", getProductById);
export const endpointPostProduct = (app: Express) =>
  app.post("/products", verifyToken, postNewProduct);
export const endpointgetProductsByCategoryPaginated = (app: Express) =>
  app.get("/products/category/:category", getProductsByCategoryPaginated);
export const endpointgetAllProductsPaginated = (app: Express) =>
  app.get("/products/", getAllProductsPaginated);

//EndpointsCategory
export const endpointGetCategoryByMainCat = (app: Express) =>
  app.get("/categories/:mainCat", getCategoryByMainCat);
export const endpointGetAllMainCategories = (app: Express) =>
  app.get("/categories", getAllMainCategories);
