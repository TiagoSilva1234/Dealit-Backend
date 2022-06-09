import {saveProduct} from "../../infrastructure/products-repository"

export default async (data:any) => {
    return saveProduct(data);
}