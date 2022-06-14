import { PrismaClient, Review } from "@prisma/client";

const prisma = new PrismaClient();

export const getReviewsByUserId = async (userId: number) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { reviews: true },
  });
  if (user) {
    console.log(user.reviews[0]);
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
    return revs
  }
  throw new Error("User does not exist");
};

export const getReviewsByProductId = async (productId: number) => {
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
    return revs
  }
  throw new Error("Product does not exist");
};

export const getReviewsByReviewer = async (reviewerName: string) => {
  const reviews = await prisma.review.findMany({
    where: { reviewer: reviewerName },
  });
  if (reviews) {
    return reviews;
  }
  throw new Error("Reviewer has no reviews");
};

export const saveReview = async (data: Review) => {
  if (data.userId) {
    return await prisma.review.create({
      data: {
        user: { connect: { id: data.userId } },
        comment: data.comment,
        photo:
          "https://images.squarespace-cdn.com/content/v1/59157e4617bffce271a68dfd/1588030909250-LM8122T4NRKS7CO5W5FK/HeresSomethingGood-Logo-FINAL.jpg?format=1000w",
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
        photo:
          "https://images.squarespace-cdn.com/content/v1/59157e4617bffce271a68dfd/1588030909250-LM8122T4NRKS7CO5W5FK/HeresSomethingGood-Logo-FINAL.jpg?format=1000w",
        rating: data.rating,
        reviewer: data.reviewer,
      },
    });
  }
};
