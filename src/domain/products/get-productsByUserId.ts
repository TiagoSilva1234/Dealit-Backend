import { Product } from "@prisma/client";
import { getProductsByUserId } from "../../infrastructure/products-repository";

export default async (userId: number): Promise<Product[]> =>
  await getProductsByUserId(userId);
