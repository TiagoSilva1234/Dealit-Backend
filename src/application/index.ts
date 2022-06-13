import app from "../index";
import { getUserById, getUserOrdersById } from "./users";
import { registerUser, userLogin } from "./auth";
import {
  getProductById,
  postNewProduct,
  getProductsByCategoryPaginated,
  getAllProductsPaginated,
  getProductsByUserId,
  getLateProducts

} from "./products";
import { getCategoryByMainCat, getAllMainCategories } from "./categories";
import { verifyToken } from "../domain/auth/verifyToken";
import { Express } from "express";

//EndpointsUser
export const endpointGetUserById = (app: Express) =>
  app.get("/users/:id", getUserById);
export const endpointGetUserOrdersById = (app: Express) =>
  app.get("/users/orders/:userId", getUserOrdersById);

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
export const endpointgetProductsByUserId = (app: Express) =>
  app.get("/products/user/:userId", getProductsByUserId);
export const endpointGetLatestProducts=(app:Express)=>{
app.get("/latest-products",getLateProducts)
}
//EndpointsCategory
export const endpointGetCategoryByMainCat = (app: Express) =>
  app.get("/categories/:mainCat", getCategoryByMainCat);
export const endpointGetAllMainCategories = (app: Express) =>
  app.get("/categories", getAllMainCategories);
