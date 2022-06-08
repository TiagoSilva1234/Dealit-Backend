import express,{Express,Request,Response} from "express"
import { endpointGetUserById } from "./application"
const app: Express = express()


endpointGetUserById(app)

app.get("/",(req:Request, res:Response)=>{
    res.send("comi o cu de quem ta lendo")
})

app.listen(3220,"0.0.0.0",()=>{
    console.log("listening :)") 
})

export default app