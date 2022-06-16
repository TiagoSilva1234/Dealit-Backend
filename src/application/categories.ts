import { Request, Response } from "express";
import getCategoryMainCat from "../domain/categories/get-categoryById";
import { StatusCodes } from "http-status-codes";
import mainCategory from "../domain/categories/get-allMainCategories"

//Categories endpoints logic
export const getCategoryByMainCat = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
  try {
    const mainCat : string = req.params.mainCat;
    const categories = await getCategoryMainCat(mainCat);
    return res.send(categories);
  } catch (e:any) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
        error: {
          message: e.message,
          cause: "Unexpected error",
          date: new Date().toLocaleString(),
        },
      });
  }
};
export const getAllMainCategories = async (req:Request,res:Response): Promise<Response<any, Record<string, any>>>=>{
  const arr = await mainCategory()
  return res.send(arr)
}
