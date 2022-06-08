import express,{Express,Request,Response} from "express"
import {arroz} from "./application/index"
const app: Express = express()


app.get("/",(req:Request,res:Response) => {
    
    res.send(arroz())
})


app.listen(3002,()=>{
    console.log("listening :)")
    
})

