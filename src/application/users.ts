import {Request,Response} from "express"
import getUserId from "../domain/users/get-UserById"

//User endpoints logic
export const getUserById = async (req:Request,res:Response) => {
    const v = await getUserId()
    res.send(v+ " "+req.params.id)
}





