import { Product } from "@prisma/client";
import { saveProduct } from "../../infrastructure/products-repository";
import { ProductData } from "../../utils/types";

export default async (req:any,res:any,data: ProductData,files:any): Promise<Product> => {
  return saveProduct(req,res,data,files);
};
