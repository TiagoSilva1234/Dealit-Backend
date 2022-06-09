import { Request, Response } from "express";
import getCategoryId from "../domain/categories/get-categoryById";

//Categories endpoints logic
export const getCategoryById = async (req: Request, res: Response) => {
  const product = await getCategoryId(req.params.id);
  res.send(product);
};
