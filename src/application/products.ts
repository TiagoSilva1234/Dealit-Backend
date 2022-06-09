import { Request, Response } from "express";
import getProduct from "../domain/products/get-productById";
import postProduct from "../domain/products/post-product";
import { StatusCodes } from "http-status-codes";

//Product endpoints logic
export const getProductById = async (req: Request, res: Response) => {
  try {
    let id = req.params.id;
    if (isNaN(Number(id))) {
      throw new Error("Invalid id format");
    }
    const product = await getProduct(id);
    res.send(product);
  } catch (e: any) {
    if (e.message === "Invalid id format") {
      return res.status(StatusCodes.BAD_REQUEST).send({
        error: {
          message: e.message,
          cause: "Bad Request",
          date: new Date().toLocaleString(),
        },
      });
    }
    if (e.message === "Product does not exist") {
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

export const postNewProduct = async (req: Request, res: Response) => {
  const { name, description, photos, price } = req.body;
  const { catName, upperLevel } = req.body.category;

  const data = {
    name,
    description,
    photos,
    price,
    category: {
      name: catName,
      upperLevel,
    },
  };
  return await postProduct(data);
};
