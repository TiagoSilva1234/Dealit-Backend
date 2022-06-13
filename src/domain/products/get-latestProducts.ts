import { getLatestProducts} from "../../infrastructure/products-repository";

export default async (page: number, limit: number) =>
  await getLatestProducts(page* limit - limit, limit);
