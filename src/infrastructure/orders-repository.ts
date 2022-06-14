import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getUserOrdersById = async (userId: number) => {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { orders: true },
    });
    if (user) {
      return user.orders;
    }
    throw new Error("User does not exist");
  };
  