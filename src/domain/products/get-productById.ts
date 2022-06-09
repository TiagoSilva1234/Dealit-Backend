import { getProductById } from "../../infrastructure/products-repository";

export default async (id: string) => await getProductById(id);
