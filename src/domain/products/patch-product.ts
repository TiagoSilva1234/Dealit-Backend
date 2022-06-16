import { Product } from "@prisma/client";
import { patchProduct } from "../../infrastructure/products-repository";
import { ProdUpdateData } from "../../types";

export default async (id: number, obj: ProdUpdateData): Promise<Product> =>
  await patchProduct(id, obj);
