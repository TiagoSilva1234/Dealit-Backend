import { Product } from "@prisma/client";
import { getProductsByCategoryPaginated } from "../../infrastructure/products-repository";

export default async (
  category: string,
  page: number,
  limit: number
): Promise<Product[]> =>
  await getProductsByCategoryPaginated(category, page * limit - limit, limit);
