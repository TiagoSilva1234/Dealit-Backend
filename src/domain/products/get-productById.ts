import { Product } from "@prisma/client";
import { getProductById } from "../../infrastructure/products-repository";

export default async (id: string, skip: number, take: number): Promise<Product | Product[]> =>
  await getProductById(id, skip, take);
