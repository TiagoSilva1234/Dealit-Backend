import { getSoldProductStatsByUserId } from "../../infrastructure/products-repository";

export default async (userId: number): Promise<{ num: number; sum: number }> =>
  await getSoldProductStatsByUserId(userId);
