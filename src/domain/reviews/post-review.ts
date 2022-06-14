import { Review } from "@prisma/client";
import { saveReview } from "../../infrastructure/reviews-repository";

export default async (data: Review) => await saveReview(data);
