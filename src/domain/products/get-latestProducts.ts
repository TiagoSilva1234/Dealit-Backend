import { Product } from "@prisma/client";
import { getLatestProducts } from "../../infrastructure/products-repository";

export default async (page: number, limit: number): Promise<Product[]> =>
  await getLatestProducts(page * limit - limit, limit);
