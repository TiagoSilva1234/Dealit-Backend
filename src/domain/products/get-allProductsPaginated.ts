import { Product } from "@prisma/client";
import { getAllProductsPaginated } from "../../infrastructure/products-repository";

export default async (page: number, limit: number): Promise<Product[]> =>
  await getAllProductsPaginated(page * limit - limit, limit);
