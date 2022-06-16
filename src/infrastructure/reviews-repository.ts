import { PrismaClient, Review } from "@prisma/client";
import { ReviewData } from "../utils/types";

const prisma = new PrismaClient();

export const getReviewsByUserId = async (
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
> => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { reviews: true },
  });
  if (user) {
    let revs = user.reviews.map((r) => {
      return {
        id: r.id,
        userId: r.userId,
        comment: r.comment,
        photo: r.photo,
        rating: r.rating,
        reviewer: r.reviewer,
      };
    });
    return revs;
  }
  throw new Error("User does not exist");
};

export const getReviewsByProductId = async (
  productId: number
): Promise<
  {
    id: number;
    productId: number | null;
    comment: string;
    photo: string;
    rating: number;
    reviewer: string;
  }[]
> => {
  const product = await prisma.product.findUnique({
    where: { id: productId },
    include: { reviews: true },
  });
  if (product) {
    let revs = product.reviews.map((r) => {
      return {
        id: r.id,
        productId: r.productId,
        comment: r.comment,
        photo: r.photo,
        rating: r.rating,
        reviewer: r.reviewer,
      };
    });
    return revs;
  }
  throw new Error("Product does not exist");
};

export const getReviewsByReviewer = async (
  reviewerName: string
): Promise<Review[]> => {
  const reviews = await prisma.review.findMany({
    where: { reviewer: reviewerName },
  });
  if (reviews.length > 0) {
    return reviews;
  }
  throw new Error("Reviewer not found");
};

export const saveReview = async (data: ReviewData): Promise<Review> => {
  if (data.userId !== undefined) {
    return await prisma.review.create({
      data: {
        user: { connect: { id: data.userId } },
        comment: data.comment,
        photo: data.photo,
        rating: data.rating,
        reviewer: data.reviewer,
      },
    });
  }
  if (data.productId) {
    return await prisma.review.create({
      data: {
        product: { connect: { id: data.productId } },
        comment: data.comment,
        photo: data.photo,
        rating: data.rating,
        reviewer: data.reviewer,
      },
    });
  }
  throw new Error("Could not find an id for either product or user");
};
