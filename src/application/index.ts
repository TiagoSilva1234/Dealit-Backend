import app from "../index"
import {getUserById, postNewUser} from "./users"
import {getProductById, postNewProduct} from "./products"
import {Express} from "express"

//Endpoints
export const endpointGetUserById = (app:Express)=> app.get("/users/:id",getUserById)
export const endpointPostUser = (app:Express)=> app.post("/users",postNewUser)

export const endpointGetProductById = (app:Express)=> app.get("/products/:id",getProductById)
export const endpointPostProduct = (app:Express)=> app.post("/products",postNewProduct)

