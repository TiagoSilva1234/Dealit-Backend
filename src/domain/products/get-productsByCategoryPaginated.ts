import { getProductsByCategoryPaginated } from "../../infrastructure/products-repository";

export default async (category: string, page: number, limit: number) =>
  await getProductsByCategoryPaginated(category, page * limit - limit, limit);
