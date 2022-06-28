import { CreditCard } from "@prisma/client";
import  prisma  from "../../client";

export const getCreditCardsByUserId = async (
  userId: number
): Promise<CreditCard[]> => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { creditCards: true },
  });
  if (user) {
    return user.creditCards;
  }
  throw new Error("User does not exist");
};

export const postCreditCard = async (data: CreditCard): Promise<CreditCard> => {
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
      isFavorite: data.isFavorite || false,
      user: { connect: { id: data.userId } },
    },
  });
  return creditCard;
};

export const setCreditCardFavorite = async (
  id: number
): Promise<CreditCard> => {
  const card = await prisma.creditCard.findUnique({ where: { id: id } });

  if (card) {
    await prisma.creditCard.updateMany({
      where: {
        isFavorite: true,
        userId: card.userId,
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
