import { Request, Response } from "express";
import postUser from "../domain/auth/post-user";
import postLogin from "../domain/auth/post-login";
import { StatusCodes } from "http-status-codes";
import { userDataIsNotValid } from "../utils";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { username, email, password, phone, photo } = req.body;

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
        houseNumber
      )
    ) {
      return res.status(StatusCodes.BAD_REQUEST).send({
        error: {
          message: "Required data missing",
          cause: "Bad Request",
          date: new Date().toLocaleString(),
        },
      });
    }

    let data;
    if (photo) {
      if (cardNumber) {
        data = {
          username,
          address: {
            country,
            city,
            zipCode,
            street,
            houseNumber,
            isFavorite: true,
          },
          photo,
          email,
          password,
          phone,
          creditCard: {
            cardNumber,
            cvc,
            expiryDate,
            isFavorite: true,
          },
          token: "",
        };
      } else {
        data = {
          username,
          address: {
            country,
            city,
            zipCode,
            street,
            houseNumber,
            isFavorite: true,
          },
          photo,
          email,
          password,
          phone,
          token: "",
        };
      }
    } else {
      if (cardNumber) {
        data = {
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
          creditCard: {
            cardNumber,
            cvc,
            expiryDate,
            isFavorite: true,
          },
          token: "",
        };
      } else {
        data = {
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
          token: "",
        };
      }
    }

    const tester = userDataIsNotValid(data);

    if (tester.check) {
      return res.status(StatusCodes.BAD_REQUEST).send({
        error: {
          message: tester.cause,
          cause: "Bad Request",
          date: new Date().toLocaleString(),
        },
      });
    }

    return res.status(StatusCodes.CREATED).send({
      message: "User successfully saved to datebase!",
      user: await postUser(data),
    });
  } catch (e: any) {
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
      return res.status(StatusCodes.BAD_REQUEST).send({
        error: {
          message: "All inputs are required",
          cause: "Bad Request",
          date: new Date().toLocaleString(),
        },
      });
    }

    return res.send(await postLogin(email, password));
  } catch (e: any) {
    if (e.message === "Invalid credentials") {
      return res.status(StatusCodes.UNAUTHORIZED).send({
        error: {
          message: e.message,
          cause: "Unauthorized",
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
