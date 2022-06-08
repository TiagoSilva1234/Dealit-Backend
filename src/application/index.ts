import app from "../index"
import {getUserById, postNewUser} from "./users"
import {Express} from "express"

//Endpoints
export const endpointGetUserById = (app:Express)=> app.get("/users/:id",getUserById)
export const endpointPostUser = (app:Express)=> app.post("/users",postNewUser)

