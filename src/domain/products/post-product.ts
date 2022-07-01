  import { Product } from "@prisma/client";
import { saveProduct } from "../../infrastructure/products-repository";
import { ProductData } from "../../utils/types";

export default async (data: ProductData, upload:any,req:any,res:any): Promise<Product> => {
  return saveProduct(data,upload,req,res);
};
  