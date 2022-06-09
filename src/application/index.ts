import app from "../index";
import { getUserById, postNewUser } from "./users";
import { getProductById, postNewProduct } from "./products";
import { getCategoryByMainCat,getAllMainCategories } from "./categories";
import { Express } from "express";

//EndpointsUser
export const endpointGetUserById = (app: Express) =>
  app.get("/users/:id", getUserById);
export const endpointPostUser = (app: Express) =>
  app.post("/users", postNewUser);

//EndpoinsProduct
export const endpointGetProductById = (app: Express) =>
  app.get("/products/:id", getProductById);
export const endpointPostProduct = (app: Express) =>
  app.post("/products", postNewProduct);

//EndpointsCategory
export const endpointGetCategoryByMainCat = (app: Express) =>
  app.get("/categories/:mainCat", getCategoryByMainCat);
export const endpointGetAllMainCategories = (app:Express)=>{
    app.get("/categories",getAllMainCategories)
}