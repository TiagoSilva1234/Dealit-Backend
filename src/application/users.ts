import { Request, Response } from "express";
import getUser from "../domain/users/get-userById";
import postUser from "../domain/users/post-user";

//User endpoints logic
export const getUserById = async (req: Request, res: Response) => {
  const user = await getUser(req.params.id);
  res.send(user);
};

export const postNewUser = async (req: Request, res: Response) => {
  const { username, email, password, phone } = req.body;
  const { country, city, zipCode, street, houseNumber } = req.body.address;
  const { cardNumber, cvc, expiryDate } = req.body.creditCard;

  const data = {
    username,
    address: { country, city, zipCode, street, houseNumber, isFavorite: true },
    email,
    password,
    phone,
    creditCard: {
      cardNumber,
      cvc,
      expiryDate,
      isFavorite: true,
    },
  };
  return await postUser(data);
};
