import { Request, Response } from "express";
import getProduct from "../domain/products/get-ProductById";
import postProduct from "../domain/products/post-product";

//Product endpoints logic
export const getProductById = async (req: Request, res: Response) => {
  const product = await getProduct(req.params.id);
  res.send(product);
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
