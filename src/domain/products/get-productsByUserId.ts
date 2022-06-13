import { getProductsByUserId } from "../../infrastructure/products-repository";

export default async (userId: number) => await getProductsByUserId(userId);
