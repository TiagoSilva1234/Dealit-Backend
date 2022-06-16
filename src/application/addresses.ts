import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { Address } from "@prisma/client";
import postAdd from "../domain/addresses/post-address";
import setAddressIsFavorite from "../domain/addresses/patch-adressIsFavorite";

export const postAddress = async (
  req: Request,
  res: Response
): Promise<Response<any, Record<string, any>>> => {
  try {
    const data: Address = req.body;
    if (
      !(
        data.country &&
        data.city &&
        data.houseNumber &&
        data.street &&
        data.zipCode
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
    return res.send({
      message: "Address successfully saved to database",
      order: await postAdd(data),
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

export const setFavoriteAddress = async (
  req: Request,
  res: Response
): Promise<Response<any, Record<string, any>>> => {
  const id = Number(req.params.id);
  return res.send({
    message: "Favorite address successfully updated",
    address: await setAddressIsFavorite(id),
  });
};
