import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getReviewsByUserId = async (userId: number) => {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { reviews: true },
    });
    if (user) {
      return user.reviews;
    }
    throw new Error("User does not exist");
  };

export const getReviewsByProductId = async (userId: number) => {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { reviews: true },
    });
    if (user) {
      return user.reviews;
    }
    throw new Error("User does not exist");
  };