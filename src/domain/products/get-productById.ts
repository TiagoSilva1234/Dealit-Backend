import { getProductById } from "../../infrastructure/products-repository";

export default async (id: string,num:number) => await getProductById(id,num);
