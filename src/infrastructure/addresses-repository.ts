import { Address, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const postAddress = async (data: Address) => {

  if (data.isFavorite) {
    await prisma.address.updateMany({
      where: { userId: data.userId },
      data: {
        isFavorite: false,
      },
    });
  }

  const order = await prisma.address.create({
    data: {
      country: data.country,
      city: data.city,
      zipCode: data.zipCode,
      street: data.street,
      houseNumber: data.houseNumber,
      isFavorite: data.isFavorite,
      userId: data.userId,
    },
  });
  return order;
};
