import { patchProducts } from "../../infrastructure/products-repository";

export default async (id:number,obj:any) => await patchProducts(id,obj);
