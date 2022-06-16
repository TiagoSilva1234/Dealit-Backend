import { getReviewsByUserId } from "../../infrastructure/reviews-repository";

export default async (
  userId: number
): Promise<
  {
    id: number;
    userId: number | null;
    comment: string;
    photo: string;
    rating: number;
    reviewer: string;
  }[]
> => await getReviewsByUserId(userId);
