import { Review } from "@prisma/client";
import { getReviewsByReviewer } from "../../infrastructure/reviews-repository";

export default async (reviewerName: string): Promise<Review[]> => await getReviewsByReviewer(reviewerName);
