import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import getCategoryMainCat from "../domain/categories/get-categoryById";
import mainCategory from "../domain/categories/get-allMainCategories";

//Categories endpoints logic
export const getCategoryByMainCat = async (
  req: Request,
  res: Response
): Promise<Response<any, Record<string, any>>> => {
  try {
    const cat: string = req.params.cat;
    if (!isNaN(Number(cat))) {
      return res.status(StatusCodes.BAD_REQUEST).send({
        error: {
          message: "Invalid id format",
          cause: "Bad Request",
          date: new Date().toLocaleString(),
        },
      });
    }
    return res.send(await getCategoryMainCat(cat));
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

export const getAllMainCategories = async (
  req: Request,
  res: Response
): Promise<Response<any, Record<string, any>>> => {
  try {
    const resCats = await mainCategory();
    return res.send(resCats);
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
