import { getReviewsByProductId } from "../../infrastructure/reviews-repository";

export default async (productId: number): Promise<{
    id: number;
    productId: number | null;
    comment: string;
    photo: string;
    rating: number;
    reviewer: string;
}[]> => await getReviewsByProductId(productId);
