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
  const creditCard = await prisma.creditCard.create({
    data: {
      cardNumber: data.cardNumber,
      cvc: data.cvc,
      expiryDate: data.expiryDate,
      isFavorite: data.isFavorite,
      userId: data.userId,
    },
  });
  return creditCard;
};

export const setCreditCardFavorite = async (id: number) => {
  const card = await prisma.creditCard.findUnique({ where: { id: id } });

  if (card) {
    await prisma.creditCard.updateMany({
      where: {
        AND: [
          {
            id: id,
          },
          {
            isFavorite: true,
          },
        ],
      },
      data: {
        isFavorite: false,
      },
    });
  }
  const creditCard = await prisma.creditCard.update({
    where: { id: id },
    data: {
      isFavorite: true,
    },
  });
  return creditCard;
};
