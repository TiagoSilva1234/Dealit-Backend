import { patchProduct } from "../../infrastructure/products-repository";

export default async (id:number,obj:any) => await patchProduct(id,obj);
