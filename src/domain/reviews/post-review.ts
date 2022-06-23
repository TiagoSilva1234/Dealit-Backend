import { Review } from "@prisma/client";
import { ReviewData } from "../../utils/types";
import { saveReview } from "../../infrastructure/reviews-repository";

export default async (data: ReviewData): Promise<Review> =>
  await saveReview(data);
