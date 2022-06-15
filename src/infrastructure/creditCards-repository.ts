import { CreditCard, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const postCreditCard = async (data: CreditCard) => {
  if (data.isFavorite) {
    await prisma.creditCard.updateMany({
      where: { userId: data.userId },
      data: {
          isFavorite: false,
      },
    });
  }
  const order = await prisma.creditCard.create({
    data: {
      cardNumber: data.cardNumber,
      cvc: data.cvc,
      expiryDate: data.expiryDate,
      isFavorite: data.isFavorite,
      userId: data.userId,
    },
  });
  return order;
};
