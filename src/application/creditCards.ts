import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { CreditCard } from "@prisma/client";
import postCC from "../domain/creditCards/post-creditCard";
import setFav from "../domain/creditCards/patch-setFavorite";

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
          message: "Required inputs missing",
          cause: "Bad request",
          date: new Date().toLocaleString(),
        },
      });
    }
    res.send({
      message: "Credit Card successfully saved to database",
      order: await postCC(data),
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
          cause: "Bad request",
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
