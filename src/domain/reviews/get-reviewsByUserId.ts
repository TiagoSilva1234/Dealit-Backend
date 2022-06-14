import { getReviewsByUserId } from "../../infrastructure/reviews-repository";

export default async (userId: number) => await getReviewsByUserId(userId);
