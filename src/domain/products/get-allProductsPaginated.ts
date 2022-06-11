import { getAllProductsPaginated } from "../../infrastructure/products-repository";

export default async (page: number, limit: number) =>
  await getAllProductsPaginated(page * limit - limit, limit);
