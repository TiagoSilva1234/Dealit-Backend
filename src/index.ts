import express,{Express,Request,Response} from "express"
import { endpointGetUserById, endpointPostUser } from "./application"
const app: Express = express()


endpointGetUserById(app);
endpointPostUser(app)

app.get("/",(req:Request, res:Response)=>{
    res.send("hello!")
})

app.listen(3220,"0.0.0.0",()=>{
    console.log("listening :)") 
})

export default app