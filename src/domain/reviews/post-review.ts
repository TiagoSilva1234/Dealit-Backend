import { Review } from "@prisma/client";
import { saveReview } from "../../infrastructure/reviews-repository";
import { ReviewData } from "../../utils/types";

export default async (data: ReviewData): Promise<Review> => await saveReview(data);
