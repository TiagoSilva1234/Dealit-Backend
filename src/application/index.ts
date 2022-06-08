import app from "../index"
import {getUserById} from "./users"
import {Express} from "express"

//Endpoints
export const endpointGetUserById = (app:Express)=> app.get("/users/:id",getUserById)

