import { Request, Response } from "express";
import postUser from "../domain/auth/post-user";
import postLogin from "../domain/auth/post-login";
import { StatusCodes } from "http-status-codes";
import bcrypt from "bcryptjs";
import jwt, { Secret } from "jsonwebtoken";
import { login } from "../infrastructure/users-repository";

export const registerUser = async (req: Request, res: Response) => {
  try {
    let { username, email, password, phone } = req.body;

    const { country, city, zipCode, street, houseNumber } = req.body.address;

    const { cardNumber, cvc, expiryDate } = req.body.creditCard;

    if (
      !(
        email &&
        password &&
        username &&
        phone &&
        country &&
        city &&
        zipCode &&
        street &&
        houseNumber &&
        cardNumber &&
        cvc &&
        expiryDate
      )
    ) {
      throw new Error("All inputs are required");
    }

    password = bcrypt.hashSync(password, 10);
    let secret: Secret;
    let token;

    if (process.env.TOKEN_KEY) {
      secret = process.env.TOKEN_KEY;

      token = jwt.sign({ user_id: username, email }, secret, {
        expiresIn: "2h",
      });
    }

    const data = {
      username,
      address: {
        country,
        city,
        zipCode,
        street,
        houseNumber,
        isFavorite: true,
      },
      email,
      password,
      phone,
      token,
      creditCard: {
        cardNumber,
        cvc,
        expiryDate,
        isFavorite: true,
      },
    };

    return res.status(StatusCodes.CREATED).send({
      message: "User successfully saved to datebase!",
      user: await postUser(data),
    });
  } catch (e: any) {
    if (e.message === "All inputs are required") {
      return res.status(StatusCodes.BAD_REQUEST).send({
        error: {
          message: e.message,
          cause: "Bad Request",
          date: new Date().toLocaleString(),
        },
      });
    }
    if (e.message === "User Already Exists. Please Login") {
      return res.status(StatusCodes.CONFLICT).send({
        error: {
          message: e.message,
          cause: "Conflict",
          date: new Date().toLocaleString(),
        },
      });
    }
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      error: {
        message: e.message,
        cause: "Unexpected error",
        date: new Date().toLocaleString(),
      },
    });
  }
};

export const userLogin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!(email && password)) {
      throw new Error("All inputs are required");
    }

    return res.send(await postLogin(email, password));
    
  } catch (e: any) {
    if (e.message === "All inputs are required") {
      return res.status(StatusCodes.BAD_REQUEST).send({
        error: {
          message: e.message,
          cause: "Bad Request",
          date: new Date().toLocaleString(),
        },
      });
    }
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      error: {
        message: e.message,
        cause: "Unexpected error",
        date: new Date().toLocaleString(),
      },
    });
  }
};
