import { Request, Response } from "express";
import getCategoryId from "../domain/categories/get-categoryById";
import { StatusCodes } from "http-status-codes";


//Categories endpoints logic
export const getCategoryById = async (req: Request, res: Response) => {
  try {
    let id = req.params.id;
    if (isNaN(Number(id))) {
      throw new Error("Invalid id format");
    }
    const product = await getCategoryId(id);
    res.send(product);
  } catch (e: any) {
      if (e.message === "Category does not exist") {
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
