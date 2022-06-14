import { getReviewsByReviewer } from "../../infrastructure/reviews-repository";

export default async (reviewerName: string) => await getReviewsByReviewer(reviewerName);
