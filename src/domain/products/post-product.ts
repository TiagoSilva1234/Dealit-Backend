import { saveProduct } from "../../infrastructure/products-repository";
import {ProductData} from "../../types"

export default async (data: ProductData) => {
  return saveProduct(data);
};
