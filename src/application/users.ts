import {Request,Response} from "express"
import getUserId from "../domain/users/get-UserById"
import postUser from "../domain/users/post-user"

//User endpoints logic
export const getUserById = async (req:Request,res:Response) => {
    const v = await getUserId(req.params.id)
    res.send(v)
}

export const postNewUser = async (req: Request, res: Response) => {
    console.log(req.body);
    const data = {
      username: req.body.username,
      addresses: [req.body.address],
      email: req.body.email,
      password: req.body.password,
      phone: req.body.phone,
      creditCards: req.body.creditCard,
    };
    return await postUser(data);
  };

