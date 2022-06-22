import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { Address } from "@prisma/client";
import postAdd from "../domain/addresses/post-address";
import setAddressIsFavorite from "../domain/addresses/patch-adressIsFavorite";
import getAddsByUserId from "../domain/addresses/get-addressByUserId";
import getAddressAuto from "../domain/addresses/get-addressAuto";

export const getAddressesByUserId = async (
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
    return res.send(await getAddsByUserId(Number(userId)));
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
    return res.status(StatusCodes.CREATED).send({
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
  if (isNaN(Number(id))) {
    return res.status(StatusCodes.BAD_REQUEST).send({
      error: {
        message: "Invalid id format",
        cause: "Bad Request",
        date: new Date().toLocaleString(),
      },
    });
  }
  return res.send({
    message: "Favorite address successfully updated",
    address: await setAddressIsFavorite(id),
  });
};


export const getAddressAutocomplete = async (req:Request,res:Response)=>{
  if( typeof req.query.text === "string"|| req.query.text instanceof String){
    const f:string = String(req.query.text) || "porto"
    const result = await getAddressAuto(f);

    return res.send(result)
  }
 

  }
