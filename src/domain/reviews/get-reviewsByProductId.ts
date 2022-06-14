import { getReviewsByProductId } from "../../infrastructure/reviews-repository";

export default async (productId: number) => await getReviewsByProductId(productId);
