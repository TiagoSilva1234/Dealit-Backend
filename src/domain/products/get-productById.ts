import { Product } from "@prisma/client";
import { getProductById } from "../../infrastructure/products-repository";

export default async (id: string, num: number): Promise<Product | Product[]> =>
  await getProductById(id, num);
