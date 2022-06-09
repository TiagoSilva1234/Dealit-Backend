import {getProductsByCategoryPaginated} from "../../infrastructure/products-repository";

export default async (category: string, page: number, limit: number) => {
    let skip = (page * limit) - limit;
    let take = limit;
    return await getProductsByCategoryPaginated(category, skip, take);
}