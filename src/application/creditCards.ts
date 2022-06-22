import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { CreditCard } from "@prisma/client";
import postCC from "../domain/creditCards/post-creditCard";
import setFav from "../domain/creditCards/patch-setFavorite";
import getCardsByUserId from "../domain/creditCards/get-creditCardsByUserId";

export const getCreditCardsByUserId = async (
  req: Request,
  res: Response
): Promise<Response<any, Record<string, any>>> => {
  try {
    const userId = req.params.userId;
    if (isNaN(Number(userId))) {
      return res.status(StatusCodes.BAD_REQUEST).send({
        error: {
          message: "Invalid id format",
          cause: "Bad Request",
          date: new Date().toLocaleString(),
        },
      });
    }
    return res.send(await getCardsByUserId(Number(userId)));
  } catch (e: any) {
    if (e.message === "User does not exist") {
      return res.status(StatusCodes.NOT_FOUND).send({
        error: {
          message: e.message,
          cause: "Not found",
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

export const postCreditCard = async (req: Request, res: Response) => {
  try {
    const data: CreditCard = req.body;

    if (
      !(
        data.cardNumber &&
        data.cvc &&
        data.expiryDate &&
        data.userId !== undefined
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
    const resCC = await postCC(data);
    res.status(StatusCodes.CREATED).send({
      message: "Credit Card successfully saved to database",
      creditCard: resCC
    });
  } catch (e: any) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      error: {
        message: e.message,
        cause: "Unexpected error",
        date: new Date().toLocaleString(),
      },
    });
  }
};

export const setFavoriteCreditCard = async (req: Request, res: Response) => {
  try {
    const id: string = req.params.id;
    if (isNaN(Number(id))) {
      return res.status(StatusCodes.BAD_REQUEST).send({
        error: {
          message: "Invalid id format",
          cause: "Bad Request",
          date: new Date().toLocaleString(),
        },
      });
    }
    res.send({
      message: "Favorite Credit Card successfully updated",
      creditCard: await setFav(Number(id)),
    });
  } catch (e: any) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      error: {
        message: e.message,
        cause: "Unexpected error",
        date: new Date().toLocaleString(),
      },
    });
  }
};
